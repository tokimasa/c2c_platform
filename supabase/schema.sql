create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  display_name text not null,
  is_platform_admin boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.items (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  category text not null,
  brand text not null default 'Unbranded',
  price integer not null check (price >= 300),
  condition text not null check (condition in ('Like new', 'Good', 'Used')),
  description text not null,
  image_url text not null,
  city text not null default 'Tokyo',
  status text not null default 'active' check (status in ('active', 'sold', 'removed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  item_id uuid not null references public.items(id),
  buyer_id uuid not null references public.profiles(id),
  seller_id uuid not null references public.profiles(id),
  price integer not null check (price >= 0),
  status text not null default 'completed' check (status in ('completed', 'refunded', 'disputed')),
  created_at timestamptz not null default now(),
  constraint buyer_is_not_seller check (buyer_id <> seller_id)
);

create unique index if not exists one_completed_transaction_per_item
  on public.transactions(item_id)
  where status = 'completed';

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  item_id uuid references public.items(id) on delete set null,
  buyer_id uuid references public.profiles(id) on delete cascade,
  seller_id uuid references public.profiles(id) on delete cascade,
  platform_user_id uuid references public.profiles(id) on delete set null,
  title text not null,
  created_at timestamptz not null default now(),
  last_message_at timestamptz not null default now(),
  constraint has_participant_pair check (
    (buyer_id is not null and seller_id is not null)
    or (buyer_id is not null and platform_user_id is not null)
    or (seller_id is not null and platform_user_id is not null)
  )
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 2000),
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists touch_items_updated_at on public.items;
create trigger touch_items_updated_at
before update on public.items
for each row execute function public.touch_updated_at();

create or replace function public.is_platform_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
    and is_platform_admin = true
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name, is_platform_admin)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)),
    false
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.prevent_profile_self_promotion()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if old.is_platform_admin is distinct from new.is_platform_admin
    and auth.role() <> 'service_role'
    and not public.is_platform_admin() then
    raise exception 'Only platform admins can change platform admin access.';
  end if;
  return new;
end;
$$;

drop trigger if exists prevent_profile_self_promotion on public.profiles;
create trigger prevent_profile_self_promotion
before update on public.profiles
for each row execute function public.prevent_profile_self_promotion();

alter table public.profiles enable row level security;
alter table public.items enable row level security;
alter table public.transactions enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;

drop policy if exists "profiles are readable by authenticated users" on public.profiles;
create policy "profiles are readable by authenticated users"
on public.profiles for select
to anon, authenticated
using (true);

drop policy if exists "users update own profile" on public.profiles;
create policy "users update own profile"
on public.profiles for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

drop policy if exists "active items are publicly readable" on public.items;
create policy "active items are publicly readable"
on public.items for select
to anon, authenticated
using (status = 'active');

drop policy if exists "item participants can read private items" on public.items;
create policy "item participants can read private items"
on public.items for select
to authenticated
using (
  seller_id = auth.uid()
  or public.is_platform_admin()
  or exists (
    select 1 from public.transactions t
    where t.item_id = items.id
    and t.buyer_id = auth.uid()
  )
);

drop policy if exists "sellers create own items" on public.items;
create policy "sellers create own items"
on public.items for insert
to authenticated
with check (seller_id = auth.uid());

drop policy if exists "sellers update own unsold items" on public.items;
create policy "sellers update own unsold items"
on public.items for update
to authenticated
using (seller_id = auth.uid() or public.is_platform_admin())
with check (seller_id = auth.uid() or public.is_platform_admin());

drop policy if exists "transactions visible to participants and admins" on public.transactions;
create policy "transactions visible to participants and admins"
on public.transactions for select
to authenticated
using (buyer_id = auth.uid() or seller_id = auth.uid() or public.is_platform_admin());

drop policy if exists "buyers create own transactions" on public.transactions;
create policy "buyers create own transactions"
on public.transactions for insert
to authenticated
with check (buyer_id = auth.uid() and buyer_id <> seller_id);

drop policy if exists "conversations visible to participants and admins" on public.conversations;
create policy "conversations visible to participants and admins"
on public.conversations for select
to authenticated
using (buyer_id = auth.uid() or seller_id = auth.uid() or platform_user_id = auth.uid() or public.is_platform_admin());

drop policy if exists "participants create conversations" on public.conversations;
create policy "participants create conversations"
on public.conversations for insert
to authenticated
with check (buyer_id = auth.uid() or seller_id = auth.uid() or platform_user_id = auth.uid() or public.is_platform_admin());

drop policy if exists "participants update conversations" on public.conversations;
create policy "participants update conversations"
on public.conversations for update
to authenticated
using (buyer_id = auth.uid() or seller_id = auth.uid() or platform_user_id = auth.uid() or public.is_platform_admin())
with check (buyer_id = auth.uid() or seller_id = auth.uid() or platform_user_id = auth.uid() or public.is_platform_admin());

drop policy if exists "messages visible to conversation participants" on public.messages;
create policy "messages visible to conversation participants"
on public.messages for select
to authenticated
using (
  exists (
    select 1 from public.conversations c
    where c.id = conversation_id
    and (c.buyer_id = auth.uid() or c.seller_id = auth.uid() or c.platform_user_id = auth.uid() or public.is_platform_admin())
  )
);

drop policy if exists "participants send messages" on public.messages;
create policy "participants send messages"
on public.messages for insert
to authenticated
with check (
  sender_id = auth.uid()
  and exists (
    select 1 from public.conversations c
    where c.id = conversation_id
    and (c.buyer_id = auth.uid() or c.seller_id = auth.uid() or c.platform_user_id = auth.uid() or public.is_platform_admin())
  )
);

create or replace function public.purchase_item(item_to_purchase uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  purchased_item public.items%rowtype;
  created_transaction uuid;
begin
  select *
  into purchased_item
  from public.items
  where id = item_to_purchase
  and status = 'active'
  for update;

  if not found then
    raise exception 'This item is no longer available.';
  end if;

  if purchased_item.seller_id = auth.uid() then
    raise exception 'You cannot purchase your own listing.';
  end if;

  update public.items
  set status = 'sold'
  where id = purchased_item.id;

  insert into public.transactions (item_id, buyer_id, seller_id, price, status)
  values (purchased_item.id, auth.uid(), purchased_item.seller_id, purchased_item.price, 'completed')
  returning id into created_transaction;

  insert into public.conversations (item_id, buyer_id, seller_id, title, last_message_at)
  values (purchased_item.id, auth.uid(), purchased_item.seller_id, purchased_item.title, now());

  return created_transaction;
end;
$$;

grant execute on function public.purchase_item(uuid) to authenticated;
revoke execute on function public.touch_updated_at() from public;
revoke execute on function public.handle_new_user() from public;
revoke execute on function public.is_platform_admin() from public;
revoke execute on function public.prevent_profile_self_promotion() from public;
revoke execute on function public.purchase_item(uuid) from public;
revoke execute on function public.touch_updated_at() from anon, authenticated;
revoke execute on function public.handle_new_user() from anon, authenticated;
revoke execute on function public.is_platform_admin() from anon, authenticated;
revoke execute on function public.prevent_profile_self_promotion() from anon, authenticated;
revoke execute on function public.purchase_item(uuid) from anon;
grant execute on function public.is_platform_admin() to authenticated;
grant execute on function public.purchase_item(uuid) to authenticated;

do $$
begin
  alter publication supabase_realtime add table public.messages;
exception
  when duplicate_object then null;
  when undefined_object then null;
end;
$$;

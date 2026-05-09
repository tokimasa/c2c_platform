"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient, hasSupabaseEnv } from "@/lib/supabase/server";

function requireSupabase() {
  if (!hasSupabaseEnv()) {
    throw new Error("Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable live mutations.");
  }
}

export async function signIn(formData: FormData) {
  requireSupabase();
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect(`/auth?message=${encodeURIComponent(error.message)}`);
  redirect("/");
}

export async function signUp(formData: FormData) {
  requireSupabase();
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const displayName = String(formData.get("displayName") ?? email.split("@")[0]);
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName
      }
    }
  });
  if (!error && process.env.PLATFORM_ADMIN_EMAIL && email.toLowerCase() === process.env.PLATFORM_ADMIN_EMAIL.toLowerCase() && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const admin = createSupabaseAdminClient();
    const {
      data: { users }
    } = await admin.auth.admin.listUsers();
    const matchingUser = users.find((user) => user.email?.toLowerCase() === email.toLowerCase());
    if (matchingUser) {
      await admin.from("profiles").update({ is_platform_admin: true }).eq("id", matchingUser.id);
    }
  }
  if (error) redirect(`/auth?message=${encodeURIComponent(error.message)}`);
  redirect("/");
}

export async function signOut() {
  requireSupabase();
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function createListing(formData: FormData) {
  requireSupabase();
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth?message=Please sign in to list an item.");

  const { error } = await supabase.from("items").insert({
    seller_id: user.id,
    title: String(formData.get("title") ?? ""),
    category: String(formData.get("category") ?? "Home"),
    brand: String(formData.get("brand") ?? "Unbranded"),
    price: Number(formData.get("price") ?? 0),
    condition: String(formData.get("condition") ?? "Good"),
    description: String(formData.get("description") ?? ""),
    image_url: String(formData.get("imageUrl") ?? ""),
    city: String(formData.get("city") ?? "Tokyo"),
    status: "active"
  });

  if (error) redirect(`/seller?message=${encodeURIComponent(error.message)}`);
  revalidatePath("/");
  revalidatePath("/seller");
  redirect("/seller?message=Listing published.");
}

export async function purchaseItem(formData: FormData) {
  requireSupabase();
  const itemId = String(formData.get("itemId") ?? "");
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth?message=Please sign in to purchase.");

  const { error } = await supabase.rpc("purchase_item", { item_to_purchase: itemId });
  if (error) redirect(`/items/${itemId}?message=${encodeURIComponent(error.message)}`);

  revalidatePath("/");
  revalidatePath("/buyer");
  revalidatePath("/seller");
  revalidatePath("/platform");
  redirect("/buyer?message=Purchase completed.");
}

export async function sendMessage(formData: FormData) {
  requireSupabase();
  const conversationId = String(formData.get("conversationId") ?? "");
  const body = String(formData.get("body") ?? "").trim();
  if (!body) return;

  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth?message=Please sign in to chat.");

  const { error } = await supabase.from("messages").insert({
    conversation_id: conversationId,
    sender_id: user.id,
    body
  });
  if (!error) {
    await supabase.from("conversations").update({ last_message_at: new Date().toISOString() }).eq("id", conversationId);
  }

  revalidatePath("/chat");
}

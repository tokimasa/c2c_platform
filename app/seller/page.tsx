import { ListingForm } from "@/components/ListingForm";
import { getCurrentProfile, getSellerItems } from "@/lib/data";

const yen = new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY", maximumFractionDigits: 0 });

export default async function SellerPage({
  searchParams
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const [profile, query] = await Promise.all([getCurrentProfile(), searchParams]);
  const items = await getSellerItems(profile?.id ?? "demo-seller-yuna");
  const active = items.filter((item) => item.status === "active");
  const sold = items.filter((item) => item.status === "sold");

  return (
    <main className="shell grid gap-5 py-6 lg:grid-cols-[360px_1fr]">
      <div className="grid gap-5">
        <section className="card p-5">
          <p className="text-xs font-black uppercase text-accent">Seller board</p>
          <h1 className="mt-1 text-3xl font-black">Your listings</h1>
          <p className="mt-2 text-sm text-muted">Track boarding items and sold items. Live writes require Supabase auth.</p>
        </section>
        <ListingForm />
      </div>
      <section className="grid gap-5">
        {query.message ? <p className="card border-accent p-3 text-sm text-accent">{query.message}</p> : null}
        <div className="card p-5">
          <h2 className="mb-4 text-xl font-black">Active listings</h2>
          <div className="grid gap-3">
            {active.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4 border-b border-line pb-3">
                <div>
                  <p className="font-black">{item.title}</p>
                  <p className="text-sm text-muted">{item.category} · {item.condition}</p>
                </div>
                <strong>{yen.format(item.price)}</strong>
              </div>
            ))}
            {!active.length ? <p className="text-muted">No active listings.</p> : null}
          </div>
        </div>
        <div className="card p-5">
          <h2 className="mb-4 text-xl font-black">Sold items</h2>
          <div className="grid gap-3">
            {sold.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4 border-b border-line pb-3">
                <div>
                  <p className="font-black">{item.title}</p>
                  <p className="text-sm text-muted">{item.category} · sold</p>
                </div>
                <strong>{yen.format(item.price)}</strong>
              </div>
            ))}
            {!sold.length ? <p className="text-muted">No sold items yet.</p> : null}
          </div>
        </div>
      </section>
    </main>
  );
}

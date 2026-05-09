import { getBuyerTransactions, getCurrentProfile } from "@/lib/data";

const yen = new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY", maximumFractionDigits: 0 });

export default async function BuyerPage({
  searchParams
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const [profile, query] = await Promise.all([getCurrentProfile(), searchParams]);
  const transactions = await getBuyerTransactions(profile?.id ?? "demo-buyer-ken");

  return (
    <main className="shell py-6">
      <section className="mb-5">
        <p className="text-xs font-black uppercase text-accent">Buyer history</p>
        <h1 className="text-3xl font-black">Your purchases</h1>
        <p className="mt-2 text-muted">Purchases are simulated in v1 and recorded as completed transactions.</p>
      </section>
      {query.message ? <p className="card mb-4 border-accent p-3 text-sm text-accent">{query.message}</p> : null}
      <section className="card overflow-hidden">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="grid gap-4 border-b border-line p-4 md:grid-cols-[80px_1fr_auto] md:items-center">
            <img src={transaction.item?.image_url ?? ""} alt="" className="h-20 w-20 rounded-lg object-cover" />
            <div>
              <p className="font-black">{transaction.item?.title ?? transaction.item_id}</p>
              <p className="text-sm text-muted">Seller: {transaction.seller?.display_name ?? transaction.seller_id}</p>
              <p className="text-sm text-muted">{new Date(transaction.created_at).toLocaleString()}</p>
            </div>
            <strong>{yen.format(transaction.price)}</strong>
          </div>
        ))}
        {!transactions.length ? <p className="p-6 text-muted">No purchases yet.</p> : null}
      </section>
    </main>
  );
}

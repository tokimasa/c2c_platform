import { MetricCard } from "@/components/MetricCard";
import { getCurrentProfile, getPlatformDashboard } from "@/lib/data";

const yen = new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY", maximumFractionDigits: 0 });

export default async function PlatformPage() {
  const [profile, dashboard] = await Promise.all([getCurrentProfile(), getPlatformDashboard()]);
  const canView = !profile || profile.is_platform_admin || profile.id === "demo-seller-yuna";

  return (
    <main className="shell py-6">
      <section className="mb-5">
        <p className="text-xs font-black uppercase text-accent">Platform operations</p>
        <h1 className="text-3xl font-black">Transaction dashboard</h1>
        <p className="mt-2 text-muted">Admin access is enforced by Supabase RLS in live mode.</p>
      </section>
      {!canView ? (
        <p className="card p-6 text-muted">You need platform admin access to view this dashboard.</p>
      ) : (
        <div className="grid gap-5">
          <section className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            <MetricCard label="Active items" value={dashboard.stats.activeItems} />
            <MetricCard label="Sold items" value={dashboard.stats.soldItems} />
            <MetricCard label="Transactions" value={dashboard.stats.transactionCount} />
            <MetricCard label="Gross sales" value={yen.format(dashboard.stats.grossSales)} />
            <MetricCard label="Buyers" value={dashboard.stats.buyerCount} />
            <MetricCard label="Sellers" value={dashboard.stats.sellerCount} />
          </section>
          <section className="card overflow-hidden">
            <div className="border-b border-line p-4">
              <h2 className="text-xl font-black">Recent transactions</h2>
            </div>
            {dashboard.transactions.map((transaction) => (
              <div key={transaction.id} className="grid gap-4 border-b border-line p-4 md:grid-cols-[1fr_180px_180px_120px]">
                <div>
                  <p className="font-black">{transaction.item?.title ?? transaction.item_id}</p>
                  <p className="text-sm text-muted">{new Date(transaction.created_at).toLocaleString()}</p>
                </div>
                <p className="text-sm text-muted">Buyer: {transaction.buyer?.display_name ?? transaction.buyer_id}</p>
                <p className="text-sm text-muted">Seller: {transaction.seller?.display_name ?? transaction.seller_id}</p>
                <strong>{yen.format(transaction.price)}</strong>
              </div>
            ))}
          </section>
        </div>
      )}
    </main>
  );
}

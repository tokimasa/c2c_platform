import Link from "next/link";
import { notFound } from "next/navigation";
import { PurchaseButton } from "@/components/PurchaseButton";
import { getItem } from "@/lib/data";

const yen = new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
  maximumFractionDigits: 0
});

export default async function ItemPage({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ message?: string }>;
}) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const item = await getItem(id);
  if (!item) notFound();

  return (
    <main className="shell py-6">
      <Link href="/" className="mb-4 inline-flex text-sm font-bold text-muted no-underline">Back to marketplace</Link>
      {query.message ? <p className="card mb-4 border-accent p-3 text-sm text-accent">{query.message}</p> : null}
      <section className="card grid overflow-hidden lg:grid-cols-[1fr_420px]">
        <img src={item.image_url} alt={item.title} className="h-full min-h-[520px] w-full object-cover" />
        <div className="grid content-start gap-4 p-7">
          <p className="text-xs font-black uppercase text-accent">{item.category}</p>
          <h1 className="text-3xl font-black">{item.title}</h1>
          <p className="text-4xl font-black">{yen.format(item.price)}</p>
          <p className="leading-7 text-muted">{item.description}</p>
          <dl className="grid gap-3 border-y border-line py-4">
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Seller</dt>
              <dd className="font-black">{item.seller?.display_name ?? "Seller"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Brand</dt>
              <dd className="font-black">{item.brand}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Condition</dt>
              <dd className="font-black">{item.condition}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Location</dt>
              <dd className="font-black">{item.city}</dd>
            </div>
          </dl>
          <PurchaseButton item={item} />
          <Link className="btn" href="/chat">Message seller</Link>
        </div>
      </section>
    </main>
  );
}

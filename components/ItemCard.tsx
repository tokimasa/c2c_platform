import Link from "next/link";
import type { Item } from "@/lib/types";

const yen = new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
  maximumFractionDigits: 0
});

export function ItemCard({ item }: { item: Item }) {
  return (
    <article className="card overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lift">
      <Link href={`/items/${item.id}`} className="relative block aspect-square bg-slate-200">
        <img src={item.image_url} alt={item.title} className="h-full w-full object-cover" />
        {item.status === "sold" ? (
          <span className="absolute left-2 top-2 rounded-full bg-ink/90 px-3 py-1 text-xs font-black text-white">Sold</span>
        ) : null}
        <span className="absolute bottom-3 left-0 rounded-r-full bg-ink/90 px-3 py-2 font-black text-white">
          {yen.format(item.price)}
        </span>
      </Link>
      <div className="grid gap-2 p-3">
        <Link href={`/items/${item.id}`} className="min-h-11 text-sm font-extrabold leading-snug text-ink no-underline">
          {item.title}
        </Link>
        <div className="flex justify-between gap-2 text-xs text-muted">
          <span>{item.condition}</span>
          <span>{item.city}</span>
        </div>
        <div className="flex justify-between gap-2 text-xs text-muted">
          <span>{item.brand}</span>
          <span>{item.seller?.display_name ?? "Seller"}</span>
        </div>
      </div>
    </article>
  );
}

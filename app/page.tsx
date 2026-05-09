import { ItemCard } from "@/components/ItemCard";
import { SearchFilters } from "@/components/SearchFilters";
import { getItems } from "@/lib/data";

export default async function MarketplacePage({
  searchParams
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const params = await searchParams;
  const items = await getItems({ query: params.q, category: params.category, status: "active" });

  return (
    <main className="shell py-6">
      <section className="hero-bg mb-5 grid min-h-[320px] gap-8 rounded-lg p-8 text-white lg:grid-cols-[1fr_360px]">
        <div className="self-end">
          <p className="mb-2 text-xs font-black uppercase text-rose-100">Circular marketplace</p>
          <h1 className="max-w-3xl text-5xl font-black leading-none md:text-7xl">Find a second life for the things people still love.</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">Browse buyer-protected listings, message sellers, and list your own item once Supabase auth is configured.</p>
        </div>
        <div className="self-end rounded-lg bg-white/95 p-4 text-ink">
          <div className="flex justify-between border-b border-line py-3">
            <strong className="text-2xl">Live</strong>
            <span className="text-muted">Supabase-ready data layer</span>
          </div>
          <div className="flex justify-between border-b border-line py-3">
            <strong className="text-2xl">¥300</strong>
            <span className="text-muted">deal shelf starts at</span>
          </div>
          <div className="flex justify-between py-3">
            <strong className="text-2xl">{items.length}</strong>
            <span className="text-muted">active listings</span>
          </div>
        </div>
      </section>

      <SearchFilters query={params.q} category={params.category} />

      <section className="mt-5">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase text-accent">Today&apos;s shelf</p>
            <h2 className="text-3xl font-black">Recommended for you</h2>
          </div>
          <p className="text-sm text-muted">{items.length} listings</p>
        </div>
        {items.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p className="card p-8 text-center text-muted">No listings match those filters.</p>
        )}
      </section>
    </main>
  );
}

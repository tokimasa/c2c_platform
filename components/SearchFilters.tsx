import { categories } from "@/lib/demo-data";

export function SearchFilters({ query, category }: { query?: string; category?: string }) {
  return (
    <form className="card grid gap-3 p-4 md:grid-cols-[1fr_220px_auto]">
      <label className="field">
        Search
        <input name="q" defaultValue={query ?? ""} placeholder="Search fashion, games, books, brands" />
      </label>
      <label className="field">
        Category
        <select name="category" defaultValue={category ?? "all"}>
          <option value="all">All categories</option>
          {categories.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </label>
      <div className="flex items-end">
        <button className="btn btn-primary w-full" type="submit">Search</button>
      </div>
    </form>
  );
}

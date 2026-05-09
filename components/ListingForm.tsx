import { createListing } from "@/app/actions";
import { categories } from "@/lib/demo-data";

export function ListingForm() {
  return (
    <form action={createListing} className="card grid gap-4 p-5">
      <h2 className="text-xl font-black">List an item</h2>
      <label className="field">
        Title
        <input name="title" required placeholder="Vintage denim jacket" />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="field">
          Category
          <select name="category" required>
            {categories.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </label>
        <label className="field">
          Brand
          <input name="brand" required placeholder="Nintendo, Muji, Nike" />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <label className="field">
          Price
          <input name="price" type="number" min="300" step="100" required placeholder="3200" />
        </label>
        <label className="field">
          Condition
          <select name="condition">
            <option>Like new</option>
            <option>Good</option>
            <option>Used</option>
          </select>
        </label>
        <label className="field">
          City
          <input name="city" required placeholder="Tokyo" />
        </label>
      </div>
      <label className="field">
        Image URL
        <input name="imageUrl" type="url" required placeholder="https://images.unsplash.com/..." />
      </label>
      <label className="field">
        Description
        <textarea name="description" required placeholder="Condition, shipping notes, and what is included." />
      </label>
      <button className="btn btn-primary" type="submit">Publish listing</button>
    </form>
  );
}

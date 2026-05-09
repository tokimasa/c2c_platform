import { purchaseItem } from "@/app/actions";
import type { Item } from "@/lib/types";

export function PurchaseButton({ item }: { item: Item }) {
  if (item.status !== "active") {
    return <button className="btn w-full" disabled>Already sold</button>;
  }

  return (
    <form action={purchaseItem}>
      <input type="hidden" name="itemId" value={item.id} />
      <button className="btn btn-primary w-full" type="submit">Purchase with simulated checkout</button>
    </form>
  );
}

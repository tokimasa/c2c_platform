export type ItemStatus = "active" | "sold" | "removed";
export type TransactionStatus = "completed" | "refunded" | "disputed";

export type Profile = {
  id: string;
  email: string;
  display_name: string;
  is_platform_admin: boolean;
  created_at: string;
};

export type Item = {
  id: string;
  seller_id: string;
  title: string;
  category: string;
  brand: string;
  price: number;
  condition: "Like new" | "Good" | "Used";
  description: string;
  image_url: string;
  city: string;
  status: ItemStatus;
  created_at: string;
  seller?: Pick<Profile, "display_name" | "email">;
};

export type Transaction = {
  id: string;
  item_id: string;
  buyer_id: string;
  seller_id: string;
  price: number;
  status: TransactionStatus;
  created_at: string;
  item?: Pick<Item, "title" | "image_url" | "category">;
  buyer?: Pick<Profile, "display_name" | "email">;
  seller?: Pick<Profile, "display_name" | "email">;
};

export type Conversation = {
  id: string;
  item_id: string | null;
  buyer_id: string | null;
  seller_id: string | null;
  platform_user_id: string | null;
  title: string;
  created_at: string;
  last_message_at: string;
  item?: Pick<Item, "title" | "image_url"> | null;
};

export type Message = {
  id: string;
  conversation_id: string;
  sender_id: string;
  body: string;
  read_at: string | null;
  created_at: string;
  sender?: Pick<Profile, "display_name" | "email">;
};

export type DashboardStats = {
  activeItems: number;
  soldItems: number;
  transactionCount: number;
  grossSales: number;
  buyerCount: number;
  sellerCount: number;
};

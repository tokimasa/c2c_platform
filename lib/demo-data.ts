import type { Conversation, DashboardStats, Item, Message, Profile, Transaction } from "./types";

export const categories = [
  "Games & Toys",
  "Books & Manga",
  "Menswear",
  "Womenswear",
  "Kids",
  "Electronics",
  "Home",
  "Collectibles",
  "Beauty"
];

export const demoProfiles: Profile[] = [
  {
    id: "demo-seller-yuna",
    email: "yuna@example.com",
    display_name: "Yuna",
    is_platform_admin: false,
    created_at: "2026-05-01T09:00:00Z"
  },
  {
    id: "demo-buyer-ken",
    email: "ken@example.com",
    display_name: "Ken",
    is_platform_admin: false,
    created_at: "2026-05-02T09:00:00Z"
  },
  {
    id: "demo-admin",
    email: "admin@example.com",
    display_name: "Platform Ops",
    is_platform_admin: true,
    created_at: "2026-05-03T09:00:00Z"
  }
];

export const demoItems: Item[] = [
  {
    id: "demo-switch",
    seller_id: "demo-seller-yuna",
    title: "Nintendo Switch OLED with gray Joy-Con and travel case",
    category: "Games & Toys",
    brand: "Nintendo",
    price: 31800,
    condition: "Good",
    description: "Lightly used Switch OLED with case, charger, and clean Joy-Con sticks.",
    image_url: "https://images.unsplash.com/photo-1617096200347-cb04ae810b1d?auto=format&fit=crop&w=900&q=80",
    city: "Tokyo",
    status: "active",
    created_at: "2026-05-09T02:00:00Z",
    seller: { display_name: "Yuna", email: "yuna@example.com" }
  },
  {
    id: "demo-bag",
    seller_id: "demo-seller-yuna",
    title: "Minimal black shoulder bag with silver hardware",
    category: "Womenswear",
    brand: "Uniqlo",
    price: 2400,
    condition: "Like new",
    description: "Compact shoulder bag, no visible wear, fits phone and wallet.",
    image_url: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=80",
    city: "Yokohama",
    status: "active",
    created_at: "2026-05-09T01:40:00Z",
    seller: { display_name: "Yuna", email: "yuna@example.com" }
  },
  {
    id: "demo-cards",
    seller_id: "demo-seller-yuna",
    title: "Set of 14 trading cards in protective sleeves",
    category: "Collectibles",
    brand: "Pokemon",
    price: 300,
    condition: "Used",
    description: "Starter bundle for collectors. Cards come sleeved and packed flat.",
    image_url: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?auto=format&fit=crop&w=900&q=80",
    city: "Osaka",
    status: "sold",
    created_at: "2026-05-08T12:00:00Z",
    seller: { display_name: "Yuna", email: "yuna@example.com" }
  },
  {
    id: "demo-shoes",
    seller_id: "demo-seller-yuna",
    title: "Clean white running shoes, lightweight training pair",
    category: "Menswear",
    brand: "Nike",
    price: 6200,
    condition: "Good",
    description: "Training shoes with clean soles and lots of life left.",
    image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    city: "Saitama",
    status: "active",
    created_at: "2026-05-08T08:30:00Z",
    seller: { display_name: "Yuna", email: "yuna@example.com" }
  },
  {
    id: "demo-headphones",
    seller_id: "demo-seller-yuna",
    title: "Sony wireless headphones with charging cable",
    category: "Electronics",
    brand: "Sony",
    price: 7400,
    condition: "Good",
    description: "Wireless headphones with cable. Battery still holds a full commute.",
    image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    city: "Chiba",
    status: "active",
    created_at: "2026-05-07T11:15:00Z",
    seller: { display_name: "Yuna", email: "yuna@example.com" }
  },
  {
    id: "demo-denim",
    seller_id: "demo-seller-yuna",
    title: "Selvedge denim jacket, relaxed fit",
    category: "Menswear",
    brand: "Levi's",
    price: 11800,
    condition: "Good",
    description: "Relaxed fit denim jacket with soft fades and no major damage.",
    image_url: "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&w=900&q=80",
    city: "Nara",
    status: "sold",
    created_at: "2026-05-06T14:15:00Z",
    seller: { display_name: "Yuna", email: "yuna@example.com" }
  }
];

export const demoTransactions: Transaction[] = [
  {
    id: "txn-demo-cards",
    item_id: "demo-cards",
    buyer_id: "demo-buyer-ken",
    seller_id: "demo-seller-yuna",
    price: 300,
    status: "completed",
    created_at: "2026-05-08T14:12:00Z",
    item: { title: "Set of 14 trading cards in protective sleeves", image_url: demoItems[2].image_url, category: "Collectibles" },
    buyer: { display_name: "Ken", email: "ken@example.com" },
    seller: { display_name: "Yuna", email: "yuna@example.com" }
  },
  {
    id: "txn-demo-denim",
    item_id: "demo-denim",
    buyer_id: "demo-buyer-ken",
    seller_id: "demo-seller-yuna",
    price: 11800,
    status: "completed",
    created_at: "2026-05-07T10:44:00Z",
    item: { title: "Selvedge denim jacket, relaxed fit", image_url: demoItems[5].image_url, category: "Menswear" },
    buyer: { display_name: "Ken", email: "ken@example.com" },
    seller: { display_name: "Yuna", email: "yuna@example.com" }
  }
];

export const demoConversations: Conversation[] = [
  {
    id: "conv-demo-switch",
    item_id: "demo-switch",
    buyer_id: "demo-buyer-ken",
    seller_id: "demo-seller-yuna",
    platform_user_id: null,
    title: "Nintendo Switch OLED",
    created_at: "2026-05-09T02:20:00Z",
    last_message_at: "2026-05-09T02:36:00Z",
    item: { title: "Nintendo Switch OLED with gray Joy-Con and travel case", image_url: demoItems[0].image_url }
  },
  {
    id: "conv-demo-support",
    item_id: null,
    buyer_id: "demo-buyer-ken",
    seller_id: null,
    platform_user_id: "demo-admin",
    title: "Platform support",
    created_at: "2026-05-09T01:10:00Z",
    last_message_at: "2026-05-09T01:15:00Z",
    item: null
  }
];

export const demoMessages: Message[] = [
  {
    id: "msg-1",
    conversation_id: "conv-demo-switch",
    sender_id: "demo-buyer-ken",
    body: "Hi, can you ship this week?",
    read_at: null,
    created_at: "2026-05-09T02:31:00Z",
    sender: { display_name: "Ken", email: "ken@example.com" }
  },
  {
    id: "msg-2",
    conversation_id: "conv-demo-switch",
    sender_id: "demo-seller-yuna",
    body: "Yes, I can ship within two days after purchase.",
    read_at: null,
    created_at: "2026-05-09T02:36:00Z",
    sender: { display_name: "Yuna", email: "yuna@example.com" }
  }
];

export const demoStats: DashboardStats = {
  activeItems: demoItems.filter((item) => item.status === "active").length,
  soldItems: demoItems.filter((item) => item.status === "sold").length,
  transactionCount: demoTransactions.length,
  grossSales: demoTransactions.reduce((total, transaction) => total + transaction.price, 0),
  buyerCount: 1,
  sellerCount: 1
};

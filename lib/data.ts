import { unstable_noStore as noStore } from "next/cache";
import { demoConversations, demoItems, demoMessages, demoProfiles, demoStats, demoTransactions } from "./demo-data";
import { createSupabaseServerClient, hasSupabaseEnv } from "./supabase/server";
import type { Conversation, DashboardStats, Item, Message, Profile, Transaction } from "./types";

export async function getCurrentProfile(): Promise<Profile | null> {
  noStore();
  if (!hasSupabaseEnv()) return demoProfiles[0];

  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  return data as Profile | null;
}

export async function getItems(params?: { query?: string; category?: string; status?: "active" | "sold" }): Promise<Item[]> {
  noStore();
  if (!hasSupabaseEnv()) {
    const query = params?.query?.toLowerCase() ?? "";
    return demoItems.filter((item) => {
      const matchesQuery = [item.title, item.category, item.brand, item.description].join(" ").toLowerCase().includes(query);
      const matchesCategory = !params?.category || params.category === "all" || item.category === params.category;
      const matchesStatus = !params?.status || item.status === params.status;
      return matchesQuery && matchesCategory && matchesStatus;
    });
  }

  const supabase = await createSupabaseServerClient();
  let request = supabase
    .from("items")
    .select("*, seller:profiles!items_seller_id_fkey(display_name,email)")
    .order("created_at", { ascending: false });

  if (params?.status) request = request.eq("status", params.status);
  if (params?.category && params.category !== "all") request = request.eq("category", params.category);
  if (params?.query) request = request.or(`title.ilike.%${params.query}%,brand.ilike.%${params.query}%,description.ilike.%${params.query}%`);

  const { data, error } = await request;
  if (error) throw new Error(error.message);
  return (data ?? []) as Item[];
}

export async function getItem(id: string): Promise<Item | null> {
  noStore();
  if (!hasSupabaseEnv()) return demoItems.find((item) => item.id === id) ?? null;

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("items")
    .select("*, seller:profiles!items_seller_id_fkey(display_name,email)")
    .eq("id", id)
    .single();
  if (error) return null;
  return data as Item;
}

export async function getSellerItems(profileId: string): Promise<Item[]> {
  noStore();
  if (!hasSupabaseEnv()) return demoItems.filter((item) => item.seller_id === "demo-seller-yuna");

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("items").select("*").eq("seller_id", profileId).order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Item[];
}

export async function getBuyerTransactions(profileId: string): Promise<Transaction[]> {
  noStore();
  if (!hasSupabaseEnv()) return demoTransactions;

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("transactions")
    .select("*, item:items(title,image_url,category), seller:profiles!transactions_seller_id_fkey(display_name,email)")
    .eq("buyer_id", profileId)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Transaction[];
}

export async function getPlatformDashboard(): Promise<{ stats: DashboardStats; transactions: Transaction[] }> {
  noStore();
  if (!hasSupabaseEnv()) return { stats: demoStats, transactions: demoTransactions };

  const supabase = await createSupabaseServerClient();
  const [{ count: activeItems }, { count: soldItems }, { data: transactions, error }] = await Promise.all([
    supabase.from("items").select("id", { count: "exact", head: true }).eq("status", "active"),
    supabase.from("items").select("id", { count: "exact", head: true }).eq("status", "sold"),
    supabase
      .from("transactions")
      .select("*, item:items(title,image_url,category), buyer:profiles!transactions_buyer_id_fkey(display_name,email), seller:profiles!transactions_seller_id_fkey(display_name,email)")
      .order("created_at", { ascending: false })
  ]);
  if (error) throw new Error(error.message);

  const rows = (transactions ?? []) as Transaction[];
  return {
    stats: {
      activeItems: activeItems ?? 0,
      soldItems: soldItems ?? 0,
      transactionCount: rows.length,
      grossSales: rows.reduce((total, transaction) => total + transaction.price, 0),
      buyerCount: new Set(rows.map((transaction) => transaction.buyer_id)).size,
      sellerCount: new Set(rows.map((transaction) => transaction.seller_id)).size
    },
    transactions: rows
  };
}

export async function getConversations(profileId: string): Promise<Conversation[]> {
  noStore();
  if (!hasSupabaseEnv()) return demoConversations;

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("conversations")
    .select("*, item:items(title,image_url)")
    .or(`buyer_id.eq.${profileId},seller_id.eq.${profileId},platform_user_id.eq.${profileId}`)
    .order("last_message_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Conversation[];
}

export async function getMessages(conversationId: string): Promise<Message[]> {
  noStore();
  if (!hasSupabaseEnv()) return demoMessages.filter((message) => message.conversation_id === conversationId);

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("messages")
    .select("*, sender:profiles!messages_sender_id_fkey(display_name,email)")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as Message[];
}

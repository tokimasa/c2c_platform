"use client";

import { useEffect, useMemo, useState } from "react";
import { sendMessage } from "@/app/actions";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { Message } from "@/lib/types";

export function ChatBox({
  conversationId,
  initialMessages,
  currentUserId
}: {
  conversationId: string;
  initialMessages: Message[];
  currentUserId: string;
}) {
  const [messages, setMessages] = useState(initialMessages);
  const canRealtime = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  const supabase = useMemo(() => {
    if (!canRealtime) return null;
    return createSupabaseBrowserClient();
  }, [canRealtime]);

  useEffect(() => {
    if (!supabase) return;
    const channel = supabase
      .channel(`conversation:${conversationId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `conversation_id=eq.${conversationId}` },
        (payload) => {
          setMessages((current) => [...current, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, supabase]);

  return (
    <section className="card grid min-h-[560px] grid-rows-[auto_1fr_auto] overflow-hidden">
      <div className="border-b border-line p-4">
        <h2 className="text-lg font-black">Conversation</h2>
        <p className="text-sm text-muted">{canRealtime ? "Realtime updates enabled" : "Demo messages shown until Supabase is configured"}</p>
      </div>
      <div className="grid content-start gap-3 overflow-y-auto p-4">
        {messages.map((message) => {
          const mine = message.sender_id === currentUserId;
          return (
            <div key={message.id} className={`max-w-[78%] rounded-lg px-3 py-2 ${mine ? "ml-auto bg-accent text-white" : "bg-soft text-ink"}`}>
              <p className="text-sm">{message.body}</p>
              <p className={`mt-1 text-xs ${mine ? "text-white/75" : "text-muted"}`}>{message.sender?.display_name ?? "User"}</p>
            </div>
          );
        })}
      </div>
      <form action={sendMessage} className="flex gap-2 border-t border-line p-3">
        <input type="hidden" name="conversationId" value={conversationId} />
        <input className="min-h-11 flex-1 rounded-lg border border-line px-3" name="body" placeholder="Type a message" />
        <button className="btn btn-primary" type="submit">Send</button>
      </form>
    </section>
  );
}

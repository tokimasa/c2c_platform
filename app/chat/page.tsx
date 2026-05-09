import { ChatBox } from "@/components/ChatBox";
import { getConversations, getCurrentProfile, getMessages } from "@/lib/data";

export default async function ChatPage() {
  const profile = await getCurrentProfile();
  const currentUserId = profile?.id ?? "demo-buyer-ken";
  const conversations = await getConversations(currentUserId);
  const activeConversation = conversations[0];
  const messages = activeConversation ? await getMessages(activeConversation.id) : [];

  return (
    <main className="shell grid gap-5 py-6 lg:grid-cols-[320px_1fr]">
      <aside className="card overflow-hidden">
        <div className="border-b border-line p-4">
          <p className="text-xs font-black uppercase text-accent">Chat</p>
          <h1 className="text-2xl font-black">Inbox</h1>
        </div>
        {conversations.map((conversation) => (
          <div key={conversation.id} className="border-b border-line p-4">
            <p className="font-black">{conversation.title}</p>
            <p className="text-sm text-muted">{conversation.item?.title ?? "Platform conversation"}</p>
          </div>
        ))}
        {!conversations.length ? <p className="p-4 text-muted">No conversations yet.</p> : null}
      </aside>
      {activeConversation ? (
        <ChatBox conversationId={activeConversation.id} initialMessages={messages} currentUserId={currentUserId} />
      ) : (
        <section className="card grid min-h-[420px] place-items-center p-8 text-muted">Start a purchase or support conversation to chat.</section>
      )}
    </main>
  );
}

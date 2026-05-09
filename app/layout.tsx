import type { Metadata } from "next";
import Link from "next/link";
import { signOut } from "./actions";
import { getCurrentProfile } from "@/lib/data";
import "./globals.css";

export const metadata: Metadata = {
  title: "LoopMarket | C2C Marketplace",
  description: "A dynamic C2C marketplace side project built with Next.js and Supabase."
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const profile = await getCurrentProfile();

  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-20 border-b border-line bg-white/95 backdrop-blur">
          <div className="shell flex min-h-16 flex-wrap items-center gap-3 py-3">
            <Link href="/" className="flex items-center gap-2 text-lg font-black text-ink no-underline">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-white">L</span>
              LoopMarket
            </Link>
            <nav className="ml-auto flex flex-wrap items-center gap-2 text-sm">
              <Link className="btn" href="/seller">Seller</Link>
              <Link className="btn" href="/buyer">Buyer</Link>
              <Link className="btn" href="/platform">Platform</Link>
              <Link className="btn" href="/chat">Chat</Link>
              {profile ? (
                <form action={signOut}>
                  <button className="btn" type="submit">Sign out</button>
                </form>
              ) : (
                <Link className="btn btn-primary" href="/auth">Sign in</Link>
              )}
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}

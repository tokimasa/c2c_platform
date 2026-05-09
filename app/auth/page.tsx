import { signIn, signUp } from "../actions";

export default async function AuthPage({
  searchParams
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const { message } = await searchParams;

  return (
    <main className="shell grid gap-5 py-8 lg:grid-cols-2">
      <section className="card grid gap-4 p-6">
        <h1 className="text-3xl font-black">Sign in</h1>
        <p className="text-muted">Email/password auth is handled by Supabase once environment variables are configured.</p>
        {message ? <p className="rounded-lg bg-rose-50 p-3 text-sm font-bold text-accent">{message}</p> : null}
        <form action={signIn} className="grid gap-4">
          <label className="field">
            Email
            <input name="email" type="email" required placeholder="you@example.com" />
          </label>
          <label className="field">
            Password
            <input name="password" type="password" required minLength={6} />
          </label>
          <button className="btn btn-primary" type="submit">Sign in</button>
        </form>
      </section>
      <section className="card grid gap-4 p-6">
        <h2 className="text-3xl font-black">Create account</h2>
        <form action={signUp} className="grid gap-4">
          <label className="field">
            Display name
            <input name="displayName" required placeholder="Yuna" />
          </label>
          <label className="field">
            Email
            <input name="email" type="email" required placeholder="you@example.com" />
          </label>
          <label className="field">
            Password
            <input name="password" type="password" required minLength={6} />
          </label>
          <button className="btn btn-primary" type="submit">Create account</button>
        </form>
      </section>
    </main>
  );
}

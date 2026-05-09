# LoopMarket C2C Platform

LoopMarket is a dynamic C2C marketplace side project built with Next.js App Router, TypeScript, Supabase, and Vercel.

## Features

- Marketplace browse/search/filter UI
- Email/password authentication through Supabase
- Seller board for active and sold listings
- Buyer purchase history with simulated checkout
- Platform transaction dashboard
- Realtime chat with Supabase Realtime
- Demo fallback data when Supabase environment variables are not configured

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy environment variables:

   ```bash
   cp .env.example .env.local
   ```

3. Create a Supabase project and fill:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE_KEY=
   PLATFORM_ADMIN_EMAIL=
   ```

4. Run `supabase/schema.sql` in the Supabase SQL editor.

5. Start the app:

   ```bash
   npm run dev
   ```

## Deployment

Deploy to Vercel and add the same Supabase environment variables in Vercel project settings.

## Notes

- V1 uses simulated checkout. No real payments or escrow are implemented.
- The old static prototype files remain in the repository as reference artifacts.

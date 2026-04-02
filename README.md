# Coin Global

Coin Global is a crypto market dashboard and trading-oriented web app built with Next.js. It combines live cryptocurrency market data, authentication, protected user areas, charting, profile personalization, and dashboard-style portfolio screens in a modern responsive interface.

This README is written for both technical and non-technical readers, so anyone landing on the repository can quickly understand what the product does, how the app is structured, and what parts are already implemented.

## Overview

Coin Global helps users:

- browse live cryptocurrency market data
- search for coins quickly from anywhere in the app
- explore trending coins and market categories
- open detailed coin pages with charts, pricing, market stats, and exchange listings
- sign up and sign in with email/password or Google
- access protected dashboard screens after authentication
- update their username, avatar, and theme preference

The product sits at the intersection of three ideas:

- a live crypto market discovery experience
- an authenticated dashboard application
- a foundation for more advanced trading, portfolio, wallet, and alerting features

## Core Features

### 1. Authentication and account access

Users can create accounts and sign in using:

- email and password
- Google OAuth

The app uses server-side session checks to protect authenticated routes and dashboard areas. User records also support:

- usernames
- avatar images
- theme preference
- account roles

Relevant files:

- `app/(auth)/signin/SignInForm.tsx`
- `app/(auth)/signup/SignUpForm.tsx`
- `lib/auth.ts`
- `lib/session.ts`
- `app/api/auth/[...all]/route.ts`

### 2. Live crypto market browsing

Coin Global includes a live market discovery experience powered by CoinGecko data. Users can:

- view a featured market overview section
- browse trending coins
- browse category performance
- open a paginated all-coins directory
- search for a specific coin from the global search modal

Relevant files:

- `app/(public)/markets/page.tsx`
- `components/markets/CoinOverview.tsx`
- `components/markets/TrendingCoins.tsx`
- `components/markets/Categories.tsx`
- `components/layout/SearchModal.tsx`
- `app/(public)/trending-coins/page.tsx`
- `app/(public)/categories/page.tsx`
- `app/(protected)/coins/page.tsx`

### 3. Detailed coin pages

Each coin page provides a deeper look into a cryptocurrency, including:

- current price and change metrics
- candlestick chart with multiple time ranges
- market cap, volume, and rank
- project links such as website, whitepaper, and community
- exchange listings
- currency conversion support

Relevant files:

- `app/(protected)/coins/[id]/page.tsx`
- `components/all/CandlestickChart.tsx`
- `components/coin/CurrencyConverter.tsx`
- `components/coin/ExchangeListings.tsx`
- `components/coin/CoinDetailCard.tsx`

### 4. Dashboard and authenticated workspace

After signing in, users can access an application-style dashboard with dedicated sections for:

- dashboard overview
- portfolio
- asset allocation
- watchlist
- notifications
- settings
- swap

Relevant files:

- `app/(dashboard)/dashboard/DashboardClient.tsx`
- `app/(dashboard)/portfolio/PortfolioClient.tsx`
- `app/(dashboard)/allocation/AllocationClient.tsx`
- `app/(dashboard)/watchlist/WatchlistClient.tsx`
- `app/(dashboard)/notifications/NotificationsClient.tsx`
- `app/(dashboard)/settings/SettingsClient.tsx`
- `app/(dashboard)/swap/SwapClient.tsx`
- `components/dashboard/DashboardSidebar.tsx`

### 5. Profile and personalization

Users can personalize their account by:

- changing their username
- uploading a profile avatar
- switching between light and dark themes

Avatar uploads are handled through a signed upload flow backed by Cloudflare R2.

Relevant files:

- `app/(dashboard)/settings/SettingsClient.tsx`
- `components/settings/ProfileSettingsModal.tsx`
- `lib/actions/profile-actions.ts`
- `lib/actions/username-actions.ts`
- `lib/actions/theme-actions.ts`
- `app/api/uploads/presign/route.ts`

## How The App Works

### Market data layer

Coin Global uses the CoinGecko API for:

- coin markets
- search
- trending coins
- categories
- OHLC chart data
- coin detail data
- ticker and exchange listing data

The API access is centralized so request handling, caching, and revalidation can be tuned in one place.

Relevant files:

- `lib/coingecko.actions.ts`
- `lib/api/coins.ts`
- `lib/api/coin.ts`
- `lib/api/trendingCoins.ts`
- `lib/api/categories.ts`
- `lib/api/candlestick-chart.ts`

### Authentication and session protection

Authentication is powered by Better Auth with Prisma and PostgreSQL.

The app protects user-only routes with server-side session checks:

- `app/(protected)/layout.tsx` protects authenticated market pages
- `app/(dashboard)/layout.tsx` protects the dashboard shell

### Image uploads

Profile avatars are uploaded with a presigned URL flow:

1. the client requests a signed upload URL from `/api/uploads/presign`
2. the browser uploads the image directly to Cloudflare R2
3. the resulting public image URL is saved to the user profile

This avoids routing the full image file through the application server.

### Rendering approach

The project uses a mix of:

- server components for protected route handling and data loading
- client components for interactivity, charts, forms, and dashboard UI
- Suspense fallbacks in some market sections for smoother perceived loading

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Better Auth
- Prisma
- PostgreSQL
- CoinGecko API
- Cloudflare R2
- SWR
- Lightweight Charts
- Recharts
- Framer Motion
- Resend

## Project Structure

```text
app/
  (public)/        public-facing pages like onboarding, markets, and categories
  (auth)/          sign in and sign up flows
  (protected)/     authenticated market pages such as coins and coin details
  (dashboard)/     dashboard experience for signed-in users
  api/             route handlers for auth and uploads

components/
  layout/          header and global search
  markets/         market overview sections
  coin/            coin detail widgets
  dashboard/       dashboard shell and settings UI
  settings/        profile editing flows
  all/             shared reusable components
  ui/              design system primitives

lib/
  api/             CoinGecko wrapper functions
  actions/         server actions for profile, theme, and auth updates
  auth.ts          Better Auth configuration
  session.ts       session helpers and guards
  coingecko.actions.ts
  prisma.ts

prisma/
  schema.prisma    database schema
```

## Environment Variables

Create a `.env` file based on `.env.example`.

The project expects configuration for:

- CoinGecko
- Better Auth
- PostgreSQL
- Google OAuth
- Resend
- Cloudflare R2

Important variables include:

- `COINGECKO_BASE_URL`
- `COINGECKO_API_KEY`
- `BETTER_AUTH_URL`
- `BETTER_AUTH_SECRET`
- `DATABASE_URL`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `RESEND_API_KEY`
- `CLOUDFLARE_R2_ACCOUNT_ID`
- `CLOUDFLARE_R2_ACCESS_KEY_ID`
- `CLOUDFLARE_R2_SECRET_ACCESS_KEY`
- `CLOUDFLARE_R2_BUCKET_NAME`
- `CLOUDFLARE_R2_PUBLIC_BASE_URL`

## Local Development

Install dependencies:

```bash
npm install
```

Set up your environment variables in `.env`.

Push the Prisma schema to your database:

```bash
npm run db:push
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Available Scripts

- `npm run dev` - generates route helpers and starts the dev server
- `npm run build` - generates route helpers, runs Prisma generate, and builds the app
- `npm run start` - starts the production server
- `npm run lint` - runs ESLint
- `npm run format` - formats the codebase
- `npm run db:push` - pushes the Prisma schema to the database

## Current Status

### Strongly implemented today

- authentication with email/password and Google
- protected routing and session-aware layouts
- live coin market browsing
- trending coins and category pages
- global coin search
- detailed coin pages with charts and stats
- avatar upload flow
- username and theme updates

### Present but still more UI-first or scaffolded

- dashboard analytics values
- portfolio metrics and recent activity
- watchlist persistence and management
- swap execution
- notification actions
- parts of the settings area
- deeper trading and wallet operations

That means the repository already works well as a crypto market exploration and authenticated dashboard foundation, while still leaving room for future product depth.

## Notes For GitHub Visitors

If you are reviewing this repository:

- the strongest live-data part of the app is the market discovery and coin-detail experience
- the dashboard side already has a polished application shell and account flow
- some dashboard modules currently use demo values as product scaffolding

This makes Coin Global more than a static UI mockup, while also being honest about which areas are still evolving.

## Future Direction

This codebase is well-positioned for future additions such as:

- persistent watchlists
- live portfolio synchronization
- alerting and notification preferences
- trading execution flows
- wallet funding and withdrawal workflows
- deeper analytics and AI-assisted insights

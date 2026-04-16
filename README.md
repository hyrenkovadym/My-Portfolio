# My Portfolio Platform

Full-stack portfolio platform with a production-style backend and a polished frontend.

## Live site

- https://my-portfolio-vh.netlify.app/

## Stack

Backend (`apps/api`)
- NestJS
- Prisma
- PostgreSQL
- JWT Auth

Frontend (`apps/web`)
- Next.js (App Router)
- React
- TypeScript

## What is ready now

- API modules: auth, categories, products, cart, orders
- Portfolio frontend with strong visual style
- Live data on UI from backend endpoints (`/products`, `/categories`)
- Category filters and project detail page
- Responsive layout for desktop and mobile

## Run locally

1. Start infrastructure

```bash
docker compose -f infra/docker-compose.yml up -d
```

2. Install dependencies

```bash
pnpm install
```

3. Run backend and frontend together

```bash
pnpm dev
```

Backend: `http://localhost:3001`
Frontend: `http://localhost:3000`

## Useful commands

```bash
pnpm dev:api
pnpm dev:web
pnpm build
pnpm lint
pnpm --filter web test:e2e
```

For first E2E run on a new machine:

```bash
pnpm --filter web exec playwright install chromium
```

## Frontend config

Create `apps/web/.env` from `apps/web/.env.example`:

```bash
API_URL=http://localhost:3001
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Personalization

Update your personal info and texts in:

- `apps/web/lib/content.ts`


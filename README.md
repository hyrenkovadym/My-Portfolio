# Full-Stack Portfolio Platform

A production-style monorepo portfolio platform that demonstrates how to build and ship a modern full-stack application with **Next.js**, **NestJS**, **PostgreSQL**, **Prisma**, **JWT auth**, **Docker**, and automated quality checks.

## Project Purpose

This project is designed as an employer-facing technical showcase.

Business purpose:
- Present portfolio projects through a clean frontend and structured backend API.
- Support future productization (admin panel, orders, content management, analytics).

Technical purpose:
- Demonstrate practical full-stack architecture in a monorepo.
- Show real backend domain modules (auth, products, categories, cart, orders).
- Show database-first workflows with Prisma migrations and seed data.
- Show basic CI and testing foundations.

## Main Features

- Portfolio homepage with curated project cards and scope filtering.
- Project detail pages with API-first lookup and static fallback.
- NestJS REST API modules: `auth`, `categories`, `products`, `admin/products`, `cart`, `orders`.
- JWT authentication with role support (`USER` / `ADMIN`).
- Prisma ORM with PostgreSQL schema and migrations.
- Swagger/OpenAPI docs in development.
- Seed script with realistic demo categories, projects, and users.
- Docker Compose for local PostgreSQL and Redis.
- Unit and E2E test basics.
- GitHub Actions CI pipeline.

## Tech Stack

Frontend:
- Next.js 15 (App Router)
- React 19
- TypeScript
- Playwright (E2E)

Backend:
- NestJS 11
- Prisma ORM
- PostgreSQL
- JWT + Passport
- Jest (unit tests)

DevOps / Tooling:
- pnpm workspaces
- Docker Compose
- GitHub Actions

## Architecture Overview

- Monorepo with separate `apps/web` and `apps/api` applications.
- Frontend consumes backend REST endpoints and renders portfolio UI.
- Backend exposes modular domain APIs and persists data with Prisma.
- PostgreSQL is the system of record.
- Docker Compose provides local infra services.

## Frontend Overview (`apps/web`)

- Built with Next.js App Router.
- Portfolio landing page with sections for profile, knowledge, projects, and contact.
- Scope filter for project cards via URL query params.
- Dynamic project route at `projects/[slug]`.
- API client helpers in `lib/api.ts` with safe fallback behavior.
- Playwright E2E coverage for homepage, filters, and project details.

## Backend Overview (`apps/api`)

- Modular NestJS application with domain-focused structure (`auth`, `products`, `categories`, `cart`, `orders`, `prisma`).
- JWT authentication and role-based access guard for admin routes.
- Swagger docs enabled in non-production mode at `http://localhost:3001/api/docs`.
- Health endpoint: `GET /health`.

## Database Overview

- PostgreSQL + Prisma schema.
- Core models: `User`, `RefreshToken`, `Category`, `Product`, `Cart`, `CartItem`, `Order`, `OrderItem`.
- Prisma migrations are stored under `apps/api/prisma/migrations`.

## Authentication Overview

- Access token: JWT (short-lived).
- Refresh token: random token stored hashed in DB.
- Auth endpoints:
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`
- `GET /auth/me` (requires bearer token)

## Project Structure

```text
My-Portfolio/
  apps/
    api/
      prisma/
        migrations/
        schema.prisma
        seed.js
      src/
        auth/
        cart/
        categories/
        orders/
        products/
        prisma/
        main.ts
      test/
    web/
      app/
      lib/
      tests/e2e/
  infra/
    docker-compose.yml
  docs/
    ARCHITECTURE.md
    ROADMAP.md
  .github/
    workflows/ci.yml
```

## Environment Variables

Workspace-level (optional):
- `.env.example`

API (`apps/api/.env`):
- `NODE_ENV=development`
- `PORT=3001`
- `DATABASE_URL=postgresql://<db_user>:<db_password>@localhost:5432/<db_name>?schema=public`
- `JWT_ACCESS_SECRET=<replace-with-a-strong-random-secret>`

Web (`apps/web/.env`):
- `API_URL=http://localhost:3001`
- `NEXT_PUBLIC_API_URL=http://localhost:3001`

## Local Setup

1. Install dependencies:

```bash
pnpm install
```

2. Create env files from examples:

```powershell
Copy-Item .env.example .env
Copy-Item apps/api/.env.example apps/api/.env
Copy-Item apps/web/.env.example apps/web/.env
```

3. Start local infrastructure:

```bash
docker compose -f infra/docker-compose.yml up -d
```

4. Run Prisma migrations and seed:

```bash
pnpm prisma:migrate
pnpm prisma:seed
```

5. Start both apps:

```bash
pnpm dev
```

Application URLs:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:3001`
- Swagger docs (dev only): `http://localhost:3001/api/docs`

## Docker Setup

Start PostgreSQL + Redis:

```bash
docker compose -f infra/docker-compose.yml up -d
```

Stop services:

```bash
docker compose -f infra/docker-compose.yml down
```

Reset services and volumes (database reset):

```bash
docker compose -f infra/docker-compose.yml down -v
```

After reset, run migrations and seed again:

```bash
pnpm prisma:migrate
pnpm prisma:seed
```

## Prisma Setup

Generate Prisma client:

```bash
pnpm prisma:generate
```

Run migrations:

```bash
pnpm prisma:migrate
```

Run seed:

```bash
pnpm prisma:seed
```

Open Prisma Studio:

```bash
pnpm prisma:studio
```

## Running Frontend

```bash
pnpm dev:web
```

## Running Backend

```bash
pnpm dev:api
```

## Running Tests

Backend unit tests:

```bash
pnpm test
```

Frontend E2E tests:

```bash
pnpm test:e2e
```

Install Playwright browser binaries (first run):

```bash
pnpm --filter web exec playwright install chromium
```

## CI/CD Basics

GitHub Actions workflow: `.github/workflows/ci.yml`

Pipeline includes:
- dependency install with pnpm
- lint
- build
- backend unit tests
- frontend Playwright E2E tests

The CI pipeline does not require real secrets.

## Deployment Notes

- Frontend can be deployed to Vercel or Netlify.
- Backend can be deployed to Render, Fly.io, Railway, or a VPS/container platform.
- PostgreSQL can be hosted via managed DB provider.
- Set production env vars in deployment platform secret manager.
- Swagger is enabled only outside production (`NODE_ENV !== production`).

## Screenshots / Demo

Replace placeholders below with real screenshots or GIFs.

- `docs/screenshots/homepage.png` (Homepage)
- `docs/screenshots/project-detail.png` (Project detail)
- `docs/screenshots/swagger.png` (Swagger docs)
- `docs/screenshots/prisma-studio.png` (Prisma Studio)

Demo links:
- Frontend demo: `<add-live-url>`
- API base URL: `<add-api-url>`

## Future Improvements

- Admin dashboard for content/product management.
- Stronger DTO validation across all endpoints.
- Role-based permissions expansion.
- File upload support for project assets.
- Better observability (structured logs, metrics, alerts).
- Broader test coverage (integration tests with test DB).

## Portfolio Summary: What this project demonstrates

- Next.js frontend architecture and UX implementation.
- NestJS backend module design and REST API patterns.
- PostgreSQL schema design with Prisma ORM.
- JWT-based authentication and authorization basics.
- Docker-based local development workflow.
- Testing fundamentals (Jest + Playwright).
- CI fundamentals with GitHub Actions.
- Production-minded documentation and project organization.

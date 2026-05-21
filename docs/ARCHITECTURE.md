# Architecture

## Monorepo Structure

This repository uses a pnpm workspace monorepo layout.

- `apps/web`: Next.js frontend application.
- `apps/api`: NestJS backend API.
- `infra`: Docker Compose infrastructure for local development.
- `docs`: project documentation.

## Frontend Responsibilities

The frontend (`apps/web`) is responsible for:
- Rendering the public portfolio website.
- Presenting profile, knowledge, and project sections.
- Providing project detail pages (`/projects/[slug]`).
- Applying scope-based filtering for project cards.
- Fetching API data through `lib/api.ts` when available.

The frontend is intentionally lightweight and content-driven, making it easy to evolve into a CMS-backed UI later.

## Backend Responsibilities

The backend (`apps/api`) is responsible for:
- Authentication (`auth`) with JWT + refresh token flow.
- Domain resources (`categories`, `products`).
- Commerce-like modules (`cart`, `orders`) to demonstrate realistic backend structure.
- Admin-protected product endpoints (`admin/products`).
- API documentation through Swagger (`/api/docs` in non-production mode).

## Database Layer

The project uses PostgreSQL with Prisma ORM.

Core data domains:
- Identity: `User`, `RefreshToken`.
- Catalog: `Category`, `Product`.
- Cart: `Cart`, `CartItem`.
- Orders: `Order`, `OrderItem`.

Prisma client is generated from `apps/api/prisma/schema.prisma`.
Migrations are stored in `apps/api/prisma/migrations`.

## Authentication Flow

1. User registers with email/password.
2. User logs in and receives:
- short-lived JWT access token
- refresh token
3. Refresh tokens are stored as hashes in PostgreSQL.
4. Protected routes use `JwtAuthGuard`.
5. Admin routes require both JWT auth and role guard.

## API Communication Flow

- Frontend reads API base URL from `API_URL` / `NEXT_PUBLIC_API_URL`.
- Frontend requests product/category resources from backend endpoints.
- Project detail pages first attempt API lookup by slug.
- If a slug is not present in API data, the UI falls back to static portfolio content.

## Local Development Flow

1. Start infrastructure from `infra/docker-compose.yml`.
2. Install dependencies with `pnpm install`.
3. Configure env files from `.env.example` templates.
4. Run Prisma migrations and seed.
5. Start API and web with `pnpm dev`.
6. Access Swagger docs at `http://localhost:3001/api/docs`.

## Current Limitations

- Validation is still mostly manual (`any` request bodies in several controllers).
- No dedicated admin UI yet.
- Backend integration tests against a real test DB are not yet implemented.
- Observability (metrics, tracing, structured logs) is minimal.
- Redis is available in Docker but not yet integrated into business logic.

# Roadmap

This roadmap focuses on practical, employer-relevant next steps.

## Phase 1: Platform Maturity

- Build admin dashboard for managing categories/projects.
- Replace loose request bodies with DTO + validation pipes.
- Add pagination and sorting for project/product endpoints.
- Introduce consistent API response envelopes for public/admin endpoints.

## Phase 2: Security and Access Control

- Add stronger role-based access control (RBAC) with granular permissions.
- Add refresh token rotation and revocation strategy improvements.
- Add rate limiting for auth-sensitive endpoints.
- Add security headers and request hardening.

## Phase 3: Media and Content

- Add file upload flow for project thumbnails/assets.
- Store media metadata and support cloud object storage.
- Add richer project model fields for case studies.

## Phase 4: Testing and Quality

- Increase backend unit/integration coverage for auth/cart/orders paths.
- Add dedicated DB-backed integration test suite.
- Expand Playwright scenarios for auth, cart, and order flows.
- Add coverage reporting and quality gates in CI.

## Phase 5: Deployment and Operations

- Add environment-specific deployment pipeline (staging + production).
- Add migration/deployment checks in CI/CD.
- Add containerized production setup.
- Add rollback strategy documentation.

## Phase 6: Monitoring and Reliability

- Add structured logging and request correlation IDs.
- Add health/readiness checks for infrastructure dependencies.
- Add metrics dashboards and alerting.
- Add error tracking integration.

## Phase 7: UI/UX Improvements

- Improve visual case-study storytelling per project.
- Add localization support and accessibility audit.
- Add better empty/loading/error states for API-bound views.
- Add theme customization and portfolio analytics insights.

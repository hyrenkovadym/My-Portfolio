# Security Policy

## Secret Management

- Store secrets only in environment variables.
- Never commit `.env` files to Git.
- Use `.env.example` files for placeholders only.
- Rotate credentials immediately if a leak is suspected.

## JWT and Auth Security

- Use a strong `JWT_ACCESS_SECRET` in all non-local environments.
- Do not reuse weak or default development secrets in production.
- Keep token lifetimes short and rotate refresh tokens in future iterations.

## Database Security

- Keep `DATABASE_URL` private.
- Do not expose database credentials in code, logs, screenshots, or commits.
- Use least-privilege database users in hosted environments.

## Dependency and Runtime Hygiene

- Keep dependencies updated regularly.
- Review CI output for security/lint warnings.
- Avoid logging sensitive data (passwords, tokens, credentials).

## Reporting a Vulnerability

If you discover a security issue, report it privately to the project maintainer instead of opening a public issue.

Recommended report content:
- vulnerability summary
- reproduction steps
- impacted components
- severity estimate
- proposed mitigation (if available)

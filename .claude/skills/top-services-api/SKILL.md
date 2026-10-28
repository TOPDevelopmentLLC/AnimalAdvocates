---
name: top-services-api
description: Reference for the TOP_Dev_Services multi-tenant API (api.thatoneprogrammer.dev) — which endpoints a client website can call, how each one authenticates, and how a client is identified by its domain. Use when wiring a client site to TOP services, auditing a client site for services it could use, or answering "does TOP_Dev_Services support X".
---

# TOP_Dev_Services API reference

Production base URL: `https://api.thatoneprogrammer.dev`. Spring Boot app in the
TOP_Dev_Services repo, `src/main/java/topdev/com/micro/email/`. Treat the controllers as the source of
truth — if anything below disagrees with the code, the code wins; fix this file.

## How a client site is identified

Each client business is one `User` row (role `USER`). Public reads find that
user by **domain**: the `?domain=` query param is normalized (lowercase, strip
`http(s)://`, `www.`, trailing `/`) and matched against `User.topDevWebsiteUrl`.
So `topDevWebsiteUrl` must be the bare domain, e.g. `animaladvocates.net`.

Writes need the business's JWT (`POST /api/v1/auth/login` → `token`), sent as
`Authorization: Bearer <token>`. Some areas are gated by per-user feature flags
(`UserFeatures`: `blogManager`, `products`, `orders`, `events`), toggled by an
admin via `PUT /api/v1/admin/features`. A disabled feature returns 403.

## Auth modes (see `security/ApiKeyAuthFilter.java`)

| Mode | Used by | Notes |
| --- | --- | --- |
| Public + `?domain=` | content, blogs, events, products, categories reads | Safe to call from browser JS. |
| Admin JWT (role `ADMIN`) | `/admin/web-pages?domain=`, `/admin/content?domain=&page=`, `/admin/features` | Admin manages any client by domain. The two content routes also accept the business JWT of the domain's owner; `/admin/features` is admin-only. |
| Business JWT | client-owned writes, `/images`, `/integrations` | Never ship a business JWT in a client bundle. Use it from scripts or the admin dashboard. |
| Customer JWT | `/customer/**`, `/payments/**`, `/tickets/**` | Site visitors register via `/api/v1/customer/auth/register` with `domain`; the token carries `businessUserId`. |
| `X-API-KEY` | `/api/v1/email/**` (everything not exempted) | Secret. Browsers must go through the contact-form Lambda (`lambda/contact-form` in TOP_Dev_Services). Never put it in a `VITE_*` var. |
| `WW-API-TOKEN` | blogs | WordWolf integration token. |

## Endpoint catalog (client-facing)

| Service | Public read | Write | Typical client-site use |
| --- | --- | --- | --- |
| **Email** | — | `POST /api/v1/email/send` via Lambda | Contact / inquiry forms. Brand picked from `Origin` → `AppBrand` in `EmailService.java`. |
| **Content (CMS)** | `GET /api/v1/content/page?domain=D` (page list), `?domain=D&name=P` (one page) | Admin: `PUT /admin/web-pages?domain=D`, `PUT /admin/content?domain=D&page=P` (raw JSON body). The business-scoped `/content/*` writes also exist. | Editable page copy. Body is JSON `{"sections":[{type,data}]}`; `type` ∈ `hero`, `titleText`, `bodyText`, `image`, `gallery`. |
| **Blogs** | `GET /api/v1/blogs?domain=D&page=&size=`, `GET /blogs/{id}` | `POST /blogs`, `PUT /blogs/{id}` | News / articles. `/sitemap-blogs.xml` for SEO. |
| **Events** | Browser sites: the events Lambda (`lambda/events` in TOP_Dev_Services, `https://64mxhwtkrfbb6u6e6f54lw7lca0yiwmp.lambda-url.us-east-1.on.aws/`; connect a site with `add-events-to-client`) — `GET /` lists upcoming events, `GET /?id=` gets one; site comes from `Origin`, public fields only. Backend: `GET /api/v1/events?domain=D` (upcoming only), `GET /events/{id}` (any client's event — don't expose to browsers) | `POST/PUT/DELETE /events` | Event listings, with price, capacity, images, reminder emails. |
| **Tickets** | — | `/api/v1/tickets/event/{id}/claim-free`, `/checkout`, `/finalize` (customer JWT) | RSVP / paid tickets; coupons under `/events/{id}/coupons`. |
| **Products / categories** | `GET /api/v1/products?domain=D&categoryId=`, `GET /categories` | business JWT | Shop / catalog. Orders under `/customer/orders`. |
| **Payments (Stripe)** | — | `/api/v1/payments/create-intent`, `/subscriptions/create` (JWT) | One-time and recurring payments using the business's own Stripe keys (`STRIPE` integration). |
| **Images (S3)** | URLs returned are public | `POST /api/v1/images` multipart (business JWT) | Host images referenced from content/events. |
| **Integrations** | — | `/api/v1/integrations` (business JWT) | Per-business secrets: `STRIPE`, `MAILCHIMP`, `WORDWOLF`, `SHELTERLUV`. |

## Schema changes

Hibernate `ddl-auto: update` still adds tables and nullable columns for entity
changes. Anything it can't do safely on tables that have rows — backfills,
NOT NULL columns, constraints, renames, data fixes — goes in a Flyway
migration: `src/main/resources/db/migration/V<n>__<description>.sql`, next
number after the highest existing one. Flyway runs before Hibernate, so a
migration must be a no-op when its table doesn't exist yet (a fresh
database); see `V1__add_event_end_date_time.sql` for the guard. Never edit a
migration that has been deployed — add a new one.

## Known gaps (check before promising a feature)

- **Payments need a JWT.** There is no anonymous checkout; a guest donation flow
  would need either a customer account or a new public, domain-scoped
  endpoint.
- **`SHELTERLUV` integration is stored but unused.** No service reads it yet;
  ShelterLuv proxying currently lives in a separate Lambda outside this repo.
- **Content section `data` is not validated** beyond being an object. The
  shapes in `push-sections-to-top` are a convention; keep the renderer and the
  pusher in agreement.
- **`PUT /admin/web-pages` and `PUT /admin/content` are shared by admins and
  clients.** `checkDomainAccess` in `AdminController` allows an ADMIN, or a USER
  whose `topDevWebsiteUrl` matches `?domain=` (normalized). No token → 401;
  customers, other clients, and users with no website → 403. Only the
  dashboard UI limits *which* pages/sections a client adds. A Lambda in front
  is planned as a further layer.
- **`PUT /admin/web-pages` (and `/content/web-pages`) replaces the list and deletes content for any page
  you drop.** Always read the current list and send the union.
- **CORS is open** (`addAllowedOriginPattern("*")`), so public reads work from
  any origin.

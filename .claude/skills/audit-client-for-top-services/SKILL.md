---
name: audit-client-for-top-services
description: Audit a client website repo and report which TOP_Dev_Services features it could use instead of hardcoded data, third-party links, or one-off Lambdas, with a prioritized migration plan. Use when the user asks what services a client site could use, wants to move a client onto TOP_Dev_Services, or opens a new client repo.
---

# Audit a client site for TOP_Dev_Services

Load the `top-services-api` skill first for the endpoint catalog and auth rules.

## 1. Inventory the client

Run from the client repo root:

```bash
# Network calls, env vars, external services
grep -rn "fetch(\|axios\|import.meta.env\|process.env\|lambda-url\|thatoneprogrammer" src
# Hardcoded arrays that look like data (events, articles, items, people)
grep -rnE "const [a-zA-Z]+ = \[" src --include=*.tsx --include=*.ts | grep -v components/ui
# Outbound links to platforms TOP could replace
grep -rnoE "https?://[a-z0-9.-]*(shelterluv|paypal|stripe|eventbrite|depop|poshmark|square|mailchimp|wix|squarespace)[^\"' ]*" src
# Deploy-time secrets
cat .github/workflows/*.yml .env.example 2>/dev/null
```

Also read `routes.tsx` (or equivalent) to list every page.

## 2. Map findings to services

| Pattern in the client | TOP service |
| --- | --- |
| Contact/inquiry form | Email via contact-form Lambda (check brand exists in `EmailService.AppBrand` and `lambda/contact-form/index.mjs` in TOP_Dev_Services) |
| Hardcoded hero/headline/paragraph/list copy | Content CMS sections |
| News/articles/stories array | Blogs |
| Upcoming events array, external RSVP links | Events (+ Tickets, Coupons) |
| Items for sale, external storefronts | Products + Categories + Orders |
| Donate/pay buttons to external checkouts | Payments (Stripe) — note JWT requirement |
| Images in `/public` that staff need to change | Images (S3) |
| One-off proxy Lambda holding a third-party key | Integrations (+ a new proxy endpoint) |
| Newsletter signup | `MAILCHIMP` integration (endpoint not built yet) |

## 3. Check readiness on the TOP side

For each candidate, confirm: the business `User` has `topDevWebsiteUrl` set to
the bare domain; the needed feature flag is on; for email, the brand routes
correctly. If a needed endpoint does not exist, list it as a TOP_Dev_Services
change, not a client change.

## 4. Report

Produce a table: **page/file → current state → TOP service → effort (S/M/L) →
blockers**. Order by value: things staff edit often (events, news, copy) first,
risky money flows last. Flag security issues found along the way (secrets in
`VITE_*` vars, API keys in client code).

Do not start migrating without the user picking items. For content sections,
hand off to the `push-sections-to-top` skill; for a brand-new client, to
`onboard-top-client`.

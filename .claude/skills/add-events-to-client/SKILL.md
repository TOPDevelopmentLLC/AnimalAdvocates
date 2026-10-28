---
name: add-events-to-client
description: Connect a client website to TOP_Dev_Services events through the shared events Lambda — find the client's domain, add its origins to the Lambda, deploy, verify, and replace the site's hardcoded events with live ones. Use when a client site needs an events list, when adding a new client to the events Lambda, or when a site's events request gets "Origin not allowed" or a 502.
---

# Add events to a client site

The shared events Lambda serves every client site:

**Function URL: `https://64mxhwtkrfbb6u6e6f54lw7lca0yiwmp.lambda-url.us-east-1.on.aws/`**

Source and docs: `lambda/events/` in the TOP_Dev_Services repo (`index.mjs`,
`README.md`, `test.mjs`). It picks the client from the request's `Origin` —
the site never sends a domain — and returns only that client's upcoming
events, with public fields only. Load `top-services-api` for the backend side.

The work has two halves. Steps 1–4 change the Lambda and run in the
TOP_Dev_Services repo; steps 5–6 change the client site.

## 1. Find the client's domain (the domain source)

The Lambda maps each origin to the **bare domain stored as the client's TOP
account `topDevWebsiteUrl`** (`animaladvocates.net` — no scheme, no `www.`,
no trailing slash). That account value is the source of truth, because it's
what the backend's `?domain=` lookup matches. Find it from, in order:

1. Ask the user if they gave it, or it's in the request.
2. The client repo: `TOP_DOMAIN` in `src/app/lib/topContent.ts`, the
   `--domain` in `package.json`'s `top:push` script, `CNAME`, `index.html`
   canonical / `og:url`, or the deploy workflow.
3. Confirm the backend knows it (the content read is public):
   ```bash
   curl -s "https://api.thatoneprogrammer.dev/api/v1/content/page?domain=<domain>"
   ```
   A JSON array (even `[]`) means the account exists. `No account found for
   domain` means onboard the client first (`onboard-top-client`).

Also confirm the account's **events** feature is on (TOPrism → Administrator
→ User Features, or `GET /api/v1/admin/features?domain=<domain>` with an
admin token). With it off, the Lambda returns 502 for that site.

If any source disagrees with the account value, stop and ask the user which is
right — a wrong domain means the site silently shows another site's (or no)
events.

## 2. Add the origins to the Lambda

Every origin the site is served from, with scheme, with and without `www.`:

```js
// lambda/events/index.mjs → ORIGIN_DOMAINS
"https://example.org": "example.org",
"https://www.example.org": "example.org",
```

Prefer this code change: it's reviewed and survives redeploys. Then run the
tests:

```bash
node lambda/events/test.mjs     # all must pass
```

Commit on a branch.

**Temporary approvals** (a preview URL, local development) go in the
`ORIGIN_DOMAINS` environment variable instead, e.g.
`{"http://localhost:5173":"example.org"}`. `update-function-configuration
--environment` **replaces every variable**, so merge with what's there:

```bash
FN=<function-name>
aws lambda get-function-configuration --function-name "$FN" \
  --query 'Environment.Variables' --output json > /tmp/vars.json
jq '.ORIGIN_DOMAINS = ((.ORIGIN_DOMAINS // "{}" | fromjson)
      + {"http://localhost:5173":"example.org"} | tojson)' /tmp/vars.json \
  | jq '{Variables: .}' > /tmp/env.json
aws lambda update-function-configuration --function-name "$FN" \
  --environment file:///tmp/env.json
```

Leave `ALLOWED_ORIGINS` unset unless the user asks for it — when set, it must
list every allowed origin, the new ones included.

## 3. Deploy

The user runs AWS commands (this needs their credentials). Find the
function's name from its URL if they don't know it:

```bash
for f in $(aws lambda list-functions --query 'Functions[].FunctionName' --output text); do
  aws lambda get-function-url-config --function-name "$f" --query FunctionUrl --output text 2>/dev/null \
    | grep -q 64mxhwtkrfbb6u6e6f54lw7lca0yiwmp && echo "$f"
done
```

Then:

```bash
cd lambda/events && zip -r function.zip index.mjs
aws lambda update-function-code --function-name <function-name> --zip-file fileb://function.zip
```

## 4. Verify

```bash
curl -s -H "Origin: https://<domain>" \
  "https://64mxhwtkrfbb6u6e6f54lw7lca0yiwmp.lambda-url.us-east-1.on.aws/?size=5"
```

| Result | Meaning |
| --- | --- |
| `{"events":[…],"totalEvents":N,…}` | Working. `[]` just means no upcoming events yet. |
| `403 Origin not allowed` | Origin missing from `ORIGIN_DOMAINS`, or a typo / missing scheme. |
| `500 Service misconfigured` | Origin in `ALLOWED_ORIGINS` but not `ORIGIN_DOMAINS`. |
| `502` | Backend refused: wrong domain, no account, or events feature off. Check CloudWatch. |

## 5. Show events on the site

Copy `templates/topEvents.ts` into the client (e.g. `src/app/lib/topEvents.ts`).
It has the Function URL, the `TopEvent` type, `useUpcomingEvents(size)`,
`eventDateParts(event)` and `formatEventPrice(event)`.

Replace the hardcoded events array with the hook, keeping the site's existing
markup and classes:

- Render the list in its own component, placed where the events appear. If
  that's a tab or a collapsible section that unmounts when hidden, the fetch
  happens only when a visitor opens it.
- Handle all three states: loading (skeletons shaped like the cards), error
  (a friendly message — never a blank area), and empty (the site's "no
  upcoming events" message if it has one).
- `dateTime` is UTC. Always format through `eventDateParts`, which uses the
  event's own `timeZone`; never `new Date().toLocaleString()` on its own.
- The backend stores a start time only. A hardcoded "2:00 PM - 3:30 PM" range
  becomes the start time; mention the lost end time to the user.
- Show price only when `price > 0` (`formatEventPrice` returns `""` for free)
  and "Sold out" when `spotsLeft === 0`. `spotsLeft === null` means unlimited.
- Keep `description` line breaks (`whitespace-pre-line`).

Leave other copy around the list (headings, "Stay updated", social links) as
it is, or move it to the CMS with `push-sections-to-top`.

## 6. Test and hand off

- Type-check and build the client.
- In Playwright, route the Function URL to canned responses and check: the
  list renders in order with correct local times (include an event after a
  daylight-saving change), paid / sold-out lines, empty state, error state
  (502), loading state, and — for tabs — that nothing is fetched before the
  tab opens. The live Function URL only answers allowed origins, so a local
  browser test against it needs a temporary origin approval (step 2).
- Tell the user which hardcoded events need re-entering in TOPrism → Events
  (title, start date and time, time zone, location, description, price,
  capacity). Past events can be skipped: the Lambda only returns upcoming
  ones.

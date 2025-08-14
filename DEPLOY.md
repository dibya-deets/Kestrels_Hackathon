# Deploying InvesTerra to Vercel

A step‑by‑step guide to ship your Next.js + NextAuth + Prisma app to **Vercel** using a hosted Postgres (e.g., Supabase/Neon). This keeps secrets out of Git and ensures reliable serverless DB connections.

---

## 0) Prerequisites

- Node 20.x (Vercel uses 20 by default; `engines.node` is set)
- A hosted Postgres: Supabase/Neon/Vercel Postgres (with **pooled** connection enabled)
- Vercel account connected to your Git host (GitHub/GitLab/Bitbucket)

---

## 1) Local environment (never commit secrets)

Create **`.env.local`** in the project root (git‑ignored) and add:

```env
# Local dev
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=YOUR_LONG_RANDOM_SECRET   # openssl rand -base64 32

# Database (Supabase/Neon/etc.)
# Use pooled URL for serverless runtimes (PgBouncer)
DATABASE_URL=postgres://...:6543/...?...

# Optional direct URL for running Prisma migrations locally/CI
DIRECT_URL=postgres://...:5432/...?...

# If you use Supabase client in the browser, expose only NEXT_PUBLIC_* keys
# NEXT_PUBLIC_SUPABASE_URL=...
# NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

> Keep `.env.local` out of Git. Share values via your password manager or a secrets vault.

---

## 2) Database schema & Prisma

- Ensure `prisma/schema.prisma` has `provider = "postgresql"`
- Create migrations if needed:
  ```bash
  npx prisma migrate dev --name init
  ```
- Generate client:
  ```bash
  npx prisma generate
  ```

---

## 3) Verify local build

```bash
npm i
npm run build
npm start
```

> Fix any issues **before** deploying (videos under `/public`, font setup via `next/font` or `_document`, etc.).

---

## 4) Push the repo

Commit and push to your Git host. No `.env*` files should be committed.

---

## 5) Create the Vercel project

1. **Vercel → New Project → Import** your repo
2. Framework: **Next.js** (auto)
3. Build command: set to **`npm run vercel-build`**
4. Output directory: default (`.next`)

This project’s `package.json` scripts include:

```jsonc
{
  "postinstall": "prisma generate",
  "prisma:deploy": "prisma migrate deploy",
  "vercel-build": "npm run prisma:deploy && next build"
}
```

- `postinstall` ensures Prisma Client is generated.
- `vercel-build` applies DB migrations **then** builds Next.js.

---

## 6) Add Environment Variables in Vercel

**Vercel → Project → Settings → Environment Variables**

Add for **Production** (and usually **Preview** too):

- `NEXTAUTH_URL` → `https://your-project-name.vercel.app` (or your custom domain)
- `NEXTAUTH_SECRET` → **same** long random secret you use locally (or generate one and keep it stable)
- `DATABASE_URL` → **pooled** Postgres connection string
- `DIRECT_URL` → **direct** Postgres connection string (optional, useful for CLI migrations/Studio)

If you use client-side Supabase:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

> Tip: Pull Vercel envs locally any time:
> ```bash
> vercel env pull .env.local
> ```

---

## 7) First deploy

Click **Deploy**. When it finishes, open the provided URL and smoke test:

- Auth (`/sign_in` → NextAuth)
- Dashboard → Course → Lesson (open sub-lessons, start quiz)
- Progress refresh on Dashboard & Course pages
- Static assets (GIF/MP4) load as expected

---

## 8) Custom domain (optional)

- **Vercel → Project → Domains** → Add your domain, set DNS
- Update `NEXTAUTH_URL` to `https://yourdomain.com` in **Production** env
- Re‑deploy (or saving env triggers a rebuild)

---

## 9) Post‑deploy checks

- **Logs**: Vercel → Project → Functions
- **Headers/Caching**: large videos might benefit from CDN/object storage if very big
- **Security**: secrets are only in Vercel envs, not in repo

---

## 10) Rollback / redeploy

- Use **Deployments** tab to promote a previous deployment
- Adjust envs, then redeploy if needed

---

## Troubleshooting

**JWT decryption failed / `NEXTAUTH_SECRET` warnings**  
Set `NEXTAUTH_SECRET` in Vercel before logging in. If you rotate the secret later, users may need to sign out/clear cookies.

**`NEXTAUTH_URL` mismatch**  
Must exactly match the deployment domain/protocol. Update when you switch to a custom domain.

**Database connection limit exceeded**  
Use **pooled** `DATABASE_URL` (PgBouncer). Avoid long‑lived connections. Prisma best with pooling in serverless.

**Assets 404**  
All public files (images, GIFs, MP4s) must live under `/public`. If path is `/assets/foo.mp4`, ensure file is at `public/assets/foo.mp4`.

**Hydration mismatch**  
Avoid `Date.now()`/random values during SSR; use `next/font`; put stylesheet links in `_document` (not page `<Head>`).

---

## Useful commands

```bash
# Generate Prisma client
npx prisma generate

# Create a new migration (dev)
npx prisma migrate dev --name <name>

# Apply migrations in prod (used by vercel-build)
npm run prisma:deploy

# Pull Vercel envs locally
vercel env pull .env.local
```

Happy shipping 🚀

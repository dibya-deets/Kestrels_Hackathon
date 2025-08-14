# InvesTerra

Interactive fintech education platform with lessons, videos, gamified quizzes, XP/levels, and badges. Built with Next.js, styled with Tailwind, animated with Framer Motion, authenticated via NextAuth, and backed by Postgres through Prisma.

---

## Features

- Course map with stage unlocks
- Lesson pages with videos and interactive, auto‑formatted content
- Gamified quizzes that unlock after reading sub‑lessons
- XP, level progress, and badges
- Progress sync across Dashboard ↔ Course ↔ Lesson
- Accessible, responsive UI

---

## Tech Stack

- **Frontend**: Next.js (App Router/Pages), React, Tailwind CSS
- **Animations**: Framer Motion
- **Auth**: NextAuth (Credentials + adapters ready)
- **DB/ORM**: Postgres (e.g., Supabase/Neon) + Prisma
- **UI**: next/image, react-icons (Press Start 2P & Comfortaa via `next/font`/`_document`)
- **Hosting**: Vercel

---

## 🚀 Getting Started (Local)

### 1) Install
```bash
npm i
```

### 2) Environment
Create **`.env.local`** (git‑ignored) in the root:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=YOUR_LONG_RANDOM_SECRET

DATABASE_URL=postgres://...:6543/...?...   # pooled
DIRECT_URL=postgres://...:5432/...?...     # direct (optional)
```

### 3) Database & Prisma
```bash
npx prisma generate
# If you have migrations:
npx prisma migrate dev
```

### 4) Run
```bash
npm run dev
```

Open http://localhost:3000

---

## 📁 Project Structure

```
src/
  components/
  pages/
    api/
    dashboard/
      [courseId]/
        [lessonId].jsx
      index.jsx
    sign_in.jsx
  data/
    lessonContent.js
    seedFAQs.js
  lib/
    prisma.js
public/
  assets/
    images/
    videos/
prisma/
  schema.prisma
```

---

## 🔧 NPM Scripts

```jsonc
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "seed": "node src/data/seedFAQs.js",
  "seed:faqs": "node src/data/seedFAQs.js",
  "postinstall": "prisma generate",
  "prisma:deploy": "prisma migrate deploy",
  "vercel-build": "npm run prisma:deploy && next build"
}
```

- `postinstall`: generate Prisma Client (important for Vercel builds)
- `prisma:deploy`: apply migrations in prod
- `vercel-build`: used as Vercel Build Command (migrate then build)

---

##  Environment Variables

| Name | Where | Notes |
|------|------|-------|
| `NEXTAUTH_URL` | Local/Vercel | `http://localhost:3000` in dev; `https://your-domain` in prod |
| `NEXTAUTH_SECRET` | Local/Vercel | Long random string; keep stable |
| `DATABASE_URL` | Local/Vercel | **Pooled** Postgres URL (PgBouncer) |
| `DIRECT_URL` | Local/Vercel | **Direct** Postgres URL (optional) |
| `NEXT_PUBLIC_*` | As needed | Client‑side readable keys only |

> Add provider secrets later (e.g., Google/GitHub OAuth) as needed.

---

## ☁️ Deployment

See **[DEPLOY.md](./DEPLOY.md)** for a step‑by‑step Vercel guide (envs, migrations, custom domain, troubleshooting).

**Quick start on Vercel:**
- Project → Settings → Build Command → `npm run vercel-build`
- Add env vars in Vercel
- Deploy

---

## 🧪 Seeding (optional)

If you want to seed FAQ or demo data:
```bash
npm run seed
# or
npm run seed:faqs
```

---

## Troubleshooting

- **JWT decryption failed**: Set/keep `NEXTAUTH_SECRET` stable; clear cookies after rotating.
- **NEXTAUTH_URL warning**: Must match deployed domain with `https`.
- **DB connection issues**: Use pooled `DATABASE_URL` for serverless; prefer PgBouncer.
- **Assets not loading**: Files must be under `/public` (e.g., `/public/assets/foo.mp4` → `/assets/foo.mp4`).
- **Hydration mismatch**: Avoid `Date.now()`/random SSR diffs; put external styles in `_document` or use `next/font`.

---

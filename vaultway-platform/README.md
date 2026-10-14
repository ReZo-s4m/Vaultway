# Vaultway — Cloud-Based Secure File Sharing Platform

A production-oriented, full-stack platform for uploading, organizing, and securely sharing files. Every file is encrypted with **AES-256-GCM before it reaches storage**, so the service only ever holds ciphertext.

> **Status: Phase 1 scaffold.** The monorepo, tooling, Supabase + Prisma wiring, and the complete database schema are in place. Feature work (auth, files, sharing, admin) follows the roadmap at the bottom.

## Tech stack

| Layer     | Choices                                                                          |
| --------- | -------------------------------------------------------------------------------- |
| Frontend  | Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, TanStack Query, React Hook Form, Axios, Lucide |
| Backend   | Node.js, Express, TypeScript, Prisma, JWT, bcrypt, Multer, Zod, `node:crypto` (AES-256-GCM) |
| Database  | Supabase PostgreSQL                                                              |
| Storage   | Supabase Storage (private buckets)                                              |
| Shared    | `@vaultway/shared` — enums + DTOs used by both sides                             |

## Repository layout

```
vaultway-platform/
├── frontend/          # Next.js 15 app (App Router)
│   ├── app/           # routes, layout, providers, globals.css
│   ├── components/ui/  # shadcn/ui components (add via CLI)
│   ├── lib/           # api (axios), query-client, utils (cn)
│   └── hooks/ services/ types/ utils/
├── backend/           # Express REST API
│   ├── prisma/        # schema.prisma + seed.ts
│   └── src/
│       ├── config/       # env (Zod-validated), prisma, supabase
│       ├── controllers/  # request/response (Phase 2+)
│       ├── services/     # business logic (Phase 2+)
│       ├── repositories/ # Prisma data access (Phase 2+)
│       ├── routes/       # Express routers (health wired now)
│       ├── middleware/   # auth, error handler, 404
│       ├── validations/  # Zod schemas (Phase 2+)
│       ├── utils/        # crypto (AES-256-GCM), jwt, ApiError, logger
│       ├── app.ts        # Express app (helmet, cors, rate limit)
│       └── server.ts     # bootstrap + graceful shutdown
├── shared/            # @vaultway/shared (enums + DTOs)
├── docs/              # architecture.md
└── package.json       # npm workspaces + root scripts
```

## Prerequisites

- **Node.js 20+** and **npm 10+** (`nvm use` picks up `.nvmrc`)
- A free **Supabase** project (provides both PostgreSQL and Storage)
- `openssl` (to generate secrets) — preinstalled on macOS/Linux/WSL

## Getting started

### 1. Install

From the repo root (installs all three workspaces at once):

```bash
npm install
```

### 2. Set up Supabase

In the [Supabase dashboard](https://supabase.com/dashboard):

1. **Create a project.** Note the database password you set.
2. **Connection strings** — *Project Settings → Database → Connect*:
   - `DATABASE_URL`: the **pooled** (Transaction, port `6543`) URI. Append `?pgbouncer=true&connection_limit=1`.
   - `DIRECT_URL`: the **direct** (Session, port `5432`) URI. Prisma Migrate needs this.
3. **API keys** — *Project Settings → API*: copy the **Project URL** and the **`service_role`** key (secret, server-only).
4. **Storage** — *Storage → Create bucket* → name it **`vault-files`** and keep it **Private**.

### 3. Configure the backend

```bash
cp backend/.env.example backend/.env
```

Fill in `backend/.env`:

```bash
# JWT secrets (run twice, use different values)
openssl rand -hex 32

# File encryption key — 32 bytes, base64. BACK THIS UP; losing it means losing every file.
openssl rand -base64 32
```

…plus the Supabase `DATABASE_URL`, `DIRECT_URL`, `SUPABASE_URL`, and `SUPABASE_SERVICE_ROLE_KEY` from step 2.

### 4. Create the database schema

```bash
npm run db:generate     # generate the Prisma client
npm run db:migrate      # create all tables in Supabase (name the migration "init")
npm run db:seed         # seed the ADMIN and USER roles
```

### 5. Configure the frontend

```bash
cp frontend/.env.local.example frontend/.env.local
# NEXT_PUBLIC_API_URL=http://localhost:4000 is correct for local dev
```

### 6. Run everything

```bash
npm run dev
```

- API → http://localhost:4000 (health: http://localhost:4000/api/health)
- Web → http://localhost:3000

Sanity check the API:

```bash
curl http://localhost:4000/api/health
# { "success": true, "data": { "status": "ok", "database": "up", ... } }
```

## Root scripts

| Command              | What it does                                              |
| -------------------- | --------------------------------------------------------- |
| `npm run dev`        | Runs the API and the web app together                     |
| `npm run dev:api`    | Backend only (`tsx watch`)                                |
| `npm run dev:web`    | Frontend only (`next dev`)                                |
| `npm run db:migrate` | Create/apply a Prisma migration                           |
| `npm run db:seed`    | Seed roles (and an admin, if `ADMIN_*` env vars are set)  |
| `npm run db:studio`  | Open Prisma Studio to browse data                         |
| `npm run typecheck`  | Type-check every workspace                                |
| `npm run format`     | Prettier across the repo                                  |

## Adding shadcn/ui components

The config (`components.json`, tokens in `app/globals.css`) is ready. Add components as needed:

```bash
cd frontend
npx shadcn@latest add button input card dialog
```

## Notes

- **BigInt:** file sizes and quotas are `BigInt` in Postgres; the API serializes them to strings in JSON (see `server.ts`). Parse them client-side with `Number()`/`BigInt()` as appropriate.
- **The `service_role` key bypasses row-level security** — keep it strictly on the backend, never in `NEXT_PUBLIC_*`.
- The backend runs directly from TypeScript via `tsx` (no build step needed for dev or Render).

## Deployment (later — Phase 7)

- **Frontend → Vercel:** set the project **Root Directory** to `frontend`; add `NEXT_PUBLIC_API_URL` pointing at the deployed API.
- **Backend → Render:** Web Service with Root Directory `backend`, build `npm install`, start `npm run start`; run `npm run db:deploy` on release. Add all backend env vars.
- **Database & Storage → Supabase:** reuse the same project or create a production one.

## Roadmap

- [x] **Phase 1** — Monorepo, Supabase + Prisma config, database schema *(this scaffold)*
- [ ] **Phase 2** — Auth (register/login/logout, JWT access + refresh, bcrypt), authorization middleware, user management
- [ ] **Phase 3** — Dashboard, file upload, folder management
- [ ] **Phase 4** — AES-256 encryption pipeline, Supabase Storage integration, secure downloads
- [ ] **Phase 5** — File sharing, permission management, activity logging
- [ ] **Phase 6** — Admin dashboard, analytics, notifications
- [ ] **Phase 7** — Testing, deployment, documentation

---

A CVR College of Engineering major project.

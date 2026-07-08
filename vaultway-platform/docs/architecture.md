# Architecture

Vaultway is a monorepo with three workspaces:

- **frontend/** — Next.js 15 (App Router) client.
- **backend/** — Node.js + Express REST API.
- **shared/** — TypeScript enums and DTOs imported by both sides so contracts never drift.

## Backend layering

```
HTTP request
   |
Routes            (Express routers: URL -> handler)
   |
Middleware        (auth, validation (Zod), rate limiting, error handling)
   |
Controllers       (parse request, shape response -- no business logic)
   |
Services          (business logic: encryption, sharing rules, quotas)
   |
Repositories      (all Prisma access lives here -- the only layer that touches the DB)
   |
Database          (Supabase PostgreSQL via Prisma)
```

## File lifecycle

1. Client uploads a file to the API (multipart via Multer, held in memory).
2. The service encrypts the bytes with **AES-256-GCM** (`node:crypto`) using a server-held key; a random IV and GCM auth tag are generated per file.
3. The **ciphertext** is uploaded to a **private Supabase Storage bucket** — plaintext never lands on disk or in storage.
4. Only metadata (name, size, mime, storage path, IV, auth tag, owner, folder) is written to PostgreSQL.
5. On download: verify permission -> fetch ciphertext -> decrypt in memory -> stream the original file back.

## Security model

- Passwords hashed with bcrypt; never stored or logged in plaintext.
- Stateless **JWT access tokens** (short-lived) + rotating **refresh tokens** (hashed in DB, revocable on logout).
- Role-based authorization (`ADMIN`, `USER`) enforced in middleware.
- Helmet, a CORS allow-list, and rate limiting at the edge; Zod validates every input; Prisma parameterizes every query.
- Supabase Storage buckets are **private** — objects are only reachable through the API after an authorization check.

See the root `README.md` for setup and the seven-phase roadmap.

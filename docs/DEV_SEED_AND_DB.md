# DEV Seed + DB Swap Tutorial (Novari Remastered)

This project starts **DB-agnostic** (in-memory repositories) so you can build React Native screens fast without committing to a database too early.

To avoid the “empty app” problem, we include **dev-only endpoints**:

* `POST /api/v1/dev/seed` → adds sample Embers + Tasks + an example user (optional)
* `POST /api/v1/dev/reset` → clears the in-memory data so you can start fresh

These endpoints are **development only** and must never be usable in production.

---

## 1) What “seed” is (in plain English)

Seeding means: **populate the backend with sample data** so the app can immediately show:

* a list of **Embers**
* tasks inside each **Ember**
* streak stats after you complete tasks

Because we’re using in-memory storage at first, a server restart normally wipes everything. Seed lets you restore a known-good dataset in seconds.

---

## 2) How to run the backend (dev mode)

1. Start the API:

* `cd apps/api`
* `npm install`
* `npm run dev`

2. Confirm it’s running:

* `GET /api/v1/health` should return OK.

---

## 3) How to seed data

### Option A: Use a browser (fastest)

If your API runs at `http://localhost:3000`:

* Seed:

  * Send a POST request to: `/api/v1/dev/seed`

* Reset:

  * Send a POST request to: `/api/v1/dev/reset`

If you don’t have a REST client, use curl (below).

### Option B: Use curl (Windows-friendly)

**PowerShell** examples:

Seed:

* `curl -Method POST http://localhost:3000/api/v1/dev/seed`

Reset:

* `curl -Method POST http://localhost:3000/api/v1/dev/reset`

> If your scaffold uses a “dev key” header, you’ll include it here.
> Example: `-H "x-dev-key: YOUR_KEY"`

---

## 4) What seed creates (expected sample data)

Seed inserts sample records like:

### Embers

* Purpose & Goal Setting
* Health & Energy
* Mindfulness
* Relationships (optional)

### Tasks (each belongs to an Ember)

* “Write five goals you want to achieve this week” (Purpose & Goal Setting)
* “Plan tomorrow’s top 1 priority” (Purpose & Goal Setting)
* “Go for a 10-minute walk” (Health & Energy)
* “2 minutes of box breathing” (Mindfulness)

### Streak fields

Seed may also initialize streak state for a user:

* `loginStreak`: current, best, lastLoginAt
* `taskStreak`: current, best, lastTaskCompletedAt, lifetimeCompletedTasks

---

## 5) How to “add more seed data” (edit the seed file)

Look for a file like:

* `apps/api/src/dev/dev.seed.data.js`
  or
* `apps/api/src/dev/seed/seed.data.js`

You’ll see arrays like:

* `SEED_EMBERS = [...]`
* `SEED_TASKS = [...]`

### Add a new Ember

Add a new object to the embers array:

* Give it a unique `id` (string)
* Give it a `title` and optional `description`

### Add a new Task

Add a new object to the tasks array:

* Give it a unique `id`
* Add `emberId` that matches an existing ember
* Add `title`
* Optionally add `difficulty`, `estimatedMinutes`, `tags`

**Rule of thumb:** start simple. Titles + relationships first.

---

## 6) How reset works (and what it should reset)

Reset should clear:

* users (optional: leave user, but wipe domain data — depends on your preference)
* embers
* tasks
* task completion events
* streak state (login + task streak)
* any caches your in-memory store holds

If you want to keep a dev user after reset, keep the user store but reset everything else.

---

## 7) Safety: Make seed/reset “dev only”

Seed/reset must be blocked in production. Common patterns:

### A) Only allow if `NODE_ENV === "development"`

* In the controller/guard: refuse requests otherwise.

### B) Require a `DEV_SEED_KEY` header

* Add an env var:

  * `DEV_SEED_KEY=some-long-random-string`
* Require request header:

  * `x-dev-key: some-long-random-string`

### Recommended approach

Use both:

* allow only in development
* also require a dev key

---

## 8) How the RN app uses it (recommended workflow)

### First run

1. Start API
2. Call `/dev/seed`
3. Start Expo app
4. Load Embers list
5. Tap an Ember → see Tasks
6. Complete a Task → Home updates streak summary

### If things get messy

1. Call `/dev/reset`
2. Call `/dev/seed`
3. Refresh the app (or clear React Query cache if needed)

---

## 9) Connecting to a real database later (DB swap plan)

Right now, the backend uses **repository interfaces** with an **in-memory implementation**.

You’ll see something like:

* `EmbersRepository` (interface / contract)
* `InMemoryEmbersRepository` (current implementation)

When you choose a DB, you create a new implementation:

* `PostgresEmbersRepository` (example)
  or
* `SupabaseEmbersRepository`
  or
* `MongoEmbersRepository`

### The goal

Your services/controllers should not change much — you just swap the repository implementation in the NestJS module.

---

## 10) DB swap steps (generic and repeatable)

### Step 1: Pick your DB + library

Examples:

* Postgres + Prisma
* Postgres + Knex
* Mongo + Mongoose
* Supabase client
* Firebase

### Step 2: Add env vars

Create a `.env` entry like:

* `DATABASE_URL=...`

### Step 3: Create DB repository classes

Create:

* `apps/api/src/embers/repositories/postgres.embers.repository.js` (example)
* Implement the same methods as the in-memory repo:

  * `getAll()`
  * `getById(id)`
  * `getTasksByEmberId(emberId)`
  * etc.

### Step 4: Swap dependency injection binding

In the module (e.g. `embers.module.js`), change provider mapping from:

* in-memory repo → DB repo

### Step 5: Update seed strategy

Once you have a DB, you typically stop using an HTTP seed endpoint and use:

* a script: `npm run seed`
* or a migration + seed tool (Prisma seed, etc.)

But you *can* keep `/dev/seed` as long as it remains dev-only and inserts into DB.

---

## 11) How streak data should be stored with a DB (simple recommended structure)

### Task completion events table/collection

Store events like:

* `id`
* `userId`
* `taskId`
* `completedAt` (timestamp)

From these, you can compute:

* “did user complete a task today?”
* “did user complete a task yesterday?”
* lifetime completion count

### Streak snapshot table/collection (optional)

To avoid recomputing, store:

* `userId`
* `loginStreakCurrent`, `loginStreakBest`, `lastLoginAt`
* `taskStreakCurrent`, `taskStreakBest`, `lastTaskCompletedAt`
* `lifetimeCompletedTasks`

**Start simple:** store snapshot + still record events. Best of both worlds.

---

## 12) Troubleshooting tips

* If the app shows no data:

  * confirm API is running
  * call `/dev/seed`
  * refresh the app
* If seed seems to work but RN still shows old data:

  * React Query may be caching — use “pull to refresh” pattern or invalidate queries
  * as a last resort, clear app storage (Expo) or bump query keys

---

## 13) Quick “how I add a new Ember & Tasks” checklist

1. Add ember object in seed data
2. Add 2–5 tasks that reference `emberId`
3. Seed again
4. Confirm Ember appears in Ember list
5. Confirm Tasks appear in Ember detail

Done.

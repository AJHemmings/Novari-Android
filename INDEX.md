📚 NOVARI REMASTERED - DOCUMENTATION INDEX
==========================================

Welcome! This project contains 75+ files totaling 5,000+ lines of carefully
commented, production-ready code for learning React Native + NestJS.

Choose where to start based on what you want to learn:


🚀 I WANT TO GET STARTED NOW
────────────────────────────
→ Read: README.md (main guide, quick start in 3 steps)
→ Run: npm install:all (from root folder)
→ Start: Backend, seed data, then mobile
→ You'll have a working app in 10 minutes


📖 I WANT TO UNDERSTAND THE ARCHITECTURE
─────────────────────────────────────────
→ Read: ARCHITECTURE.md (complete folder structure guide)
→ Review: FOLDER_STRUCTURE.txt (visual tree + file purposes)
→ Then: Explore apps/backend/src/app.module.js
→ Then: Explore apps/mobile/App.js


🔧 I WANT TO KNOW HOW TO EXTEND IT
───────────────────────────────────
→ Read: README.md → "How to Extend" section
→ Example: Add a new tab (5 min guide)
→ Example: Add a new NestJS module (10 min guide)
→ Example: Swap to real database (explained in DEV_SEED_AND_DB.md)


🗄️ I WANT TO UNDERSTAND THE DATABASE
────────────────────────────────────────
→ Read: docs/DEV_SEED_AND_DB.md (complete database guide)
→ Topics:
  - Current in-memory architecture
  - How to call dev/seed and dev/reset
  - How to add/edit seed data
  - How to swap to PostgreSQL/Firebase
  - Recommended database schemas
  - Streak logic explanation
  - Testing strategies


📱 I WANT TO LEARN REACT NATIVE
────────────────────────────────
→ Start with: apps/mobile/src/screens/HomeScreen.js
→ Learn from: All 8 screens (simple, well-commented)
→ Understand: apps/mobile/src/navigation/
→ Then: apps/mobile/src/hooks/useEmbers.js (React Query)


⚙️ I WANT TO LEARN NESTJS
──────────────────────────
→ Start with: apps/backend/src/app.module.js
→ Understand: apps/backend/src/modules/auth/
→ Study pattern: apps/backend/src/modules/embers/
→ Learn more: apps/backend/src/modules/tasks/
→ Advanced: apps/backend/src/common/repositories/


🔐 I WANT TO UNDERSTAND AUTH
─────────────────────────────
→ Backend auth flow:
  - apps/backend/src/modules/auth/auth.controller.js (routes)
  - apps/backend/src/modules/auth/auth.service.js (JWT logic)
  - apps/backend/src/modules/auth/jwt.strategy.js (Passport)
  
→ Frontend auth flow:
  - apps/mobile/src/screens/LoginScreen.js (UI)
  - apps/mobile/src/store/authStore.js (state)
  - apps/mobile/src/navigation/RootNavigator.js (conditional rendering)


💾 I WANT TO UNDERSTAND STREAKS
───────────────────────────────
→ Logic: apps/backend/src/modules/streaks/streaks.service.js
→ Detail: docs/DEV_SEED_AND_DB.md → "Streak Logic Explanation"
→ Two types:
  - Login streak (consecutive days logged in)
  - Task streak (consecutive days with ≥1 task)
→ Both smart: detect missed days, reset automatically


🧪 I WANT TO UNDERSTAND TESTING
──────────────────────────────────
→ Unit test example: apps/backend/src/modules/auth/auth.service.spec.js
→ E2E test example: apps/backend/test/e2e/auth.e2e-spec.js
→ Run tests: npm test (from backend folder)


📄 DOCUMENT QUICK REFERENCE
────────────────────────────

START HERE:
  README.md
    - Quick start (3 steps)
    - Full API routes list
    - Architecture overview
    - How to extend (5 examples)
    - Tips for debugging
    - Next steps

THEN READ:
  ARCHITECTURE.md
    - Detailed folder structure
    - What each file does
    - Critical entry points
    - Important files to understand
    - File naming patterns
    - How to add new features

THEN READ:
  docs/DEV_SEED_AND_DB.md
    - Current in-memory architecture
    - How seed/reset works
    - How to edit seed data
    - How to swap to real database
    - Database schema recommendations
    - Streak logic deep dive

REFERENCE:
  FOLDER_STRUCTURE.txt
    - Visual tree of all files
    - Quick file lookup
    - Complete metrics

SUMMARY:
  SCAFFOLD_SUMMARY.md
    - What was created
    - Complete file list
    - Getting started checklist
    - Architecture highlights
    - What you get (features)


🎯 LEARNING PATHS
──────────────────

PATH 1: "I want to build features"
  1. README.md → Quick Start
  2. Run the app (backend → seed → mobile)
  3. Change LoginScreen text
  4. Add a new tab (follow README.md example)
  5. Create a new screen
  6. Add a React Query hook
  7. Connect to API

PATH 2: "I want to understand architecture"
  1. ARCHITECTURE.md (read folder structure)
  2. apps/backend/src/app.module.js (understand modules)
  3. apps/backend/src/modules/embers/ (understand pattern)
  4. apps/mobile/App.js (understand frontend)
  5. apps/mobile/src/navigation/RootNavigator.js (understand nav)
  6. docs/DEV_SEED_AND_DB.md (understand data)

PATH 3: "I want to learn React Native"
  1. apps/mobile/App.js (entry point)
  2. apps/mobile/src/screens/HomeScreen.js (example screen)
  3. apps/mobile/src/navigation/RootNavigator.js (nav logic)
  4. apps/mobile/src/hooks/useEmbers.js (React Query)
  5. Build a new screen (follow HOME pattern)
  6. Add to navigation
  7. Connect to API

PATH 4: "I want to learn NestJS"
  1. apps/backend/src/app.module.js (root)
  2. apps/backend/src/modules/auth/auth.module.js (example module)
  3. apps/backend/src/modules/auth/auth.service.js (business logic)
  4. apps/backend/src/modules/auth/auth.controller.js (routes)
  5. apps/backend/src/modules/embers/ (simpler example)
  6. Build a new module (follow EMBERS pattern)
  7. Import in app.module.js

PATH 5: "I want to add a database"
  1. docs/DEV_SEED_AND_DB.md → "How to Swap to Real Database"
  2. Choose database (PostgreSQL recommended)
  3. Create new repository class
  4. Update *.module.js provider
  5. Run migrations
  6. Test with the app


💡 KEY CONCEPTS TO UNDERSTAND
──────────────────────────────

EMBERS:
  - Areas of growth (e.g., "Purpose & Goal Setting")
  - NOT the same as tasks
  - Users choose embers to focus on
  - Each ember has multiple tasks

TASKS:
  - Actions within an ember
  - Users complete tasks daily
  - Each task references its parent ember
  - Completion tracked for streak purposes

STREAKS (Two Types):
  1. Login Streak
     - Consecutive days user logs in
     - Resets if missed 1 day
  
  2. Task Completion Streak
     - Consecutive days with ≥1 task completed
     - Resets if missed 1 day
     - Tracks lifetime count too

REPOSITORIES:
  - Abstraction layer for data access
  - Currently in-memory (JavaScript Map)
  - Easy to swap to any database
  - All modules use same interface

REACT QUERY:
  - Server state management (data from API)
  - Handles caching, invalidation, mutations
  - Paired with Zustand for client state (auth)

ZUSTAND:
  - Client state management (auth, user, tokens)
  - Simple, light-weight
  - Used for auth flow


📞 GETTING HELP
────────────────

Q: How do I start?
A: Read README.md, run 3 commands (npm install:all, npm run dev, npm start)

Q: How do I add a feature?
A: Check README.md → "How to Extend" section with 5 examples

Q: How do I use the database?
A: Currently in-memory. See docs/DEV_SEED_AND_DB.md to swap

Q: How do I debug?
A: See README.md → "Development Tips" section

Q: Can I use TypeScript?
A: Currently JavaScript. You can add TypeScript step-by-step if desired.

Q: Is this production-ready?
A: Almost! Add real database, then yes. See docs/DEV_SEED_AND_DB.md


📊 WHAT'S INCLUDED
───────────────────

Backend:
  ✅ 9 NestJS modules (auth, users, embers, tasks, streaks, etc.)
  ✅ 5 in-memory repositories
  ✅ JWT authentication with refresh tokens
  ✅ User profile management
  ✅ Streak logic (login + task)
  ✅ Dev seed/reset endpoints
  ✅ 20+ API routes
  ✅ Comprehensive error handling
  ✅ Test examples (unit + E2E)

Frontend:
  ✅ React Native + Expo
  ✅ Bottom tab navigation (5 tabs)
  ✅ 8 functional screens
  ✅ Login/Register flow
  ✅ React Query hooks (5)
  ✅ Zustand auth store
  ✅ API client with auth headers
  ✅ Form handling examples
  ✅ Loading/error states

Documentation:
  ✅ Main README (400+ lines)
  ✅ Architecture guide (300+ lines)
  ✅ Database strategy (500+ lines)
  ✅ File-by-file comments
  ✅ How to extend examples
  ✅ This index!


🎓 LEARNING OUTCOMES
──────────────────────

After working with this code, you'll understand:

✅ React Native fundamentals (components, navigation, state)
✅ NestJS fundamentals (modules, services, controllers)
✅ REST API design (routes, methods, responses)
✅ JWT authentication (tokens, refresh, guards)
✅ React Query (server state, caching, mutations)
✅ Zustand (client state, auth)
✅ Repository pattern (data abstraction)
✅ Dependency injection (NestJS)
✅ Unit testing (Jest)
✅ E2E testing (Supertest)
✅ Monorepo structure (yarn workspaces)
✅ Streak logic (date calculations)
✅ Password hashing (bcrypt)
✅ Bottom tab navigation (React Navigation)


═══════════════════════════════════════════════════════════════════

Ready to start? 👇

1. Open README.md
2. Follow the 3-step quick start
3. Explore the code with the architecture guide
4. Build something amazing!

═══════════════════════════════════════════════════════════════════

Happy learning! 🚀 🔥

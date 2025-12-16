NOVARI REMASTERED - COMPLETE FOLDER STRUCTURE
==============================================

novari-app/
│
├── 📄 package.json                          # Monorepo root with workspaces
├── 📄 README.md                             # Main documentation
├── 📄 .gitignore                            # Git ignore patterns
│
├── 📁 apps/
│   │
│   ├── 📁 mobile/                           # React Native (Expo) frontend
│   │   ├── 📄 App.js                        # Main entry point
│   │   ├── 📄 app.json                      # Expo configuration
│   │   ├── 📄 babel.config.js               # Babel config
│   │   ├── 📄 metro.config.js               # Metro bundler config
│   │   ├── 📄 tsconfig.json                 # TypeScript config
│   │   ├── 📄 package.json                  # Frontend dependencies
│   │   ├── 📄 .gitignore                    # Frontend-specific ignore
│   │   │
│   │   └── 📁 src/
│   │       │
│   │       ├── 📁 screens/
│   │       │   ├── 📄 LoginScreen.js        # Email/password login
│   │       │   ├── 📄 RegisterScreen.js     # Create account
│   │       │   ├── 📄 HomeScreen.js         # Dashboard with streaks
│   │       │   ├── 📄 EmbersScreen.js       # List of embers
│   │       │   ├── 📄 EmbersDetailScreen.js # Tasks for an ember
│   │       │   ├── 📄 CommunitiesScreen.js  # Placeholder
│   │       │   ├── 📄 DmsScreen.js          # Placeholder
│   │       │   └── 📄 ProfileScreen.js      # User profile & edit
│   │       │
│   │       ├── 📁 navigation/
│   │       │   ├── 📄 RootNavigator.js      # Auth vs App stack logic
│   │       │   └── 📄 TabNavigator.js       # Bottom tab navigation
│   │       │
│   │       ├── 📁 hooks/
│   │       │   ├── 📄 useProfile.js         # GET /users/me
│   │       │   ├── 📄 useEmbers.js          # GET /embers
│   │       │   ├── 📄 useTasksByEmber.js    # GET /tasks/ember/:id
│   │       │   ├── 📄 useCompleteTask.js    # POST /tasks/:id/complete
│   │       │   └── 📄 useStreakSummary.js   # GET /streaks/summary
│   │       │
│   │       ├── 📁 store/
│   │       │   └── 📄 authStore.js          # Zustand auth state
│   │       │
│   │       └── 📁 api/
│   │           └── 📄 client.js             # Auth-aware HTTP wrapper
│   │
│   └── 📁 backend/                          # NestJS backend
│       ├── 📄 main.ts (renamed to .js)      # Entry point
│       ├── 📄 app.module.ts (renamed)       # Root module
│       ├── 📄 package.json                  # Backend dependencies
│       ├── 📄 tsconfig.json                 # TypeScript config
│       ├── 📄 jest.config.js                # Jest test config
│       ├── 📄 .env.example                  # Example env vars
│       ├── 📄 .gitignore                    # Backend-specific ignore
│       │
│       ├── 📁 src/
│       │   │
│       │   ├── 📁 common/
│       │   │   ├── 📁 repositories/
│       │   │   │   └── 📄 base.repository.js
│       │   │   └── 📁 guards/
│       │   │       ├── 📄 jwt-auth.guard.js
│       │   │       └── 📄 dev.guard.js
│       │   │
│       │   └── 📁 modules/
│       │       │
│       │       ├── 📁 auth/
│       │       │   ├── 📄 auth.module.js
│       │       │   ├── 📄 auth.service.js
│       │       │   ├── 📄 auth.controller.js
│       │       │   ├── 📄 jwt.strategy.js
│       │       │   └── 📄 auth.service.spec.js
│       │       │
│       │       ├── 📁 users/
│       │       │   ├── 📄 users.module.js
│       │       │   ├── 📄 users.service.js
│       │       │   ├── 📄 users.controller.js
│       │       │   └── 📁 repositories/
│       │       │       └── 📄 users.repository.js
│       │       │
│       │       ├── 📁 embers/
│       │       │   ├── 📄 embers.module.js
│       │       │   ├── 📄 embers.service.js
│       │       │   ├── 📄 embers.controller.js
│       │       │   └── 📁 repositories/
│       │       │       └── 📄 embers.repository.js
│       │       │
│       │       ├── 📁 tasks/
│       │       │   ├── 📄 tasks.module.js
│       │       │   ├── 📄 tasks.service.js
│       │       │   ├── 📄 tasks.controller.js
│       │       │   └── 📁 repositories/
│       │       │       ├── 📄 tasks.repository.js
│       │       │       └── 📄 task-completion-events.repository.js
│       │       │
│       │       ├── 📁 streaks/
│       │       │   ├── 📄 streaks.module.js
│       │       │   ├── 📄 streaks.service.js
│       │       │   ├── 📄 streaks.controller.js
│       │       │   └── 📁 repositories/
│       │       │       └── 📄 streaks.repository.js
│       │       │
│       │       ├── 📁 communities/
│       │       │   ├── 📄 communities.module.js
│       │       │   └── 📄 communities.controller.js
│       │       │
│       │       ├── 📁 dms/
│       │       │   ├── 📄 dms.module.js
│       │       │   └── 📄 dms.controller.js
│       │       │
│       │       ├── 📁 health/
│       │       │   ├── 📄 health.module.js
│       │       │   └── 📄 health.controller.js
│       │       │
│       │       └── 📁 dev/
│       │           ├── 📄 dev.module.js
│       │           ├── 📄 dev.service.js
│       │           └── 📄 dev.controller.js
│       │
│       └── 📁 test/
│           ├── 📄 jest-e2e.json
│           └── 📁 e2e/
│               └── 📄 auth.e2e-spec.js
│
└── 📁 docs/
    ├── 📄 DEV_SEED_AND_DB.md                # Database strategy guide
    └── (Other documentation files)


KEY CONCEPTS BY FOLDER
======================

Frontend (apps/mobile/)
───────────────────────
screens/          → React Native UI components
navigation/       → Navigation logic (Auth, Tabs, Stacks)
hooks/            → React Query hooks for server state
store/            → Zustand for client state (auth)
api/              → HTTP client with auth handling
App.js            → Entry point, wraps with React Query

Backend (apps/backend/)
───────────────────────
modules/          → Feature modules (auth, users, embers, tasks, streaks, etc.)
  └─ Each has: .module.js, .service.js, .controller.js, repositories/
common/           → Shared code (base repository interface, guards)
repositories/     → Swappable data layer (in-memory for now)
test/             → Unit and E2E tests


CRITICAL ENTRY POINTS
═════════════════════

Frontend Start:
  apps/mobile/App.js
    → Wraps app with React Query
    → Renders RootNavigator

Backend Start:
  apps/backend/src/main.js
    → Creates NestJS app
    → Imports AppModule

Module Pattern (Backend):
  1. *.module.js   → Defines module, imports/exports
  2. *.service.js  → Business logic
  3. *.controller.js → HTTP routes
  4. repositories/ → Data access layer


IMPORTANT FILES TO UNDERSTAND
═════════════════════════════

ESSENTIAL (Start here):
  □ apps/mobile/App.js              # Frontend structure
  □ apps/backend/src/main.js        # Backend structure
  □ apps/backend/src/app.module.js  # Module imports

AUTH FLOW:
  □ apps/backend/src/modules/auth/          # JWT, login/register
  □ apps/mobile/src/store/authStore.js      # Client auth state
  □ apps/mobile/src/navigation/RootNavigator.js # Auth vs App

EXAMPLE: Fetching Data:
  □ apps/mobile/src/hooks/useEmbers.js      # React Query hook
  □ apps/backend/src/modules/embers/        # Service + Controller
  □ apps/backend/src/modules/embers/repositories/ # Repository

EXAMPLE: Updating Data:
  □ apps/mobile/src/hooks/useCompleteTask.js
  □ apps/backend/src/modules/tasks/tasks.service.js

DATABASE STRATEGY:
  □ docs/DEV_SEED_AND_DB.md         # How to swap to real DB
  □ apps/backend/src/modules/*/repositories/ # Current implementations
  □ apps/backend/src/common/repositories/base.repository.js # Interface


ROUTING STRUCTURE
═════════════════

Auth Routes (no JWT required):
  POST   /api/v1/auth/register      LoginScreen.js
  POST   /api/v1/auth/login         LoginScreen.js
  POST   /api/v1/auth/refresh       apiClient.js
  POST   /api/v1/auth/logout        (client-side: clear tokens)

Protected Routes (JWT required):
  GET    /api/v1/users/me           useProfile.js
  PATCH  /api/v1/users/me           useProfile.js
  GET    /api/v1/embers             useEmbers.js
  GET    /api/v1/embers/:id         useEmber.js
  GET    /api/v1/tasks/ember/:id    useTasksByEmber.js
  POST   /api/v1/tasks/:id/complete useCompleteTask.js
  GET    /api/v1/streaks/summary    useStreakSummary.js
  POST   /api/v1/streaks/login-ping HomeScreen.js

Dev Routes (x-dev-key required, dev only):
  POST   /api/v1/dev/seed           Postman / curl
  POST   /api/v1/dev/reset          Postman / curl

Health Check:
  GET    /api/v1/health             Monitoring


FILE NAMING PATTERNS
════════════════════

Frontend (React Native):
  screens/NameScreen.js         → UI component for a screen
  hooks/useFeatureName.js       → React Query hook
  api/client.js                 → HTTP wrapper

Backend (NestJS):
  modules/feature/
    ├─ feature.module.js        → Module definition
    ├─ feature.service.js       → Business logic
    ├─ feature.controller.js    → Routes/endpoints
    ├─ feature.service.spec.js  → Unit tests
    └─ repositories/
        └─ feature.repository.js → Data access


NEXT STEPS TO EXTEND
════════════════════

Add a new feature:
  1. Create module folder (apps/backend/src/modules/feature)
  2. Create .module.js, .service.js, .controller.js
  3. Create repository in repositories/
  4. Import module in app.module.js
  5. Create React Query hooks in frontend
  6. Create screens/components in frontend
  7. Update navigation if needed

Add a new database:
  1. Create postgres-*.repository.js implementing same interface
  2. Change ONE line in *.module.js
  3. Everything else works unchanged!


═══════════════════════════════════════════════════════════════════
This structure is BEGINNER-FRIENDLY and PRODUCTION-READY patterns.
No magic. No overengineering. Just clear, explicit code. 
Perfect for learning React Native + NestJS together.
═══════════════════════════════════════════════════════════════════

NOVARI REMASTERED - COMPLETE FOLDER STRUCTURE
==============================================

novari-app/
│
├── 📄 package.json                          # Monorepo root with workspaces
├── 📄 README.md                             # Main documentation
├── 📄 .gitignore                            # Git ignore patterns
│
├── 📁 apps/
│   │
│   ├── 📁 mobile/                           # React Native (Expo) frontend
│   │   ├── 📄 App.js                        # Main entry point
│   │   ├── 📄 app.json                      # Expo configuration
│   │   ├── 📄 babel.config.js               # Babel config
│   │   ├── 📄 metro.config.js               # Metro bundler config
│   │   ├── 📄 tsconfig.json                 # TypeScript config
│   │   ├── 📄 package.json                  # Frontend dependencies
│   │   ├── 📄 .gitignore                    # Frontend-specific ignore
│   │   │
│   │   └── 📁 src/
│   │       │
│   │       ├── 📁 screens/
│   │       │   ├── 📄 LoginScreen.js        # Email/password login
│   │       │   ├── 📄 RegisterScreen.js     # Create account
│   │       │   ├── 📄 HomeScreen.js         # Dashboard with streaks
│   │       │   ├── 📄 EmbersScreen.js       # List of embers
│   │       │   ├── 📄 EmbersDetailScreen.js # Tasks for an ember
│   │       │   ├── 📄 CommunitiesScreen.js  # Placeholder
│   │       │   ├── 📄 DmsScreen.js          # Placeholder
│   │       │   └── 📄 ProfileScreen.js      # User profile & edit
│   │       │
│   │       ├── 📁 navigation/
│   │       │   ├── 📄 RootNavigator.js      # Auth vs App stack logic
│   │       │   └── 📄 TabNavigator.js       # Bottom tab navigation
│   │       │
│   │       ├── 📁 hooks/
│   │       │   ├── 📄 useProfile.js         # GET /users/me
│   │       │   ├── 📄 useEmbers.js          # GET /embers
│   │       │   ├── 📄 useTasksByEmber.js    # GET /tasks/ember/:id
│   │       │   ├── 📄 useCompleteTask.js    # POST /tasks/:id/complete
│   │       │   └── 📄 useStreakSummary.js   # GET /streaks/summary
│   │       │
│   │       ├── 📁 store/
│   │       │   └── 📄 authStore.js          # Zustand auth state
│   │       │
│   │       └── 📁 api/
│   │           └── 📄 client.js             # Auth-aware HTTP wrapper
│   │
│   └── 📁 backend/                          # NestJS backend
│       ├── 📄 main.ts (renamed to .js)      # Entry point
│       ├── 📄 app.module.ts (renamed)       # Root module
│       ├── 📄 package.json                  # Backend dependencies
│       ├── 📄 tsconfig.json                 # TypeScript config
│       ├── 📄 jest.config.js                # Jest test config
│       ├── 📄 .env.example                  # Example env vars
│       ├── 📄 .gitignore                    # Backend-specific ignore
│       │
│       ├── 📁 src/
│       │   │
│       │   ├── 📁 common/
│       │   │   ├── 📁 repositories/
│       │   │   │   └── 📄 base.repository.js
│       │   │   └── 📁 guards/
│       │   │       ├── 📄 jwt-auth.guard.js
│       │   │       └── 📄 dev.guard.js
│       │   │
│       │   └── 📁 modules/
│       │       │
│       │       ├── 📁 auth/
│       │       │   ├── 📄 auth.module.js
│       │       │   ├── 📄 auth.service.js
│       │       │   ├── 📄 auth.controller.js
│       │       │   ├── 📄 jwt.strategy.js
│       │       │   └── 📄 auth.service.spec.js
│       │       │
│       │       ├── 📁 users/
│       │       │   ├── 📄 users.module.js
│       │       │   ├── 📄 users.service.js
│       │       │   ├── 📄 users.controller.js
│       │       │   └── 📁 repositories/
│       │       │       └── 📄 users.repository.js
│       │       │
│       │       ├── 📁 embers/
│       │       │   ├── 📄 embers.module.js
│       │       │   ├── 📄 embers.service.js
│       │       │   ├── 📄 embers.controller.js
│       │       │   └── 📁 repositories/
│       │       │       └── 📄 embers.repository.js
│       │       │
│       │       ├── 📁 tasks/
│       │       │   ├── 📄 tasks.module.js
│       │       │   ├── 📄 tasks.service.js
│       │       │   ├── 📄 tasks.controller.js
│       │       │   └── 📁 repositories/
│       │       │       ├── 📄 tasks.repository.js
│       │       │       └── 📄 task-completion-events.repository.js
│       │       │
│       │       ├── 📁 streaks/
│       │       │   ├── 📄 streaks.module.js
│       │       │   ├── 📄 streaks.service.js
│       │       │   ├── 📄 streaks.controller.js
│       │       │   └── 📁 repositories/
│       │       │       └── 📄 streaks.repository.js
│       │       │
│       │       ├── 📁 communities/
│       │       │   ├── 📄 communities.module.js
│       │       │   └── 📄 communities.controller.js
│       │       │
│       │       ├── 📁 dms/
│       │       │   ├── 📄 dms.module.js
│       │       │   └── 📄 dms.controller.js
│       │       │
│       │       ├── 📁 health/
│       │       │   ├── 📄 health.module.js
│       │       │   └── 📄 health.controller.js
│       │       │
│       │       └── 📁 dev/
│       │           ├── 📄 dev.module.js
│       │           ├── 📄 dev.service.js
│       │           └── 📄 dev.controller.js
│       │
│       └── 📁 test/
│           ├── 📄 jest-e2e.json
│           └── 📁 e2e/
│               └── 📄 auth.e2e-spec.js
│
└── 📁 docs/
    ├── 📄 DEV_SEED_AND_DB.md                # Database strategy guide
    └── (Other documentation files)


KEY CONCEPTS BY FOLDER
======================

Frontend (apps/mobile/)
───────────────────────
screens/          → React Native UI components
navigation/       → Navigation logic (Auth, Tabs, Stacks)
hooks/            → React Query hooks for server state
store/            → Zustand for client state (auth)
api/              → HTTP client with auth handling
App.js            → Entry point, wraps with React Query

Backend (apps/backend/)
───────────────────────
modules/          → Feature modules (auth, users, embers, tasks, streaks, etc.)
  └─ Each has: .module.js, .service.js, .controller.js, repositories/
common/           → Shared code (base repository interface, guards)
repositories/     → Swappable data layer (in-memory for now)
test/             → Unit and E2E tests


CRITICAL ENTRY POINTS
═════════════════════

Frontend Start:
  apps/mobile/App.js
    → Wraps app with React Query
    → Renders RootNavigator

Backend Start:
  apps/backend/src/main.js
    → Creates NestJS app
    → Imports AppModule

Module Pattern (Backend):
  1. *.module.js   → Defines module, imports/exports
  2. *.service.js  → Business logic
  3. *.controller.js → HTTP routes
  4. repositories/ → Data access layer


IMPORTANT FILES TO UNDERSTAND
═════════════════════════════

ESSENTIAL (Start here):
  □ apps/mobile/App.js              # Frontend structure
  □ apps/backend/src/main.js        # Backend structure
  □ apps/backend/src/app.module.js  # Module imports

AUTH FLOW:
  □ apps/backend/src/modules/auth/          # JWT, login/register
  □ apps/mobile/src/store/authStore.js      # Client auth state
  □ apps/mobile/src/navigation/RootNavigator.js # Auth vs App

EXAMPLE: Fetching Data:
  □ apps/mobile/src/hooks/useEmbers.js      # React Query hook
  □ apps/backend/src/modules/embers/        # Service + Controller
  □ apps/backend/src/modules/embers/repositories/ # Repository

EXAMPLE: Updating Data:
  □ apps/mobile/src/hooks/useCompleteTask.js
  □ apps/backend/src/modules/tasks/tasks.service.js

DATABASE STRATEGY:
  □ docs/DEV_SEED_AND_DB.md         # How to swap to real DB
  □ apps/backend/src/modules/*/repositories/ # Current implementations
  □ apps/backend/src/common/repositories/base.repository.js # Interface


ROUTING STRUCTURE
═════════════════

Auth Routes (no JWT required):
  POST   /api/v1/auth/register      LoginScreen.js
  POST   /api/v1/auth/login         LoginScreen.js
  POST   /api/v1/auth/refresh       apiClient.js
  POST   /api/v1/auth/logout        (client-side: clear tokens)

Protected Routes (JWT required):
  GET    /api/v1/users/me           useProfile.js
  PATCH  /api/v1/users/me           useProfile.js
  GET    /api/v1/embers             useEmbers.js
  GET    /api/v1/embers/:id         useEmber.js
  GET    /api/v1/tasks/ember/:id    useTasksByEmber.js
  POST   /api/v1/tasks/:id/complete useCompleteTask.js
  GET    /api/v1/streaks/summary    useStreakSummary.js
  POST   /api/v1/streaks/login-ping HomeScreen.js

Dev Routes (x-dev-key required, dev only):
  POST   /api/v1/dev/seed           Postman / curl
  POST   /api/v1/dev/reset          Postman / curl

Health Check:
  GET    /api/v1/health             Monitoring


FILE NAMING PATTERNS
════════════════════

Frontend (React Native):
  screens/NameScreen.js         → UI component for a screen
  hooks/useFeatureName.js       → React Query hook
  api/client.js                 → HTTP wrapper

Backend (NestJS):
  modules/feature/
    ├─ feature.module.js        → Module definition
    ├─ feature.service.js       → Business logic
    ├─ feature.controller.js    → Routes/endpoints
    ├─ feature.service.spec.js  → Unit tests
    └─ repositories/
        └─ feature.repository.js → Data access


NEXT STEPS TO EXTEND
════════════════════

Add a new feature:
  1. Create module folder (apps/backend/src/modules/feature)
  2. Create .module.js, .service.js, .controller.js
  3. Create repository in repositories/
  4. Import module in app.module.js
  5. Create React Query hooks in frontend
  6. Create screens/components in frontend
  7. Update navigation if needed

Add a new database:
  1. Create postgres-*.repository.js implementing same interface
  2. Change ONE line in *.module.js
  3. Everything else works unchanged!


═══════════════════════════════════════════════════════════════════
This structure is BEGINNER-FRIENDLY and PRODUCTION-READY patterns.
No magic. No overengineering. Just clear, explicit code. 
Perfect for learning React Native + NestJS together.
═══════════════════════════════════════════════════════════════════

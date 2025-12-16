# 🔥 Novari Remastered - Foundation Architecture

**A mobile-first app for personal growth through Embers, Tasks, and Streaks.**

This is a **learning foundation**—simple, clean, and ready to extend. Built with React Native (Expo) on the frontend and NestJS on the backend.

---

## 🎯 Quick Start

### Prerequisites
- Node.js 18+
- Android Studio emulator (or iOS simulator)
- Expo CLI: `npm install -g expo-cli`

### Installation

```bash
# Install all dependencies
cd f:\Projects\novari-app
npm install:all

# Start backend
cd apps/backend
npm run dev
# Backend runs on http://localhost:3000

# In another terminal, start frontend
cd apps/mobile
npm start
# Choose 'a' for Android or 'i' for iOS
```

### First Run - Seed Demo Data

```bash
# In another terminal
curl -X POST http://localhost:3000/api/v1/dev/seed \
  -H "x-dev-key: dev-seed-key-123"

# Login with demo account:
# Email: demo@novari.dev
# Password: DemoPass123!
```

---

## 📁 Project Structure

```
novari-app/
├── apps/
│   ├── mobile/
│   │   ├── src/
│   │   │   ├── screens/        # All UI screens
│   │   │   ├── navigation/     # Navigation logic
│   │   │   ├── hooks/          # React Query hooks (useEmbers, useProfile, etc)
│   │   │   ├── store/          # Zustand client state (auth)
│   │   │   └── api/            # API client & fetch wrapper
│   │   ├── App.js              # Entry point
│   │   ├── app.json            # Expo config
│   │   └── package.json
│   │
│   └── backend/
│       ├── src/
│       │   ├── modules/
│       │   │   ├── auth/       # Login, register, JWT
│       │   │   ├── users/      # User profile
│       │   │   ├── embers/     # Embers (areas of growth)
│       │   │   ├── tasks/      # Tasks & completion events
│       │   │   ├── streaks/    # Streak calculation
│       │   │   ├── communities/ # (placeholder)
│       │   │   ├── dms/        # (placeholder)
│       │   │   ├── health/     # Health check
│       │   │   └── dev/        # Seed & reset (dev only)
│       │   ├── common/
│       │   │   ├── repositories/ # Base repo interface
│       │   │   └── guards/       # JWT guard, Dev guard
│       │   ├── main.js         # Entry point
│       │   └── app.module.js   # Root module
│       ├── test/               # E2E tests
│       └── package.json
│
├── docs/
│   └── DEV_SEED_AND_DB.md      # Database strategy & seed guide
│
├── package.json                # Monorepo root
└── README.md
```

---

## 🏗️ Architecture Decisions

### Frontend (React Native + Expo)

**Navigation:**
- Bottom Tab Navigator (Home, Embers, Communities, DMs, Profile)
- Stack Navigator for nested screens (EmberDetail inside Embers tab)
- Auth Stack (Login/Register) shown until user logs in

**State Management:**
- **Zustand** for client state: auth, user role, session
- **React Query** for server state: embers, tasks, streaks, profile
- Cache strategy: offline-first (load from cache, refresh in background)

**Data Fetching:**
- Custom `apiClient` handles:
  - Authorization header injection
  - Token refresh on 401 (TODO)
  - Error handling

**Styling:**
- React Native StyleSheet (no CSS)
- Inline styles for simplicity and learning

### Backend (NestJS)

**Modules:**
- Each module is independent (auth, users, embers, tasks, streaks, etc.)
- Services handle business logic
- Controllers expose HTTP endpoints
- Repositories abstract data layer (in-memory for now)

**Database Strategy:**
- Currently: **in-memory repositories**
- Swappable via NestJS dependency injection
- See [DEV_SEED_AND_DB.md](docs/DEV_SEED_AND_DB.md) for migration guide

**API Structure:**
- Global prefix: `/api/v1`
- All endpoints return JSON
- Consistent error handling

---

## 🔑 Domain Model

### Embers & Tasks

- **Embers** = areas of growth (e.g., "Purpose & Goal Setting")
- **Tasks** = actions within an ember (e.g., "Write five goals")
- Each task references its parent ember via `emberId`

### Streaks (Two Types)

1. **Login Streak** — consecutive days user logs in
2. **Task Completion Streak** — consecutive days with at least 1 completed task

Both track:
- Current streak
- Best streak
- Last activity date
- Task streak also tracks lifetime completed task count

---

## 📡 API Routes

### Auth
```
POST   /api/v1/auth/register      # Create account
POST   /api/v1/auth/login         # Login
POST   /api/v1/auth/refresh       # Refresh token
POST   /api/v1/auth/logout        # Logout
POST   /api/v1/auth/google        # OAuth (placeholder)
```

### Users
```
GET    /api/v1/users/me           # Get profile
PATCH  /api/v1/users/me           # Update profile
```

### Embers
```
GET    /api/v1/embers             # Get all embers
GET    /api/v1/embers/:id         # Get single ember
```

### Tasks
```
GET    /api/v1/tasks/ember/:emberId      # Get tasks for ember
POST   /api/v1/tasks/:taskId/complete    # Mark task complete
```

### Streaks
```
GET    /api/v1/streaks/summary           # Get streak summary
POST   /api/v1/streaks/login-ping        # Record login
```

### Dev (Protected)
```
POST   /api/v1/dev/seed           # Seed database with demo data
POST   /api/v1/dev/reset          # Clear all data
```

---

## 🚀 How to Extend

### Add a New Tab Screen

1. **Create the screen component:**
   ```javascript
   // apps/mobile/src/screens/MyNewScreen.js
   import React from 'react';
   import { View, Text, StyleSheet } from 'react-native';

   export default function MyNewScreen() {
     return (
       <View style={styles.container}>
         <Text>My New Screen</Text>
       </View>
     );
   }

   const styles = StyleSheet.create({
     container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
   });
   ```

2. **Add to TabNavigator:**
   ```javascript
   // In apps/mobile/src/navigation/TabNavigator.js
   import MyNewScreen from '../screens/MyNewScreen';

   // Inside TabNavigator() return statement:
   <Tab.Screen
     name="MyTab"
     component={MyNewScreen}
     options={{
       tabBarLabel: 'My Tab',
       tabBarIcon: ({ color }) => <Text style={{ color }}>🆕</Text>,
     }}
   />
   ```

### Add a New NestJS Module

1. **Create module structure:**
   ```
   apps/backend/src/modules/my-feature/
   ├── my-feature.module.js
   ├── my-feature.service.js
   ├── my-feature.controller.js
   └── repositories/
       └── my-feature.repository.js
   ```

2. **Implement the module:**
   ```javascript
   // my-feature.module.js
   import { Module } from '@nestjs/common';
   import { MyFeatureService } from './my-feature.service';
   import { MyFeatureController } from './my-feature.controller';
   import { MyFeatureRepository } from './repositories/my-feature.repository';

   @Module({
     providers: [
       MyFeatureService,
       { provide: 'MyFeatureRepository', useClass: MyFeatureRepository }
     ],
     controllers: [MyFeatureController],
     exports: ['MyFeatureRepository'],
   })
   export class MyFeatureModule {}
   ```

3. **Add to app.module.js:**
   ```javascript
   import { MyFeatureModule } from './modules/my-feature/my-feature.module';

   @Module({
     imports: [
       // ... other modules
       MyFeatureModule,
     ],
   })
   export class AppModule {}
   ```

### Add a New React Query Hook

```javascript
// apps/mobile/src/hooks/useMyData.js
import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/client';

export function useMyData() {
  return useQuery({
    queryKey: ['myData'],
    queryFn: async () => {
      return apiClient.get('/my-data');
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
}
```

Usage in component:
```javascript
const { data, isLoading, error } = useMyData();
```

### Add a New API Endpoint

1. **Add method to service:**
   ```javascript
   // embers.service.js
   async updateEmber(id, data) {
     return this.embersRepository.update(id, data);
   }
   ```

2. **Add route to controller:**
   ```javascript
   // embers.controller.js
   @Patch(':id')
   async updateEmber(@Param('id') id, @Body() data) {
     return this.embersService.updateEmber(parseInt(id, 10), data);
   }
   ```

3. **Create hook for frontend:**
   ```javascript
   // useUpdateEmber.js
   export function useUpdateEmber() {
     const queryClient = useQueryClient();
     return useMutation({
       mutationFn: ({ id, data }) => apiClient.patch(`/embers/${id}`, data),
       onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['embers'] });
       },
     });
   }
   ```

### Add a New Repository Method

```javascript
// embers.repository.js
async findByTitle(title) {
  for (const ember of this.embers.values()) {
    if (ember.title === title) {
      return ember;
    }
  }
  return null;
}
```

Later, when switching to a database, update only the repository file. All code using the interface continues to work!

### Add a New Entity (e.g., Goals)

1. Create the module structure (like "Add a New NestJS Module" above)
2. Create an in-memory repository
3. Create service with CRUD operations
4. Create controller with routes
5. Import in app.module.js
6. Create React Query hooks in frontend
7. Create UI screens to display data

---

## 🧪 Testing

### Run Unit Tests
```bash
cd apps/backend
npm test
```

### Run E2E Tests
```bash
cd apps/backend
npm run test:e2e
```

### Example Test
See [auth.service.spec.js](apps/backend/src/modules/auth/auth.service.spec.js) for unit test example.

---

## 🗄️ Database Strategy

Currently using **in-memory repositories**. See [DEV_SEED_AND_DB.md](docs/DEV_SEED_AND_DB.md) for:
- How to swap to PostgreSQL
- How to swap to Firebase
- How to add a database migration
- Recommended database schema

---

## 📝 Key Files to Know

- **Frontend entry:** [apps/mobile/App.js](apps/mobile/App.js)
- **Backend entry:** [apps/backend/src/main.js](apps/backend/src/main.js)
- **Auth flow:** [apps/backend/src/modules/auth/](apps/backend/src/modules/auth/)
- **API client:** [apps/mobile/src/api/client.js](apps/mobile/src/api/client.js)
- **Root navigation:** [apps/mobile/src/navigation/RootNavigator.js](apps/mobile/src/navigation/RootNavigator.js)
- **Common guards:** [apps/backend/src/common/guards/](apps/backend/src/common/guards/)

---

## 🐛 Development Tips

### Debug Backend
```bash
# Backend logs show all requests
# Check apps/backend/src/main.js for CORS config

# Test an endpoint with curl:
curl -X GET http://localhost:3000/api/v1/health
```

### Debug Frontend
```bash
# Check Expo console for logs
# Use React Query DevTools (TODO: add to app)
# Check browser DevTools if running on web
```

### Reset Everything
```bash
# Clear backend
curl -X POST http://localhost:3000/api/v1/dev/reset \
  -H "x-dev-key: dev-seed-key-123"

# Re-seed
curl -X POST http://localhost:3000/api/v1/dev/seed \
  -H "x-dev-key: dev-seed-key-123"
```

---

## 🎓 Learning Goals

This scaffold teaches:

- **React Native fundamentals** (components, navigation, state management)
- **REST API design** (NestJS modules, controllers, services)
- **Separation of concerns** (controllers, services, repositories)
- **Data layer abstraction** (swappable repositories)
- **Authentication** (JWT, token refresh)
- **Streak logic** (date calculations, streak reset)
- **Testing** (unit tests, E2E tests)

---

## 📚 Next Steps

1. ✅ Backend running and seeded
2. ✅ Frontend login/register working
3. ✅ View embers and tasks
4. ✅ Complete tasks and see streaks update
5. **TODO:** Add real database (Postgres or Firebase)
6. **TODO:** Add communities feature
7. **TODO:** Add DMs feature
8. **TODO:** Add goals/programs entities
9. **TODO:** Add push notifications
10. **TODO:** Add offline sync

---

## 🔒 Environment Variables

### Backend (.env)
```
NODE_ENV=development
PORT=3000
JWT_SECRET=dev-secret-key-change-in-production
JWT_REFRESH_SECRET=dev-refresh-secret-change-in-production
DEV_SEED_KEY=dev-seed-key-123
# DATABASE_URL=postgresql://user:pass@localhost:5432/novari
```

### Frontend (app.json)
```
"extra": {
  "apiUrl": "http://localhost:3000/api/v1"
}
```

---

## 📖 Documentation

- [DEV_SEED_AND_DB.md](docs/DEV_SEED_AND_DB.md) — Database strategy & seeding guide
- [README.md](README.md) — This file
- Every source file has detailed comments

---

## 🤝 Contributing

When adding features:
1. Add comments explaining what and why
2. Keep things simple and explicit
3. Follow existing patterns
4. Test your changes
5. Update documentation

---

## 📄 License

MIT

---

**Happy learning! Build something amazing! 🚀**

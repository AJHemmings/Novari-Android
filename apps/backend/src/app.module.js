// Root application module
// Imports and configures all feature modules
// How to add a new module:
// 1. Create a new folder in src/modules/feature-name
// 2. Create feature.module.js with @Module decorator
// 3. Import it below in the imports array
// 4. Configure any database connections or global services

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

// Import all feature modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { EmbersModule } from './modules/embers/embers.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { StreaksModule } from './modules/streaks/streaks.module';
import { CommunitiesModule } from './modules/communities/communities.module';
import { DmsModule } from './modules/dms/dms.module';
import { HealthModule } from './modules/health/health.module';
import { DevModule } from './modules/dev/dev.module';

@Module({
  imports: [
    // Load environment variables (create .env file in root)
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // JWT configuration - used across app
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'dev-secret-key-change-in-production',
      signOptions: { expiresIn: '24h' },
    }),

    // Passport for authentication strategies
    PassportModule,

    // Feature modules
    AuthModule,
    UsersModule,
    EmbersModule,
    TasksModule,
    StreaksModule,
    CommunitiesModule,
    DmsModule,
    HealthModule,
    DevModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

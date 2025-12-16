// Backend entry point
// Initializes NestJS application with all modules and middleware

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for React Native/Expo development
  app.enableCors({
    origin: [
      'http://localhost:8081',
      'http://localhost:8082',
      'http://localhost:3000'
    ],
    credentials: true,
  });

  // Global validation pipe for all DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // Global API prefix
  app.setGlobalPrefix('api/v1');

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Backend running on http://localhost:${port}`);
}

bootstrap();

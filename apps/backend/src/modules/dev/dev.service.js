// Dev service - handles seed and reset operations
//
// IMPORTANT: These operations are dev-only (guarded by DevGuard)
// Protected by x-dev-key header matching DEV_SEED_KEY
// Only runs when NODE_ENV === 'development'
//
// How to add new seed data:
// 1. Add it to seedData() below
// 2. Re-call POST /api/v1/dev/reset then POST /api/v1/dev/seed

import { Injectable } from '@nestjs/common';

@Injectable()
export class DevService {
  constructor(
    usersRepository,
    embersRepository,
    tasksRepository,
    streaksRepository
  ) {
    this.usersRepository = usersRepository;
    this.embersRepository = embersRepository;
    this.tasksRepository = tasksRepository;
    this.streaksRepository = streaksRepository;
  }

  /**
   * Seed database with demo data
   * POST /api/v1/dev/seed
   * @returns { message, counts }
   */
  async seed() {
    const counts = {
      usersCreated: 0,
      embersCreated: 0,
      tasksCreated: 0,
      streaksInitialized: 0,
    };

    // Seed users
    const demoUser = await this.usersRepository.create({
      email: 'demo@novari.dev',
      password: '$2b$10$1234567890abcdefghijklmnopqrst', // bcrypt hash of DemoPass123! (stub)
      role: 'admin',
    });
    counts.usersCreated++;

    // Seed embers (areas of growth)
    const emberData = [
      {
        title: 'Purpose & Goal Setting',
        description: 'Define your purpose and set meaningful goals',
        icon: '🎯',
      },
      {
        title: 'Physical Health',
        description: 'Exercise, nutrition, and sleep habits',
        icon: '💪',
      },
      {
        title: 'Mental Wellness',
        description: 'Meditation, mindfulness, and stress management',
        icon: '🧠',
      },
      {
        title: 'Learning & Growth',
        description: 'Develop new skills and knowledge',
        icon: '📚',
      },
      {
        title: 'Relationships',
        description: 'Strengthen connections with others',
        icon: '🤝',
      },
    ];

    const embers = [];
    for (const data of emberData) {
      const ember = await this.embersRepository.create(data);
      embers.push(ember);
      counts.embersCreated++;
    }

    // Seed tasks for each ember
    const tasksData = {
      0: [
        'Write down your top 3 goals for this year',
        'Create an action plan for your primary goal',
        'Reflect on your progress this week',
      ],
      1: [
        'Complete a 30-minute workout',
        'Drink 8 glasses of water today',
        'Go for a 20-minute walk',
      ],
      2: [
        'Meditate for 10 minutes',
        'Practice gratitude - list 5 things you\'re grateful for',
        'Do a breathing exercise',
      ],
      3: [
        'Read 1 chapter from a book',
        'Take an online course lesson',
        'Learn something new and teach someone about it',
      ],
      4: [
        'Call or message a friend',
        'Have a meaningful conversation',
        'Do something kind for someone',
      ],
    };

    for (let i = 0; i < embers.length; i++) {
      const ember = embers[i];
      const tasks = tasksData[i] || [];

      for (const title of tasks) {
        await this.tasksRepository.create({
          emberId: ember.id,
          title,
          description: '',
          isCompleted: false,
        });
        counts.tasksCreated++;
      }
    }

    // Initialize streaks for demo user
    await this.streaksRepository.initializeForUser(demoUser.id);
    counts.streaksInitialized++;

    return {
      message: 'Database seeded successfully',
      counts,
      demoUser: {
        email: 'demo@novari.dev',
        password: 'DemoPass123!',
        role: 'admin',
        message: 'Use these credentials to login via mobile app',
      },
    };
  }

  /**
   * Reset database - clear all data
   * POST /api/v1/dev/reset
   * @returns { message, counts }
   */
  async reset() {
    const counts = {
      usersCleared: (await this.usersRepository.findAll()).length,
      embersCleared: (await this.embersRepository.findAll()).length,
      tasksCleared: (await this.tasksRepository.findAll()).length,
      streaksCleared: 0, // Can't easily count in-memory maps
    };

    // Clear all repositories
    await this.usersRepository.clear();
    await this.embersRepository.clear();
    await this.tasksRepository.clear();
    await this.streaksRepository.clear();

    return {
      message: 'Database reset successfully',
      counts,
    };
  }
}

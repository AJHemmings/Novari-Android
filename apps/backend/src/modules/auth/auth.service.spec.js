// Example unit test for AuthService
// How to add unit tests:
// 1. Create file.spec.js next to the file being tested
// 2. Import the class and any dependencies
// 3. Mock dependencies using jest.mock()
// 4. Write test cases with describe() and it()
// 5. Run: npm run test

import { AuthService } from './auth.service';

// Mock the dependencies
jest.mock('../users/repositories/users.repository');

describe('AuthService', () => {
  let service;
  let mockUsersRepository;
  let mockJwtService;

  beforeEach(() => {
    // Setup mocks
    mockUsersRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };

    mockJwtService = {
      sign: jest.fn().mockReturnValue('mock-token'),
      verify: jest.fn(),
    };

    // Create service instance with mocks
    service = new AuthService(mockUsersRepository, mockJwtService);
  });

  describe('register', () => {
    it('should create a new user and return tokens', async () => {
      const email = 'test@example.com';
      const password = 'password123';

      mockUsersRepository.findByEmail.mockResolvedValue(null);
      mockUsersRepository.create.mockResolvedValue({
        id: 1,
        email,
        role: 'user',
      });

      const result = await service.register(email, password);

      expect(result.user.email).toBe(email);
      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();
    });

    it('should throw error if email already exists', async () => {
      const email = 'existing@example.com';

      mockUsersRepository.findByEmail.mockResolvedValue({ id: 1, email });

      await expect(service.register(email, 'password')).rejects.toThrow(
        'Email already registered'
      );
    });
  });

  describe('login', () => {
    it('should return tokens if credentials are valid', async () => {
      const email = 'test@example.com';
      const password = 'password123';

      mockUsersRepository.findByEmail.mockResolvedValue({
        id: 1,
        email,
        password: '$2b$10$mockedHashedPassword',
        role: 'user',
      });

      // Note: In real test, you'd need to mock bcrypt too
      // This is a simplified example

      // const result = await service.login(email, password);
      // expect(result.user.email).toBe(email);
    });
  });
});

import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('AuthService', () => {
  const prisma = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    refreshToken: {
      create: jest.fn(),
      findFirst: jest.fn(),
      deleteMany: jest.fn(),
    },
  };

  const jwt = {
    signAsync: jest.fn(),
  };

  let service: AuthService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new AuthService(prisma as any, jwt as any);
  });

  it('should reject register without email/password', async () => {
    await expect(service.register(undefined, 'password')).rejects.toBeInstanceOf(BadRequestException);
    await expect(service.register('demo@example.com', undefined)).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should reject register when email already exists', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: 'u1' });

    await expect(service.register('demo@example.com', 'password')).rejects.toBeInstanceOf(BadRequestException);
    expect(prisma.user.create).not.toHaveBeenCalled();
  });

  it('should register user with normalized email', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');
    prisma.user.create.mockResolvedValue({
      id: 'u1',
      email: 'demo.user@example.com',
      role: 'USER',
      createdAt: new Date('2026-01-01T00:00:00Z'),
    });

    const result = await service.register(' Demo.User@Example.com ', 'password123');

    expect(result).toEqual(
      expect.objectContaining({
        email: 'demo.user@example.com',
      }),
    );
    expect(prisma.user.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ email: 'demo.user@example.com' }),
      }),
    );
  });

  it('should reject login when user does not exist', async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    await expect(service.login('missing@example.com', 'password')).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('should reject login with invalid password', async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 'u1',
      email: 'demo.user@example.com',
      role: 'USER',
      passwordHash: 'hash',
    });
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(service.login('demo.user@example.com', 'wrong-password')).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });

  it('should login and return tokens for valid credentials', async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 'u1',
      email: 'demo.user@example.com',
      role: 'USER',
      passwordHash: 'hash',
    });
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    jwt.signAsync.mockResolvedValue('access-token');
    prisma.refreshToken.create.mockResolvedValue({ id: 'rt1' });

    const result = await service.login('demo.user@example.com', 'password');

    expect(result.accessToken).toBe('access-token');
    expect(result.refreshToken).toEqual(expect.any(String));
    expect(prisma.refreshToken.create).toHaveBeenCalled();
  });

  it('should reject refresh without token', async () => {
    await expect(service.refresh(undefined)).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('should refresh access token for valid refresh token', async () => {
    prisma.refreshToken.findFirst.mockResolvedValue({
      id: 'rt1',
      tokenHash: 'hash',
      expiresAt: new Date(Date.now() + 60_000),
      user: {
        id: 'u1',
        email: 'demo.user@example.com',
        role: 'USER',
      },
    });
    jwt.signAsync.mockResolvedValue('new-access-token');

    const result = await service.refresh('refresh-token-value');

    expect(result).toEqual({ accessToken: 'new-access-token' });
  });

  it('should logout gracefully even without refresh token', async () => {
    const result = await service.logout(undefined);

    expect(result).toEqual({ ok: true });
    expect(prisma.refreshToken.deleteMany).not.toHaveBeenCalled();
  });
});

import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { createHash, randomBytes } from "crypto";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService
  ) {}

  private hashToken(raw: string) {
    return createHash("sha256").update(raw).digest("hex");
  }

  async register(email?: string, password?: string) {
    if (!email || !password) {
      throw new BadRequestException("email and password are required");
    }

    const normalized = email.trim().toLowerCase();

    const exists = await this.prisma.user.findUnique({
      where: { email: normalized },
    });

    if (exists) {
      throw new BadRequestException("Email already registered");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: normalized,
        passwordHash,
      },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return user;
  }

  async login(email?: string, password?: string) {
    if (!email || !password) {
      throw new BadRequestException("email and password are required");
    }

    const normalized = email.trim().toLowerCase();

    const user = await this.prisma.user.findUnique({
      where: { email: normalized },
    });

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const passwordValid = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!passwordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const accessToken = await this.jwt.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshRaw = randomBytes(48).toString("hex");
    const refreshHash = this.hashToken(refreshRaw);

    const expiresAt = new Date(
      Date.now() + 1000 * 60 * 60 * 24 * 14
    );

    await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash: refreshHash,
        expiresAt,
      },
    });

    return {
      accessToken,
      refreshToken: refreshRaw,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  async refresh(refreshToken?: string) {
    if (!refreshToken?.trim()) {
      throw new UnauthorizedException("Missing refresh token");
    }

    const tokenHash = this.hashToken(refreshToken);

    const found = await this.prisma.refreshToken.findFirst({
      where: { tokenHash },
      include: { user: true },
    });

    if (!found) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    if (found.expiresAt.getTime() < Date.now()) {
      throw new UnauthorizedException("Refresh token expired");
    }

    const accessToken = await this.jwt.signAsync({
      sub: found.user.id,
      email: found.user.email,
      role: found.user.role,
    });

    return { accessToken };
  }

  async logout(refreshToken?: string) {
    if (!refreshToken?.trim()) {
      return { ok: true };
    }

    const tokenHash = this.hashToken(refreshToken);

    await this.prisma.refreshToken.deleteMany({
      where: { tokenHash },
    });

    return { ok: true };
  }
}
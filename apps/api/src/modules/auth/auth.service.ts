import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '@/common/prisma/prisma.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private usersService: UsersService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN') || '7d',
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
        role: user.role,
        avatarUrl: user.avatarUrl,
      },
    };
  }

  async register(data: {
    email: string;
    password: string;
    name: string;
    role: 'FREELANCER' | 'CLIENT';
  }) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        name: data.name,
        role: data.role,
      },
    });

    return this.login(user);
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return this.login(user);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async oauthLogin(provider: string, profile: any) {
    let user = await this.findUserByOAuthProvider(provider, profile.id);

    if (!user) {
      user = await this.createUserFromOAuth(provider, profile);
    }

    return this.login(user);
  }

  private async findUserByOAuthProvider(provider: string, providerId: string) {
    const field = `${provider}Id`;
    return this.prisma.user.findUnique({
      where: { [field]: providerId },
    });
  }

  private async createUserFromOAuth(provider: string, profile: any) {
    const field = `${provider}Id`;
    return this.prisma.user.create({
      data: {
        [field]: profile.id,
        email: profile.emails?.[0]?.value || `${provider}_${profile.id}@temp.com`,
        name: profile.displayName || profile.username,
        username: profile.username,
        avatarUrl: profile.photos?.[0]?.value,
        role: 'FREELANCER',
        emailVerified: true,
      },
    });
  }
}

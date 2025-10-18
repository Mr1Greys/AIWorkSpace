# Безопасность

## 🔒 Security Checklist

### ✅ Authentication & Authorization
- [x] JWT tokens с refresh mechanism
- [x] OAuth providers (GitHub, LinkedIn, Telegram)
- [x] SIWE (Sign-In with Ethereum)
- [x] Password hashing (bcrypt, 10 rounds)
- [x] Email verification
- [x] KYC для Pro tier
- [x] Role-based access control (RBAC)
- [x] Resource ownership validation

### ✅ API Security
- [x] Rate limiting (100-1000 req/min)
- [x] CORS whitelist
- [x] Helmet.js security headers
- [x] Input validation (class-validator)
- [x] SQL injection prevention (Prisma)
- [x] XSS protection
- [x] CSRF tokens

### ✅ File Upload Security
- [x] MIME type validation
- [x] File size limits (20MB)
- [x] Virus scanning (ClamAV)
- [x] Signed URLs для приватных файлов
- [x] Watermarks для превью

### ✅ Blockchain Security
- [x] ReentrancyGuard
- [x] Multi-sig для арбитража
- [x] Gas optimization
- [x] Contract audits
- [x] Timelock для изменений

### ✅ Data Protection
- [x] HTTPS only
- [x] Database encryption at rest
- [x] Secrets management (env vars)
- [x] GDPR compliance
- [x] Data anonymization

---

## 🛡️ Rate Limiting

### Configuration

```typescript
// main.ts
import rateLimit from 'express-rate-limit';

// Global rate limiter
app.use(
  rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // 100 requests per minute
    message: 'Too many requests from this IP',
    standardHeaders: true,
    legacyHeaders: false
  })
);

// Auth endpoints (stricter)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  skipSuccessfulRequests: true
});

app.use('/auth/login', authLimiter);
app.use('/auth/register', authLimiter);
```

### Per-endpoint limits

```typescript
import { Throttle } from '@nestjs/throttler';

@Controller('offers')
export class OffersController {
  // Free tier: 5 offers per day
  @Post()
  @Throttle(5, 86400)
  @UseGuards(ThrottlerGuard, FreeTierGuard)
  async create(@Body() dto: CreateOfferDto) {
    return this.offersService.create(dto);
  }
}
```

### Redis-based rate limiting

```typescript
import Redis from 'ioredis';

export class RateLimiterService {
  constructor(private redis: Redis) {}
  
  async checkLimit(
    key: string,
    limit: number,
    window: number
  ): Promise<boolean> {
    const current = await this.redis.incr(key);
    
    if (current === 1) {
      await this.redis.expire(key, window);
    }
    
    return current <= limit;
  }
  
  async getRemainingRequests(
    key: string,
    limit: number
  ): Promise<number> {
    const current = await this.redis.get(key);
    return Math.max(0, limit - parseInt(current || '0'));
  }
}
```

---

## 🔐 Authentication

### JWT Strategy

```typescript
// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET')
    });
  }
  
  async validate(payload: any) {
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role
    };
  }
}
```

### Refresh Tokens

```typescript
// auth.service.ts
async refreshTokens(refreshToken: string) {
  try {
    const payload = this.jwtService.verify(refreshToken, {
      secret: this.config.get('JWT_REFRESH_SECRET')
    });
    
    const user = await this.usersService.findOne(payload.sub);
    
    if (!user || user.refreshToken !== refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    
    return this.generateTokens(user);
  } catch (error) {
    throw new UnauthorizedException('Invalid refresh token');
  }
}

private async generateTokens(user: User) {
  const payload = { sub: user.id, email: user.email, role: user.role };
  
  const [accessToken, refreshToken] = await Promise.all([
    this.jwtService.signAsync(payload, {
      secret: this.config.get('JWT_SECRET'),
      expiresIn: '15m'
    }),
    this.jwtService.signAsync(payload, {
      secret: this.config.get('JWT_REFRESH_SECRET'),
      expiresIn: '7d'
    })
  ]);
  
  // Save refresh token hash
  await this.usersService.update(user.id, {
    refreshToken: await bcrypt.hash(refreshToken, 10)
  });
  
  return { accessToken, refreshToken };
}
```

---

## 🔍 Input Validation

### DTOs with class-validator

```typescript
import {
  IsString,
  IsEmail,
  IsInt,
  IsArray,
  IsOptional,
  Length,
  Min,
  Max,
  ArrayMaxSize,
  Matches
} from 'class-validator';

export class CreateBriefDto {
  @IsString()
  @Length(10, 200, { message: 'Title must be between 10 and 200 characters' })
  title: string;
  
  @IsString()
  @Length(50, 5000)
  description: string;
  
  @IsArray()
  @ArrayMaxSize(10)
  @IsString({ each: true })
  tags: string[];
  
  @IsInt()
  @Min(100)
  @Max(1000000)
  budgetMin: number;
  
  @IsInt()
  @Min(100)
  @Max(1000000)
  budgetMax: number;
  
  @IsInt()
  @Min(1)
  @Max(365)
  deadlineDays: number;
}

export class CreateUserDto {
  @IsEmail()
  email: string;
  
  @IsString()
  @Length(8, 100)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'Password must contain uppercase, lowercase and number'
  })
  password: string;
  
  @IsString()
  @Length(2, 100)
  name: string;
  
  @IsString()
  @Length(3, 30)
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message: 'Username can only contain letters, numbers, - and _'
  })
  @IsOptional()
  username?: string;
}
```

### Custom validators

```typescript
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isEthereumAddress', async: false })
export class IsEthereumAddress implements ValidatorConstraintInterface {
  validate(address: string) {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  }
  
  defaultMessage() {
    return 'Invalid Ethereum address';
  }
}

// Usage
@Validate(IsEthereumAddress)
walletAddress: string;
```

---

## 📁 File Upload Security

### MIME type validation

```typescript
const ALLOWED_MIMES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml',
  'application/pdf',
  'video/mp4'
];

const MIME_TO_EXT = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
  'application/pdf': ['.pdf'],
  'video/mp4': ['.mp4']
};

function validateFile(file: Express.Multer.File): void {
  // 1. Check MIME type
  if (!ALLOWED_MIMES.includes(file.mimetype)) {
    throw new BadRequestException('Invalid file type');
  }
  
  // 2. Verify extension matches MIME
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedExts = MIME_TO_EXT[file.mimetype];
  
  if (!allowedExts.includes(ext)) {
    throw new BadRequestException('File extension does not match MIME type');
  }
  
  // 3. Check file size
  if (file.size > 20 * 1024 * 1024) {
    throw new BadRequestException('File too large (max 20MB)');
  }
  
  // 4. Check magic bytes (for images)
  if (file.mimetype.startsWith('image/')) {
    const magicBytes = file.buffer.slice(0, 4).toString('hex');
    const validMagic = {
      'image/jpeg': ['ffd8ffe0', 'ffd8ffe1'],
      'image/png': ['89504e47']
    };
    
    if (!validMagic[file.mimetype]?.some(m => magicBytes.startsWith(m))) {
      throw new BadRequestException('Invalid file signature');
    }
  }
}
```

### Virus scanning

```typescript
import NodeClam from 'clamscan';

@Injectable()
export class ClamAVService {
  private clam: NodeClam;
  
  async onModuleInit() {
    this.clam = await new NodeClam().init({
      clamdscan: {
        host: process.env.CLAMAV_HOST || 'localhost',
        port: process.env.CLAMAV_PORT || 3310
      }
    });
  }
  
  async scan(buffer: Buffer): Promise<boolean> {
    try {
      const { isInfected } = await this.clam.scanStream(
        Readable.from(buffer)
      );
      
      return !isInfected;
    } catch (error) {
      console.error('Virus scan failed:', error);
      // Fail-safe: reject file if scan fails
      return false;
    }
  }
}
```

### Signed URLs

```typescript
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  private s3: AWS.S3;
  
  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      region: process.env.AWS_REGION
    });
  }
  
  async getSignedUrl(key: string, expiresIn = 3600): Promise<string> {
    return this.s3.getSignedUrlPromise('getObject', {
      Bucket: process.env.S3_BUCKET,
      Key: key,
      Expires: expiresIn
    });
  }
  
  async upload(key: string, buffer: Buffer, mimetype: string): Promise<string> {
    await this.s3.putObject({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: mimetype,
      ACL: 'private' // Never use public ACL
    }).promise();
    
    return key;
  }
}
```

---

## 🚫 Anti-Abuse Mechanisms

### IP-based throttling

```typescript
@Injectable()
export class AbuseDetectionService {
  constructor(private redis: Redis) {}
  
  async checkAbuse(ip: string, action: string): Promise<boolean> {
    const key = `abuse:${ip}:${action}`;
    const count = await this.redis.incr(key);
    
    if (count === 1) {
      await this.redis.expire(key, 3600); // 1 hour
    }
    
    // Thresholds
    const limits = {
      'register': 3,
      'login': 10,
      'offer': 20,
      'message': 100
    };
    
    if (count > limits[action]) {
      await this.logSuspiciousActivity(ip, action, count);
      return true; // Is abuse
    }
    
    return false;
  }
  
  private async logSuspiciousActivity(ip: string, action: string, count: number) {
    console.warn(`Suspicious activity from ${ip}: ${count} ${action} attempts`);
    // Send alert to admin
  }
}
```

### User behavior analysis

```typescript
@Injectable()
export class BehaviorAnalyzer {
  async analyzeUser(userId: string): Promise<RiskScore> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        offers: {
          where: {
            createdAt: {
              gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            }
          }
        },
        projects: true,
        reviews: true
      }
    });
    
    let riskScore = 0;
    
    // Red flags
    if (user.offers.length > 50) riskScore += 30; // Spam offers
    if (user.strikes > 0) riskScore += 20 * user.strikes;
    if (user.projectsCount === 0 && user.offers.length > 10) riskScore += 25;
    if (!user.emailVerified) riskScore += 15;
    
    // Calculate offer acceptance rate
    const acceptedOffers = user.offers.filter(o => o.status === 'ACCEPTED').length;
    const acceptanceRate = acceptedOffers / user.offers.length;
    if (acceptanceRate < 0.1 && user.offers.length > 20) riskScore += 20;
    
    return {
      score: Math.min(riskScore, 100),
      flags: this.getFlags(user, riskScore)
    };
  }
  
  private getFlags(user: User, score: number): string[] {
    const flags = [];
    if (score > 70) flags.push('HIGH_RISK');
    if (user.strikes >= 2) flags.push('MULTIPLE_STRIKES');
    if (!user.emailVerified) flags.push('UNVERIFIED_EMAIL');
    return flags;
  }
}
```

### Content moderation

```typescript
@Injectable()
export class ModerationService {
  async moderateText(text: string): Promise<ModerationResult> {
    // Check for spam patterns
    const spamPatterns = [
      /\b(buy|cheap|discount|click here)\b/gi,
      /\b(viagra|cialis|casino)\b/gi,
      /(http|www)\./gi // Excessive links
    ];
    
    const spamScore = spamPatterns.reduce((score, pattern) => {
      const matches = text.match(pattern);
      return score + (matches?.length || 0);
    }, 0);
    
    // Check for profanity
    const profanityWords = ['...'] // Load from config
    const hasProfanity = profanityWords.some(word => 
      text.toLowerCase().includes(word)
    );
    
    // AI-based moderation (OpenAI Moderation API)
    const aiModeration = await this.openai.moderations.create({
      input: text
    });
    
    const flagged = aiModeration.results[0].flagged;
    
    return {
      approved: !flagged && spamScore < 3 && !hasProfanity,
      spamScore,
      hasProfanity,
      aiFlags: flagged ? aiModeration.results[0].categories : null
    };
  }
}
```

---

## 🔐 Secrets Management

### Environment variables

```bash
# .env.example
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/aiworkspace

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=change_this_to_random_string
JWT_REFRESH_SECRET=change_this_to_another_random_string

# OAuth
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=

# Blockchain
BASE_RPC_URL=https://mainnet.base.org
PRIVATE_KEY=
ESCROW_ADDRESS=

# AWS
AWS_ACCESS_KEY=
AWS_SECRET_KEY=
AWS_REGION=us-east-1
S3_BUCKET=aiworkspace-uploads

# OpenAI
OPENAI_API_KEY=

# ClamAV
CLAMAV_HOST=localhost
CLAMAV_PORT=3310

# Sentry
SENTRY_DSN=

# Security
ALLOWED_ORIGINS=http://localhost:3000,https://aiworkspace.io
ENCRYPTION_KEY=
```

### Secrets encryption

```typescript
import * as crypto from 'crypto';

export class EncryptionService {
  private algorithm = 'aes-256-gcm';
  private key: Buffer;
  
  constructor(private config: ConfigService) {
    this.key = Buffer.from(config.get('ENCRYPTION_KEY'), 'hex');
  }
  
  encrypt(text: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag();
    
    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
  }
  
  decrypt(encrypted: string): string {
    const [ivHex, authTagHex, encryptedText] = encrypted.split(':');
    
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
    
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }
}
```

---

## 🔍 Security Headers

### Helmet.js configuration

```typescript
import helmet from 'helmet';

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'", 'https://api.aiworkspace.io'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: []
      }
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    },
    frameguard: {
      action: 'deny'
    },
    noSniff: true,
    xssFilter: true
  })
);
```

---

## 📋 GDPR Compliance

### Data export

```typescript
@Get('export')
@UseGuards(JwtAuthGuard)
async exportData(@Req() req) {
  const user = await this.prisma.user.findUnique({
    where: { id: req.user.id },
    include: {
      briefs: true,
      offers: true,
      cases: true,
      messages: true,
      reviews: true
    }
  });
  
  // Anonymize sensitive data
  const exportData = {
    ...user,
    passwordHash: undefined,
    refreshToken: undefined
  };
  
  return exportData;
}
```

### Data deletion

```typescript
@Delete('account')
@UseGuards(JwtAuthGuard)
async deleteAccount(@Req() req) {
  // Anonymize user data (don't delete for audit trail)
  await this.prisma.user.update({
    where: { id: req.user.id },
    data: {
      email: `deleted_${req.user.id}@deleted.com`,
      name: 'Deleted User',
      bio: null,
      avatarUrl: null,
      status: 'BANNED'
    }
  });
  
  // Delete sensitive data
  await this.prisma.message.deleteMany({
    where: {
      OR: [
        { senderId: req.user.id },
        { recipientId: req.user.id }
      ]
    }
  });
  
  return { message: 'Account deleted' };
}
```

---

[← Назад: Database](04-database.md) | [Далее: Deployment →](06-deployment.md)

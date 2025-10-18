# Deployment & Monitoring

## 🐳 Docker Setup

### docker-compose.yml (Development)

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: aiworkspace_postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: aiworkspace
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
  
  redis:
    image: redis:7-alpine
    container_name: aiworkspace_redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 5
  
  clamav:
    image: clamav/clamav:latest
    container_name: aiworkspace_clamav
    ports:
      - "3310:3310"
    volumes:
      - clamav_data:/var/lib/clamav
  
  ipfs:
    image: ipfs/kubo:latest
    container_name: aiworkspace_ipfs
    ports:
      - "5001:5001"
      - "8080:8080"
    volumes:
      - ipfs_data:/data/ipfs
  
  api:
    build:
      context: ./apps/api
      dockerfile: Dockerfile
    container_name: aiworkspace_api
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    environment:
      DATABASE_URL: postgresql://postgres:postgres@postgres:5432/aiworkspace
      REDIS_URL: redis://redis:6379
    ports:
      - "3001:3001"
    volumes:
      - ./apps/api:/app
      - /app/node_modules
    command: npm run start:dev
  
  web:
    build:
      context: ./apps/web
      dockerfile: Dockerfile
    container_name: aiworkspace_web
    depends_on:
      - api
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:3001
    ports:
      - "3000:3000"
    volumes:
      - ./apps/web:/app
      - /app/node_modules
      - /app/.next
    command: npm run dev

volumes:
  postgres_data:
  redis_data:
  clamav_data:
  ipfs_data:
```

### docker-compose.prod.yml

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: always
    networks:
      - backend
  
  redis:
    image: redis:7-alpine
    command: redis-server --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data
    restart: always
    networks:
      - backend
  
  api:
    image: ${REGISTRY}/aiworkspace-api:${VERSION}
    environment:
      NODE_ENV: production
      DATABASE_URL: ${DATABASE_URL}
      REDIS_URL: ${REDIS_URL}
      JWT_SECRET: ${JWT_SECRET}
    depends_on:
      - postgres
      - redis
    restart: always
    networks:
      - backend
      - frontend
    deploy:
      replicas: 2
      resources:
        limits:
          cpus: '1'
          memory: 1G
  
  web:
    image: ${REGISTRY}/aiworkspace-web:${VERSION}
    environment:
      NODE_ENV: production
      NEXT_PUBLIC_API_URL: ${API_URL}
    depends_on:
      - api
    restart: always
    networks:
      - frontend
    deploy:
      replicas: 2
  
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    depends_on:
      - web
      - api
    restart: always
    networks:
      - frontend

networks:
  frontend:
  backend:

volumes:
  postgres_data:
  redis_data:
```

### Dockerfile (API)

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build

# Production image
FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

EXPOSE 3001

CMD ["npm", "run", "start:prod"]
```

### Dockerfile (Web)

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production image
FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

EXPOSE 3000

CMD ["npm", "start"]
```

---

## 🚀 CI/CD Pipeline

### .github/workflows/ci.yml

```yaml
name: CI

on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main, develop]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint
        run: npm run lint
      
      - name: Format check
        run: npm run format:check
  
  test-api:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
      
      redis:
        image: redis:7
        ports:
          - 6379:6379
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run migrations
        run: npx prisma migrate deploy
        working-directory: ./apps/api
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test
      
      - name: Run unit tests
        run: npm test
        working-directory: ./apps/api
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test
          REDIS_URL: redis://localhost:6379
      
      - name: Check coverage
        run: npm run test:cov
        working-directory: ./apps/api
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./apps/api/coverage/lcov.info
  
  test-contracts:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
        working-directory: ./apps/contracts
      
      - name: Compile contracts
        run: npx hardhat compile
        working-directory: ./apps/contracts
      
      - name: Run tests
        run: npx hardhat test
        working-directory: ./apps/contracts
      
      - name: Check coverage
        run: npx hardhat coverage
        working-directory: ./apps/contracts
  
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright
        run: npx playwright install --with-deps
      
      - name: Run E2E tests
        run: npm run test:e2e
        working-directory: ./apps/web
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: apps/web/playwright-report
  
  build:
    needs: [lint, test-api, test-contracts, e2e]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build API
        run: npm run build
        working-directory: ./apps/api
      
      - name: Build Web
        run: npm run build
        working-directory: ./apps/web
```

### .github/workflows/deploy-prod.yml

```yaml
name: Deploy Production

on:
  push:
    branches: [main]
    tags:
      - 'v*'

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2
      
      - name: Login to Container Registry
        uses: docker/login-action@v2
        with:
          registry: ${{ secrets.REGISTRY }}
          username: ${{ secrets.REGISTRY_USERNAME }}
          password: ${{ secrets.REGISTRY_PASSWORD }}
      
      - name: Extract version
        id: version
        run: echo "VERSION=${GITHUB_REF#refs/tags/v}" >> $GITHUB_OUTPUT
      
      - name: Build and push API
        uses: docker/build-push-action@v4
        with:
          context: ./apps/api
          push: true
          tags: |
            ${{ secrets.REGISTRY }}/aiworkspace-api:${{ steps.version.outputs.VERSION }}
            ${{ secrets.REGISTRY }}/aiworkspace-api:latest
          cache-from: type=registry,ref=${{ secrets.REGISTRY }}/aiworkspace-api:buildcache
          cache-to: type=registry,ref=${{ secrets.REGISTRY }}/aiworkspace-api:buildcache,mode=max
      
      - name: Build and push Web
        uses: docker/build-push-action@v4
        with:
          context: ./apps/web
          push: true
          tags: |
            ${{ secrets.REGISTRY }}/aiworkspace-web:${{ steps.version.outputs.VERSION }}
            ${{ secrets.REGISTRY }}/aiworkspace-web:latest
      
      - name: Deploy to production
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.PROD_HOST }}
          username: ${{ secrets.PROD_USER }}
          key: ${{ secrets.PROD_SSH_KEY }}
          script: |
            cd /opt/aiworkspace
            export VERSION=${{ steps.version.outputs.VERSION }}
            docker-compose -f docker-compose.prod.yml pull
            docker-compose -f docker-compose.prod.yml up -d
            docker-compose -f docker-compose.prod.yml exec -T api npx prisma migrate deploy
      
      - name: Notify Slack
        if: always()
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          text: 'Production deployment ${{ job.status }}'
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

---

## 📊 Monitoring

### Prometheus Configuration

```yaml
# prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'aiworkspace-api'
    static_configs:
      - targets: ['api:3001']
    metrics_path: '/metrics'
  
  - job_name: 'postgres'
    static_configs:
      - targets: ['postgres-exporter:9187']
  
  - job_name: 'redis'
    static_configs:
      - targets: ['redis-exporter:9121']
  
  - job_name: 'node'
    static_configs:
      - targets: ['node-exporter:9100']

alerting:
  alertmanagers:
    - static_configs:
        - targets: ['alertmanager:9093']
```

### Grafana Dashboards

```json
{
  "dashboard": {
    "title": "AIWorkSpace Metrics",
    "panels": [
      {
        "title": "API Response Time (p95)",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))"
          }
        ]
      },
      {
        "title": "Request Rate",
        "targets": [
          {
            "expr": "rate(http_requests_total[1m])"
          }
        ]
      },
      {
        "title": "Error Rate",
        "targets": [
          {
            "expr": "rate(http_requests_total{status=~\"5..\"}[1m])"
          }
        ]
      },
      {
        "title": "Database Connections",
        "targets": [
          {
            "expr": "pg_stat_activity_count"
          }
        ]
      },
      {
        "title": "Redis Memory Usage",
        "targets": [
          {
            "expr": "redis_memory_used_bytes"
          }
        ]
      }
    ]
  }
}
```

### Winston Logger Setup

```typescript
// logger.service.ts
import * as winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'aiworkspace-api' },
  transports: [
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error'
    }),
    new winston.transports.File({
      filename: 'logs/combined.log'
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  );
}

export default logger;
```

### Sentry Integration

```typescript
// main.ts
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  beforeSend(event, hint) {
    // Filter sensitive data
    if (event.request) {
      delete event.request.cookies;
      delete event.request.headers?.authorization;
    }
    return event;
  }
});

// Error handler
app.use(Sentry.Handlers.errorHandler());
```

---

## 🔍 Health Checks

### API Health Endpoint

```typescript
// health.controller.ts
@Controller('health')
export class HealthController {
  constructor(
    private prisma: PrismaService,
    private redis: Redis,
    private web3: Web3Service
  ) {}
  
  @Get()
  async check(): Promise<HealthStatus> {
    const checks = await Promise.allSettled([
      this.checkDatabase(),
      this.checkRedis(),
      this.checkBlockchain()
    ]);
    
    const [db, redis, blockchain] = checks.map(
      c => c.status === 'fulfilled' && c.value
    );
    
    const status = db && redis && blockchain ? 'healthy' : 'degraded';
    
    return {
      status,
      timestamp: new Date().toISOString(),
      services: { database: db, redis, blockchain },
      version: process.env.VERSION || '1.0.0'
    };
  }
  
  private async checkDatabase(): Promise<boolean> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      console.error('Database health check failed:', error);
      return false;
    }
  }
  
  private async checkRedis(): Promise<boolean> {
    try {
      await this.redis.ping();
      return true;
    } catch (error) {
      console.error('Redis health check failed:', error);
      return false;
    }
  }
  
  private async checkBlockchain(): Promise<boolean> {
    try {
      await this.web3.provider.getBlockNumber();
      return true;
    } catch (error) {
      console.error('Blockchain health check failed:', error);
      return false;
    }
  }
  
  @Get('ready')
  async readiness(): Promise<{ ready: boolean }> {
    const health = await this.check();
    return { ready: health.status === 'healthy' };
  }
  
  @Get('live')
  liveness(): { alive: boolean } {
    return { alive: true };
  }
}
```

---

## 📦 Nginx Configuration

```nginx
# nginx.conf
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';
    
    access_log /var/log/nginx/access.log main;
    
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    
    # Gzip
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript
               application/json application/javascript application/xml+rss
               application/rss+xml font/truetype font/opentype
               application/vnd.ms-fontobject image/svg+xml;
    
    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=100r/m;
    limit_req_zone $binary_remote_addr zone=auth:10m rate=5r/m;
    
    # Upstream servers
    upstream api {
        least_conn;
        server api:3001 max_fails=3 fail_timeout=30s;
    }
    
    upstream web {
        least_conn;
        server web:3000 max_fails=3 fail_timeout=30s;
    }
    
    # HTTP -> HTTPS redirect
    server {
        listen 80;
        server_name aiworkspace.io www.aiworkspace.io;
        return 301 https://$server_name$request_uri;
    }
    
    # HTTPS
    server {
        listen 443 ssl http2;
        server_name aiworkspace.io www.aiworkspace.io;
        
        ssl_certificate /etc/nginx/ssl/fullchain.pem;
        ssl_certificate_key /etc/nginx/ssl/privkey.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers on;
        ssl_session_cache shared:SSL:10m;
        ssl_session_timeout 10m;
        
        # Security headers
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
        add_header X-Frame-Options "DENY" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
        
        # API
        location /api {
            limit_req zone=api burst=20 nodelay;
            
            proxy_pass http://api;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
            
            proxy_connect_timeout 30s;
            proxy_send_timeout 30s;
            proxy_read_timeout 30s;
        }
        
        # Auth endpoints (stricter rate limit)
        location ~ ^/api/auth/(login|register) {
            limit_req zone=auth burst=3 nodelay;
            proxy_pass http://api;
        }
        
        # WebSocket (Socket.io)
        location /socket.io {
            proxy_pass http://api;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
        
        # Static files
        location /_next/static {
            proxy_pass http://web;
            proxy_cache_valid 200 1y;
            add_header Cache-Control "public, immutable";
        }
        
        # Frontend
        location / {
            proxy_pass http://web;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
}
```

---

## 🔄 Backup & Recovery

### Automated Backup Script

```bash
#!/bin/bash
# scripts/backup.sh

set -e

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/aiworkspace"
DB_NAME="aiworkspace"
S3_BUCKET="s3://aiworkspace-backups"

mkdir -p "$BACKUP_DIR"

echo "Starting backup at $DATE"

# Database backup
echo "Backing up database..."
pg_dump -h localhost -U postgres -d $DB_NAME -F c -f "$BACKUP_DIR/db_${DATE}.backup"
gzip "$BACKUP_DIR/db_${DATE}.backup"

# Redis backup
echo "Backing up Redis..."
redis-cli --rdb "$BACKUP_DIR/redis_${DATE}.rdb"
gzip "$BACKUP_DIR/redis_${DATE}.rdb"

# Upload to S3
echo "Uploading to S3..."
aws s3 cp "$BACKUP_DIR/db_${DATE}.backup.gz" "$S3_BUCKET/database/"
aws s3 cp "$BACKUP_DIR/redis_${DATE}.rdb.gz" "$S3_BUCKET/redis/"

# Cleanup old backups (keep 7 days)
find "$BACKUP_DIR" -type f -mtime +7 -delete

echo "Backup completed successfully"
```

### Cron Schedule

```cron
# Daily backup at 2 AM
0 2 * * * /opt/aiworkspace/scripts/backup.sh >> /var/log/backup.log 2>&1

# Weekly full backup at Sunday 3 AM
0 3 * * 0 /opt/aiworkspace/scripts/backup-full.sh >> /var/log/backup.log 2>&1
```

---

## 📋 Pre-Launch Checklist

### Infrastructure
- [ ] SSL certificates installed and renewed
- [ ] DNS configured (A, CNAME, TXT records)
- [ ] CDN setup (Cloudflare)
- [ ] Firewall rules configured
- [ ] Backup strategy tested
- [ ] Monitoring dashboards ready
- [ ] Alerting configured

### Security
- [ ] Security audit completed
- [ ] Penetration testing done
- [ ] Rate limiting tested
- [ ] CORS whitelist configured
- [ ] Secrets rotated
- [ ] GDPR compliance verified

### Performance
- [ ] Load testing (1000+ concurrent users)
- [ ] Database indexes optimized
- [ ] Redis caching validated
- [ ] Image optimization
- [ ] API response times < 200ms (p95)

### Legal
- [ ] Terms of Service published
- [ ] Privacy Policy published
- [ ] Cookie Policy
- [ ] DMCA policy
- [ ] Refund policy

### Blockchain
- [ ] Smart contracts audited
- [ ] Contracts deployed to mainnet
- [ ] Multi-sig wallet configured
- [ ] Gas costs optimized
- [ ] Emergency pause tested

---

[← Назад: Security](05-security.md) | [Назад к оглавлению](../specs/AIWORKSPACE_SPEC.md)

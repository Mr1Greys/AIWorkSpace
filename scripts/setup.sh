#!/bin/bash

set -e

echo "🚀 AIWorkSpace Setup Script"
echo "============================"
echo ""

# Check Node.js version
echo "📦 Checking Node.js version..."
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 18+ is required. Current version: $(node -v)"
    exit 1
fi
echo "✅ Node.js version: $(node -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Setup environment
echo "🔧 Setting up environment..."
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo "✅ Created .env.local from .env.example"
    echo "⚠️  Please update .env.local with your credentials"
else
    echo "ℹ️  .env.local already exists"
fi
echo ""

# Start Docker services
echo "🐳 Starting Docker services..."
docker-compose up -d postgres redis
echo "✅ Docker services started"
echo ""

# Wait for PostgreSQL
echo "⏳ Waiting for PostgreSQL..."
sleep 5
echo ""

# Run migrations
echo "🗄️  Running database migrations..."
cd apps/api
npx prisma migrate dev --name init
npx prisma generate
echo "✅ Migrations completed"
echo ""

# Seed database
echo "🌱 Seeding database..."
npm run seed
echo "✅ Database seeded"
echo ""

cd ../..

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your API keys"
echo "2. Run 'npm run dev' to start development servers"
echo "3. Visit http://localhost:3000 for frontend"
echo "4. Visit http://localhost:3001/api/docs for API docs"
echo ""

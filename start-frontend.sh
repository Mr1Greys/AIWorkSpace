#!/bin/bash

echo "🚀 Starting AIWorkSpace Frontend..."
echo ""

cd apps/web

echo "📦 Installing frontend dependencies..."
npm install

echo ""
echo "🎨 Starting Next.js development server..."
npm run dev

#!/bin/bash
# Quick Start Script for Novari Remastered
# Run this after cloning to get everything set up

echo "🔥 Novari Remastered - Quick Setup"
echo "===================================="
echo ""

# Check Node version
echo "📦 Checking Node.js..."
node_version=$(node -v)
echo "Node.js version: $node_version"
echo ""

# Install root dependencies
echo "📥 Installing dependencies..."
npm install
npm run install:all
echo "✅ Dependencies installed"
echo ""

# Create .env file
if [ ! -f apps/backend/.env ]; then
    echo "📝 Creating .env file..."
    cp apps/backend/.env.example apps/backend/.env
    echo "✅ .env file created"
else
    echo "✅ .env file already exists"
fi
echo ""

# Show next steps
echo "🚀 Setup complete! Here's what to do next:"
echo ""
echo "Terminal 1 - Start Backend:"
echo "  cd apps/backend"
echo "  npm run dev"
echo "  → Backend runs on http://localhost:3000"
echo ""
echo "Terminal 2 - Seed Demo Data:"
echo "  curl -X POST http://localhost:3000/api/v1/dev/seed \\"
echo "    -H 'x-dev-key: dev-seed-key-123'"
echo "  → Creates demo user + embers + tasks"
echo ""
echo "Terminal 3 - Start Frontend:"
echo "  cd apps/mobile"
echo "  npm start"
echo "  → Press 'a' for Android or 'i' for iOS"
echo ""
echo "📱 Login with demo account:"
echo "  Email: demo@novari.dev"
echo "  Password: DemoPass123!"
echo ""
echo "📖 Documentation:"
echo "  - README.md                  (Main guide)"
echo "  - docs/DEV_SEED_AND_DB.md    (Database strategy)"
echo "  - ARCHITECTURE.md             (Folder structure)"
echo ""
echo "Happy building! 🎉"

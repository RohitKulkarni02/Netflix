#!/bin/bash

# Netflix Clone Startup Script
echo "🚀 Starting Netflix Clone Application..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Check if MongoDB is running (optional)
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB not found. Make sure MongoDB is installed and running."
    echo "   You can install MongoDB from: https://www.mongodb.com/try/download/community"
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Creating from .env.sample..."
    if [ -f ".env.sample" ]; then
        cp .env.sample .env
        echo "✅ Created .env file. Please update the values in .env file."
    else
        echo "❌ .env.sample file not found. Please create .env file manually."
        exit 1
    fi
fi

# Start the server
echo "🎬 Starting Netflix Clone server..."
echo "📱 Server will be available at: http://localhost:5000"
echo "🔍 Health check: http://localhost:5000/health"
echo ""

# Start with nodemon in development, node in production
if [ "$NODE_ENV" = "production" ]; then
    echo "🏭 Starting in production mode..."
    node server.js
else
    echo "🔧 Starting in development mode with nodemon..."
    npx nodemon server.js
fi
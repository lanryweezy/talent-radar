#!/bin/bash

# TalentRadar Quick Start Script
echo "🎵 Starting TalentRadar - AI-Powered A&R Discovery Tool"
echo "=================================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create environment files if they don't exist
if [ ! -f .env ]; then
    echo "📝 Creating frontend environment file..."
    cp .env.example .env
fi

if [ ! -f backend/.env ]; then
    echo "📝 Creating backend environment file..."
    cp backend/.env.example backend/.env
fi

echo "⚠️  IMPORTANT: Please configure your API keys in the .env files:"
echo "   - Frontend: .env"
echo "   - Backend: backend/.env"
echo ""
echo "🔑 Required API Keys:"
echo "   - Spotify Client ID & Secret (get from https://developer.spotify.com/dashboard)"
echo ""

read -p "Have you configured your API keys? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Please configure your API keys first, then run this script again."
    exit 1
fi

echo "🚀 Starting TalentRadar services..."
echo ""

# Start all services
docker-compose up -d

echo ""
echo "⏳ Waiting for services to start..."
sleep 10

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    echo ""
    echo "✅ TalentRadar is now running!"
    echo ""
    echo "🌐 Access your application:"
    echo "   Frontend:  http://localhost:3000"
    echo "   Backend:   http://localhost:8000"
    echo "   API Docs:  http://localhost:8000/docs"
    echo ""
    echo "📊 Database & Cache:"
    echo "   PostgreSQL: localhost:5432"
    echo "   Redis:      localhost:6379"
    echo ""
    echo "🛑 To stop: docker-compose down"
    echo "🔄 To restart: docker-compose restart"
    echo "📋 To view logs: docker-compose logs -f"
else
    echo "❌ Some services failed to start. Check logs with: docker-compose logs"
fi
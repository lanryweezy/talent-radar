# TalentRadar Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- PostgreSQL 15+
- Redis 7+
- Docker & Docker Compose (optional)

### Option 1: Docker Setup (Recommended)

1. **Clone and setup environment**
```bash
git clone <repository-url>
cd talent-radar
cp .env.example .env
cp backend/.env.example backend/.env
```

2. **Configure environment variables**
Edit `.env` and `backend/.env` with your API keys:
```bash
# Backend (.env in backend folder)
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
DATABASE_URL=postgresql://postgres:password@localhost:5432/talent_radar
REDIS_URL=redis://localhost:6379

# Frontend (.env in root)
NEXT_PUBLIC_API_URL=http://localhost:8000
```

3. **Start all services**
```bash
docker-compose up -d
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Option 2: Manual Setup

#### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Setup database
createdb talent_radar
python -c "from database import engine; from models import Base; Base.metadata.create_all(bind=engine)"

# Start backend
uvicorn main:app --reload
```

#### Frontend Setup
```bash
npm install
npm run dev
```

## 🔑 API Keys Setup

### Spotify API
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Copy Client ID and Client Secret to your `.env` file

### Optional APIs (for full functionality)
- **YouTube Data API**: For YouTube metrics
- **Instagram Basic Display API**: For Instagram data
- **TikTok API**: For TikTok analytics

## 📊 Database Setup

The application uses PostgreSQL with TimescaleDB for time-series data. The database schema includes:

- **Artists**: Core artist information and AI insights
- **Tracks**: Song data with audio features and analysis
- **Metrics**: Time-series performance data
- **Trending**: Real-time trending calculations
- **Collaborations**: Artist network mapping

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
npm test
```

### API Testing
Visit http://localhost:8000/docs for interactive API documentation.

## 🚀 Deployment

### Production Environment Variables
```bash
# Backend
DATABASE_URL=postgresql://user:pass@host:5432/talent_radar_prod
REDIS_URL=redis://host:6379
ENVIRONMENT=production
SECRET_KEY=your-secret-key
SENTRY_DSN=your-sentry-dsn

# Frontend
NEXT_PUBLIC_API_URL=https://api.talentradar.com
NODE_ENV=production
```

### Deployment Options

#### Vercel + Railway
1. **Frontend (Vercel)**
   - Connect GitHub repo to Vercel
   - Set environment variables
   - Deploy automatically

2. **Backend (Railway)**
   - Connect GitHub repo to Railway
   - Add PostgreSQL and Redis services
   - Set environment variables
   - Deploy

#### Docker Production
```bash
# Build production images
docker-compose -f docker-compose.prod.yml up -d
```

## 🔧 Configuration

### Feature Flags
```bash
# Enable/disable features
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_SOCIAL_LOGIN=false
```

### Performance Tuning
```bash
# Backend
WORKERS=4
MAX_CONNECTIONS=100
CACHE_TTL=3600

# Database
POSTGRES_MAX_CONNECTIONS=200
POSTGRES_SHARED_BUFFERS=256MB
```

## 📈 Monitoring

### Health Checks
- Backend: http://localhost:8000/health
- Database: Check connection in logs
- Redis: Check connection in logs

### Logging
- Backend logs: `tail -f backend/logs/app.log`
- Frontend logs: Browser console
- Database logs: PostgreSQL logs

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check PostgreSQL is running
   - Verify DATABASE_URL is correct
   - Ensure database exists

2. **API Rate Limits**
   - Check Spotify API quotas
   - Implement proper caching
   - Add retry logic

3. **Frontend Build Errors**
   - Clear `.next` folder
   - Delete `node_modules` and reinstall
   - Check Node.js version

4. **Docker Issues**
   - Run `docker-compose down -v` to reset
   - Check Docker daemon is running
   - Verify port availability

### Performance Issues
- Enable Redis caching
- Optimize database queries
- Use CDN for static assets
- Implement proper indexing

## 📚 Development

### Code Structure
```
talent-radar/
├── app/                 # Next.js app directory
├── components/          # React components
├── backend/            # FastAPI backend
│   ├── services/       # Business logic
│   ├── models.py       # Database models
│   └── main.py         # API routes
├── docker-compose.yml  # Development setup
└── README.md
```

### Adding New Features
1. Create database migrations
2. Update API endpoints
3. Add frontend components
4. Write tests
5. Update documentation

### API Development
- Use FastAPI automatic docs: `/docs`
- Follow REST conventions
- Implement proper error handling
- Add request/response validation

## 🎯 Next Steps

1. **Week 1-2**: Complete basic functionality
2. **Week 3-4**: Add AI models and predictions
3. **Week 5-6**: Implement advanced analytics
4. **Week 7-8**: Polish UI/UX and launch prep

## 🆘 Support

- **Documentation**: Check README.md and API docs
- **Issues**: Create GitHub issues for bugs
- **Discussions**: Use GitHub Discussions for questions
- **Email**: support@talentradar.com (when available)

---

*Happy coding! Let's discover the next music superstars together* 🎵
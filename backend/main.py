from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
from contextlib import asynccontextmanager
import uvicorn
from typing import List, Optional
import os
from dotenv import load_dotenv

try:
    from database import engine, get_db
    from models import Base, Artist, Track, Metrics
    from schemas import ArtistResponse, TrackResponse, SearchQuery, TrendingResponse, ArtistStatusUpdate
    from services.spotify_service import SpotifyService
    from services.analytics_service import AnalyticsService
    from services.ai_service import AIService
except ImportError:
    from .database import engine, get_db
    from .models import Base, Artist, Track, Metrics
    from .schemas import ArtistResponse, TrackResponse, SearchQuery, TrendingResponse, ArtistStatusUpdate
    from .services.spotify_service import SpotifyService
    from .services.analytics_service import AnalyticsService
    from .services.ai_service import AIService

load_dotenv()

# Initialize services
spotify_service = SpotifyService()
analytics_service = AnalyticsService()
ai_service = AIService()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    Base.metadata.create_all(bind=engine)
    await spotify_service.initialize()
    print("🎵 TalentRadar API started successfully!")
    yield
    # Shutdown
    print("👋 TalentRadar API shutting down...")

app = FastAPI(
    title="TalentRadar API",
    description="AI-Powered A&R Discovery Tool",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBearer()

@app.get("/")
async def root():
    return {
        "message": "🎵 Welcome to TalentRadar API",
        "version": "1.0.0",
        "status": "active"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "talent-radar-api"}

@app.post("/search/artists", response_model=List[ArtistResponse])
async def search_artists(query: SearchQuery):
    """Search for artists across multiple platforms"""
    try:
        # Search Spotify first
        spotify_results = await spotify_service.search_artists(
            query.query, 
            limit=query.limit or 20
        )
        
        # Enhance with AI analysis
        enhanced_results = []
        for artist in spotify_results:
            ai_analysis = await ai_service.analyze_artist(artist)
            enhanced_results.append({
                **artist,
                "breakout_score": ai_analysis.get("breakout_score", 0),
                "genre_confidence": ai_analysis.get("genre_confidence", 0),
                "trend_direction": ai_analysis.get("trend_direction", "stable")
            })
        
        return enhanced_results
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search failed: {str(e)}")

@app.get("/artists/{artist_id}", response_model=ArtistResponse)
async def get_artist(artist_id: str):
    """Get detailed artist information"""
    try:
        artist_data = await spotify_service.get_artist_details(artist_id)
        if not artist_data:
            raise HTTPException(status_code=404, detail="Artist not found")
        
        # Add AI insights
        ai_insights = await ai_service.analyze_artist(artist_data)
        
        return {
            **artist_data,
            **ai_insights
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get artist: {str(e)}")

@app.get("/artists/{artist_id}/tracks", response_model=List[TrackResponse])
async def get_artist_tracks(artist_id: str, limit: int = 20):
    """Get artist's top tracks with analysis"""
    try:
        tracks = await spotify_service.get_artist_tracks(artist_id, limit)
        
        # Analyze each track
        analyzed_tracks = []
        for track in tracks:
            analysis = await ai_service.analyze_track(track)
            analyzed_tracks.append({
                **track,
                **analysis
            })
        
        return analyzed_tracks
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get tracks: {str(e)}")

@app.get("/trending", response_model=TrendingResponse)
async def get_trending_artists(
    region: str = "global",
    genre: Optional[str] = None,
    limit: int = 50
):
    """Get trending artists with breakout potential"""
    try:
        trending_data = await analytics_service.get_trending_artists(
            region=region,
            genre=genre,
            limit=limit
        )
        
        return trending_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get trending: {str(e)}")

@app.get("/analytics/growth/{artist_id}")
async def get_growth_analytics(artist_id: str, days: int = 30):
    """Get artist growth analytics"""
    try:
        growth_data = await analytics_service.get_growth_metrics(artist_id, days)
        return growth_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get analytics: {str(e)}")

@app.post("/predict/breakout")
async def predict_breakout(artist_ids: List[str]):
    """Predict breakout potential for multiple artists"""
    try:
        predictions = []
        for artist_id in artist_ids:
            prediction = await ai_service.predict_breakout(artist_id)
            predictions.append({
                "artist_id": artist_id,
                **prediction
            })
        
        return {"predictions": predictions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

@app.get("/discover/similar/{artist_id}")
async def discover_similar_artists(artist_id: str, limit: int = 10):
    """Discover artists similar to the given artist"""
    try:
        similar_artists = await ai_service.find_similar_artists(artist_id, limit)
        return {"similar_artists": similar_artists}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Discovery failed: {str(e)}")

# CRM Endpoints
@app.get("/crm/artists", response_model=List[ArtistResponse])
async def get_label_artists(
    status: Optional[str] = None,
    is_watched: Optional[bool] = None,
    db = Depends(get_db)
):
    """List artists tracked by the label with optional filtering"""
    query = db.query(Artist)
    if status:
        query = query.filter(Artist.status == status)
    if is_watched is not None:
        query = query.filter(Artist.is_watched == is_watched)

    return query.all()

@app.patch("/crm/artists/{artist_id}", response_model=ArtistResponse)
async def update_artist_status(
    artist_id: str,
    update_data: ArtistStatusUpdate,
    db = Depends(get_db)
):
    """Update artist status, notes, or watchlist status"""
    artist = db.query(Artist).filter(Artist.id == artist_id).first()

    # If artist doesn't exist in DB yet (e.g. from a fresh search), create it first
    if not artist:
        artist_details = await spotify_service.get_artist_details(artist_id)
        if not artist_details:
            raise HTTPException(status_code=404, detail="Artist not found")

        ai_insights = await ai_service.analyze_artist(artist_details)
        artist = Artist(
            **artist_details,
            **ai_insights
        )
        db.add(artist)
        db.flush()

    # Update fields
    for field, value in update_data.model_dump(exclude_unset=True).items():
        setattr(artist, field, value)

    db.commit()
    db.refresh(artist)
    return artist

@app.get("/crm/watchlist", response_model=List[ArtistResponse])
async def get_watchlist(db = Depends(get_db)):
    """Get list of artists in the watchlist"""
    return db.query(Artist).filter(Artist.is_watched == True).all()

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        reload=True
    )
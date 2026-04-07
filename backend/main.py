from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
from contextlib import asynccontextmanager
import uvicorn
from typing import List, Optional
import os
import time
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
    # Startup logic
    print("🛠️  Initializing TalentRadar Infrastructure...")

    # 1. DB Check
    db_url = os.getenv("DATABASE_URL", "sqlite")
    if os.getenv("VERCEL") and "sqlite" in db_url.lower() and ":memory:" in db_url.lower():
        print("⚠️  WARNING: Running on Vercel with ephemeral :memory: SQLite. Data will not persist!")

    Base.metadata.create_all(bind=engine)

    # 2. External Services
    await spotify_service.initialize()

    print("🎵 TalentRadar A&R Intelligence Engine v2.4 Started")
    yield
    print("👋 Shutting down intelligence nodes...")

app = FastAPI(
    title="TalentRadar Intelligence API",
    description="Next-Generation A&R Discovery & Market Analytics Engine",
    version="2.4.0",
    lifespan=lifespan,
    root_path="/api/v1"
)

# Robust CORS Configuration
# In production, we should specify actual allowed origins
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["X-Process-Time"]
)

@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response

@app.get("/")
async def root():
    return {
        "engine": "TalentRadar Intelligence",
        "version": "2.4.0",
        "status": "Operational",
        "nodes": ["Spotify Discovery", "AI Archetyping", "Market Forecasting"]
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "uptime": "nominal",
        "db": "ephemeral" if os.getenv("VERCEL") and ":memory:" in os.getenv("DATABASE_URL", "") else "persistent"
    }

@app.post("/search/artists", response_model=List[ArtistResponse])
async def search_artists(query: SearchQuery):
    """Deep node discovery with multi-platform intelligence augmentation"""
    try:
        spotify_results = await spotify_service.search_artists(
            query.query, 
            limit=query.limit or 20
        )
        
        enhanced_results = []
        for artist in spotify_results:
            ai_analysis = await ai_service.analyze_artist(artist)

            # Combine raw data with intelligence signals
            enhanced_artist = {
                **artist,
                **ai_analysis,
                "country": artist.get("country", "Nigeria") # Default to region of interest
            }

            # Predictive filter pipeline
            if enhanced_artist["breakout_score"] < (query.min_breakout_score or 0):
                continue
            if enhanced_artist["followers"] < (query.min_followers or 0):
                continue

            enhanced_results.append(enhanced_artist)
        
        return enhanced_results
    except Exception as e:
        print(f"Discovery Node Error: {e}")
        raise HTTPException(status_code=500, detail="Intelligence search nodes unreachable.")

@app.get("/artists/{artist_id}", response_model=ArtistResponse)
async def get_artist(artist_id: str):
    """Retrieve individual node intelligence with archetype expansion"""
    try:
        artist_data = await spotify_service.get_artist_details(artist_id)
        if not artist_data:
            raise HTTPException(status_code=404, detail="Node ID not found in global index.")
        
        ai_insights = await ai_service.analyze_artist(artist_data)
        
        return {
            **artist_data,
            **ai_insights
        }
    except Exception as e:
        print(f"Node Retrieval Error: {e}")
        raise HTTPException(status_code=500, detail="Node intelligence extraction failed.")

@app.get("/artists/{artist_id}/tracks", response_model=List[TrackResponse])
async def get_artist_tracks(artist_id: str, limit: int = 15):
    """Extract content-level energy and viral signals"""
    try:
        tracks = await spotify_service.get_artist_tracks(artist_id, limit)
        analyzed_tracks = []
        for track in tracks:
            analysis = await ai_service.analyze_track(track)
            analyzed_tracks.append({**track, **analysis})
        return analyzed_tracks
    except Exception as e:
        raise HTTPException(status_code=500, detail="Content signal extraction failed.")

@app.get("/trending", response_model=TrendingResponse)
async def get_trending_artists(
    region: str = "global",
    genre: Optional[str] = None,
    limit: int = 30
):
    """Aggregate high-velocity trending signals from regional heatmaps"""
    try:
        trending_data = await analytics_service.get_trending_artists(
            region=region,
            genre=genre,
            limit=limit
        )
        
        # Intelligence enrichment
        for item in trending_data["trending_artists"]:
             ai_analysis = await ai_service.analyze_artist(item["artist"])
             item["artist"].update(ai_analysis)

        return trending_data
    except Exception as e:
        print(f"Market Pulse Error: {e}")
        raise HTTPException(status_code=500, detail="Regional pulse data unavailable.")

@app.get("/analytics/growth/{artist_id}")
async def get_growth_analytics(artist_id: str, days: int = 30):
    """Extract multi-period growth deltas and breakout probability"""
    try:
        growth_data = await analytics_service.get_growth_metrics(artist_id, days)
        ai_pred = await ai_service.predict_breakout(artist_id)
        return {**growth_data, **ai_pred}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Growth matrix computation failed.")

@app.get("/analytics/heatmap")
async def get_market_heatmap():
    """Visualize regional opportunity clusters and momentum nodes"""
    try:
        return await analytics_service.get_market_heatmap()
    except Exception as e:
        raise HTTPException(status_code=500, detail="Heatmap rendering failed.")

@app.post("/predict/breakout")
async def predict_breakout(artist_ids: List[str]):
    """Execute predictive modeling across multiple talent IDs"""
    try:
        predictions = []
        for artist_id in artist_ids:
            prediction = await ai_service.predict_breakout(artist_id)
            predictions.append({"artist_id": artist_id, **prediction})
        return {"predictions": predictions}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Predictive model failed.")

@app.get("/discover/similar/{artist_id}")
async def discover_similar_artists(artist_id: str, limit: int = 6):
    """Identify similar nodes based on sonic velocity and cultural pull"""
    try:
        similar_artists = await ai_service.find_similar_artists(artist_id, limit)
        return {"similar_artists": similar_artists}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Similarity Discovery Node failed.")

# CRM Intelligent Roster Management
@app.get("/crm/artists", response_model=List[ArtistResponse])
async def get_label_artists(
    status: Optional[str] = None,
    is_watched: Optional[bool] = None,
    db = Depends(get_db)
):
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
    artist = db.query(Artist).filter(Artist.id == artist_id).first()

    if not artist:
        artist_details = await spotify_service.get_artist_details(artist_id)
        if not artist_details:
            raise HTTPException(status_code=404, detail="Artist Node unreachable.")

        ai_insights = await ai_service.analyze_artist(artist_details)
        artist = Artist(**artist_details, **ai_insights)
        db.add(artist)
        db.flush()

    for field, value in update_data.model_dump(exclude_unset=True).items():
        setattr(artist, field, value)

    db.commit()
    db.refresh(artist)
    return artist

@app.get("/crm/watchlist", response_model=List[ArtistResponse])
async def get_watchlist(db = Depends(get_db)):
    return db.query(Artist).filter(Artist.is_watched == True).all()

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        reload=True
    )

from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

class SearchQuery(BaseModel):
    query: str = Field(..., description="Search query for artists")
    limit: Optional[int] = Field(20, description="Number of results to return")
    genre: Optional[str] = Field(None, description="Filter by genre")
    region: Optional[str] = Field(None, description="Filter by region")
    min_breakout_score: Optional[float] = Field(0.0, description="Minimum breakout score")
    max_breakout_score: Optional[float] = Field(100.0, description="Maximum breakout score")
    min_followers: Optional[int] = Field(0, description="Minimum followers")

class ArtistResponse(BaseModel):
    id: str
    name: str
    genres: List[str]
    popularity: int
    followers: int
    image_url: Optional[str] = None
    spotify_url: Optional[str] = None
    
    # Social media
    instagram_handle: Optional[str] = None
    tiktok_handle: Optional[str] = None
    twitter_handle: Optional[str] = None
    
    # AI insights
    breakout_score: float
    trend_direction: str
    genre_confidence: float
    
    # Next-Gen Metrics
    archetype: Optional[str] = None
    strategic_intelligence: Optional[List[str]] = None
    country: Optional[str] = None

    # Label Management (CRM) fields
    status: Optional[str] = "available"
    is_watched: Optional[bool] = False
    notes: Optional[str] = None
    signed_date: Optional[datetime] = None
    contract_value: Optional[float] = None

    # Metadata
    created_at: datetime
    updated_at: datetime

class TrackResponse(BaseModel):
    id: str
    name: str
    artist_id: str
    album_name: Optional[str]
    duration_ms: int
    popularity: int
    explicit: bool
    preview_url: Optional[str]
    spotify_url: Optional[str]
    
    # Audio features
    danceability: Optional[float]
    energy: Optional[float]
    valence: Optional[float]
    tempo: Optional[float]
    acousticness: Optional[float]
    instrumentalness: Optional[float]
    liveness: Optional[float]
    speechiness: Optional[float]
    
    # AI analysis
    mood: Optional[str]
    quality_score: float
    viral_potential: float
    
    release_date: Optional[datetime]

class TrendingArtistItem(BaseModel):
    artist: ArtistResponse
    trend_score: float
    velocity: float
    current_rank: int
    previous_rank: Optional[int]
    rank_change: int

class TrendingResponse(BaseModel):
    region: str
    genre: Optional[str]
    trending_artists: List[TrendingArtistItem]
    generated_at: datetime

class ArtistStatusUpdate(BaseModel):
    status: Optional[str] = None
    is_watched: Optional[bool] = None
    notes: Optional[str] = None
    signed_date: Optional[datetime] = None
    contract_value: Optional[float] = None

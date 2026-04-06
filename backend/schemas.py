from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

class SearchQuery(BaseModel):
    query: str = Field(..., description="Search query for artists")
    limit: Optional[int] = Field(20, description="Number of results to return")
    genre: Optional[str] = Field(None, description="Filter by genre")
    region: Optional[str] = Field(None, description="Filter by region")

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

class MetricsResponse(BaseModel):
    artist_id: str
    spotify_monthly_listeners: int
    spotify_followers: int
    youtube_subscribers: int
    youtube_views: int
    instagram_followers: int
    tiktok_followers: int
    
    avg_streams_per_track: float
    engagement_rate: float
    skip_rate: float
    replay_rate: float
    
    top_countries: List[str]
    growth_regions: List[str]
    
    momentum_score: float
    engagement_quality: float
    market_penetration: float
    
    recorded_at: datetime

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

class GrowthAnalytics(BaseModel):
    artist_id: str
    period_days: int
    
    # Growth metrics
    follower_growth: float
    stream_growth: float
    engagement_growth: float
    
    # Trend data
    daily_metrics: List[Dict[str, Any]]
    growth_rate: float
    acceleration: float
    
    # Predictions
    projected_followers_30d: int
    projected_streams_30d: int
    confidence_score: float

class BreakoutPrediction(BaseModel):
    artist_id: str
    breakout_probability: float
    confidence_level: str  # low, medium, high
    
    # Contributing factors
    factors: Dict[str, float]
    timeline_estimate: str  # "1-3 months", "3-6 months", etc.
    
    # Recommendations
    recommendations: List[str]
    risk_factors: List[str]

class SimilarArtist(BaseModel):
    artist: ArtistResponse
    similarity_score: float
    similarity_reasons: List[str]

class AlertResponse(BaseModel):
    id: int
    artist_id: str
    alert_type: str
    title: str
    message: str
    triggered_at: Optional[datetime]
    is_active: bool
    created_at: datetime

class CollaborationNetwork(BaseModel):
    artist_id: str
    collaborators: List[Dict[str, Any]]
    network_strength: float
    cluster_info: Dict[str, Any]

# Request schemas
class CreateAlertRequest(BaseModel):
    artist_id: str
    alert_type: str
    threshold: float
    title: str
    message: str

class BulkAnalysisRequest(BaseModel):
    artist_ids: List[str]
    analysis_types: List[str]  # ["breakout", "growth", "similarity"]

# Response wrappers
class APIResponse(BaseModel):
    success: bool
    data: Optional[Any] = None
    message: Optional[str] = None
    error: Optional[str] = None

class PaginatedResponse(BaseModel):
    items: List[Any]
    total: int
    page: int
    per_page: int
    has_next: bool
    has_prev: bool
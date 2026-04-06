from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, Text, ForeignKey, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime

Base = declarative_base()

class Artist(Base):
    __tablename__ = "artists"
    
    id = Column(String, primary_key=True)  # Spotify ID
    name = Column(String, nullable=False)
    genres = Column(JSON)  # List of genres
    popularity = Column(Integer, default=0)
    followers = Column(Integer, default=0)
    image_url = Column(String)
    spotify_url = Column(String)
    
    # Social media handles
    instagram_handle = Column(String)
    tiktok_handle = Column(String)
    twitter_handle = Column(String)
    
    # AI-generated insights
    breakout_score = Column(Float, default=0.0)  # 0-100 scale
    trend_direction = Column(String, default="stable")  # up, down, stable
    genre_confidence = Column(Float, default=0.0)
    
    # Label Management (CRM) fields
    status = Column(String, default="available")  # signed, watching, contacted, available
    is_watched = Column(Boolean, default=False)
    notes = Column(Text)
    signed_date = Column(DateTime)
    contract_value = Column(Float)

    # Metadata
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    tracks = relationship("Track", back_populates="artist")
    metrics = relationship("Metrics", back_populates="artist")

class Track(Base):
    __tablename__ = "tracks"
    
    id = Column(String, primary_key=True)  # Spotify ID
    name = Column(String, nullable=False)
    artist_id = Column(String, ForeignKey("artists.id"))
    album_name = Column(String)
    duration_ms = Column(Integer)
    popularity = Column(Integer, default=0)
    explicit = Column(Boolean, default=False)
    preview_url = Column(String)
    spotify_url = Column(String)
    
    # Audio features
    danceability = Column(Float)
    energy = Column(Float)
    valence = Column(Float)  # Musical positivity
    tempo = Column(Float)
    acousticness = Column(Float)
    instrumentalness = Column(Float)
    liveness = Column(Float)
    speechiness = Column(Float)
    
    # AI analysis
    mood = Column(String)  # happy, sad, energetic, chill, etc.
    quality_score = Column(Float, default=0.0)  # Production quality 0-100
    viral_potential = Column(Float, default=0.0)  # Viral potential 0-100
    
    # Metadata
    release_date = Column(DateTime)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    artist = relationship("Artist", back_populates="tracks")

class Metrics(Base):
    __tablename__ = "metrics"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    artist_id = Column(String, ForeignKey("artists.id"))
    
    # Platform metrics
    spotify_monthly_listeners = Column(Integer, default=0)
    spotify_followers = Column(Integer, default=0)
    youtube_subscribers = Column(Integer, default=0)
    youtube_views = Column(Integer, default=0)
    instagram_followers = Column(Integer, default=0)
    tiktok_followers = Column(Integer, default=0)
    
    # Engagement metrics
    avg_streams_per_track = Column(Float, default=0.0)
    engagement_rate = Column(Float, default=0.0)  # Comments/likes per follower
    skip_rate = Column(Float, default=0.0)  # How often tracks are skipped
    replay_rate = Column(Float, default=0.0)  # How often tracks are replayed
    
    # Geographic data
    top_countries = Column(JSON)  # List of top countries by streams
    growth_regions = Column(JSON)  # Regions with highest growth
    
    # Calculated scores
    momentum_score = Column(Float, default=0.0)  # Growth momentum 0-100
    engagement_quality = Column(Float, default=0.0)  # Quality of engagement 0-100
    market_penetration = Column(Float, default=0.0)  # How well-known in target market
    
    # Timestamp
    recorded_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    artist = relationship("Artist", back_populates="metrics")

class Collaboration(Base):
    __tablename__ = "collaborations"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    artist1_id = Column(String, ForeignKey("artists.id"))
    artist2_id = Column(String, ForeignKey("artists.id"))
    track_id = Column(String, ForeignKey("tracks.id"))
    collaboration_type = Column(String)  # feature, producer, writer
    
    created_at = Column(DateTime, default=datetime.utcnow)

class Alert(Base):
    __tablename__ = "alerts"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String)  # Will implement user system later
    artist_id = Column(String, ForeignKey("artists.id"))
    
    alert_type = Column(String)  # growth_spike, new_release, viral_track
    threshold = Column(Float)  # Trigger threshold
    is_active = Column(Boolean, default=True)
    
    # Alert details
    title = Column(String)
    message = Column(Text)
    triggered_at = Column(DateTime)
    
    created_at = Column(DateTime, default=datetime.utcnow)

class TrendingArtist(Base):
    __tablename__ = "trending_artists"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    artist_id = Column(String, ForeignKey("artists.id"))
    
    # Trending metrics
    trend_score = Column(Float)  # Overall trending score
    velocity = Column(Float)  # Rate of growth
    region = Column(String)  # Geographic region
    genre = Column(String)  # Primary genre
    
    # Rankings
    current_rank = Column(Integer)
    previous_rank = Column(Integer)
    rank_change = Column(Integer)
    
    # Metadata
    trending_date = Column(DateTime, default=datetime.utcnow)
    
    created_at = Column(DateTime, default=datetime.utcnow)
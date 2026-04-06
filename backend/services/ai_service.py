try:
    import numpy as np
except ImportError:
    np = None
from typing import Dict, List, Optional
import random
from datetime import datetime, timedelta

class AIService:
    def __init__(self):
        self.genre_model = None  # Will load actual model later
        self.breakout_model = None
        self.similarity_model = None
    
    async def analyze_artist(self, artist_data: Dict) -> Dict:
        """Comprehensive AI analysis of an artist"""
        
        # Calculate breakout score
        breakout_score = self._calculate_breakout_score(artist_data)
        
        # Determine trend direction
        trend_direction = self._analyze_trend_direction(artist_data)
        
        # Genre confidence
        genre_confidence = self._calculate_genre_confidence(artist_data)
        
        # Additional insights
        insights = self._generate_insights(artist_data)
        
        return {
            "breakout_score": breakout_score,
            "trend_direction": trend_direction,
            "genre_confidence": genre_confidence,
            "insights": insights,
            "analysis_timestamp": datetime.utcnow().isoformat()
        }
    
    async def analyze_track(self, track_data: Dict) -> Dict:
        """AI analysis of individual tracks"""
        
        # Determine mood from audio features
        mood = self._classify_mood(track_data)
        
        # Calculate quality score
        quality_score = self._calculate_quality_score(track_data)
        
        # Predict viral potential
        viral_potential = self._predict_viral_potential(track_data)
        
        return {
            "mood": mood,
            "quality_score": quality_score,
            "viral_potential": viral_potential
        }
    
    async def predict_breakout(self, artist_id: str) -> Dict:
        """Predict breakout potential for an artist"""
        
        # Mock prediction for now - will implement ML model later
        probability = random.uniform(0.1, 0.9)
        
        confidence_levels = {
            (0.0, 0.3): "low",
            (0.3, 0.7): "medium", 
            (0.7, 1.0): "high"
        }
        
        confidence_level = next(
            level for (low, high), level in confidence_levels.items()
            if low <= probability < high
        )
        
        # Contributing factors
        factors = {
            "growth_velocity": random.uniform(0.1, 0.9),
            "engagement_quality": random.uniform(0.2, 0.8),
            "cross_platform_presence": random.uniform(0.3, 0.9),
            "collaboration_network": random.uniform(0.1, 0.7),
            "content_quality": random.uniform(0.4, 0.9),
            "market_timing": random.uniform(0.2, 0.8)
        }
        
        # Timeline estimate
        timeline_estimates = ["1-3 months", "3-6 months", "6-12 months", "12+ months"]
        timeline = random.choice(timeline_estimates)
        
        # Recommendations
        recommendations = [
            "Focus on TikTok content creation",
            "Collaborate with trending artists",
            "Target playlist curators",
            "Expand to new geographic markets",
            "Increase release frequency"
        ]
        
        # Risk factors
        risk_factors = [
            "Limited cross-platform presence",
            "Narrow geographic appeal",
            "Low engagement rates",
            "Inconsistent content quality"
        ]
        
        return {
            "breakout_probability": probability,
            "confidence_level": confidence_level,
            "factors": factors,
            "timeline_estimate": timeline,
            "recommendations": random.sample(recommendations, 3),
            "risk_factors": random.sample(risk_factors, 2)
        }
    
    async def find_similar_artists(self, artist_id: str, limit: int = 10) -> List[Dict]:
        """Find artists similar to the given artist"""
        
        # Mock similar artists for now
        similar_artists = []
        
        for i in range(limit):
            similarity_score = random.uniform(0.6, 0.95)
            
            reasons = [
                "Similar vocal style",
                "Comparable genre blend",
                "Similar audience demographics",
                "Matching energy levels",
                "Similar production style",
                "Comparable growth trajectory"
            ]
            
            artist_data = {
                "artist": {
                    "id": f"similar_artist_{i}",
                    "name": f"Similar Artist {i}",
                    "genres": ["afrobeats", "pop"],
                    "popularity": 50 + i * 3,
                    "followers": 15000 + i * 2000,
                    "image_url": "https://via.placeholder.com/300x300",
                    "spotify_url": f"https://open.spotify.com/artist/similar_{i}",
                    "breakout_score": 60 + i * 2,
                    "trend_direction": "up",
                    "genre_confidence": 0.8,
                    "created_at": datetime.utcnow(),
                    "updated_at": datetime.utcnow()
                },
                "similarity_score": similarity_score,
                "similarity_reasons": random.sample(reasons, 3)
            }
            similar_artists.append(artist_data)
        
        # Sort by similarity score
        similar_artists.sort(key=lambda x: x["similarity_score"], reverse=True)
        
        return similar_artists
    
    def _calculate_breakout_score(self, artist_data: Dict) -> float:
        """Calculate breakout potential score (0-100) using advanced A&R logic"""
        
        # 1. Reach & Popularity (20%)
        # High popularity is good, but medium popularity with high growth is better for A&R
        popularity = artist_data.get("popularity", 0)
        pop_score = 1.0 if 40 <= popularity <= 80 else (popularity / 100)
        
        # 2. Velocity & Growth (30%)
        # Crucial for early discovery
        followers = artist_data.get("followers", 0)
        follower_growth = artist_data.get("follower_growth", 0)
        # If no growth data, estimate based on popularity/followers ratio
        if follower_growth == 0 and followers > 0:
            follower_growth = min(0.5, (popularity / 100) * (1000 / max(1, followers)))
        growth_score = min(1.0, follower_growth * 5) # 20% growth = 1.0 score

        # 3. Market Saturation & Genre Trend (20%)
        # Afrobeats, Amapiano, and Latin are high-growth genres
        genres = [g.lower() for g in artist_data.get("genres", [])]
        high_growth_genres = ["afrobeats", "amapiano", "trap", "reggaeton", "drill"]
        genre_score = 0.5
        if any(g in genres for g in high_growth_genres):
            genre_score = 0.9
        elif any("pop" in g or "hip hop" in g for g in genres):
            genre_score = 0.7

        # 4. Engagement & Digital Footprint (20%)
        # Cross-platform presence is a strong signal
        platforms = 0
        if artist_data.get("instagram_handle"): platforms += 0.3
        if artist_data.get("tiktok_handle"): platforms += 0.4
        if artist_data.get("twitter_handle"): platforms += 0.3
        if not (artist_data.get("instagram_handle") or artist_data.get("tiktok_handle")):
            platforms = 0.2 # Baseline

        # 5. Engagement Quality (10%)
        engagement = artist_data.get("engagement_rate", 0.03)
        eng_score = min(1.0, engagement * 20) # 5% engagement = 1.0 score
        
        # Weighted calculation
        score = (
            (pop_score * 0.20) +
            (growth_score * 0.30) +
            (genre_score * 0.20) +
            (platforms * 0.20) +
            (eng_score * 0.10)
        ) * 100

        # Add "Discovery Bonus" for relatively unknown artists with high popularity
        if followers < 50000 and popularity > 60:
            score += 10

        return max(0, min(100, score))
    
    def _analyze_trend_direction(self, artist_data: Dict) -> str:
        """Analyze if artist is trending up, down, or stable"""
        
        popularity = artist_data.get("popularity", 50)
        followers = artist_data.get("followers", 10000)
        
        # Simple heuristic based on popularity and followers
        if popularity > 70 and followers > 100000:
            return "up"
        elif popularity < 30 and followers < 5000:
            return "down"
        else:
            return "stable"
    
    def _calculate_genre_confidence(self, artist_data: Dict) -> float:
        """Calculate confidence in genre classification"""
        
        genres = artist_data.get("genres", [])
        
        if not genres:
            return 0.3
        elif len(genres) == 1:
            return 0.9
        elif len(genres) <= 3:
            return 0.7
        else:
            return 0.5  # Too many genres = less confident
    
    def _classify_mood(self, track_data: Dict) -> str:
        """Classify track mood based on audio features"""
        
        valence = track_data.get("valence", 0.5)
        energy = track_data.get("energy", 0.5)
        danceability = track_data.get("danceability", 0.5)
        
        if valence > 0.7 and energy > 0.7:
            return "happy"
        elif valence < 0.3 and energy < 0.4:
            return "sad"
        elif energy > 0.8 and danceability > 0.7:
            return "energetic"
        elif energy < 0.4 and valence > 0.4:
            return "chill"
        else:
            return "neutral"
    
    def _calculate_quality_score(self, track_data: Dict) -> float:
        """Calculate production quality score"""
        
        # Factors that indicate quality
        factors = {
            "popularity": track_data.get("popularity", 0) / 100,
            "audio_balance": 1 - abs(0.5 - track_data.get("energy", 0.5)),
            "duration_optimal": 1 - abs(180000 - track_data.get("duration_ms", 180000)) / 180000,
            "not_too_instrumental": 1 - track_data.get("instrumentalness", 0.1),
            "not_too_live": 1 - track_data.get("liveness", 0.1)
        }
        
        # Calculate weighted average
        quality_score = sum(factors.values()) / len(factors) * 100
        
        return max(0, min(100, quality_score))
    
    def _predict_viral_potential(self, track_data: Dict) -> float:
        """Predict viral potential of a track"""
        
        # Viral tracks tend to have certain characteristics
        danceability = track_data.get("danceability", 0.5)
        energy = track_data.get("energy", 0.5)
        valence = track_data.get("valence", 0.5)
        popularity = track_data.get("popularity", 0) / 100
        
        # Optimal ranges for viral content
        viral_score = 0
        
        # High danceability is good for viral content
        if danceability > 0.7:
            viral_score += 25
        
        # High energy
        if energy > 0.6:
            viral_score += 20
        
        # Positive or very negative valence (emotional extremes)
        if valence > 0.7 or valence < 0.3:
            viral_score += 20
        
        # Current popularity
        viral_score += popularity * 35
        
        return min(100, viral_score)
    
    def _generate_insights(self, artist_data: Dict) -> List[str]:
        """Generate actionable insights about an artist"""
        
        insights = []
        
        popularity = artist_data.get("popularity", 0)
        followers = artist_data.get("followers", 0)
        genres = artist_data.get("genres", [])
        
        if popularity < 50:
            insights.append("Artist has significant growth potential")
        
        if followers < 50000:
            insights.append("Focus on building core fanbase")
        
        if "afrobeats" in genres:
            insights.append("Well-positioned in trending Afrobeats market")
        
        if not artist_data.get("instagram_handle"):
            insights.append("Should establish stronger social media presence")
        
        return insights
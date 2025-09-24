import numpy as np
from typing import Dict, List, Optional
from datetime import datetime, timedelta
import random

class AnalyticsService:
    def __init__(self):
        self.growth_threshold = 0.2  # 20% growth threshold
        self.viral_threshold = 0.8   # 80% viral potential threshold
    
    async def get_trending_artists(
        self, 
        region: str = "global", 
        genre: Optional[str] = None, 
        limit: int = 50
    ) -> Dict:
        """Get trending artists with breakout potential"""
        
        # Mock trending data for now
        trending_artists = []
        
        for i in range(limit):
            artist_data = {
                "artist": {
                    "id": f"trending_artist_{i}",
                    "name": f"Rising Star {i}",
                    "genres": [genre] if genre else ["afrobeats", "pop"],
                    "popularity": 45 + i * 2,
                    "followers": 5000 + i * 1000,
                    "image_url": "https://via.placeholder.com/300x300",
                    "spotify_url": f"https://open.spotify.com/artist/trending_{i}",
                    "breakout_score": 65 + i * 3,
                    "trend_direction": "up",
                    "genre_confidence": 0.85,
                    "created_at": datetime.utcnow(),
                    "updated_at": datetime.utcnow()
                },
                "trend_score": 85 - i * 1.5,
                "velocity": 0.15 + i * 0.01,
                "current_rank": i + 1,
                "previous_rank": i + 2 if i < 49 else None,
                "rank_change": 1 if i < 49 else 0
            }
            trending_artists.append(artist_data)
        
        return {
            "region": region,
            "genre": genre,
            "trending_artists": trending_artists,
            "generated_at": datetime.utcnow()
        }
    
    async def get_growth_metrics(self, artist_id: str, days: int = 30) -> Dict:
        """Calculate growth metrics for an artist"""
        
        # Generate mock time series data
        daily_metrics = []
        base_followers = 10000
        base_streams = 50000
        
        for i in range(days):
            date = datetime.utcnow() - timedelta(days=days-i)
            
            # Simulate growth with some randomness
            growth_factor = 1 + (i / days) * 0.3 + random.uniform(-0.05, 0.05)
            
            daily_data = {
                "date": date.isoformat(),
                "followers": int(base_followers * growth_factor),
                "streams": int(base_streams * growth_factor),
                "engagement_rate": 0.05 + random.uniform(-0.01, 0.01),
                "new_listeners": int(1000 * growth_factor * random.uniform(0.8, 1.2))
            }
            daily_metrics.append(daily_data)
        
        # Calculate growth rates
        initial_followers = daily_metrics[0]["followers"]
        final_followers = daily_metrics[-1]["followers"]
        follower_growth = (final_followers - initial_followers) / initial_followers
        
        initial_streams = daily_metrics[0]["streams"]
        final_streams = daily_metrics[-1]["streams"]
        stream_growth = (final_streams - initial_streams) / initial_streams
        
        # Calculate acceleration (second derivative)
        growth_rates = []
        for i in range(1, len(daily_metrics)):
            rate = (daily_metrics[i]["followers"] - daily_metrics[i-1]["followers"]) / daily_metrics[i-1]["followers"]
            growth_rates.append(rate)
        
        acceleration = np.mean(np.diff(growth_rates)) if len(growth_rates) > 1 else 0
        
        return {
            "artist_id": artist_id,
            "period_days": days,
            "follower_growth": follower_growth,
            "stream_growth": stream_growth,
            "engagement_growth": 0.15,  # Mock engagement growth
            "daily_metrics": daily_metrics,
            "growth_rate": (follower_growth + stream_growth) / 2,
            "acceleration": acceleration,
            "projected_followers_30d": int(final_followers * (1 + follower_growth * 0.5)),
            "projected_streams_30d": int(final_streams * (1 + stream_growth * 0.5)),
            "confidence_score": 0.75
        }
    
    def calculate_momentum_score(self, metrics: Dict) -> float:
        """Calculate momentum score based on various metrics"""
        
        # Weighted scoring system
        weights = {
            "follower_growth": 0.3,
            "stream_growth": 0.25,
            "engagement_rate": 0.2,
            "viral_tracks": 0.15,
            "collaboration_score": 0.1
        }
        
        # Normalize metrics to 0-100 scale
        normalized_scores = {}
        
        # Follower growth (0-50% growth maps to 0-100 score)
        follower_growth = min(metrics.get("follower_growth", 0) * 2, 1.0) * 100
        normalized_scores["follower_growth"] = follower_growth
        
        # Stream growth
        stream_growth = min(metrics.get("stream_growth", 0) * 2, 1.0) * 100
        normalized_scores["stream_growth"] = stream_growth
        
        # Engagement rate (0-10% maps to 0-100)
        engagement_rate = min(metrics.get("engagement_rate", 0) * 10, 1.0) * 100
        normalized_scores["engagement_rate"] = engagement_rate
        
        # Viral tracks (number of tracks with high viral potential)
        viral_tracks = min(metrics.get("viral_tracks", 0) * 20, 100)
        normalized_scores["viral_tracks"] = viral_tracks
        
        # Collaboration score
        collaboration_score = metrics.get("collaboration_score", 0) * 100
        normalized_scores["collaboration_score"] = collaboration_score
        
        # Calculate weighted average
        momentum_score = sum(
            normalized_scores[metric] * weight 
            for metric, weight in weights.items()
        )
        
        return min(momentum_score, 100.0)
    
    def detect_breakout_signals(self, artist_data: Dict) -> List[str]:
        """Detect signals that indicate potential breakout"""
        
        signals = []
        
        # Growth velocity
        if artist_data.get("follower_growth", 0) > 0.3:
            signals.append("High follower growth velocity")
        
        # Cross-platform momentum
        if artist_data.get("cross_platform_growth", False):
            signals.append("Growing across multiple platforms")
        
        # Geographic expansion
        if len(artist_data.get("top_countries", [])) > 3:
            signals.append("International audience expansion")
        
        # Collaboration network
        if artist_data.get("collaboration_count", 0) > 2:
            signals.append("Active collaboration network")
        
        # Viral content
        if artist_data.get("viral_tracks", 0) > 0:
            signals.append("Viral track potential")
        
        # Industry attention
        if artist_data.get("playlist_adds", 0) > 10:
            signals.append("Playlist curator attention")
        
        return signals
    
    def calculate_market_penetration(self, artist_data: Dict, target_market: str = "global") -> float:
        """Calculate how well-known an artist is in their target market"""
        
        # Mock calculation based on various factors
        factors = {
            "followers_in_market": artist_data.get("followers", 0),
            "streams_in_market": artist_data.get("monthly_listeners", 0),
            "radio_plays": artist_data.get("radio_plays", 0),
            "social_mentions": artist_data.get("social_mentions", 0),
            "playlist_presence": artist_data.get("playlist_adds", 0)
        }
        
        # Normalize based on market size
        market_sizes = {
            "nigeria": 200_000_000,
            "ghana": 30_000_000,
            "south_africa": 60_000_000,
            "kenya": 50_000_000,
            "global": 8_000_000_000
        }
        
        market_size = market_sizes.get(target_market.lower(), market_sizes["global"])
        
        # Calculate penetration percentage
        follower_penetration = (factors["followers_in_market"] / market_size) * 100
        
        # Cap at reasonable maximum
        return min(follower_penetration * 1000, 100.0)  # Scale up for visibility
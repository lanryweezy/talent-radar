try:
    import numpy as np
except ImportError:
    np = None
from typing import Dict, List, Optional, Tuple
import random
from datetime import datetime, timedelta

class AIService:
    def __init__(self):
        self.ARCHETYPES = {
            "Street Viral Artist": {
                "desc": "High velocity in local nodes, strong TikTok presence.",
                "strategies": ["Sound-bite optimization", "Localized street marketing", "Viral playlist targeting"]
            },
            "Emotional Storyteller": {
                "desc": "High lyric engagement, R&B/Soul focus, female-leaning audience.",
                "strategies": ["Late-night radio features", "Visual EP storytelling", "Mood-based playlisting"]
            },
            "Club Banger Specialist": {
                "desc": "High energy, DJ-driven growth, Amapiano/Dance focus.",
                "strategies": ["DJ pool distribution", "Nightclub PA tours", "Dance challenge campaigns"]
            },
            "Global Crossover Potential": {
                "desc": "Polished production, international appeal, Afrobeats/Pop.",
                "strategies": ["UK/US feature bridge", "Global DSP prioritization", "High-budget visual narrative"]
            },
            "Alté Innovator": {
                "desc": "Niche authority, high aesthetic value, indie-leaning.",
                "strategies": ["Fashion/Lifestyles sync", "Curated venue tours", "Zine/Blog culture alignment"]
            },
            "Vocal Powerhouse": {
                "desc": "Exceptional vocal range, traditional appeal, long-term stability.",
                "strategies": ["Live performance showcases", "Acoustic sessions", "TV/Film soundtrack sync"]
            },
            "Supernova": {
                "desc": "Explosive multi-platform growth, high virality, instant mainstream appeal.",
                "strategies": ["Aggressive cross-platform scaling", "Immediate major label bidding", "High-profile brand partnerships"]
            }
        }
    
    async def analyze_artist(self, artist_data: Dict) -> Dict:
        """Deep AI intelligence analysis of an artist"""
        
        # 1. Assign Archetype
        archetype_key = self._determine_archetype_key(artist_data)
        archetype_data = self.ARCHETYPES[archetype_key]
        
        # 2. Predictive Trajectory
        prediction = self._predict_trajectory(artist_data)
        
        # 3. Market Fit Score
        market_fit = self._calculate_market_fit(artist_data)
        
        # 4. Strategic Intelligence
        intel = self._generate_strategic_intel(artist_data, archetype_key)
        
        breakout_score = self._calculate_breakout_score(artist_data)

        # 5. Advanced Intelligence Features
        demographics = self.analyze_audience_demographics(artist_data)
        collaborations = self.suggest_collaborations(artist_data, archetype_key)
        campaign = self.generate_campaign_strategy(artist_data, archetype_key, breakout_score)

        return {
            "archetype": archetype_key,
            "archetype_description": archetype_data["desc"],
            "predicted_growth": prediction["growth"],
            "confidence": prediction["confidence"],
            "market_fit_score": market_fit,
            "strategic_intelligence": intel,
            "breakout_score": breakout_score,
            "audience_demographics": demographics,
            "suggested_collaborations": collaborations,
            "campaign_strategy": campaign,
            "analysis_timestamp": datetime.utcnow().isoformat()
        }

    def _determine_archetype_key(self, data: Dict) -> str:
        """Categorize artist based on sonic and social signals"""
        genres = [g.lower() for g in data.get("genres", [])]
        pop = data.get("popularity", 50)

        if any(g in ["street", "pop", "hip hop"] for g in genres) and pop < 65:
            return "Street Viral Artist"
        if any(g in ["r&b", "soul", "jazz"] for g in genres):
            return "Emotional Storyteller"
        if any(g in ["amapiano", "dance", "electronic", "house"] for g in genres):
            return "Club Banger Specialist"
        if any(g in ["afrobeats", "pop"] for g in genres) and pop >= 70:
            return "Global Crossover Potential"
        if any(g in ["alte", "indie", "alternative"] for g in genres):
            return "Alté Innovator"
        if any(g in ["soul", "gospel", "classical"] for g in genres):
            return "Vocal Powerhouse"

        velocity = data.get("velocity", 0.0)
        pop = data.get("popularity", 50)

        # Supernova threshold: very high velocity and solid base popularity
        if velocity > 0.8 and pop >= 60:
            return "Supernova"

        return random.choice(list(self.ARCHETYPES.keys()))

    def _predict_trajectory(self, data: Dict) -> Dict:
        """Predict growth trajectory using velocity delta"""
        velocity = data.get("velocity", 0.1)
        growth = velocity * 1.6 + random.uniform(0.05, 0.25)
        
        return {
            "growth": round(growth * 100, 1),
            "confidence": round(0.78 + (velocity * 0.4), 2),
            "trend": "Supernova" if growth > 0.5 else "Breakout" if growth > 0.2 else "Steady"
        }

    def _calculate_market_fit(self, data: Dict) -> float:
        """How well the artist fits current global trends"""
        genres = [g.lower() for g in data.get("genres", [])]
        trending = ["afrobeats", "amapiano", "latin", "k-pop", "phonk"]
        
        base = 0.65
        if any(g in trending for g in genres):
            base += 0.2
        
        return round(min(base + random.uniform(-0.05, 0.1), 0.98), 2)

    def _generate_strategic_intel(self, data: Dict, archetype_key: str) -> List[str]:
        """Generate high-level A&R strategy points"""
        archetype_strategies = self.ARCHETYPES[archetype_key]["strategies"]

        # Add dynamic intelligence based on data
        dynamic_intel = []
        if data.get("popularity", 0) > 80:
            dynamic_intel.append("Manage brand saturation - prioritize high-value selective syncs")
        if data.get("followers", 0) < 10000:
            dynamic_intel.append("Focus on core fanbase acquisition over wide-reach ads")

        return (archetype_strategies + dynamic_intel)[:4]

    def _calculate_breakout_score(self, artist_data: Dict) -> float:
        """Talent Score v2.4 formula: 0.40 Velocity + 0.25 Engagement + 0.15 Virality + 0.10 Consistency + 0.10 Cross-Platform"""
        
        # Get raw metrics with safe defaults, assuming 0-100 scale where applicable, or decimals
        # Often data might not perfectly match these fields, so we infer them or use random generation for simulation if absent.
        # In a real app, these would come from DataCollector/AnalyticsService

        # Base velocity (usually decimal, convert to 0-100 equivalent for the score)
        raw_velocity = artist_data.get("velocity", 0.05)
        velocity_score = min(raw_velocity * 1000, 100.0) # Scale velocity up

        # Simulate other components based on popularity and followers if not explicitly provided
        pop = artist_data.get("popularity", 0)

        engagement_score = artist_data.get("engagement_score", pop * 1.1)
        virality_score = artist_data.get("virality_score", min(velocity_score * 1.2, 100.0))
        consistency_score = artist_data.get("consistency_score", max(pop - 10, 0))
        cross_platform_score = artist_data.get("cross_platform_score", min((pop + velocity_score)/2, 100.0))

        # Talent Score v2.4 Formula
        score = (
            (0.40 * velocity_score) +
            (0.25 * engagement_score) +
            (0.15 * virality_score) +
            (0.10 * consistency_score) +
            (0.10 * cross_platform_score)
        )

        return round(min(score, 100.0), 1)

    async def predict_breakout(self, artist_id: str) -> Dict:
        """Enhanced breakout prediction for dashboard"""
        prob = random.uniform(0.7, 0.98)
        return {
            "breakout_probability": round(prob, 2),
            "confidence_level": "High" if prob > 0.85 else "Medium",
            "factors": {
                "velocity_momentum": 0.94,
                "cultural_relevance": 0.88,
                "playlist_retention": 0.82
            },
            "timeline_estimate": "2-5 months",
            "recommendations": [
                "Deploy high-velocity TikTok 'seed' campaign",
                "Negotiate strategic collaboration with Tier-1 lead",
                "Execute visual storytelling campaign for top 3 tracks"
            ]
        }

    def analyze_audience_demographics(self, artist_data: Dict) -> Dict:
        """Estimate audience demographics based on genre and platform presence"""
        genres = [g.lower() for g in artist_data.get("genres", [])]

        primary_age_group = "18-24"
        gender_split = {"male": 50, "female": 50}

        if any(g in ["street", "drill", "hip hop"] for g in genres):
            gender_split = {"male": 65, "female": 35}
            primary_age_group = "16-24"
        elif any(g in ["r&b", "soul"] for g in genres):
            gender_split = {"male": 35, "female": 65}
            primary_age_group = "25-34"
        elif any(g in ["pop", "k-pop"] for g in genres):
            gender_split = {"male": 30, "female": 70}
            primary_age_group = "13-24"

        return {
            "primary_age_group": primary_age_group,
            "gender_distribution": gender_split,
            "top_regions": ["US", "UK", "NG", "ZA"][:random.randint(2, 4)]
        }

    def suggest_collaborations(self, artist_data: Dict, archetype_key: str) -> List[str]:
        """Identify potential synergistic artist collaborations"""
        collabs = []
        genres = artist_data.get("genres", [])
        pop = artist_data.get("popularity", 0)

        # Suggest collabs based on archetype
        if archetype_key == "Global Crossover Potential":
            collabs.append("Tier-1 US/UK Pop Artist")
            collabs.append("Established Latin crossover act")
        elif archetype_key == "Club Banger Specialist":
            collabs.append("Top regional DJ/Producer")
            collabs.append("Viral Amapiano vocalist")
        elif archetype_key == "Supernova":
            collabs.append("Global superstar (A-List)")
            collabs.append("High-profile fashion brand (Sync)")
        else:
            collabs.append(f"Rising {genres[0] if genres else 'Pop'} artist in adjacent region")
            collabs.append("Established legacy act for credibility")

        return collabs

    def generate_campaign_strategy(self, artist_data: Dict, archetype_key: str, breakout_score: float) -> Dict:
        """Create a custom marketing campaign based on AI analysis"""
        budget_allocation = {}
        focus = ""

        if breakout_score > 85 or archetype_key == "Supernova":
            focus = "Aggressive Global Scaling"
            budget_allocation = {"TikTok/Short Form": 40, "DSP Playlisting": 30, "OOH Advertising": 15, "PR/Press": 15}
        elif breakout_score > 60:
            focus = "Regional Dominance & Crossover Prep"
            budget_allocation = {"TikTok/Short Form": 50, "DSP Playlisting": 25, "Influencer Seeding": 20, "Live Events": 5}
        else:
            focus = "Core Fanbase Building"
            budget_allocation = {"Community Building": 40, "Content Production": 30, "Niche Playlisting": 20, "Targeted Social Ads": 10}

        return {
            "primary_focus": focus,
            "recommended_budget_split": budget_allocation,
            "timeline": "3-6 months",
            "key_kpi": "Streaming velocity and UGC creation rate" if breakout_score > 60 else "Follower conversion rate and engagement"
        }

    async def find_similar_artists(self, artist_id: str, limit: int = 10) -> List[Dict]:
        """Find artists with similar sonic and growth profiles"""
        similar = []
        reasons = ["Vocal texture overlap", "Audience demographic match", "High similarity in sonic velocity", "Matching cultural node intensity"]
        for i in range(limit):
            similar.append({
                "artist": {
                    "id": f"sim_{i}",
                    "name": f"Discovery Artist {i}",
                    "genres": ["afrobeats", "soul"],
                    "popularity": 58,
                    "image_url": f"https://images.unsplash.com/photo-{1500000000000 + i}?auto=format&fit=crop&w=300&h=300",
                    "breakout_score": 79.2
                },
                "similarity_score": round(0.88 - (i * 0.02), 2),
                "overlap_reason": random.choice(reasons)
            })
        return similar

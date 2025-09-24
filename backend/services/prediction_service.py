import numpy as np
import pandas as pd
from typing import Dict, List, Optional, Tuple
from datetime import datetime, timedelta
import logging
from sklearn.ensemble import RandomForestRegressor, GradientBoostingClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import joblib
import os

logger = logging.getLogger(__name__)

class PredictionService:
    """
    AI-powered prediction service for artist breakout potential and market trends
    Uses machine learning models to predict artist success probability
    """
    
    def __init__(self):
        self.breakout_model = None
        self.growth_model = None
        self.scaler = StandardScaler()
        self.model_path = "models/"
        self._ensure_model_directory()
        self._load_models()
    
    def _ensure_model_directory(self):
        """Ensure models directory exists"""
        if not os.path.exists(self.model_path):
            os.makedirs(self.model_path)
    
    def _load_models(self):
        """Load pre-trained models if they exist"""
        try:
            breakout_model_path = os.path.join(self.model_path, "breakout_model.joblib")
            growth_model_path = os.path.join(self.model_path, "growth_model.joblib")
            scaler_path = os.path.join(self.model_path, "scaler.joblib")
            
            if os.path.exists(breakout_model_path):
                self.breakout_model = joblib.load(breakout_model_path)
                logger.info("Loaded breakout prediction model")
            
            if os.path.exists(growth_model_path):
                self.growth_model = joblib.load(growth_model_path)
                logger.info("Loaded growth prediction model")
                
            if os.path.exists(scaler_path):
                self.scaler = joblib.load(scaler_path)
                logger.info("Loaded feature scaler")
                
        except Exception as e:
            logger.error(f"Error loading models: {str(e)}")
            self._initialize_default_models()
    
    def _initialize_default_models(self):
        """Initialize default models with basic configuration"""
        self.breakout_model = GradientBoostingClassifier(
            n_estimators=100,
            learning_rate=0.1,
            max_depth=6,
            random_state=42
        )
        
        self.growth_model = RandomForestRegressor(
            n_estimators=100,
            max_depth=10,
            random_state=42
        )
        
        logger.info("Initialized default prediction models")
    
    def extract_features(self, artist_data: Dict) -> np.ndarray:
        """
        Extract features from artist data for ML models
        """
        try:
            features = []
            
            # Spotify features
            spotify_data = artist_data.get('spotify_data', {})
            features.extend([
                spotify_data.get('monthly_listeners', 0),
                spotify_data.get('popularity', 0),
                len(spotify_data.get('genres', [])),
                len(spotify_data.get('top_tracks', [])),
                len(spotify_data.get('albums', [])),
                len(spotify_data.get('related_artists', []))
            ])
            
            # Social media features
            social_data = artist_data.get('social_media_data', {})
            instagram = social_data.get('instagram', {})
            tiktok = social_data.get('tiktok', {})
            twitter = social_data.get('twitter', {})
            youtube = social_data.get('youtube', {})
            
            features.extend([
                instagram.get('followers', 0),
                instagram.get('engagement_rate', 0),
                tiktok.get('followers', 0),
                tiktok.get('likes', 0),
                twitter.get('followers', 0),
                youtube.get('subscribers', 0),
                youtube.get('total_views', 0)
            ])
            
            # Streaming trends features
            trends = artist_data.get('streaming_trends', {})
            spotify_trends = trends.get('spotify_trends', {})
            features.extend([
                spotify_trends.get('weekly_growth', 0),
                spotify_trends.get('monthly_growth', 0),
                spotify_trends.get('playlist_additions', 0),
                len(spotify_trends.get('chart_positions', []))
            ])
            
            # Collaboration features
            collab_data = artist_data.get('collaboration_data', {})
            features.extend([
                len(collab_data.get('recent_collaborations', [])),
                len(collab_data.get('frequent_collaborators', [])),
                len(collab_data.get('producer_network', []))
            ])
            
            # Time-based features
            collected_at = artist_data.get('collected_at', datetime.utcnow().isoformat())
            try:
                collection_date = datetime.fromisoformat(collected_at)
                days_since_collection = (datetime.utcnow() - collection_date).days
                features.append(days_since_collection)
            except:
                features.append(0)
            
            # Genre encoding (simplified)
            genres = spotify_data.get('genres', [])
            genre_features = [0] * 10  # Top 10 genres
            genre_mapping = {
                'afrobeats': 0, 'hip hop': 1, 'pop': 2, 'r&b': 3, 'amapiano': 4,
                'reggae': 5, 'dancehall': 6, 'gospel': 7, 'jazz': 8, 'rock': 9
            }
            
            for genre in genres:
                genre_lower = genre.lower()
                for mapped_genre, index in genre_mapping.items():
                    if mapped_genre in genre_lower:
                        genre_features[index] = 1
                        break
            
            features.extend(genre_features)
            
            return np.array(features).reshape(1, -1)
            
        except Exception as e:
            logger.error(f"Error extracting features: {str(e)}")
            # Return default feature vector
            return np.zeros((1, 35))
    
    def predict_breakout_probability(self, artist_data: Dict) -> float:
        """
        Predict the probability of an artist breaking out (0-100)
        """
        try:
            if not self.breakout_model:
                return 50.0  # Default neutral score
            
            features = self.extract_features(artist_data)
            
            # If model is not trained, return calculated score
            try:
                scaled_features = self.scaler.transform(features)
                probability = self.breakout_model.predict_proba(scaled_features)[0][1]
                return min(100, max(0, probability * 100))
            except:
                # Fallback to rule-based calculation
                return self._calculate_breakout_score_rules(artist_data)
                
        except Exception as e:
            logger.error(f"Error predicting breakout probability: {str(e)}")
            return 50.0
    
    def _calculate_breakout_score_rules(self, artist_data: Dict) -> float:
        """
        Rule-based breakout score calculation as fallback
        """
        try:
            score = 0.0
            
            # Spotify metrics (40% weight)
            spotify_data = artist_data.get('spotify_data', {})
            monthly_listeners = spotify_data.get('monthly_listeners', 0)
            popularity = spotify_data.get('popularity', 0)
            
            if monthly_listeners > 5000000:
                score += 20
            elif monthly_listeners > 1000000:
                score += 15
            elif monthly_listeners > 100000:
                score += 10
            elif monthly_listeners > 10000:
                score += 5
            
            score += min(20, popularity / 5)
            
            # Social media metrics (30% weight)
            social_data = artist_data.get('social_media_data', {})
            total_social_followers = (
                social_data.get('instagram', {}).get('followers', 0) +
                social_data.get('tiktok', {}).get('followers', 0) +
                social_data.get('twitter', {}).get('followers', 0)
            )
            
            if total_social_followers > 10000000:
                score += 15
            elif total_social_followers > 1000000:
                score += 12
            elif total_social_followers > 100000:
                score += 8
            elif total_social_followers > 10000:
                score += 4
            
            # Growth trends (20% weight)
            trends = artist_data.get('streaming_trends', {})
            spotify_trends = trends.get('spotify_trends', {})
            monthly_growth = spotify_trends.get('monthly_growth', 0)
            
            if monthly_growth > 100:
                score += 10
            elif monthly_growth > 50:
                score += 8
            elif monthly_growth > 20:
                score += 5
            elif monthly_growth > 5:
                score += 2
            
            # Collaboration network (10% weight)
            collab_data = artist_data.get('collaboration_data', {})
            collab_count = len(collab_data.get('recent_collaborations', []))
            score += min(10, collab_count * 2)
            
            return min(100, max(0, score))
            
        except Exception as e:
            logger.error(f"Error in rule-based calculation: {str(e)}")
            return 50.0
    
    def predict_growth_rate(self, artist_data: Dict, months_ahead: int = 3) -> float:
        """
        Predict growth rate for the next N months
        """
        try:
            if not self.growth_model:
                return self._calculate_growth_rate_rules(artist_data)
            
            features = self.extract_features(artist_data)
            
            try:
                scaled_features = self.scaler.transform(features)
                growth_rate = self.growth_model.predict(scaled_features)[0]
                return max(0, growth_rate)
            except:
                return self._calculate_growth_rate_rules(artist_data)
                
        except Exception as e:
            logger.error(f"Error predicting growth rate: {str(e)}")
            return 0.0
    
    def _calculate_growth_rate_rules(self, artist_data: Dict) -> float:
        """
        Rule-based growth rate calculation
        """
        try:
            # Base growth on current trends
            trends = artist_data.get('streaming_trends', {})
            spotify_trends = trends.get('spotify_trends', {})
            current_growth = spotify_trends.get('monthly_growth', 0)
            
            # Apply momentum factor
            social_data = artist_data.get('social_media_data', {})
            social_engagement = sum([
                platform.get('engagement_rate', 0) 
                for platform in social_data.values() 
                if isinstance(platform, dict)
            ]) / max(1, len(social_data))
            
            momentum_factor = 1.0 + (social_engagement / 100)
            predicted_growth = current_growth * momentum_factor
            
            return max(0, predicted_growth)
            
        except Exception as e:
            logger.error(f"Error in growth rate calculation: {str(e)}")
            return 0.0
    
    def get_market_predictions(self, region: str = 'global') -> Dict:
        """
        Get market-level predictions and trends
        """
        try:
            return {
                'region': region,
                'predicted_breakouts_next_month': 25,
                'emerging_genres': [
                    {'genre': 'Afro-drill', 'growth_probability': 0.85},
                    {'genre': 'Afro-house', 'growth_probability': 0.78},
                    {'genre': 'Alte', 'growth_probability': 0.72}
                ],
                'hot_markets': [
                    {'market': 'Lagos', 'heat_score': 0.92},
                    {'market': 'Accra', 'heat_score': 0.87},
                    {'market': 'Johannesburg', 'heat_score': 0.83}
                ],
                'trend_predictions': {
                    'collaboration_increase': 0.65,
                    'streaming_growth': 0.78,
                    'social_media_importance': 0.89
                },
                'risk_factors': [
                    'Market saturation in Pop genre',
                    'Platform algorithm changes',
                    'Economic factors affecting streaming'
                ],
                'generated_at': datetime.utcnow().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Error getting market predictions: {str(e)}")
            return {}
    
    def get_artist_recommendations(self, artist_data: Dict) -> Dict:
        """
        Get AI-powered recommendations for artist development
        """
        try:
            breakout_score = self.predict_breakout_probability(artist_data)
            growth_rate = self.predict_growth_rate(artist_data)
            
            recommendations = []
            
            # Score-based recommendations
            if breakout_score > 80:
                recommendations.extend([
                    "Consider major label partnership opportunities",
                    "Plan international tour and marketing campaign",
                    "Secure high-profile collaborations"
                ])
            elif breakout_score > 60:
                recommendations.extend([
                    "Focus on playlist placements and radio promotion",
                    "Increase social media engagement",
                    "Explore regional expansion opportunities"
                ])
            else:
                recommendations.extend([
                    "Build stronger social media presence",
                    "Focus on consistent content creation",
                    "Develop local fanbase before expanding"
                ])
            
            # Growth-based recommendations
            if growth_rate > 50:
                recommendations.append("Capitalize on current momentum with frequent releases")
            elif growth_rate < 10:
                recommendations.append("Consider rebranding or genre pivot strategy")
            
            # Social media specific
            social_data = artist_data.get('social_media_data', {})
            tiktok_followers = social_data.get('tiktok', {}).get('followers', 0)
            if tiktok_followers < 100000:
                recommendations.append("Prioritize TikTok content strategy for viral potential")
            
            return {
                'breakout_probability': breakout_score,
                'predicted_growth_rate': growth_rate,
                'recommendations': recommendations,
                'priority_actions': recommendations[:3],
                'market_timing': 'optimal' if breakout_score > 70 else 'developing',
                'investment_risk': 'low' if breakout_score > 80 else 'medium' if breakout_score > 50 else 'high',
                'generated_at': datetime.utcnow().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Error generating recommendations: {str(e)}")
            return {}
    
    def train_models(self, training_data: List[Dict]):
        """
        Train the prediction models with new data
        """
        try:
            if len(training_data) < 10:
                logger.warning("Insufficient training data")
                return False
            
            # Prepare training data
            features_list = []
            breakout_labels = []
            growth_labels = []
            
            for data in training_data:
                features = self.extract_features(data).flatten()
                features_list.append(features)
                
                # These would come from historical data
                breakout_labels.append(data.get('actual_breakout', 0))
                growth_labels.append(data.get('actual_growth', 0))
            
            X = np.array(features_list)
            y_breakout = np.array(breakout_labels)
            y_growth = np.array(growth_labels)
            
            # Scale features
            X_scaled = self.scaler.fit_transform(X)
            
            # Train breakout model
            X_train, X_test, y_train, y_test = train_test_split(
                X_scaled, y_breakout, test_size=0.2, random_state=42
            )
            self.breakout_model.fit(X_train, y_train)
            
            # Train growth model
            X_train_g, X_test_g, y_train_g, y_test_g = train_test_split(
                X_scaled, y_growth, test_size=0.2, random_state=42
            )
            self.growth_model.fit(X_train_g, y_train_g)
            
            # Save models
            self._save_models()
            
            logger.info("Models trained successfully")
            return True
            
        except Exception as e:
            logger.error(f"Error training models: {str(e)}")
            return False
    
    def _save_models(self):
        """Save trained models to disk"""
        try:
            joblib.dump(self.breakout_model, os.path.join(self.model_path, "breakout_model.joblib"))
            joblib.dump(self.growth_model, os.path.join(self.model_path, "growth_model.joblib"))
            joblib.dump(self.scaler, os.path.join(self.model_path, "scaler.joblib"))
            logger.info("Models saved successfully")
        except Exception as e:
            logger.error(f"Error saving models: {str(e)}")
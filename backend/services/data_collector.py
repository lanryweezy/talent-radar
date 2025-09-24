import asyncio
import aiohttp
import logging
from typing import Dict, List, Optional
from datetime import datetime, timedelta
import json
from .spotify_service import SpotifyService
from .social_media_service import SocialMediaService

logger = logging.getLogger(__name__)

class DataCollector:
    """
    Comprehensive data collection service for A&R discovery
    Aggregates data from multiple sources: streaming platforms, social media, etc.
    """
    
    def __init__(self):
        self.spotify_service = SpotifyService()
        self.social_service = SocialMediaService()
        self.session = None
        
    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        return self
        
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
    
    async def collect_artist_data(self, artist_name: str, artist_id: Optional[str] = None) -> Dict:
        """
        Collect comprehensive data for a single artist
        """
        try:
            # Collect data from multiple sources in parallel
            tasks = [
                self._collect_spotify_data(artist_name, artist_id),
                self._collect_social_media_data(artist_name),
                self._collect_streaming_trends(artist_name),
                self._collect_collaboration_data(artist_name)
            ]
            
            results = await asyncio.gather(*tasks, return_exceptions=True)
            
            # Combine all data sources
            artist_data = {
                'name': artist_name,
                'id': artist_id,
                'collected_at': datetime.utcnow().isoformat(),
                'spotify_data': results[0] if not isinstance(results[0], Exception) else {},
                'social_media_data': results[1] if not isinstance(results[1], Exception) else {},
                'streaming_trends': results[2] if not isinstance(results[2], Exception) else {},
                'collaboration_data': results[3] if not isinstance(results[3], Exception) else {}
            }
            
            return artist_data
            
        except Exception as e:
            logger.error(f"Error collecting data for artist {artist_name}: {str(e)}")
            return {}
    
    async def _collect_spotify_data(self, artist_name: str, artist_id: Optional[str] = None) -> Dict:
        """Collect Spotify-specific data"""
        try:
            if artist_id:
                artist_info = await self.spotify_service.get_artist_by_id(artist_id)
            else:
                search_results = await self.spotify_service.search_artists(artist_name, limit=1)
                if not search_results:
                    return {}
                artist_info = search_results[0]
            
            # Get additional Spotify data
            top_tracks = await self.spotify_service.get_artist_top_tracks(artist_info['id'])
            albums = await self.spotify_service.get_artist_albums(artist_info['id'])
            related_artists = await self.spotify_service.get_related_artists(artist_info['id'])
            
            return {
                'artist_info': artist_info,
                'top_tracks': top_tracks,
                'albums': albums,
                'related_artists': related_artists,
                'monthly_listeners': artist_info.get('followers', {}).get('total', 0),
                'popularity': artist_info.get('popularity', 0),
                'genres': artist_info.get('genres', [])
            }
            
        except Exception as e:
            logger.error(f"Error collecting Spotify data: {str(e)}")
            return {}
    
    async def _collect_social_media_data(self, artist_name: str) -> Dict:
        """Collect social media metrics"""
        try:
            # This would integrate with actual social media APIs
            # For now, return mock data structure
            return {
                'instagram': {
                    'followers': 0,
                    'engagement_rate': 0.0,
                    'recent_posts': []
                },
                'tiktok': {
                    'followers': 0,
                    'likes': 0,
                    'viral_videos': []
                },
                'twitter': {
                    'followers': 0,
                    'mentions': 0,
                    'sentiment': 'neutral'
                },
                'youtube': {
                    'subscribers': 0,
                    'total_views': 0,
                    'recent_videos': []
                }
            }
            
        except Exception as e:
            logger.error(f"Error collecting social media data: {str(e)}")
            return {}
    
    async def _collect_streaming_trends(self, artist_name: str) -> Dict:
        """Collect streaming platform trends"""
        try:
            # Mock implementation - would integrate with multiple streaming APIs
            return {
                'spotify_trends': {
                    'weekly_growth': 0.0,
                    'monthly_growth': 0.0,
                    'playlist_additions': 0,
                    'chart_positions': []
                },
                'apple_music_trends': {
                    'chart_positions': [],
                    'playlist_features': 0
                },
                'youtube_music_trends': {
                    'view_growth': 0.0,
                    'trending_videos': []
                },
                'audiomack_trends': {
                    'plays': 0,
                    'downloads': 0,
                    'trending_position': None
                },
                'boomplay_trends': {
                    'streams': 0,
                    'regional_popularity': {}
                }
            }
            
        except Exception as e:
            logger.error(f"Error collecting streaming trends: {str(e)}")
            return {}
    
    async def _collect_collaboration_data(self, artist_name: str) -> Dict:
        """Collect collaboration and network data"""
        try:
            # This would analyze features, co-writes, producer credits, etc.
            return {
                'recent_collaborations': [],
                'frequent_collaborators': [],
                'producer_network': [],
                'label_connections': [],
                'scene_connections': {
                    'genre_peers': [],
                    'regional_peers': [],
                    'rising_together': []
                }
            }
            
        except Exception as e:
            logger.error(f"Error collecting collaboration data: {str(e)}")
            return {}
    
    async def bulk_collect_trending_artists(self, limit: int = 50) -> List[Dict]:
        """
        Collect data for trending artists across multiple platforms
        """
        try:
            # Get trending artists from various sources
            trending_sources = [
                self._get_spotify_trending(),
                self._get_audiomack_trending(),
                self._get_social_trending()
            ]
            
            trending_results = await asyncio.gather(*trending_sources, return_exceptions=True)
            
            # Combine and deduplicate artists
            all_artists = []
            seen_artists = set()
            
            for result in trending_results:
                if isinstance(result, list):
                    for artist in result:
                        artist_key = artist.get('name', '').lower()
                        if artist_key not in seen_artists:
                            seen_artists.add(artist_key)
                            all_artists.append(artist)
            
            # Collect detailed data for top trending artists
            detailed_data = []
            for artist in all_artists[:limit]:
                artist_data = await self.collect_artist_data(
                    artist['name'], 
                    artist.get('id')
                )
                if artist_data:
                    detailed_data.append(artist_data)
            
            return detailed_data
            
        except Exception as e:
            logger.error(f"Error in bulk collection: {str(e)}")
            return []
    
    async def _get_spotify_trending(self) -> List[Dict]:
        """Get trending artists from Spotify"""
        try:
            # This would use Spotify's trending/viral playlists
            return []
        except Exception as e:
            logger.error(f"Error getting Spotify trending: {str(e)}")
            return []
    
    async def _get_audiomack_trending(self) -> List[Dict]:
        """Get trending artists from Audiomack"""
        try:
            # This would integrate with Audiomack's API
            return []
        except Exception as e:
            logger.error(f"Error getting Audiomack trending: {str(e)}")
            return []
    
    async def _get_social_trending(self) -> List[Dict]:
        """Get trending artists from social media"""
        try:
            # This would analyze TikTok, Instagram, Twitter trends
            return []
        except Exception as e:
            logger.error(f"Error getting social trending: {str(e)}")
            return []
    
    async def collect_market_data(self, region: str = 'global') -> Dict:
        """
        Collect market-level data and trends
        """
        try:
            return {
                'region': region,
                'top_genres': [],
                'emerging_genres': [],
                'market_size': 0,
                'growth_rate': 0.0,
                'key_players': [],
                'trending_sounds': [],
                'cultural_moments': [],
                'collected_at': datetime.utcnow().isoformat()
            }
            
        except Exception as e:
            logger.error(f"Error collecting market data: {str(e)}")
            return {}
    
    def calculate_data_freshness(self, data: Dict) -> float:
        """
        Calculate how fresh the collected data is (0-1 score)
        """
        try:
            collected_at = datetime.fromisoformat(data.get('collected_at', ''))
            age_hours = (datetime.utcnow() - collected_at).total_seconds() / 3600
            
            # Data is considered fresh for 24 hours, then degrades
            if age_hours <= 24:
                return 1.0
            elif age_hours <= 168:  # 1 week
                return max(0.1, 1.0 - (age_hours - 24) / 144)
            else:
                return 0.1
                
        except Exception:
            return 0.0
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import os
from typing import List, Dict, Optional
import asyncio
from datetime import datetime

class SpotifyService:
    def __init__(self):
        self.client_id = os.getenv("SPOTIFY_CLIENT_ID")
        self.client_secret = os.getenv("SPOTIFY_CLIENT_SECRET")
        self.sp = None
    
    async def initialize(self):
        """Initialize Spotify client"""
        if not self.client_id or not self.client_secret:
            print("⚠️  Spotify credentials not found. Some features will be limited.")
            return
        
        try:
            client_credentials_manager = SpotifyClientCredentials(
                client_id=self.client_id,
                client_secret=self.client_secret
            )
            self.sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)
            print("✅ Spotify service initialized successfully")
        except Exception as e:
            print(f"❌ Failed to initialize Spotify service: {e}")
    
    async def search_artists(self, query: str, limit: int = 20) -> List[Dict]:
        """Search for artists on Spotify"""
        if not self.sp:
            return self._mock_artist_data(query, limit)
        
        try:
            results = self.sp.search(q=query, type='artist', limit=limit)
            artists = []
            
            for artist in results['artists']['items']:
                artist_data = {
                    "id": artist['id'],
                    "name": artist['name'],
                    "genres": artist['genres'],
                    "popularity": artist['popularity'],
                    "followers": artist['followers']['total'],
                    "image_url": artist['images'][0]['url'] if artist['images'] else None,
                    "spotify_url": artist['external_urls']['spotify'],
                    "created_at": datetime.utcnow(),
                    "updated_at": datetime.utcnow()
                }
                artists.append(artist_data)
            
            return artists
        except Exception as e:
            print(f"Error searching artists: {e}")
            return self._mock_artist_data(query, limit)
    
    async def get_artist_details(self, artist_id: str) -> Optional[Dict]:
        """Get detailed information about an artist"""
        if not self.sp:
            return self._mock_single_artist(artist_id)
        
        try:
            artist = self.sp.artist(artist_id)
            return {
                "id": artist['id'],
                "name": artist['name'],
                "genres": artist['genres'],
                "popularity": artist['popularity'],
                "followers": artist['followers']['total'],
                "image_url": artist['images'][0]['url'] if artist['images'] else None,
                "spotify_url": artist['external_urls']['spotify'],
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
        except Exception as e:
            print(f"Error getting artist details: {e}")
            return self._mock_single_artist(artist_id)
    
    async def get_artist_tracks(self, artist_id: str, limit: int = 20) -> List[Dict]:
        """Get top tracks for an artist"""
        if not self.sp:
            return self._mock_track_data(artist_id, limit)
        
        try:
            # Get top tracks
            top_tracks = self.sp.artist_top_tracks(artist_id, country='US')
            
            tracks = []
            for track in top_tracks['tracks'][:limit]:
                # Get audio features
                audio_features = self.sp.audio_features(track['id'])[0] if track['id'] else {}
                
                track_data = {
                    "id": track['id'],
                    "name": track['name'],
                    "artist_id": artist_id,
                    "album_name": track['album']['name'],
                    "duration_ms": track['duration_ms'],
                    "popularity": track['popularity'],
                    "explicit": track['explicit'],
                    "preview_url": track['preview_url'],
                    "spotify_url": track['external_urls']['spotify'],
                    "release_date": datetime.fromisoformat(track['album']['release_date']) if track['album']['release_date'] else None,
                    
                    # Audio features
                    "danceability": audio_features.get('danceability', 0.5),
                    "energy": audio_features.get('energy', 0.5),
                    "valence": audio_features.get('valence', 0.5),
                    "tempo": audio_features.get('tempo', 120),
                    "acousticness": audio_features.get('acousticness', 0.5),
                    "instrumentalness": audio_features.get('instrumentalness', 0.1),
                    "liveness": audio_features.get('liveness', 0.1),
                    "speechiness": audio_features.get('speechiness', 0.1),
                }
                tracks.append(track_data)
            
            return tracks
        except Exception as e:
            print(f"Error getting artist tracks: {e}")
            return self._mock_track_data(artist_id, limit)
    
    def _mock_artist_data(self, query: str, limit: int) -> List[Dict]:
        """Mock artist data for development"""
        mock_artists = [
            {
                "id": f"mock_artist_{i}",
                "name": f"Artist {query} {i}",
                "genres": ["afrobeats", "pop"],
                "popularity": 65 + i * 5,
                "followers": 10000 + i * 5000,
                "image_url": "https://via.placeholder.com/300x300",
                "spotify_url": f"https://open.spotify.com/artist/mock_{i}",
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
            for i in range(min(limit, 5))
        ]
        return mock_artists
    
    def _mock_single_artist(self, artist_id: str) -> Dict:
        """Mock single artist data"""
        return {
            "id": artist_id,
            "name": "Mock Artist",
            "genres": ["afrobeats", "pop"],
            "popularity": 75,
            "followers": 50000,
            "image_url": "https://via.placeholder.com/300x300",
            "spotify_url": f"https://open.spotify.com/artist/{artist_id}",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
    
    def _mock_track_data(self, artist_id: str, limit: int) -> List[Dict]:
        """Mock track data for development"""
        mock_tracks = [
            {
                "id": f"mock_track_{i}",
                "name": f"Track {i}",
                "artist_id": artist_id,
                "album_name": f"Album {i}",
                "duration_ms": 180000 + i * 10000,
                "popularity": 60 + i * 3,
                "explicit": False,
                "preview_url": None,
                "spotify_url": f"https://open.spotify.com/track/mock_{i}",
                "release_date": datetime.utcnow(),
                
                # Audio features
                "danceability": 0.7 + i * 0.05,
                "energy": 0.8 + i * 0.02,
                "valence": 0.6 + i * 0.03,
                "tempo": 120 + i * 5,
                "acousticness": 0.2,
                "instrumentalness": 0.1,
                "liveness": 0.15,
                "speechiness": 0.05,
            }
            for i in range(min(limit, 10))
        ]
        return mock_tracks
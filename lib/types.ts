export interface Artist {
  id: string;
  name: string;
  genres: string[];
  popularity: number;
  followers: number;
  image_url: string | null;
  spotify_url: string | null;
  instagram_handle?: string;
  tiktok_handle?: string;
  twitter_handle?: string;
  breakout_score: number;
  trend_direction: string;
  genre_confidence: number;
  status: string;
  is_watched: boolean;
  notes: string | null;
  signed_date: string | null;
  contract_value: number | null;
  created_at: string;
  updated_at: string;
  archetype?: string;
  strategic_intelligence?: string[];
  country?: string;
}

export interface Track {
  id: string;
  name: string;
  artist_id: string;
  album_name: string | null;
  duration_ms: number;
  popularity: number;
  explicit: boolean;
  preview_url: string | null;
  spotify_url: string | null;
  danceability: number;
  energy: number;
  valence: number;
  tempo: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  speechiness: number;
  mood: string;
  quality_score: number;
  viral_potential: number;
  release_date: string | null;
}

export interface TrendingArtistItem {
  artist: Artist;
  trend_score: number;
  velocity: number;
  current_rank: number;
  previous_rank: number | null;
  rank_change: number;
}

export interface TrendingResponse {
  region: string;
  genre: string | null;
  trending_artists: TrendingArtistItem[];
  generated_at: string;
}

export interface SearchQuery {
  query: string;
  limit?: number;
  genre?: string;
  region?: string;
  min_breakout_score?: number;
  max_breakout_score?: number;
  min_followers?: number;
}

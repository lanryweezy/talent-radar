-- Initialize TalentRadar Database
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_artists_name_trgm ON artists USING gin (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_artists_genres ON artists USING gin (genres);
CREATE INDEX IF NOT EXISTS idx_artists_popularity ON artists (popularity DESC);
CREATE INDEX IF NOT EXISTS idx_artists_breakout_score ON artists (breakout_score DESC);

CREATE INDEX IF NOT EXISTS idx_tracks_name_trgm ON tracks USING gin (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_tracks_popularity ON tracks (popularity DESC);
CREATE INDEX IF NOT EXISTS idx_tracks_artist_id ON tracks (artist_id);

CREATE INDEX IF NOT EXISTS idx_metrics_artist_id ON metrics (artist_id);
CREATE INDEX IF NOT EXISTS idx_metrics_recorded_at ON metrics (recorded_at DESC);

CREATE INDEX IF NOT EXISTS idx_trending_artists_trend_score ON trending_artists (trend_score DESC);
CREATE INDEX IF NOT EXISTS idx_trending_artists_region ON trending_artists (region);
CREATE INDEX IF NOT EXISTS idx_trending_artists_genre ON trending_artists (genre);
import { Artist, Track, TrendingResponse, SearchQuery } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function searchArtists(query: string, limit: number = 20): Promise<Artist[]> {
  const response = await fetch(`${API_URL}/search/artists`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, limit }),
  });

  if (!response.ok) {
    throw new Error('Search failed');
  }

  return response.json();
}

export async function getArtistDetails(artistId: string): Promise<Artist> {
  const response = await fetch(`${API_URL}/artists/${artistId}`);

  if (!response.ok) {
    throw new Error('Failed to get artist details');
  }

  return response.json();
}

export async function getArtistTracks(artistId: string, limit: number = 20): Promise<Track[]> {
  const response = await fetch(`${API_URL}/artists/${artistId}/tracks?limit=${limit}`);

  if (!response.ok) {
    throw new Error('Failed to get artist tracks');
  }

  return response.json();
}

export async function getTrendingArtists(
  region: string = 'global',
  genre?: string,
  limit: number = 50
): Promise<TrendingResponse> {
  const params = new URLSearchParams({ region, limit: limit.toString() });
  if (genre) {
    params.append('genre', genre);
  }

  const response = await fetch(`${API_URL}/trending?${params.toString()}`);

  if (!response.ok) {
    throw new Error('Failed to get trending artists');
  }

  return response.json();
}

export async function getGrowthAnalytics(artistId: string, days: number = 30): Promise<any> {
  const response = await fetch(`${API_URL}/analytics/growth/${artistId}?days=${days}`);

  if (!response.ok) {
    throw new Error('Failed to get growth analytics');
  }

  return response.json();
}

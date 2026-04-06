import { Artist, Track, TrendingResponse, SearchQuery } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function searchArtists(query: string, limit: number = 20, filters?: Partial<SearchQuery>): Promise<Artist[]> {
  const response = await fetch(`${API_URL}/search/artists`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, limit, ...filters }),
  });

  if (!response.ok) {
    throw new Error('Search failed');
  }

  return response.json();
}

export async function compareArtists(artistIds: string[]): Promise<any[]> {
  const response = await fetch(`${API_URL}/analytics/compare?artist_ids=${artistIds.join(',')}`);
  if (!response.ok) throw new Error('Comparison failed');
  return response.json();
}

export async function getSimilarArtists(artistId: string, limit: number = 10): Promise<any> {
  const response = await fetch(`${API_URL}/discover/similar/${artistId}?limit=${limit}`);
  if (!response.ok) throw new Error('Similar artists discovery failed');
  return response.json();
}

export async function getCRMArtists(status?: string, isWatched?: boolean): Promise<Artist[]> {
  const params = new URLSearchParams();
  if (status) params.append('status', status);
  if (isWatched !== undefined) params.append('is_watched', isWatched.toString());

  const response = await fetch(`${API_URL}/crm/artists?${params.toString()}`);
  if (!response.ok) throw new Error('Failed to get label artists');
  return response.json();
}

export async function updateArtistStatus(artistId: string, update: Partial<Artist>): Promise<Artist> {
  const response = await fetch(`${API_URL}/crm/artists/${artistId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(update),
  });

  if (!response.ok) throw new Error('Failed to update artist status');
  return response.json();
}

export async function getWatchlist(): Promise<Artist[]> {
  const response = await fetch(`${API_URL}/crm/watchlist`);
  if (!response.ok) throw new Error('Failed to get watchlist');
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

export async function getMarketHeatmap(): Promise<any[]> {
  const response = await fetch(`${API_URL}/analytics/heatmap`);
  if (!response.ok) throw new Error('Failed to get market heatmap');
  return response.json();
}

export async function getGrowthAnalytics(artistId: string, days: number = 30): Promise<any> {
  const response = await fetch(`${API_URL}/analytics/growth/${artistId}?days=${days}`);

  if (!response.ok) {
    throw new Error('Failed to get growth analytics');
  }

  return response.json();
}

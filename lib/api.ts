import { Artist, Track, TrendingResponse, SearchQuery } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function fetchWithRetry(url: string, options: RequestInit = {}, retries: number = 3): Promise<Response> {
  let lastError: Error | null = null;
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return response;
      if (response.status >= 500) {
        // Retry on server errors (including Vercel cold starts/timeouts)
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        continue;
      }
      return response;
    } catch (error) {
      lastError = error as Error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  throw lastError || new Error(`Failed to fetch ${url}`);
}

export async function searchArtists(query: string, limit: number = 20, filters?: Partial<SearchQuery>): Promise<Artist[]> {
  try {
    const response = await fetchWithRetry(`${API_URL}/search/artists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, limit, ...filters }),
    });

    if (!response.ok) {
      console.error('Search failed:', await response.text());
      return [];
    }

    return response.json();
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
}

export async function compareArtists(artistIds: string[]): Promise<any[]> {
  try {
    const response = await fetchWithRetry(`${API_URL}/analytics/compare?artist_ids=${artistIds.join(',')}`);
    if (!response.ok) return [];
    return response.json();
  } catch (error) {
    console.error('Comparison error:', error);
    return [];
  }
}

export async function getSimilarArtists(artistId: string, limit: number = 10): Promise<any> {
  try {
    const response = await fetchWithRetry(`${API_URL}/discover/similar/${artistId}?limit=${limit}`);
    if (!response.ok) return { similar_artists: [] };
    return response.json();
  } catch (error) {
    console.error('Similar artists discovery error:', error);
    return { similar_artists: [] };
  }
}

export async function getCRMArtists(status?: string, isWatched?: boolean): Promise<Artist[]> {
  try {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (isWatched !== undefined) params.append('is_watched', isWatched.toString());

    const response = await fetchWithRetry(`${API_URL}/crm/artists?${params.toString()}`);
    if (!response.ok) return [];
    return response.json();
  } catch (error) {
    console.error('CRM artists error:', error);
    return [];
  }
}

export async function updateArtistStatus(artistId: string, update: Partial<Artist>): Promise<Artist> {
  const response = await fetchWithRetry(`${API_URL}/crm/artists/${artistId}`, {
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
  try {
    const response = await fetchWithRetry(`${API_URL}/crm/watchlist`);
    if (!response.ok) return [];
    return response.json();
  } catch (error) {
    console.error('Watchlist error:', error);
    return [];
  }
}

export async function getArtistDetails(artistId: string): Promise<Artist> {
  const response = await fetchWithRetry(`${API_URL}/artists/${artistId}`);

  if (!response.ok) {
    throw new Error('Failed to get artist details');
  }

  return response.json();
}

export async function predictBreakout(artistIds: string[]): Promise<any> {
  try {
    const response = await fetchWithRetry(`${API_URL}/predict/breakout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(artistIds),
    });

    if (!response.ok) return { predictions: [] };
    return response.json();
  } catch (error) {
    console.error('Breakout prediction error:', error);
    return { predictions: [] };
  }
}

export async function getArtistTracks(artistId: string, limit: number = 20): Promise<Track[]> {
  try {
    const response = await fetchWithRetry(`${API_URL}/artists/${artistId}/tracks?limit=${limit}`);
    if (!response.ok) return [];
    return response.json();
  } catch (error) {
    console.error('Artist tracks error:', error);
    return [];
  }
}

export async function getTrendingArtists(
  region: string = 'global',
  genre?: string,
  limit: number = 50
): Promise<TrendingResponse> {
  try {
    const params = new URLSearchParams({ region, limit: limit.toString() });
    if (genre) {
      params.append('genre', genre);
    }

    const response = await fetchWithRetry(`${API_URL}/trending?${params.toString()}`);

    if (!response.ok) {
      return { region, genre: genre || null, trending_artists: [], generated_at: new Date().toISOString() };
    }

    return response.json();
  } catch (error) {
    console.error('Trending artists error:', error);
    return { region, genre: genre || null, trending_artists: [], generated_at: new Date().toISOString() };
  }
}

export async function getMarketHeatmap(): Promise<any[]> {
  try {
    const response = await fetchWithRetry(`${API_URL}/analytics/heatmap`);
    if (!response.ok) return [];
    return response.json();
  } catch (error) {
    console.error('Market heatmap error:', error);
    return [];
  }
}

export async function getGrowthAnalytics(artistId: string, days: number = 30): Promise<any> {
  const response = await fetchWithRetry(`${API_URL}/analytics/growth/${artistId}?days=${days}`);

  if (!response.ok) {
    throw new Error('Failed to get growth analytics');
  }

  return response.json();
}

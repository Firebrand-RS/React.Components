import { ApiClient } from '../ApiClient';
import { QueryParams } from '../types';
import { TmdbMovieResponse } from './types';

const API_BASE_PATH = 'https://api.themoviedb.org/3';
const API_KEY = 'e413cac1dc826f91fb402836201d63bf';

class TmdbApiClient extends ApiClient {
  constructor() {
    super({ apiKey: API_KEY, basePath: API_BASE_PATH });
  }

  public async getAllMovies() {
    return this.request<TmdbMovieResponse>('/discover/movie');
  }

  public async getMoviesByName(query: string) {
    const queryParams: QueryParams = {
      query,
      include_adult: 'false',
    };

    return this.request<TmdbMovieResponse>('/search/movie', queryParams);
  }
}

export const tmdbApiClient = new TmdbApiClient();

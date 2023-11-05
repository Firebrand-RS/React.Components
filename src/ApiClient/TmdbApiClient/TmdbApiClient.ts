import { ApiClient } from '../ApiClient';
import { QueryParams } from '../types';
import { TmdbMovieGenreResponse, TmdbMovieResponse } from './types';

const API_BASE_PATH = 'https://api.themoviedb.org/3';
const API_KEY = 'e413cac1dc826f91fb402836201d63bf';

class TmdbApiClient extends ApiClient {
  constructor() {
    super({ apiKey: API_KEY, basePath: API_BASE_PATH });
  }

  public async getAllMovies(page: string) {
    const queryParams: QueryParams = {
      page,
    };
    return this.request<TmdbMovieResponse>('/discover/movie', queryParams);
  }

  public async getMoviesByName(query: string, page: string) {
    const queryParams: QueryParams = {
      query,
      page,
      include_adult: 'false',
    };

    return this.request<TmdbMovieResponse>('/search/movie', queryParams);
  }

  public getMoviesGenres() {
    return this.request<TmdbMovieGenreResponse>('/genre/movie/list');
  }
}

export const tmdbApiClient = new TmdbApiClient();

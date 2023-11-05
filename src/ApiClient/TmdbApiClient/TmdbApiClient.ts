import { ApiClient } from '../ApiClient';
import { QueryParams } from '../types';
import {
  MovieDTO,
  MovieDTOExtended,
  TmdbMovieGenre,
  TmdbMovieGenreResponse,
  TmdbMovieResponse,
  TmdbMovieResponseExtended,
} from './types';

const API_BASE_PATH = 'https://api.themoviedb.org/3';
const API_KEY = 'e413cac1dc826f91fb402836201d63bf';

class TmdbApiClient extends ApiClient {
  private genres: TmdbMovieGenre[] = [];
  constructor() {
    super({ apiKey: API_KEY, basePath: API_BASE_PATH });
  }

  public async getAllMovies(page: string): Promise<TmdbMovieResponseExtended> {
    const RESOURCE_PATH = '/discover/movie';
    const queryParams: QueryParams = {
      page,
    };
    const moviesResponse = await this.request<TmdbMovieResponse>(
      RESOURCE_PATH,
      queryParams
    );

    const expandedResponse = await this.extendResponseByGenres(moviesResponse);
    return expandedResponse;
  }

  public async getMoviesByName(
    query: string,
    page: string
  ): Promise<TmdbMovieResponseExtended> {
    const RESOURCE_PATH = '/search/movie';
    const queryParams: QueryParams = {
      query,
      page,
      include_adult: 'false',
    };
    const moviesResponse = await this.request<TmdbMovieResponse>(
      RESOURCE_PATH,
      queryParams
    );

    const expandedResponse = await this.extendResponseByGenres(moviesResponse);
    return expandedResponse;
  }

  private async extendResponseByGenres(moviesResponse: TmdbMovieResponse) {
    if (this.genres.length === 0) {
      const genreResponse = await this.getMoviesGenres();
      this.genres = genreResponse.genres;
    }

    const resultsWithGenre = this.expandMovieResultsByGenres(
      moviesResponse.results,
      this.genres
    );

    return {
      ...moviesResponse,
      results: resultsWithGenre,
    };
  }

  private expandMovieResultsByGenres(
    movies: MovieDTO[],
    genres: TmdbMovieGenre[]
  ): MovieDTOExtended[] {
    return movies.map((movie) => {
      const genreNames = movie.genre_ids.map((id) => {
        const matchedGenre = genres.find((genre) => genre.id === id);
        return matchedGenre ? matchedGenre.name : '';
      });
      return {
        ...movie,
        genres: genreNames,
      };
    });
  }

  public getMoviesGenres() {
    const RESOURCE_PATH = '/genre/movie/list';
    return this.request<TmdbMovieGenreResponse>(RESOURCE_PATH);
  }
}

export const tmdbApiClient = new TmdbApiClient();

export interface MovieDTO {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieDTOExtended extends MovieDTO {
  genres: string[];
}

export interface TmdbMovieResponse {
  page: number;
  results: MovieDTO[];
  total_pages: number;
  total_results: number;
}

export interface TmdbMovieResponseExtended extends TmdbMovieResponse {
  page: number;
  results: MovieDTOExtended[];
  total_pages: number;
  total_results: number;
}

export interface TmdbMovieGenre {
  id: number;
  name: string;
}

export interface TmdbMovieGenreResponse {
  genres: TmdbMovieGenre[];
}

export interface TmdbMovieDetailsResponse {
  id: number;
  budget: number;
  genres: { id: number; name: string }[];
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  runtime: string;
  production_countries: { iso_3166_1: string; name: string }[];
  release_date: string;
  status: string;
  tagline: string;
  title: string;
  vote_average: number;
}

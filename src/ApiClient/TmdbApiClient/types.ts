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

export interface MovieDTOWithGenreNames extends MovieDTO {
  genres: string[];
}

export interface TmdbMovieResponse {
  page: number;
  results: MovieDTO[];
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

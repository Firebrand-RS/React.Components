export interface MovieDTO {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [number, number];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TmdbMovieResponse {
  page: number;
  results: MovieDTO[];
  total_pages: number;
  total_results: number;
}

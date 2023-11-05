import React, { ComponentProps } from 'react';
import classes from './TMDBMovieSearcher.module.scss';
import { SimpleContentSearcher } from '../SimpleContentSearcher/SimpleContentSearcher';
import { tmdbApiClient } from '../../ApiClient/TmdbApiClient/TmdbApiClient';
import { MovieCard } from '../MovieCard/MovieCard';
import { Loader } from '../Loader/Loader';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { BugButton } from '../BugButton/BugButton';
import {
  MovieDTO,
  MovieDTOWithGenreNames,
  TmdbMovieGenre,
} from '../../ApiClient/TmdbApiClient/types';

import noPosterImage from '../../assets/no-poster-image.png';
import { Pagination } from '../Pagination/Pagination';
import { Button } from '../Button/Button';

export interface SimpleMovieData {
  id: number;
  poster: string;
  title: string;
  genres: string[];
  rating: number;
}

interface TMDBMovieSearcherProps extends ComponentProps<'section'> {}
interface TMDBMovieSearcherState {
  page: number;
  totalPages: number | null;
  movieTitles: SimpleMovieData[];
  isLoading: boolean;
  error: Error | null;
}

export class TMDBMovieSearcher extends React.Component<
  TMDBMovieSearcherProps,
  TMDBMovieSearcherState
> {
  private apiClient = tmdbApiClient;
  private STORAGE_KEY = 'MOVIE_SEARCH_TEXT';
  private POSTER_BASE_URL = 'https://image.tmdb.org/t/p/original';
  private NO_POSTER_URL = noPosterImage;
  private genres: TmdbMovieGenre[] = [];

  constructor(props: TMDBMovieSearcherProps) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleResetError = this.handleResetError.bind(this);
    this.handleNavigate = this.handleNavigate.bind(this);
    this.state = {
      page: 1,
      totalPages: null,
      movieTitles: [],
      isLoading: true,
      error: null,
    };
    this.genres = [];
  }

  private async handleSearch(value?: string): Promise<void> {
    const { page } = this.state;
    this.setState({ isLoading: true });
    try {
      if (value && value.length > 0) {
        const movieResponse = await this.apiClient.getMoviesByName(
          value,
          page.toString()
        );
        this.setState({ totalPages: movieResponse.total_pages });
        this.getMovieCardData(movieResponse.results);
      } else {
        const movieResponse = await this.apiClient.getAllMovies(
          page.toString()
        );
        this.setState({ totalPages: movieResponse.total_pages });
        this.getMovieCardData(movieResponse.results);
      }
    } catch (error) {
      this.setState({ error: error as Error });
    }
  }

  private async getMovieCardData(movieData: MovieDTO[]): Promise<void> {
    const genres = await this.getGenreList();
    const movieDataWithGenres = this.mapMovieDataWithGenres(movieData, genres);
    const cardData: SimpleMovieData[] = movieDataWithGenres.map((movie) => {
      return {
        id: movie.id,
        poster: movie.poster_path
          ? this.POSTER_BASE_URL + movie.poster_path
          : this.NO_POSTER_URL,
        title: movie.title,
        genres: movie.genres,
        rating: movie.vote_average,
      };
    });
    this.setState({ movieTitles: cardData, isLoading: false });
  }

  private async getGenreList(): Promise<TmdbMovieGenre[]> {
    if (this.genres.length === 0) {
      const genreResponse = await this.apiClient.getMoviesGenres();
      this.genres = genreResponse.genres;
      return this.genres;
    }
    return this.genres;
  }

  private mapMovieDataWithGenres(
    movies: MovieDTO[],
    genres: TmdbMovieGenre[]
  ): MovieDTOWithGenreNames[] {
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

  private getCardList() {
    const { movieTitles } = this.state;
    return movieTitles.map((data) => <MovieCard {...data} key={data.id} />);
  }

  private handleResetError() {
    this.setState({ error: null });
  }

  private handleNavigate(value: string) {
    this.setState({ page: Number(value) });
  }

  render() {
    return (
      <section {...this.props} className={classes.searcher}>
        <ErrorBoundary
          outError={this.state.error}
          resetError={this.handleResetError}
        >
          <BugButton />
          <SimpleContentSearcher
            onSearch={this.handleSearch}
            withWebStorage={{ key: this.STORAGE_KEY }}
            placeholder="Enter a movie title"
          />
          <div className={classes.container}>
            {this.state.isLoading ? (
              <Loader />
            ) : (
              <div className={classes.content}>{this.getCardList()}</div>
            )}
          </div>
          {!this.state.isLoading && (
            <Pagination
              currentPage={this.state.page}
              pageCount={this.state.totalPages}
              buttonPairCount={2}
              Controls={<Button />}
              onNavigate={this.handleNavigate}
              gap={8}
            />
          )}
        </ErrorBoundary>
      </section>
    );
  }
}

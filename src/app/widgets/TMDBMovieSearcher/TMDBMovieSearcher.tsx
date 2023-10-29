import React, { ComponentProps } from 'react';
import classes from './TMDBMovieSearcher.module.scss';
import { SimpleContentSearcher } from '../../../shared/ui/SimpleContentSearcher/SimpleContentSearcher';
import { tmdbApiClient } from '../../../shared/ApiClient/TmdbApiClient/TmdbApiClient';
import { MovieCard } from '../../../shared/ui/MovieCard/MovieCard';
import {
  MovieDTO,
  MovieDTOWithGenreNames,
  TmdbMovieGenre,
} from '../../../shared/ApiClient/TmdbApiClient/types';
import noPosterImage from '../../../shared/assets/no-poster-imiage.png';
import { Loader } from '../../../shared/ui/Loader/Loader';

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
  movieTitles: SimpleMovieData[];
  isLoading: boolean;
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
    this.state = {
      page: 1,
      movieTitles: [],
      isLoading: true,
    };
    this.genres = [];
  }

  private async handleSearch(value?: string): Promise<void> {
    this.setState({ isLoading: true });
    if (value && value.length > 0) {
      const movieResponse = await this.apiClient.getMoviesByName(value);
      this.getMovieCardData(movieResponse.results);
    } else {
      const movieResponse = await this.apiClient.getAllMovies();
      this.getMovieCardData(movieResponse.results);
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

  render() {
    return (
      <section {...this.props} className={classes.searcher}>
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
      </section>
    );
  }
}

import React, { ComponentProps } from 'react';
import classes from './TMDBMovieSearcher.module.scss';
import { SimpleContentSearcher } from '../SimpleContentSearcher/SimpleContentSearcher';
import { tmdbApiClient } from '../../ApiClient/TmdbApiClient/TmdbApiClient';
import { MovieCard } from '../MovieCard/MovieCard';
import { Loader } from '../Loader/Loader';
import { BugButton } from '../BugButton/BugButton';
import {
  MovieDTOExtended,
  TmdbMovieResponseExtended,
} from '../../ApiClient/TmdbApiClient/types';

import noPosterImage from '../../assets/no-poster-image.png';
import Results from '../Results/Results';

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
  responseData: {
    totalPages: number | null;
    movieTitles: SimpleMovieData[];
    requestError: Error | null;
  };
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

  constructor(props: TMDBMovieSearcherProps) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleResetError = this.handleResetError.bind(this);
    this.handleNavigate = this.handleNavigate.bind(this);
    this.state = {
      page: 1,
      responseData: {
        totalPages: null,
        movieTitles: [],
        requestError: null,
      },
      isLoading: true,
    };
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
        this.setStateWithMovieCardData(movieResponse);
      } else {
        const movieResponse = await this.apiClient.getAllMovies(
          page.toString()
        );
        this.setStateWithMovieCardData(movieResponse);
      }
    } catch (error) {
      this.setState({
        responseData: {
          ...this.state.responseData,
          requestError: error as Error,
        },
      });
    }
  }

  private setStateWithMovieCardData(response: TmdbMovieResponseExtended): void {
    const cardData = this.mapMovieCardData(response.results);
    const newState = {
      responseData: {
        ...this.state.responseData,
        totalPages: response.total_pages,
        movieTitles: cardData,
      },
      isLoading: false,
    };
    this.setState(newState);
  }

  private mapMovieCardData(movieData: MovieDTOExtended[]): SimpleMovieData[] {
    const cardData: SimpleMovieData[] = movieData.map((movie) => {
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
    return cardData;
  }

  private getCardList(): JSX.Element[] {
    const {
      responseData: { movieTitles },
    } = this.state;
    return movieTitles.map((data) => <MovieCard {...data} key={data.id} />);
  }

  private handleResetError(): void {
    this.setState({
      responseData: { ...this.state.responseData, requestError: null },
    });
  }

  private handleNavigate(value: string) {
    this.setState({ page: Number(value) });
  }

  private showResults(): JSX.Element {
    const {
      page,
      isLoading,
      responseData: { totalPages, requestError },
    } = this.state;

    return requestError ? (
      <div className={classes.error}>
        <p>Something went wrong</p>
        <p>
          {requestError.name}: {requestError.message}
        </p>
      </div>
    ) : isLoading ? (
      <Loader />
    ) : (
      <Results
        page={page}
        totalPages={totalPages}
        onNavigate={this.handleNavigate}
      >
        {this.getCardList()}
      </Results>
    );
  }

  render() {
    return (
      <section {...this.props} className={classes.searcher}>
        <BugButton />
        <SimpleContentSearcher
          onSearch={this.handleSearch}
          withWebStorage={{ key: this.STORAGE_KEY }}
          placeholder="Enter a movie title"
        />
        <div className={classes.container}>{this.showResults()}</div>
      </section>
    );
  }
}

import React, { ComponentProps } from 'react';
import classes from './TMDBMovieSearcher.module.scss';
import { SimpleContentSearcher } from '../../../shared/ui/SimpleContentSearcher/SimpleContentSearcher';
import { tmdbApiClient } from '../../../shared/ApiClient/TmdbApiClient/TmdbApiClient';
import { MovieCard } from '../../../shared/ui/MovieCard/MovieCard';

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
  movieTitles: MovieDTO[];
}

export class TMDBMovieSearcher extends React.Component<
  TMDBMovieSearcherProps,
  TMDBMovieSearcherState
> {
  private apiClient = tmdbApiClient;
  private STORAGE_KEY = 'MOVIE_SEARCH_TEXT';
  private POSTER_BASE_URL = 'https://image.tmdb.org/t/p/original';

  constructor(props: TMDBMovieSearcherProps) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.state = {
      page: 1,
      movieTitles: [],
    };
  }

  async handleSearch(value?: string): Promise<void> {
    if (value && value.length > 0) {
      const response = await this.apiClient.getMoviesByName(value);
      const movieTitles = response.results;
      this.setState({ movieTitles });
      console.log(response);
    } else {
      const response = await this.apiClient.getAllMovies();
      console.log(response);
    }
  }

  render() {
    return (
      <section {...this.props} className={classes.searcher}>
        <SimpleContentSearcher
          onSearch={this.handleSearch}
          withWebStorage={{ key: this.STORAGE_KEY }}
          placeholder="Enter a movie title"
        />
        <div className={classes.content}>
        </div>
      </section>
    );
  }
}

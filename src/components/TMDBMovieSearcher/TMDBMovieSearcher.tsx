import classes from './TMDBMovieSearcher.module.scss';

import React, { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { tmdbApiClient } from '../../ApiClient/TmdbApiClient/TmdbApiClient';
import { MovieCard, MovieCardProps } from '../MovieCard/MovieCard';
import { Loader } from '../Loader/Loader';
import { BugButton } from '../BugButton/BugButton';
import {
  MovieDTOExtended,
  TmdbMovieResponseExtended,
} from '../../ApiClient/TmdbApiClient/types';
import Results from '../Results/Results';
import { SubmittableSearch } from '../SubmittableSearch/SubmittableSearch';

import noPosterImage from '../../assets/no-poster-image.png';

interface ResponseMovieData {
  totalPages: number | null;
  movieTitles: MovieCardProps[];
  requestError: Error | null;
}

export function TMDBMovieSearcher({}) {
  const apiClient = tmdbApiClient;
  const STORAGE_KEY = 'MOVIE_SEARCH_TEXT';
  const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/original';
  const NO_POSTER_URL = noPosterImage;

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState<string | null>(null);
  const [responseData, setResponseData] = useState<ResponseMovieData>({
    totalPages: null,
    movieTitles: [],
    requestError: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const storedQuery = getValueFromWebStorage(STORAGE_KEY);

  useEffect(() => {
    setQuery(storedQuery);
  }, []);

  useEffect(() => {
    query !== null && fetchMovieData(query);
  }, [query, page]);

  useEffect(() => {
    if (!resultsContainerRef.current) {
      return;
    }

    if (!showDetails) {
      return;
    }

    const { current: container } = resultsContainerRef;
    const closeOverlay = createCloseOverlay(container);

    closeOverlay.addEventListener('click', hideDetails);
    container.append(closeOverlay);

    function createCloseOverlay(parent: HTMLElement): HTMLDivElement {
      const top = parent.offsetTop;
      const height = parent.clientHeight;

      const overlay = document.createElement('div');
      overlay.classList.add(classes.background);
      overlay.style.top = `${top}px`;
      overlay.style.height = `${height}px`;
      return overlay;
    }

    function hideDetails(): void {
      navigate('/');
      setShowDetails(false);
    }

    return () => {
      closeOverlay.removeEventListener('click', hideDetails);
      closeOverlay.remove();
    };
  }, [showDetails]);

  async function fetchMovieData(value: string | null): Promise<void> {
    setIsLoading(true);
    try {
      if (value && value.length > 0) {
        const movieResponse = await apiClient.getMoviesByName(
          value,
          page.toString()
        );
        setStateWithMovieCardData(movieResponse);
      } else {
        const movieResponse = await apiClient.getAllMovies(page.toString());
        setStateWithMovieCardData(movieResponse);
      }
    } catch (error) {
      const newState = {
        ...responseData,
        requestError: error as Error,
      };
      setResponseData(newState);
    }
  }

  function setStateWithMovieCardData(
    response: TmdbMovieResponseExtended
  ): void {
    const cardData = mapMovieCardData(response.results);
    const newState = {
      ...responseData,
      totalPages: response.total_pages,
      movieTitles: cardData,
    };
    setResponseData(newState);
    setIsLoading(false);
  }

  function mapMovieCardData(movieData: MovieDTOExtended[]): MovieCardProps[] {
    return movieData.map((movie) => ({
      id: movie.id,
      poster: movie.poster_path
        ? POSTER_BASE_URL + movie.poster_path
        : NO_POSTER_URL,
      title: movie.title,
      genres: movie.genres,
      rating: movie.vote_average,
    }));
  }

  function handleSearch(value: string) {
    setValueToWebStorage(STORAGE_KEY, value);
    setQuery(value);
  }

  function getValueFromWebStorage(key: string): string {
    const storageValue = localStorage.getItem(key);
    if (!storageValue) {
      return '';
    }
    return storageValue;
  }

  function setValueToWebStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  function handleNavigate(value: string) {
    setPage(Number(value));
  }

  function handleCardClick() {
    setShowDetails(true);
  }

  function getCardList(): JSX.Element[] {
    const { movieTitles } = responseData;
    return movieTitles.map((data) => (
      <Link to={`tmdb-searcher/${data.id}`} key={data.id}>
        <MovieCard {...data} onClick={handleCardClick} />
      </Link>
    ));
  }

  function showResults(): JSX.Element {
    const { totalPages, requestError } = responseData;

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
        onNavigate={handleNavigate}
        className={classes.wrapper}
      >
        {getCardList()}
      </Results>
    );
  }

  return (
    <section className={classes.searcher}>
      <BugButton />
      <SubmittableSearch
        placeholder={'Enter a movie title'}
        onSearch={handleSearch}
        value={storedQuery}
      />
      <div className={classes.container} ref={resultsContainerRef}>
        {showResults()}
        {showDetails && (
          <div className={classes.detailswrapper}>
            <Outlet />
          </div>
        )}
      </div>
    </section>
  );
}

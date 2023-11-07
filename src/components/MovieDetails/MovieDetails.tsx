import classes from './MovieDetails.module.scss';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { tmdbApiClient } from '../../ApiClient/TmdbApiClient/TmdbApiClient';
import { TmdbMovieDetailsResponse } from '../../ApiClient/TmdbApiClient/types';
import { Loader } from '../Loader/Loader';
import { NO_POSTER_URL, POSTER_BASE_URL } from '../TMDBMovieSearcher/consts';

interface SimpleMovieDetails {
  title: string;
  slogan: string;
  properties: { term: string; definition: string }[];
  description: string;
  poster: string;
}

function MovieDetails() {
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<SimpleMovieDetails>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!params.id) {
      return;
    }

    setIsLoading(true);
    fetchDetails(params.id);

    async function fetchDetails(params: string) {
      const response = await tmdbApiClient.getMovieDetails(params);
      const result = mapDetailsResponse(response);
      setIsLoading(false);
      setData(result);
    }
  }, [params]);

  function mapDetailsResponse(
    response: TmdbMovieDetailsResponse
  ): SimpleMovieDetails {
    const {
      title,
      tagline,
      poster_path,
      runtime,
      budget,
      genres,
      overview,
      production_countries,
      release_date,
    } = response;
    return {
      title,
      slogan: tagline,
      poster: poster_path ? POSTER_BASE_URL + poster_path : NO_POSTER_URL,
      description: overview,
      properties: [
        {
          term: 'Genre',
          definition: genres.map((genre) => genre.name).join(', '),
        },
        { term: 'Duration', definition: `${runtime} minutes` },
        { term: 'Budget', definition: `$${budget}` },
        {
          term: 'Country',
          definition: production_countries
            .map((country) => country.name)
            .join(', '),
        },
        { term: 'Release Date', definition: release_date },
      ],
    };
  }

  function renderContents() {
    if (!data) {
      return;
    }

    const { title, slogan, poster, description, properties } = data;

    const propList = (
      <dl className={classes.properties}>
        {properties.map((prop) => {
          return (
            <p className={classes.group} key={prop.term}>
              <dt className={classes.term}>{prop.term}:</dt>
              <dd className={classes.def}>{prop.definition}</dd>
            </p>
          );
        })}
      </dl>
    );

    return (
      <>
        <img src={poster} alt="" className={classes.poster} />
        <div className={classes.wrapper}>
          <header className={classes.heading}>
            <h1 className={classes.title}>{title}</h1>
            <p className={classes.slogan}>{slogan}</p>
          </header>
          {propList}
          <p className={classes.description}>{description}</p>
        </div>
      </>
    );
  }

  return (
    <article className={[classes.details].join(' ')}>
      {isLoading ? <Loader /> : renderContents()}
    </article>
  );
}

export default MovieDetails;

import classes from './MovieDetails.module.scss';
import React, { ComponentProps } from 'react';

interface MovieDetailsProps extends ComponentProps<'article'> {
  title: string;
  slogan: string;
  properties: { term: string; definition: string }[];
  description: string;
  poster: string;
}

function MovieDetails({
  title,
  slogan,
  properties,
  description,
  poster,
  className,
}: MovieDetailsProps) {
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
    <article className={[classes.details, className].join(' ')}>
      <img src={poster} alt="" className={classes.poster} />
      <div className={classes.wrapper}>
        <header className={classes.heading}>
          <h1 className={classes.title}>{title}</h1>
          <p className={classes.slogan}>{slogan}</p>
        </header>
        {propList}
        <p className={classes.description}>{description}</p>
      </div>
    </article>
  );
}

export default MovieDetails;

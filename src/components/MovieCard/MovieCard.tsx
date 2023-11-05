import classes from './MovieCard.module.scss';

import React from 'react';

export interface MovieCardProps {
  id: number;
  poster: string;
  title: string;
  genres: string[];
  rating: number;
}

export function MovieCard({ poster, title, genres, rating }: MovieCardProps) {
  return (
    <div className={classes.card}>
      <img
        className={classes.poster}
        src={poster}
        alt={`${title} movie poster`}
      />
      <div className={classes.overlay}>
        <p className={classes.title}>{title}</p>
        <p className={classes.genre}>{genres.join(', ')}</p>
        <p className={classes.rating}>Rating: {rating.toFixed(2)}</p>
      </div>
    </div>
  );
}

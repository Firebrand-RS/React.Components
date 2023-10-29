import React from 'react';
import classes from './MovieCard.module.scss';
import { SimpleMovieData } from '../TMDBMovieSearcher/TMDBMovieSearcher';

interface MovieCardProps extends SimpleMovieData {}

export class MovieCard extends React.Component<MovieCardProps> {
  render() {
    const { poster, title, genres, rating } = this.props;

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
}

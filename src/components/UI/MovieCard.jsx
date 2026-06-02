import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  const poster =
    movie.Poster !== 'N/A'
      ? movie.Poster
      : 'https://via.placeholder.com/300x445?text=No+Poster';

  return (
    <div className="movie__container--item-wrapper">
      {!imgLoaded && (
        <>
          <div className="movie__poster--skeleton"></div>
          <div className="skeleton movie__title--skeleton"></div>
          <div className="skeleton movie__meta--skeleton"></div>
        </>
      )}

      <Link
        to={`/movie/${movie.imdbID}`}
        className="movies__container--item"
        style={{ display: imgLoaded ? 'block' : 'none' }}
      >
        <figure className="movie__poster--wrapper">
          <img
            className="movie__poster"
            src={poster}
            alt={movie.Title}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgLoaded(true)}
          />
        </figure>
        <div className="movie__info">
          <h3 className="movie__title">{movie.Title}</h3>
          <div className="movie__meta">
            <span className="movie__year">{movie.Year}</span>
            {movie.imdbRating && movie.imdbRating !== 'N/A' && (
              <span className="movie__rating">
                <i className="fa-solid fa-star movie__rating--icon"></i>
                {movie.imdbRating}
              </span>
            )}
          </div>
          <span className="movie__type">{movie.Type}</span>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;

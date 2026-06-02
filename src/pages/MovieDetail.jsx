import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchMovie() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
        );
        const data = await res.json();
        if (data.Response === 'True') {
          setMovie(data);
        } else {
          setError(data.Error || 'Movie not found.');
        }
      } catch {
        setError('Failed to load movie details. Check your connection.');
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div id="movie-detail">
        <div className="movie-detail__loading">
          <i className="fa-solid fa-spinner"></i>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="movie-detail">
        <div className="container">
          <div className="row">
            <Link to="/search" className="movie-detail__back">
              <i className="fa-solid fa-arrow-left"></i> Back to Search
            </Link>
            <p className="movie-detail__error">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const poster = movie.Poster !== 'N/A' ? movie.Poster : null;

  return (
    <div id="movie-detail">
      <div className="container">
        <div className="row">
          <Link to="/search" className="movie-detail__back">
            <i className="fa-solid fa-arrow-left"></i>
            <span>Search</span>
          </Link>

          <div className="movie__selected">
            <figure className="movie__selected--figure">
              {poster ? (
                <img
                  className="movie__selected--img"
                  src={poster}
                  alt={movie.Title}
                />
              ) : (
                <div className="movie__selected--no-poster">No Poster Available</div>
              )}
            </figure>

            <div className="movie__selected--description">
              <h2 className="movie__selected--title">{movie.Title}</h2>

              <div className="movie__selected--meta">
                <span className="movie__selected--year">{movie.Year}</span>
                {movie.Runtime !== 'N/A' && (
                  <span className="movie__selected--runtime">{movie.Runtime}</span>
                )}
                {movie.Rated !== 'N/A' && (
                  <span className="movie__selected--rated">{movie.Rated}</span>
                )}
              </div>

              {movie.imdbRating !== 'N/A' && (
                <div className="movie__selected--rating">
                  <i className="fa-solid fa-star movie__selected--star"></i>
                  <span className="movie__selected--rating-value">{movie.imdbRating}</span>
                  <span className="movie__selected--rating-label">/ 10 IMDb</span>
                </div>
              )}

              {movie.Genre !== 'N/A' && (
                <p className="movie__selected--genre">{movie.Genre}</p>
              )}

              {movie.Plot !== 'N/A' && (
                <div className="movie__selected--plot">
                  <h3 className="movie__selected--section-title">Plot</h3>
                  <p>{movie.Plot}</p>
                </div>
              )}

              <div className="movie__selected--crew">
                {movie.Director !== 'N/A' && (
                  <div className="movie__selected--crew-item">
                    <span className="movie__selected--crew-label">Director</span>
                    <span className="movie__selected--crew-value">{movie.Director}</span>
                  </div>
                )}
                {movie.Actors !== 'N/A' && (
                  <div className="movie__selected--crew-item">
                    <span className="movie__selected--crew-label">Cast</span>
                    <span className="movie__selected--crew-value">{movie.Actors}</span>
                  </div>
                )}
                {movie.Writer !== 'N/A' && (
                  <div className="movie__selected--crew-item">
                    <span className="movie__selected--crew-label">Writer</span>
                    <span className="movie__selected--crew-value">{movie.Writer}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

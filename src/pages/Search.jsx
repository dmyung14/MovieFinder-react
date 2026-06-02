import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/UI/MovieCard';
import SearchBar from '../components/UI/SearchBar';
import FilterSlider from '../components/UI/FilterSlider';

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

const Search = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState(searchParams.get('q') || 'batman');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [yearFrom, setYearFrom] = useState(1980);
  const [minRating, setMinRating] = useState(0);
  const [type, setType] = useState('');

  useEffect(() => {
    async function fetchMovies() {
      if (!query.trim()) return;
      if (!API_KEY) {
        setError('API key missing. Add REACT_APP_OMDB_API_KEY to your .env file and restart the dev server.');
        return;
      }
      setLoading(true);
      setError('');

      try {
        const typeParam = type ? `&type=${type}` : '';
        const url = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}${typeParam}&apikey=${API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.Response === 'True') {
          const first6 = data.Search.slice(0, 6);
          const detailed = await Promise.all(
            first6.map(async (movie) => {
              const detailRes = await fetch(
                `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`
              );
              return detailRes.json();
            })
          );
          setMovies(detailed);
        } else {
          setMovies([]);
          setError(data.Error || 'No results found.');
        }
      } catch {
        setError('Failed to fetch movies. Check your connection.');
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [query, type]);

  const filteredMovies = movies.filter((movie) => {
    const year = parseInt(movie.Year) || 0;
    const rating = parseFloat(movie.imdbRating) || 0;
    return year >= yearFrom && (minRating === 0 || rating >= minRating);
  });

  const typeOptions = [
    { value: '', label: 'All' },
    { value: 'movie', label: 'Movie' },
    { value: 'series', label: 'Series' },
    { value: 'episode', label: 'Episode' },
  ];

  return (
    <div id="search__body">
      <main id="search__main">
        <section className="browse__search">
          <div className="row">
            <h2 className="browse__search--title">Browse Movies</h2>
            <SearchBar onSearch={setQuery} initialValue={query} />
          </div>
        </section>

        <section className="search-filters">
          <div className="row">
            <div className="search-filters__controls">
              <FilterSlider
                label="From Year"
                min={1900}
                max={2025}
                step={1}
                value={yearFrom}
                onChange={setYearFrom}
              />

              <FilterSlider
                label="Min Rating"
                min={0}
                max={9}
                step={1}
                value={minRating}
                onChange={setMinRating}
                displayValue={minRating === 0 ? 'Any' : `${minRating}+`}
              />

              <div className="filter__group filter__group--type">
                <label className="filter__label">Type</label>
                <div className="filter__type-buttons">
                  {typeOptions.map((option) => (
                    <button
                      key={option.value}
                      className={`filter__type-btn${type === option.value ? ' filter__type-btn--active' : ''}`}
                      onClick={() => setType(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="row">
              {!loading && !error && (
                <h3 className="search-results--title">
                  Results ({filteredMovies.length})
                </h3>
              )}

              {error && <p className="search-results--error">{error}</p>}

              <div className="movies__container">
                {loading ? (
                  <div className="movies__loading">
                    <i className="fa-solid fa-spinner"></i>
                  </div>
                ) : (
                  filteredMovies.map((movie) => (
                    <MovieCard key={movie.imdbID} movie={movie} />
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Search;

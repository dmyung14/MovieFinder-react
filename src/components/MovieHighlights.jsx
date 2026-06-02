import React from 'react';
import MovieHighlight from './UI/MovieHighlight';

const MovieHighlights = () => {
  return (
    <section id="highlights">
      <div className="container">
        <div className="row">
          <h2 className="section__title">
            Why choose <span className="purple">MovieFinder</span>
          </h2>
          <div className="highlight__wrapper">
            <MovieHighlight
              icon={<i className="fa-solid fa-film"></i>}
              title="Thousands of Movies"
              para="Browse a vast database of movies and TV shows from all genres and eras."
            />
            <MovieHighlight
              icon={<i className="fa-solid fa-magnifying-glass"></i>}
              title="Instant Search"
              para="Find any title in seconds with our powerful real-time search."
            />
            <MovieHighlight
              icon={<i className="fa-solid fa-tag"></i>}
              title="Free to Use"
              para="No subscription needed. Discover your next favorite film for free."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieHighlights;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './UI/SearchBar';

const Landing = () => {
  const navigate = useNavigate();

  function handleSearch(query) {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <section id="landing">
      <header>
        <div className="header__container">
          <div className="header__description">
            <h1>
              Find Your Next Favorite <span className="purple">Movie</span>
            </h1>
            <h2>Search thousands of films and TV shows instantly</h2>
            <SearchBar onSearch={handleSearch} />
          </div>
          <figure className="header__img--wrapper">
            <i className="fa-solid fa-film header__film-icon"></i>
          </figure>
        </div>
      </header>
    </section>
  );
};

export default Landing;

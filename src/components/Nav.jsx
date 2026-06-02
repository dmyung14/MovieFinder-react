import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  function openMenu() {
    document.body.classList += ' menu--open';
  }

  function closeMenu() {
    document.body.classList.remove('menu--open');
  }

  return (
    <nav>
      <div className="nav__container">
        <Link to="/" className="nav__logo">
          Movie<span className="nav__logo--accent">Finder</span>
        </Link>

        <ul className="nav__links">
          <li className="nav__list">
            <Link to="/" className="nav__link">Home</Link>
          </li>
          <li className="nav__list">
            <Link to="/search" className="nav__link nav__link--primary">Search</Link>
          </li>
          <button className="btn__menu" onClick={openMenu}>
            <i className="fa-solid fa-bars"></i>
          </button>
        </ul>

        <div className="menu__backdrop">
          <button className="btn__menu--close" onClick={closeMenu}>
            <i className="fa-solid fa-xmark"></i>
          </button>
          <ul className="menu__links">
            <li className="menu__list">
              <Link to="/" className="menu__link" onClick={closeMenu}>Home</Link>
            </li>
            <li className="menu__list">
              <Link to="/search" className="menu__link" onClick={closeMenu}>Search</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

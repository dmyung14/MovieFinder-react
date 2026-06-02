import React from 'react';
import Landing from '../components/Landing';
import MovieHighlights from '../components/MovieHighlights';

const Home = () => {
  return (
    <>
      <Landing />
      <main>
        <MovieHighlights />
      </main>
    </>
  );
};

export default Home;

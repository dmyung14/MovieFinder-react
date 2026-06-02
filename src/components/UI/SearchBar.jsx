import React, { useState } from 'react';

const SearchBar = ({ onSearch, initialValue = '' }) => {
  const [value, setValue] = useState(initialValue);

  function handleSubmit(event) {
    event.preventDefault();
    if (value.trim()) {
      onSearch(value.trim());
    }
  }

  return (
    <form className="browse__search--form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="browse__search--input"
        placeholder="Search movies, shows..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="browse__search--button">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  );
};

export default SearchBar;

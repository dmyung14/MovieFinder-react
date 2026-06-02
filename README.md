# MovieFinder

A React web app to search and explore movies using the OMDB API. Three dynamic pages: a hero home, a searchable/filterable results page, and a movie detail page with the IMDB ID in the URL.

---

## Quick Start

### Prerequisites

- Node.js v18+
- npm
- A free OMDB API key — register at https://www.omdbapi.com/apikey.aspx

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/movie-react.git
cd movie-react

# 2. Install dependencies
npm install

# 3. Set up environment variables
# Create a .env file in the project root:
echo "REACT_APP_OMDB_API_KEY=your_key_here" > .env

# 4. Start the development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

```bash
npm start          # Start development server (http://localhost:3000)
npm run build      # Build for production
npm test           # Run tests
```

## Environment Variables

Create a `.env` file at the project root. **Never commit this file.**

```
REACT_APP_OMDB_API_KEY=your_omdb_api_key_here
```

`.env` is already listed in `.gitignore`.

---

## Pages

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero section with CTA button to Search |
| `/search` | Search | Search bar, 6 default results, year/rating/type filters |
| `/movie/:id` | Movie Detail | Full movie data from OMDB; `imdbID` in the URL |

---

## API

This app uses the [OMDB API](https://www.omdbapi.com/).

- **Search**: `https://www.omdbapi.com/?s={query}&apikey={key}`
- **Detail**: `https://www.omdbapi.com/?i={imdbID}&apikey={key}`

Free tier: 1,000 requests/day.

---

## Tech Stack

- React 19 (Create React App)
- react-router-dom v6
- OMDB API
- CSS with BEM naming
- Google Fonts
- FontAwesome icons

---

## Troubleshooting

**Movies not loading**
- Check that `.env` exists and contains `REACT_APP_OMDB_API_KEY`
- Restart the dev server after adding `.env`

**"Cannot find module 'react-router-dom'"**
- Run `npm install react-router-dom`

**Port already in use**
- Set a different port: `set PORT=3001 && npm start` (Windows)

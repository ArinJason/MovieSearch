# OMDB Movies Search (React + Vite + Tailwind)

A full-featured movie search app using the OMDB API. Search titles, filter by type (movie/series/episode) via API, paginate results, view detailed info, and manage favorites locally.

## Features
- Search with query + type filter (API-based, no client-side `array.filter`)
- Pagination using OMDB `page` param
- Detailed view: poster, year, genre, plot, ratings, cast
- Favorites stored in `localStorage`
- Robust error and empty states
- Clean UI with Tailwind

## Tech
- React, React Router v6
- Vite
- Tailwind CSS

## Setup
1. Create `.env`:
2. Install & run:
```bash
npm i
npm run dev

// src/pages/SearchPage.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import TypeSelect from "../components/TypeSelect";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";
import { searchMovies } from "../services/omdb";
import useFavorites from "../hooks/useFavorites";

export default function SearchPage() {
  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const page = Number(params.get("page") || 1);
  const type = params.get("type") || "";

  const [state, setState] = useState({ items: [], total: 0, loading: false, error: null });
  const { favorites, isFav, addFav, removeFav } = useFavorites();

  useEffect(() => {
    let ignore = false;
    async function run() {
      if (!q) {
        setState({ items: [], total: 0, loading: false, error: null });
        return;
      }
      setState((s) => ({ ...s, loading: true, error: null }));
      const res = await searchMovies({ query: q, page, type });
      if (!ignore) setState({ items: res.items, total: res.total, loading: false, error: res.error });
    }
    run();
    return () => { ignore = true; };
  }, [q, page, type]);

  const toggleFav = (movie) => {
    isFav(movie.imdbID) ? removeFav(movie.imdbID) : addFav(movie);
  };

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Movies Search</h1>
      <div className="flex items-center gap-3 mb-6">
        <SearchBar />
        <TypeSelect />
      </div>

      {state.loading && <p className="text-gray-600">Loading...</p>}
      {state.error && <ErrorState message={state.error} />}

      {!state.loading && !state.error && state.items.length === 0 && q && (
        <EmptyState title="No results found" subtitle="Try changing keywords or type." />
      )}

      {!state.loading && !state.error && state.items.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {state.items.map((m) => (
              <MovieCard
                key={m.imdbID}
                movie={m}
                isFav={isFav(m.imdbID)}
                onToggleFav={toggleFav}
              />
            ))}
          </div>
          <Pagination total={state.total} />
        </>
      )}

      {/* Favorites section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Favorites</h2>
        {favorites.length === 0 ? (
          <p className="text-sm text-gray-600">No favorites yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {favorites.map((m) => (
              <MovieCard
                key={`fav-${m.imdbID}`}
                movie={m}
                isFav={true}
                onToggleFav={() => removeFav(m.imdbID)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

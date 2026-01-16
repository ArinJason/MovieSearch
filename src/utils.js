// src/utils.js
export function formatCount(n) {
  return n > 0 ? n.toLocaleString() : "0";
}

// src/hooks/useFavorites.js
import { useEffect, useState } from "react";

const KEY = "favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const isFav = (id) => favorites.some((m) => m.imdbID === id);
  const addFav = (movie) => {
    if (!isFav(movie.imdbID)) setFavorites((prev) => [...prev, movie]);
  };
  const removeFav = (id) => setFavorites((prev) => prev.filter((m) => m.imdbID !== id));

  return { favorites, isFav, addFav, removeFav };
}

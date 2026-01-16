// src/services/omdb.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_OMDB_BASE_URL,
  timeout: 10000,
});

const withKey = (params = {}) => ({
  apikey: import.meta.env.VITE_OMDB_API_KEY,
  ...params,
});

export async function searchMovies({ query, page = 1, type }) {
  // Build params without client-side filtering
  const params = withKey({
    s: query?.trim(),
    page,
    ...(type ? { type } : {}),
  });

  try {
    const { data } = await api.get("/", { params });
    if (data.Response === "False") {
      return { items: [], total: 0, error: data.Error || "No results found." };
    }
    return {
      items: data.Search || [],
      total: Number(data.totalResults || 0),
      error: null,
    };
  } catch (e) {
    return { items: [], total: 0, error: "Network error. Please try again." };
  }
}

export async function getMovieById(id) {
  try {
    const { data } = await api.get("/", { params: withKey({ i: id, plot: "full" }) });
    if (data.Response === "False") {
      return { item: null, error: data.Error || "Movie not found." };
    }
    return { item: data, error: null };
  } catch {
    return { item: null, error: "Network error. Please try again." };
  }
}

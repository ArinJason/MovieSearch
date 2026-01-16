// src/pages/MovieDetailsPage.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieById } from "../services/omdb";
import ErrorState from "../components/ErrorState";

export default function MovieDetailsPage() {
  const { id } = useParams();
  const [state, setState] = useState({ item: null, loading: false, error: null });

  useEffect(() => {
    let ignore = false;
    async function run() {
      setState({ item: null, loading: true, error: null });
      const res = await getMovieById(id);
      if (!ignore) setState({ item: res.item, loading: false, error: res.error });
    }
    run();
    return () => { ignore = true; };
  }, [id]);

  if (state.loading) return <div className="container py-8">Loading...</div>;
  if (state.error) return <div className="container py-8"><ErrorState message={state.error} /></div>;
  if (!state.item) return <div className="container py-8"><p>No movie found.</p></div>;

  const m = state.item;
  const poster = m.Poster && m.Poster !== "N/A" ? m.Poster : "https://via.placeholder.com/400x600?text=No+Image";

  return (
    <div className="container py-8">
      <Link to="/" className="text-blue-600 hover:underline">&larr; Back</Link>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <img src={poster} alt={m.Title} className="w-full rounded shadow" />
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold">{m.Title}</h1>
          <p className="text-gray-700 mt-1">{m.Year} • {m.Genre} • {m.Runtime}</p>
          <p className="mt-4">{m.Plot}</p>

          <div className="mt-6">
            <h3 className="font-semibold">Ratings</h3>
            <ul className="list-disc ml-5 text-sm mt-2">
              {(m.Ratings || []).map((r) => (
                <li key={r.Source}>{r.Source}: {r.Value}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p><span className="font-semibold">Director:</span> {m.Director}</p>
              <p><span className="font-semibold">Writer:</span> {m.Writer}</p>
              <p><span className="font-semibold">Actors:</span> {m.Actors}</p>
            </div>
            <div>
              <p><span className="font-semibold">Language:</span> {m.Language}</p>
              <p><span className="font-semibold">Country:</span> {m.Country}</p>
              <p><span className="font-semibold">Awards:</span> {m.Awards}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

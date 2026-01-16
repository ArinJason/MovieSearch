// src/components/MovieCard.jsx
import { Link } from "react-router-dom";

export default function MovieCard({ movie, isFav, onToggleFav }) {
  const { Title, Year, Poster, Type, imdbID } = movie;
  const poster = Poster && Poster !== "N/A" ? Poster : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <div className="bg-white rounded shadow hover:shadow-md transition p-3 flex flex-col">
      <img src={poster} alt={Title} className="w-full h-64 object-cover rounded" />
      <div className="mt-3 flex-1">
        <h3 className="font-semibold">{Title}</h3>
        <p className="text-sm text-gray-600">{Year} • {Type}</p>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <Link
          to={`/movie/${imdbID}`}
          className="text-blue-600 hover:underline"
        >
          Details
        </Link>
        <button
          onClick={() => onToggleFav(movie)}
          className={`px-3 py-1 rounded ${isFav ? "bg-rose-600 text-white" : "bg-gray-200"}`}
        >
          {isFav ? "Remove" : "Favorite"}
        </button>
      </div>
    </div>
  );
}

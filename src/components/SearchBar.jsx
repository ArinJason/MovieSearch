// src/components/SearchBar.jsx
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SearchBar() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [text, setText] = useState(params.get("q") || "");

  const onSubmit = (e) => {
    e.preventDefault();
    const type = params.get("type") || "";
    navigate(`/?q=${encodeURIComponent(text)}${type ? `&type=${type}` : ""}&page=1`);
  };

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search movies, shows, episodes..."
        className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring"
      />
      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Search
      </button>
    </form>
  );
}

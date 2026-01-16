// src/components/TypeSelect.jsx
import { useNavigate, useSearchParams } from "react-router-dom";

const TYPES = [
  { label: "All", value: "" },
  { label: "Movie", value: "movie" },
  { label: "Series", value: "series" },
  { label: "Episode", value: "episode" },
];

export default function TypeSelect() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const q = params.get("q") || "";
  const page = params.get("page") || "1";
  const currentType = params.get("type") || "";

  const onChange = (e) => {
    const nextType = e.target.value;
    // Apply filter via API by updating URL params (no array.filter)
    navigate(`/?q=${encodeURIComponent(q)}${nextType ? `&type=${nextType}` : ""}&page=1`);
  };

  return (
    <select
      value={currentType}
      onChange={onChange}
      className="border rounded px-3 py-2"
      aria-label="Filter by type"
    >
      {TYPES.map((t) => (
        <option key={t.value} value={t.value}>{t.label}</option>
      ))}
    </select>
  );
}

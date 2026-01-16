// src/components/Pagination.jsx
import { useNavigate, useSearchParams } from "react-router-dom";
import { formatCount } from "../utils";

export default function Pagination({ total, pageSize = 10 }) {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const q = params.get("q") || "";
  const type = params.get("type") || "";
  const page = Number(params.get("page") || 1);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const go = (p) => {
    navigate(`/?q=${encodeURIComponent(q)}${type ? `&type=${type}` : ""}&page=${p}`);
  };

  if (total === 0) return null;

  return (
    <div className="flex items-center justify-between mt-6">
      <p className="text-sm text-gray-700">Results: {formatCount(total)} • Page {page} of {totalPages}</p>
      <div className="flex gap-2">
        <button
          disabled={page <= 1}
          onClick={() => go(page - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <button
          disabled={page >= totalPages}
          onClick={() => go(page + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

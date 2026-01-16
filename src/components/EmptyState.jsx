// src/components/EmptyState.jsx
export default function EmptyState({ 
  title = "No results", 
  subtitle = "Try a different search." 
}) {
  return (
    <div className="text-center text-gray-600 py-10">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm mt-1">{subtitle}</p>
    </div>
  );
}

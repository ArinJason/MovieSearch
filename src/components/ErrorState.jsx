// src/components/ErrorState.jsx
export default function ErrorState({ message = "Something went wrong." }) {
  return (
    <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded">
      {message}
    </div>
  );
}

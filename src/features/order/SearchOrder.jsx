import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;

    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit} className="">
      <input
        placeholder="Search order"
        value={query}
        className="w-36 placeholder:text-stone-900 placeholder:text-opacity-70 placeholder:text-sm rounded-full px-4 py-2 bg-yellow-100 transition-all duration-300 focus-within:border-stone-800 focus:outline-none focus:ring focus:ring-yellow-500 sm:w-60 sm:focus:w-72"
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

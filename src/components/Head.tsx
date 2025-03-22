"use client";
import { useState } from "react";

const Head: React.FC<{ onSearch: (movies: any[]) => void }> = ({
  onSearch,
}) => {
  const [query, setQuery] = useState<string>(""); 
  const [error, setError] = useState<string | null>(null); 

  const fetchMovies = async () => {
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results) {
        onSearch(data.results); 
        setError(null); 
      } else {
        onSearch([]); 
        setError("ไม่พบภาพยนต์");
      }
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการดึงข้อมูล");
    }
  };

  const handleSearch = () => {
    if (query.trim() !== "") {
      fetchMovies(); 
    }
  };

  return (
    <div className="flex flex-col items-center pt-5 pb-10 lg:pt-1">
      <div className="pb-5">
        <h1 className="md:hidden text-gray-900 text-2xl font-extrabold drop-shadow-lg">
          ค้นหาภาพยนต์
        </h1>
      </div>
      <div className="flex gap-4">
        <input
          type="text"
          className="p-2 border border-gray-300 rounded-lg bg-white"
          placeholder="กรอกชื่อภาพยนต์..."
          value={query}
          onChange={(e) => setQuery(e.target.value)} 
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-lg"
          onClick={handleSearch} 
        >
          ค้นหา
        </button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Head;

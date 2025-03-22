"use client";
import { useState, useEffect } from "react";
import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/Pagination";
import Head from "@/components/Head";
import Image from "next/image";
import { useCart } from "@/components/CartContext";
import Link from "next/link";

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  price?: number;
  overview?: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
};

const Index = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { addToCart, cartCount, cart } = useCart();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const handleAddToCart = (movie: Movie) => {
    addToCart(movie);
  };

  const handlePriceChange = (id: number, newPrice: number) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, price: newPrice } : movie
      )
    );
  };

  const handleSearch = (newMovies: Movie[]) => {
    setMovies(newMovies);
    setCurrentPage(1);
  };

  const updateItemsPerPage = () => {
    if (window.innerWidth >= 1024) {
      setItemsPerPage(8);
    } else {
      setItemsPerPage(6);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.results) {
          const moviesWithPrice = data.results.map((movie: any) => ({
            ...movie,
            price: undefined,
          }));
          setMovies(moviesWithPrice);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchMovies();

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);

  useEffect(() => {
    movies.forEach((movie) => {
      const movieInCart = cart.find((cartMovie) => cartMovie.id === movie.id);
      if (!movie.price) {
        const priceToUse =
          movieInCart?.price ??
          Math.floor(Math.random() * (500 - 100 + 1) + 100);
        handlePriceChange(movie.id, priceToUse);
      }
    });
  }, [movies, cart]);

  const totalPages = Math.ceil(movies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedMovies = movies.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <div className="relative w-full">
        <Image
          src="/Movie-Theater-Film-Cinema-Exhibition-Placeholder.webp"
          alt="Preview image"
          width={1920}
          height={180}
          className="w-full h-[180px] lg:h-[280px] object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center lg:flex lg:items-start lg:justify-end p-4">
          <Head onSearch={handleSearch} />
        </div>
      </div>
      <div className="bg-blue-900 pb-5">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold mb-4 text-white mr-4 align-middle">
              Movies list
            </h1>
            <div className="relative bg-white rounded-full p-2 flex items-center justify-center mt-[-20px]">
              <Link
                href="/Cart"
                onClick={(e) => {
                  if (cartCount === 0) {
                    e.preventDefault();
                  }
                }}
              >
                <Image
                  src="/shopping-cart.svg"
                  alt="cart image"
                  width={20}
                  height={20}
                  className="w-6 h-6 object-contain filter transform rotate-y-180"
                />
              </Link>

              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center -mt-2 -mr-2">
                  {cartCount}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {selectedMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Index;

import { Movie } from "@/app/index/index";

interface MovieCardProps {
  movie: Movie;

  onAddToCart?: (movie: Movie) => void;
}

const MovieCard = ({ movie, onAddToCart }: MovieCardProps) => {
  const handleAddToCart = () => {
    console.log("MovieCard - Adding to cart:", movie);
    onAddToCart?.({
      ...movie,
      overview: "Description of the movie",
    });
  };

  return (
    <div className="flex flex-col bg-gray-800 text-white p-4 rounded-lg">
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="object-cover rounded-lg w-full h-[150px] lg:h-[550px] lg:w-auto"
        />
      ) : (
        <div className="w-full h-[150px] lg:h-[550px] bg-gray-500 flex items-center justify-center">
          <p className="text-white ">No Image Available</p>
        </div>
      )}
      <h2 className="text-lg font-semibold mt-2 truncate">{movie.title}</h2>
      <p className="text-sm text-gray-400">{movie.release_date}</p>

      <div>
        <div className="mt-2">
          <label className="text-gray-300">
            ราคา: {movie.price ?? "N/A"} บาท
          </label>
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full transition-all transform active:bg-blue-700 active:scale-95"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default MovieCard;

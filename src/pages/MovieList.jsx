import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Clock, Ticket, Star } from "lucide-react";
import { motion } from "framer-motion";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/movies")
      .then((res) => setMovies(res.data))
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-yellow-400 mb-14 drop-shadow-xl">
          🍿 Now Showing
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {movies.map((movie, index) => (
            <motion.div
              key={movie.id || index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-950 border-2 border-dashed border-yellow-500 rounded-xl overflow-hidden shadow-lg hover:shadow-yellow-600/40 hover:scale-[1.02] transition-all duration-300 flex flex-col"
            >
              <div className="relative group rounded-2xl">
                <img
                  src={
                    movie.imageUrl ||
                    "https://via.placeholder.com/400x250?text=Movie+Poster"
                  }
                  alt={movie.title}
                  className="w-full p-4 rounded-6xl h-64 object-cover group-hover:opacity-90 transition duration-300"
                />
                <div className="absolute top-5 left-5 bg-yellow-600/90 text-black px-4 py-1 text-xs font-semibold uppercase rounded-full">
                  {movie.genre || "New Release"}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-yellow-300 mb-1 line-clamp-1">
                  {movie.title}
                </h2>
                <p className="text-sm text-gray-300 mb-4 line-clamp-3">
                  {movie.description}
                </p>

                <div className="flex justify-between text-xs text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-yellow-500" />
                    {movie.duration} min
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    {movie.rating || "4.5"}
                  </div>
                </div>

                <Link
                  to={`/booking/${movie.id}`}
                  className="mt-auto block bg-yellow-400 text-black font-bold text-center py-3 rounded-lg shadow-md hover:bg-yellow-300 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Ticket className="w-5 h-5" />
                  Book Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;

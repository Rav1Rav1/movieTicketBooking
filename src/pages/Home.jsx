import React from "react";
import { motion } from "framer-motion";
import { Ticket, CalendarDays, Film, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black  via-gray-900 to-black text-yellow-300 px-6 py-16 flex flex-col items-center justify-center">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mb-12"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-400 mb-4 drop-shadow-lg">
          Welcome to CineMagic
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          Discover, schedule, and book your favorite movies in just a few clicks. 
          Your ultimate destination for hassle-free cinema bookings.
        </p>
      </motion.div>

      {/* Feature Cards */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full"
      >
        <FeatureCard
          icon={<Film size={36} className="text-yellow-400" />}
          title="Now Showing"
          description="Browse current blockbusters and trending titles."
        />
        <FeatureCard
          icon={<CalendarDays size={36} className="text-yellow-400" />}
          title="Flexible Scheduling"
          description="Pick showtimes that fit your lifestyle."
        />
        <FeatureCard
          icon={<Ticket size={36} className="text-yellow-400" />}
          title="Instant Booking"
          description="Secure your seat in seconds, no hassle."
        />
        <FeatureCard
          icon={<MapPin size={36} className="text-yellow-400" />}
          title="Nearby Theaters"
          description="Find the closest cinemas with real-time updates."
        />
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-16"
      >
        <Link to="/movies">
          <button className="bg-yellow-400 text-black font-semibold text-lg px-8 py-3 rounded-full shadow-lg hover:bg-yellow-300 transition">
            🎟️ Browse Movies & Book Now
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

// Feature Card component
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gray-900 p-6 border-2 border-dashed border-yellow-400 rounded-2xl shadow-md hover:shadow-yellow-500/30 transition-all duration-300 text-center ">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-yellow-200 mb-2">{title}</h3>
    <p className="text-sm text-gray-400">{description}</p>
  </div>
);

export default Home;

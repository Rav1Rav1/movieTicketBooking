import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Loader2, CheckCircle, AlertTriangle } from "lucide-react";

const Booking = () => {
  const { movieId } = useParams();
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState("");

  // Fetch seat layout
  const fetchSeats = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:8080/api/seats/movie/${movieId}`);
      setSeats(res.data);
    } catch (err) {
      setError("Failed to load seats.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeats();
  }, [movieId]);

  const toggleSeat = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats((prev) => prev.filter((s) => s !== seatNumber));
    } else {
      setSelectedSeats((prev) => [...prev, seatNumber]);
    }
  };

  const bookSeats = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8080/api/seats/movie/${movieId}/book`,
        selectedSeats
      );
      setMessage(res.data);
      setSelectedSeats([]);
      fetchSeats(); // Refresh seat status
    } catch (err) {
      setMessage(err.response?.data || "Booking failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-12 px-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-yellow-400 mb-6">🎟️ Choose Your Seats</h1>

      {loading ? (
        <div className="flex items-center text-yellow-300 gap-2 text-lg">
          <Loader2 className="animate-spin" /> Loading seats...
        </div>
      ) : error ? (
        <div className="text-red-500 flex items-center gap-2">
          <AlertTriangle /> {error}
        </div>
      ) : (
        <>
          {message && (
            <div className="mb-6 px-6 py-3 rounded-md shadow-md bg-yellow-100 text-black font-semibold flex items-center gap-2">
              <CheckCircle className="text-green-600" />
              {message}
            </div>
          )}

          <div className="bg-gray-950 p-6 rounded-xl shadow-md mb-8 w-full max-w-2xl">
            <div className="grid grid-cols-10 gap-3 justify-center">
              {seats.map((seat) => (
                <button
                  key={seat.id}
                  onClick={() => toggleSeat(seat.seatNumber)}
                  disabled={seat.booked}
                  className={`w-10 h-10 rounded-md text-sm font-bold transition-all duration-300
                    ${
                      seat.booked
                        ? "bg-red-600 cursor-not-allowed"
                        : selectedSeats.includes(seat.seatNumber)
                        ? "bg-yellow-400 text-black"
                        : "bg-gray-700 hover:bg-yellow-300 hover:text-black"
                    }
                  `}
                >
                  {seat.seatNumber}
                </button>
              ))}
            </div>

            <div className="flex justify-between mt-6 text-sm text-gray-300 px-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-700 rounded-sm"></div> Available
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-400 rounded-sm"></div> Selected
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-600 rounded-sm"></div> Booked
              </div>
            </div>
          </div>

          <button
            onClick={bookSeats}
            disabled={selectedSeats.length === 0}
            className={`bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl shadow-md transition-all duration-300 hover:bg-yellow-300 ${
              selectedSeats.length === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Confirm Booking ({selectedSeats.length})
          </button>
        </>
      )}
    </div>
  );
};

export default Booking;

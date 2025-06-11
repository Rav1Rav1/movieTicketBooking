import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MovieList from "./pages/MovieList";
import AuthPage from "./pages/AuthPage";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";

const App = () => {
  return (
    <Router>
      <Navbar />
      <main className="min-h-screen bg-black text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/booking/:movieId" element={<Booking />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
          <Route
            path="*"
            element={
              <div className="text-center text-3xl text-red-500 py-32 font-bold">
                404 - Page Not Found
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;

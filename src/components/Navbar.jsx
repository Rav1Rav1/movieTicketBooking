import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import {
  FaHome,
  FaFilm,
  FaUser,
  FaUserShield,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
      isActive
        ? "bg-yellow-400 text-black shadow-md"
        : "text-white hover:bg-yellow-300 hover:text-black"
    }`;

  return (
    <nav className=" sticky bg-gray-900 border-1 border-dashed border-yellow-400 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 text-2xl font-bold text-yellow-300 tracking-wide">
          <NavLink to="/" className="hover:text-white">CineMagic</NavLink>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden text-white">
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-4 text-sm font-semibold items-center">
          <li><NavLink to="/" className={linkClasses}><FaHome /> Home</NavLink></li>
          <li><NavLink to="/movies" className={linkClasses}><FaFilm /> Movies</NavLink></li>
          <li><NavLink to="/profile" className={linkClasses}><FaUser /> Profile</NavLink></li>
          <li><NavLink to="/admin" className={linkClasses}><FaUserShield /> Admin</NavLink></li>
          <li><NavLink to="/auth" className={linkClasses}><FaSignInAlt /> Login</NavLink></li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 bg-gray-900 border-t border-yellow-400">
          <ul className="flex flex-col space-y-3 text-base font-medium text-white">
            <li><NavLink to="/" onClick={toggleMenu} className={linkClasses}><FaHome /> Home</NavLink></li>
            <li><NavLink to="/movies" onClick={toggleMenu} className={linkClasses}><FaFilm /> Movies</NavLink></li>
            <li><NavLink to="/profile" onClick={toggleMenu} className={linkClasses}><FaUser /> Profile</NavLink></li>
            <li><NavLink to="/admin" onClick={toggleMenu} className={linkClasses}><FaUserShield /> Admin</NavLink></li>
            <li><NavLink to="/auth" onClick={toggleMenu} className={linkClasses}><FaSignInAlt /> Login</NavLink></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

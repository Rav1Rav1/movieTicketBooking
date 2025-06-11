import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaHome, FaUserShield, FaEnvelope, FaPhone, FaMapMarkerAlt, FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white border-t-1 border-dashed border-yellow-500">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-extrabold mb-3 text-yellow-400">CineVerse</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Your go-to destination for movies, tickets, and unforgettable cinema experiences.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-yellow-400">Quick Links</h2>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2">
              <FaHome className="text-yellow-300" />
              <a href="/" className="hover:text-yellow-300 transition">Home</a>
            </li>
            <li className="flex items-center gap-2">
              <FaSignInAlt className="text-yellow-300" />
              <a href="/login" className="hover:text-yellow-300 transition">Login</a>
            </li>
            <li className="flex items-center gap-2">
              <FaUserPlus className="text-yellow-300" />
              <a href="/register" className="hover:text-yellow-300 transition">Register</a>
            </li>
            <li className="flex items-center gap-2">
              <FaUserShield className="text-yellow-300" />
              <a href="/admin" className="hover:text-yellow-300 transition">Admin Panel</a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-yellow-400">Contact Us</h2>
          <p className="text-sm text-gray-400 flex items-center gap-2">
            <FaEnvelope className="text-yellow-300" /> support@cineverse.com
          </p>
          <p className="text-sm text-gray-400 flex items-center gap-2">
            <FaPhone className="text-yellow-300" /> +1 (555) 123-4567
          </p>
          <p className="text-sm text-gray-400 flex items-center gap-2">
            <FaMapMarkerAlt className="text-yellow-300" /> Hollywood Blvd, CA
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-yellow-400">Follow Us</h2>
          <div className="flex space-x-5 text-yellow-300 text-xl">
            <a href="#" className="hover:text-blue-500 transition" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-sky-400 transition" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-pink-500 transition" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="text-center py-4 bg-gray-800 text-sm text-yellow-400 border-t border-yellow-700/20">
        &copy; {new Date().getFullYear()} <span className="font-medium">CineVerse</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

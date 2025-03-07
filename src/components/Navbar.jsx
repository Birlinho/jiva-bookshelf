import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
      <div className="flex items-center space-x-8">
        <Link to="/" className="text-2xl font-bold">
          jive
        </Link>
        <div className="space-x-6">
          <Link
            to="/books"
            className="text-gray-600 hover:text-black transition-colors"
          >
            Books
          </Link>
          <Link
            to="/games"
            className="text-gray-600 hover:text-black transition-colors"
          >
            Games
          </Link>
        </div>
      </div>
      <div className="space-x-4">
        <button className="px-4 py-2 text-gray-600 hover:text-black">
          Login
        </button>
        <button className="px-4 py-2 bg-black text-white rounded-full hover:opacity-90">
          Sign up
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

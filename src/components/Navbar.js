import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white border-b border-gray-100 shadow-sm h-16 flex items-center px-6">
      <Link to="/" className="flex items-center gap-2 mr-8">
        <span className="w-8 h-8 rounded-lg bg-turf-green flex items-center justify-center text-white text-lg">
          ⚽
        </span>
        <span className="font-display text-xl font-bold text-turf-dark tracking-tight">
          TurfFinder
        </span>
      </Link>

      <nav className="hidden md:flex items-center gap-6 flex-1 text-sm font-medium text-gray-500">
        <Link to="/" className="hover:text-turf-green transition-colors">Explore</Link>
        {user?.role === "owner" && (
          <Link to="/owner" className="hover:text-turf-green transition-colors">My Dashboard</Link>
        )}
      </nav>

      <div className="ml-auto flex items-center gap-3">
        {user ? (
          <>
            <span className="text-sm text-gray-600 hidden sm:block">
              Hi, <span className="font-semibold text-turf-dark">{user.name}</span>
              <span className="ml-1 text-xs bg-turf-light text-turf-green px-2 py-0.5 rounded-full capitalize">
                {user.role}
              </span>
            </span>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-gray-500 hover:text-red-500 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-turf-green transition-colors">
              Login
            </Link>
            <Link to="/signup" className="text-sm font-semibold bg-turf-green text-white px-4 py-2 rounded-lg hover:bg-turf-dark transition-colors">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
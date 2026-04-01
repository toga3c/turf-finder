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

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 mr-8">
        <span className="w-8 h-8 rounded-lg bg-turf-green flex items-center justify-center text-white text-lg">
          ⚽
        </span>
        <span className="font-display text-xl font-bold text-turf-dark tracking-tight">
          TurfFinder
        </span>
      </Link>

      {/* Nav links */}
      <nav className="hidden md:flex items-center gap-6 flex-1 text-sm font-medium text-gray-500">
        <Link to="/" className="hover:text-turf-green transition-colors">
          Explore
        </Link>
        {user?.role === "player" && (
          <Link to="/my-bookings" className="hover:text-turf-green transition-colors">
            My Bookings
          </Link>
        )}
        {user?.role === "owner" && (
          <Link to="/owner" className="hover:text-turf-green transition-colors">
            My Dashboard
          </Link>
        )}
      </nav>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-3">
        {user ? (
          <>
            {/* User info */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-turf-light flex items-center justify-center
                              font-display font-bold text-turf-green text-sm">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-800 leading-tight">
                  {user.name}
                </span>
                <span className="text-xs text-turf-green capitalize leading-tight">
                  {user.role}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-6 bg-gray-200" />

            {/* Quick links */}
            {user.role === "player" && (
              <Link
                to="/my-bookings"
                className="hidden sm:flex text-xs font-semibold bg-turf-light text-turf-green
                           px-3 py-1.5 rounded-lg hover:bg-turf-green hover:text-white transition-colors"
              >
                My Bookings
              </Link>
            )}
            {user.role === "owner" && (
              <Link
                to="/owner"
                className="hidden sm:flex text-xs font-semibold bg-turf-light text-turf-green
                           px-3 py-1.5 rounded-lg hover:bg-turf-green hover:text-white transition-colors"
              >
                Dashboard
              </Link>
            )}

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-gray-400 hover:text-red-500 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-sm font-medium text-gray-600 hover:text-turf-green transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-sm font-semibold bg-turf-green text-white px-4 py-2
                         rounded-lg hover:bg-turf-dark transition-colors"
            >
              Get Started
            </Link>
          </>
        )}
      </div>

    </header>
  );
}
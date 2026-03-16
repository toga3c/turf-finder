import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const STATS = [
  { label: "My Turfs",       value: "0",   icon: "🏟️" },
  { label: "Bookings Today", value: "0",   icon: "📅" },
  { label: "Total Revenue",  value: "₹0",  icon: "💰" },
  { label: "Avg. Rating",    value: "—",   icon: "⭐" },
];

export default function OwnerDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10 px-4">
      <div className="max-w-5xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-turf-dark">Owner Dashboard</h1>
            <p className="text-gray-500 mt-1 text-sm">
              Welcome back, <span className="font-semibold text-gray-700">{user?.name}</span>!
            </p>
          </div>
          <button
            disabled
            className="flex items-center gap-2 px-5 py-2.5 bg-turf-green text-white
                       font-semibold rounded-xl opacity-50 cursor-not-allowed text-sm"
          >
            ➕ Add Turf
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {STATS.map(({ label, value, icon }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-1">
              <span className="text-2xl">{icon}</span>
              <p className="font-display text-2xl font-bold text-turf-dark">{value}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-16 text-center">
          <span className="text-6xl block mb-4">🚧</span>
          <h2 className="font-display text-xl font-bold text-gray-700">Turf listing coming soon</h2>
          <p className="text-gray-400 text-sm mt-2 max-w-sm mx-auto">
            The ability to list and manage your turfs is under development.
          </p>
          <Link
            to="/"
            className="inline-block mt-6 px-5 py-2.5 bg-turf-light text-turf-green
                       font-semibold rounded-xl text-sm hover:bg-turf-green hover:text-white transition-colors"
          >
            Explore Turfs
          </Link>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Logged in as <span className="font-semibold text-turf-green">Owner</span> · {user?.email}
        </p>
      </div>
    </div>
  );
}
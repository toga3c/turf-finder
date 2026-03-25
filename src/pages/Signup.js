import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleContinue = () => {
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!selectedRole) {
      setError("Please select who you are.");
      return;
    }
    login({ name: name.trim(), role: selectedRole });
    navigate(selectedRole === "owner" ? "/owner" : "/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-turf-light via-white to-green-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">

          {/* Header */}
          <div className="text-center mb-8">
            <span className="text-4xl">🏟️</span>
            <h1 className="font-display text-2xl font-bold text-turf-dark mt-2">
              Join TurfFinder
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Tell us who you are to get started
            </p>
          </div>

          {/* Name */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(""); }}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm
                         focus:outline-none focus:ring-2 focus:ring-turf-green focus:border-transparent"
            />
          </div>

          {/* Role selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              I am a…
            </label>
            <div className="grid grid-cols-2 gap-4">

              <button
                type="button"
                onClick={() => { setSelectedRole("player"); setError(""); }}
                className={`relative p-5 rounded-2xl border-2 text-left transition-all duration-200
                  ${selectedRole === "player"
                    ? "border-turf-green bg-turf-light shadow-md scale-[1.02]"
                    : "border-gray-200 hover:border-turf-green hover:shadow-sm bg-white"
                  }`}
              >
                {selectedRole === "player" && (
                  <span className="absolute top-2 right-2 text-turf-green text-sm">✓</span>
                )}
                <span className="text-3xl block mb-2">🏃</span>
                <p className="font-display font-bold text-gray-800 text-sm">Player</p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Browse and find turfs near you
                </p>
              </button>

              <button
                type="button"
                onClick={() => { setSelectedRole("owner"); setError(""); }}
                className={`relative p-5 rounded-2xl border-2 text-left transition-all duration-200
                  ${selectedRole === "owner"
                    ? "border-turf-green bg-turf-light shadow-md scale-[1.02]"
                    : "border-gray-200 hover:border-turf-green hover:shadow-sm bg-white"
                  }`}
              >
                {selectedRole === "owner" && (
                  <span className="absolute top-2 right-2 text-turf-green text-sm">✓</span>
                )}
                <span className="text-3xl block mb-2">🏟️</span>
                <p className="font-display font-bold text-gray-800 text-sm">Owner</p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  List and manage your turfs
                </p>
              </button>

            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Continue */}
          <button
            onClick={handleContinue}
            className="w-full py-3 bg-turf-green hover:bg-turf-dark text-white font-semibold
                       rounded-xl transition-colors text-sm"
          >
            Get Started →
          </button>

        </div>
      </div>
    </div>
  );
}
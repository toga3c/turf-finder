import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const navigate   = useNavigate();

  const [form, setForm]       = useState({ name: "", email: "", password: "", role: "player" });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const { name, email, password, role } = form;
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      signup({ name, email, password, role });
      navigate(role === "owner" ? "/owner" : "/");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-turf-light via-white to-green-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">

          <div className="text-center mb-8">
            <span className="text-4xl">🏟️</span>
            <h1 className="font-display text-2xl font-bold text-turf-dark mt-2">Create an account</h1>
            <p className="text-sm text-gray-500 mt-1">Join TurfFinder and start playing</p>
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Rohit Sharma"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm
                           focus:outline-none focus:ring-2 focus:ring-turf-green focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm
                           focus:outline-none focus:ring-2 focus:ring-turf-green focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Min. 6 characters"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm
                           focus:outline-none focus:ring-2 focus:ring-turf-green focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">I am a…</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "player", label: "🏃 Player", desc: "Find & book turfs" },
                  { value: "owner",  label: "🏟️ Owner",  desc: "List & manage turfs" },
                ].map(({ value, label, desc }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, role: value }))}
                    className={`p-3 rounded-xl border-2 text-left transition-all
                      ${form.role === value
                        ? "border-turf-green bg-turf-light"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                  >
                    <p className="text-sm font-semibold text-gray-800">{label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-turf-green hover:bg-turf-dark text-white font-semibold
                         rounded-xl transition-colors disabled:opacity-60"
            >
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-turf-green font-semibold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
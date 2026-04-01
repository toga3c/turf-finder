import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { BookingProvider } from "./context/BookingContext";
import { TurfProvider } from "./context/TurfContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OwnerDashboard from "./pages/OwnerDashboard";
import MyBookings from "./pages/MyBookings";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="font-display text-3xl font-bold text-turf-dark">
        404 — Page not found
      </h1>
      <p className="text-gray-500">That page doesn't exist.</p>
      <Link to="/" className="text-turf-green font-semibold hover:underline">
        Go back home
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <TurfProvider>
        <BookingProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/my-bookings"
                element={
                  <ProtectedRoute requiredRole="player">
                    <MyBookings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/owner"
                element={
                  <ProtectedRoute requiredRole="owner">
                    <OwnerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </BookingProvider>
      </TurfProvider>
    </AuthProvider>
  );
}
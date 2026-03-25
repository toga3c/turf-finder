import React, { createContext, useContext, useState } from "react";

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);

  const addBooking = (booking) => {
    const newBooking = {
      id: Date.now(),
      ...booking,
      status: "confirmed",
      createdAt: new Date().toLocaleDateString(),
    };
    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const cancelBooking = (id) => {
    setBookings((prev) =>
      prev.map((b) => b.id === id ? { ...b, status: "cancelled" } : b)
    );
  };

  const getBookingsByPlayer = (playerName) =>
    bookings.filter((b) => b.playerName === playerName);

  const getBookingsByTurf = (turfName) =>
    bookings.filter((b) => b.turfName === turfName);

  return (
    <BookingContext.Provider value={{ bookings, addBooking, cancelBooking, getBookingsByPlayer, getBookingsByTurf }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}
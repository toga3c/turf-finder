import React from "react";
import { Link } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { useAuth } from "../context/AuthContext";

export default function MyBookings() {
  const { user } = useAuth();
  const { getBookingsByPlayer, cancelBooking } = useBooking();

  const bookings = getBookingsByPlayer(user?.name);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold text-turf-dark">
            My Bookings
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            All your turf bookings in one place
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <p className="font-display text-2xl font-bold text-turf-dark">
              {bookings.length}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">Total Bookings</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <p className="font-display text-2xl font-bold text-turf-dark">
              {bookings.filter((b) => b.status === "confirmed").length}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">Confirmed</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <p className="font-display text-2xl font-bold text-turf-dark">
              ₹{bookings
                .filter((b) => b.status === "confirmed")
                .reduce((sum, b) => sum + b.totalPrice, 0)}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">Total Spent</p>
          </div>
        </div>

        {/* Empty state */}
        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-16 text-center">
            <h2 className="font-display text-xl font-bold text-gray-700">
              No bookings yet
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              Browse turfs and book your first slot
            </p>
            <Link
              to="/"
              className="inline-block mt-6 px-5 py-2.5 bg-turf-green text-white
                         font-semibold rounded-xl text-sm hover:bg-turf-dark transition-colors"
            >
              Explore Turfs
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
              >
                <div className="flex items-start justify-between gap-4">

                  {/* Left — booking info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-display font-bold text-gray-800">
                        {booking.turfName}
                      </h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                        ${booking.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-500"
                        }`}>
                        {booking.status === "confirmed" ? "Confirmed" : "Cancelled"}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 mt-1">
                      {booking.turfLocation}
                    </p>

                    {/* Booking details grid */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 mt-3">
                      <div>
                        <p className="text-xs text-gray-400">Date</p>
                        <p className="text-sm font-medium text-gray-700">
                          {new Date(booking.date).toDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Time</p>
                        <p className="text-sm font-medium text-gray-700">
                          {booking.timeSlot}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Duration</p>
                        <p className="text-sm font-medium text-gray-700">
                          {booking.duration} hour{booking.duration > 1 ? "s" : ""}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Booked On</p>
                        <p className="text-sm font-medium text-gray-700">
                          {booking.createdAt}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right — price & cancel */}
                  <div className="flex flex-col items-end gap-3 flex-shrink-0">
                    <div className="text-right">
                      <p className="text-xs text-gray-400">Amount Paid</p>
                      <p className="font-display text-xl font-bold text-turf-dark">
                        ₹{booking.totalPrice}
                      </p>
                    </div>

                    {booking.status === "confirmed" && (
                      <button
                        onClick={() => cancelBooking(booking.id)}
                        className="text-xs text-red-400 hover:text-red-600
                                   transition-colors font-medium border border-red-200
                                   hover:border-red-400 px-3 py-1.5 rounded-lg"
                      >
                        Cancel
                      </button>
                    )}
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
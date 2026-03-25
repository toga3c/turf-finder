import React, { useState } from "react";
import { useBooking } from "../context/BookingContext";
import { useAuth } from "../context/AuthContext";

const TIME_SLOTS = [
  "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
  "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM",
];

const DURATIONS = [1, 2, 3];

export default function BookingModal({ turf, onClose }) {
  const { addBooking } = useBooking();
  const { user } = useAuth();

  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [duration, setDuration] = useState(1);
  const [step, setStep] = useState("form");
  const [error, setError] = useState("");

  const totalPrice = turf.pricePerHour * duration;
  const today = new Date().toISOString().split("T")[0];

  const handleProceed = () => {
    if (!date) { setError("Please select a date."); return; }
    if (!timeSlot) { setError("Please select a time slot."); return; }
    setError("");
    setStep("confirm");
  };

  const handleConfirm = () => {
    addBooking({
      turfId: turf.id,
      turfName: turf.name,
      turfLocation: turf.location,
      playerName: user?.name,
      date,
      timeSlot,
      duration,
      totalPrice,
      paymentMethod: "Mock Payment",
    });
    setStep("success");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md z-10 overflow-hidden">

        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-start justify-between">
          <div>
            <h2 className="font-display text-lg font-bold text-gray-900">
              Book a Slot
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {turf.name} · {turf.location}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-xl leading-none mt-0.5"
          >
            ×
          </button>
        </div>

        {/* ── FORM STEP ── */}
        {step === "form" && (
          <div className="px-6 py-5 space-y-5">

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Select Date
              </label>
              <input
                type="date"
                min={today}
                value={date}
                onChange={(e) => { setDate(e.target.value); setError(""); }}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm
                           focus:outline-none focus:ring-2 focus:ring-turf-green focus:border-transparent"
              />
            </div>

            {/* Time slot */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Time Slot
              </label>
              <div className="grid grid-cols-4 gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => { setTimeSlot(slot); setError(""); }}
                    className={`py-2 px-1 rounded-lg border text-xs font-medium transition-all
                      ${timeSlot === slot
                        ? "bg-turf-green text-white border-turf-green"
                        : "bg-white text-gray-600 border-gray-200 hover:border-turf-green"
                      }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration
              </label>
              <div className="flex gap-3">
                {DURATIONS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDuration(d)}
                    className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all
                      ${duration === d
                        ? "bg-turf-green text-white border-turf-green"
                        : "bg-white text-gray-600 border-gray-200 hover:border-turf-green"
                      }`}
                  >
                    {d} hr
                  </button>
                ))}
              </div>
            </div>

            {/* Price summary */}
            <div className="bg-gray-50 rounded-xl px-4 py-3 flex items-center justify-between">
              <span className="text-sm text-gray-500">
                ₹{turf.pricePerHour} × {duration} hr
              </span>
              <span className="font-display font-bold text-turf-dark text-lg">
                ₹{totalPrice}
              </span>
            </div>

            {/* Error */}
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            {/* Proceed */}
            <button
              onClick={handleProceed}
              className="w-full py-3 bg-turf-green hover:bg-turf-dark text-white font-semibold
                         rounded-xl transition-colors text-sm"
            >
              Proceed to Pay
            </button>

          </div>
        )}

        {/* ── CONFIRM STEP ── */}
        {step === "confirm" && (
          <div className="px-6 py-5 space-y-4">
            <p className="text-sm text-gray-500">
              Please review your booking details before confirming.
            </p>

            <div className="rounded-xl border border-gray-100 divide-y divide-gray-100">
              {[
                { label: "Turf",     value: turf.name },
                { label: "Location", value: turf.location },
                { label: "Date",     value: new Date(date).toDateString() },
                { label: "Time",     value: timeSlot },
                { label: "Duration", value: `${duration} hour${duration > 1 ? "s" : ""}` },
                { label: "Total",    value: `₹${totalPrice}`, bold: true },
              ].map(({ label, value, bold }) => (
                <div key={label} className="flex justify-between px-4 py-3">
                  <span className="text-sm text-gray-500">{label}</span>
                  <span className={`text-sm ${bold ? "font-bold text-turf-dark" : "text-gray-800 font-medium"}`}>
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-400 text-center">
              Payment is simulated — Razorpay integration coming soon
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setStep("form")}
                className="flex-1 py-3 border border-gray-200 text-gray-600 font-semibold
                           rounded-xl hover:border-gray-300 transition-colors text-sm"
              >
                Back
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-3 bg-turf-green hover:bg-turf-dark text-white font-semibold
                           rounded-xl transition-colors text-sm"
              >
                Confirm & Pay
              </button>
            </div>
          </div>
        )}

        {/* ── SUCCESS STEP ── */}
        {step === "success" && (
          <div className="px-6 py-10 flex flex-col items-center text-center gap-3">
            <div className="w-14 h-14 rounded-full bg-turf-light flex items-center justify-center mb-2">
              <svg
                className="w-7 h-7 text-turf-green"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-display text-xl font-bold text-gray-900">
              Booking Confirmed
            </h3>
            <p className="text-sm text-gray-500 max-w-xs">
              Your slot at{" "}
              <span className="font-semibold text-gray-700">{turf.name}</span> on{" "}
              <span className="font-semibold text-gray-700">
                {new Date(date).toDateString()}
              </span>{" "}
              at{" "}
              <span className="font-semibold text-gray-700">{timeSlot}</span> has been booked.
            </p>
            <div className="w-full bg-gray-50 rounded-xl px-4 py-3 mt-2">
              <p className="text-sm text-gray-500">Amount Paid</p>
              <p className="font-display text-2xl font-bold text-turf-dark">
                ₹{totalPrice}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full mt-2 py-3 bg-turf-green hover:bg-turf-dark text-white font-semibold
                         rounded-xl transition-colors text-sm"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
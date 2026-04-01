import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useBooking } from "../context/BookingContext";
import { useTurf } from "../context/TurfContext";

const SPORTS_OPTIONS = ["Football", "Cricket", "Basketball", "Badminton", "Tennis"];

export default function OwnerDashboard() {
  const { user } = useAuth();
  const { getBookingsByTurf } = useBooking();
  const { turfs: allTurfs, addTurf, removeTurf } = useTurf();

  const turfs = allTurfs.filter((t) => t.owner === user?.name);

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    location: "",
    sports: [],
    pricePerHour: "",
    description: "",
    available: true,
  });
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [activeTab, setActiveTab] = useState("listings");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const toggleSport = (sport) => {
    setForm((prev) => ({
      ...prev,
      sports: prev.sports.includes(sport)
        ? prev.sports.filter((s) => s !== sport)
        : [...prev.sports, sport],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) { setError("Turf name is required."); return; }
    if (!form.location.trim()) { setError("Location is required."); return; }
    if (form.sports.length === 0) { setError("Select at least one sport."); return; }
    if (!form.pricePerHour || isNaN(form.pricePerHour) || form.pricePerHour <= 0) {
      setError("Enter a valid price per hour."); return;
    }

    addTurf({
      name: form.name.trim(),
      location: form.location.trim(),
      sports: form.sports,
      pricePerHour: Number(form.pricePerHour),
      description: form.description.trim(),
      available: form.available,
      owner: user?.name,
      createdAt: new Date().toLocaleDateString(),
    });

    setSuccessMsg(`"${form.name.trim()}" listed successfully!`);
    setForm({
      name: "",
      location: "",
      sports: [],
      pricePerHour: "",
      description: "",
      available: true,
    });
    setShowForm(false);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const allIncomingBookings = turfs.flatMap((turf) =>
    getBookingsByTurf(turf.name)
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-3xl font-bold text-turf-dark">
              Owner Dashboard
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Welcome, <span className="font-semibold text-gray-700">{user?.name}</span>
            </p>
          </div>
          <button
            onClick={() => { setShowForm(!showForm); setError(""); }}
            className="flex items-center gap-2 px-5 py-2.5 bg-turf-green hover:bg-turf-dark
                       text-white font-semibold rounded-xl transition-colors text-sm"
          >
            {showForm ? "Cancel" : "+ Add Turf"}
          </button>
        </div>

        {/* Success message */}
        {successMsg && (
          <div className="mb-5 px-4 py-3 rounded-xl bg-green-50 border border-green-200
                          text-green-700 text-sm font-medium">
            {successMsg}
          </div>
        )}

        {/* Add Turf Form */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
            <h2 className="font-display text-lg font-bold text-turf-dark mb-5">
              List a New Turf
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Turf Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Green Arena Turf"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm
                             focus:outline-none focus:ring-2 focus:ring-turf-green focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Salt Lake, Kolkata"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm
                             focus:outline-none focus:ring-2 focus:ring-turf-green focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sports Available *
                </label>
                <div className="flex flex-wrap gap-2">
                  {SPORTS_OPTIONS.map((sport) => (
                    <button
                      key={sport}
                      type="button"
                      onClick={() => toggleSport(sport)}
                      className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all
                        ${form.sports.includes(sport)
                          ? "bg-turf-green text-white border-turf-green"
                          : "bg-white text-gray-600 border-gray-200 hover:border-turf-green"
                        }`}
                    >
                      {sport}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Price per Hour (₹) *
                </label>
                <input
                  type="number"
                  name="pricePerHour"
                  value={form.pricePerHour}
                  onChange={handleChange}
                  placeholder="e.g. 800"
                  min="1"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm
                             focus:outline-none focus:ring-2 focus:ring-turf-green focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Description <span className="text-gray-400">(optional)</span>
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe your turf — facilities, parking, lighting, etc."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm
                             focus:outline-none focus:ring-2 focus:ring-turf-green focus:border-transparent
                             resize-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.available}
                    onChange={(e) => setForm((p) => ({ ...p, available: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer
                                  peer-checked:after:translate-x-full peer-checked:after:border-white
                                  after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                                  after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all
                                  peer-checked:bg-turf-green relative">
                  </div>
                </label>
                <span className="text-sm text-gray-600 font-medium">
                  {form.available ? "Available for booking" : "Not available"}
                </span>
              </div>

              {error && (
                <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-turf-green hover:bg-turf-dark text-white font-semibold
                           rounded-xl transition-colors text-sm"
              >
                List My Turf
              </button>

            </form>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="font-display text-2xl font-bold text-turf-dark">{turfs.length}</p>
            <p className="text-xs text-gray-500 mt-0.5">Total Turfs</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="font-display text-2xl font-bold text-turf-dark">
              {turfs.filter((t) => t.available).length}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">Available</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="font-display text-2xl font-bold text-turf-dark">
              {allIncomingBookings.length}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">Total Bookings</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="font-display text-2xl font-bold text-turf-dark">
              ₹{allIncomingBookings
                .filter((b) => b.status === "confirmed")
                .reduce((sum, b) => sum + b.totalPrice, 0)}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">Total Revenue</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6 w-fit">
          {["listings", "bookings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all
                ${activeTab === tab
                  ? "bg-white text-turf-dark shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
                }`}
            >
              {tab === "listings" ? "My Listings" : "Incoming Bookings"}
            </button>
          ))}
        </div>

        {/* Listings Tab */}
        {activeTab === "listings" && (
          <>
            {turfs.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-16 text-center">
                <h2 className="font-display text-xl font-bold text-gray-700">
                  No turfs listed yet
                </h2>
                <p className="text-gray-400 text-sm mt-2">
                  Click <span className="font-semibold text-turf-green">+ Add Turf</span> to list your first turf
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {turfs.map((turf) => (
                  <div
                    key={turf.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5
                               flex items-start justify-between gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-display font-bold text-gray-800">{turf.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                          ${turf.available
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                          }`}>
                          {turf.available ? "Available" : "Unavailable"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{turf.location}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {turf.sports.map((s) => (
                          <span
                            key={s}
                            className="text-xs bg-turf-light text-turf-green px-2 py-0.5 rounded-full font-medium"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                      {turf.description && (
                        <p className="text-xs text-gray-400 mt-2">{turf.description}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        Listed on {turf.createdAt}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <p className="font-bold text-turf-dark">
                        ₹{turf.pricePerHour}
                        <span className="text-xs font-normal text-gray-400">/hr</span>
                      </p>
                      <button
                        onClick={() => removeTurf(turf.id)}
                        className="text-xs text-red-400 hover:text-red-600 transition-colors
                                   font-medium border border-red-200 hover:border-red-400
                                   px-3 py-1.5 rounded-lg"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <>
            {allIncomingBookings.length === 0 ? (
              <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-16 text-center">
                <h2 className="font-display text-xl font-bold text-gray-700">
                  No bookings yet
                </h2>
                <p className="text-gray-400 text-sm mt-2">
                  Bookings from players will appear here
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {allIncomingBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
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
                        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 mt-3">
                          <div>
                            <p className="text-xs text-gray-400">Player</p>
                            <p className="text-sm font-medium text-gray-700">
                              {booking.playerName}
                            </p>
                          </div>
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
                        </div>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <p className="text-xs text-gray-400">Amount</p>
                        <p className="font-display text-xl font-bold text-turf-dark">
                          ₹{booking.totalPrice}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
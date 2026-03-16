import React, { useState } from "react";

const SPORTS = ["Football", "Cricket", "Basketball"];
const PRICE_RANGES = [
  { label: "Under ₹700", max: 700 },
  { label: "₹700 – ₹1000", max: 1000 },
  { label: "Above ₹1000", max: Infinity },
];

export default function Sidebar({ onFilterChange }) {
  const [selectedSports, setSelectedSports] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const toggleSport = (sport) => {
    const updated = selectedSports.includes(sport)
      ? selectedSports.filter((s) => s !== sport)
      : [...selectedSports, sport];
    setSelectedSports(updated);
    onFilterChange({ sports: updated, maxPrice: selectedPrice, onlyAvailable });
  };

  const selectPrice = (range) => {
    const updated = selectedPrice?.label === range.label ? null : range;
    setSelectedPrice(updated);
    onFilterChange({ sports: selectedSports, maxPrice: updated, onlyAvailable });
  };

  const toggleAvailable = () => {
    const updated = !onlyAvailable;
    setOnlyAvailable(updated);
    onFilterChange({ sports: selectedSports, maxPrice: selectedPrice, onlyAvailable: updated });
  };

  const clearAll = () => {
    setSelectedSports([]);
    setSelectedPrice(null);
    setOnlyAvailable(false);
    onFilterChange({ sports: [], maxPrice: null, onlyAvailable: false });
  };

  const hasFilters = selectedSports.length > 0 || selectedPrice || onlyAvailable;

  return (
    <div className="px-4 pb-3 border-b border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Filters</span>
        {hasFilters && (
          <button onClick={clearAll} className="text-xs text-turf-green hover:underline">Clear all</button>
        )}
      </div>

      <div className="mb-3">
        <p className="text-xs text-gray-400 mb-1.5">Sport</p>
        <div className="flex flex-wrap gap-2">
          {SPORTS.map((sport) => (
            <button
              key={sport}
              onClick={() => toggleSport(sport)}
              className={`text-xs px-3 py-1 rounded-full border font-medium transition-all
                ${selectedSports.includes(sport)
                  ? "bg-turf-green text-white border-turf-green"
                  : "bg-white text-gray-600 border-gray-200 hover:border-turf-green"
                }`}
            >
              {sport}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <p className="text-xs text-gray-400 mb-1.5">Price per hour</p>
        <div className="flex flex-wrap gap-2">
          {PRICE_RANGES.map((range) => (
            <button
              key={range.label}
              onClick={() => selectPrice(range)}
              className={`text-xs px-3 py-1 rounded-full border font-medium transition-all
                ${selectedPrice?.label === range.label
                  ? "bg-turf-green text-white border-turf-green"
                  : "bg-white text-gray-600 border-gray-200 hover:border-turf-green"
                }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={onlyAvailable}
          onChange={toggleAvailable}
          className="accent-turf-green w-4 h-4"
        />
        <span className="text-xs text-gray-600 font-medium">Available now only</span>
      </label>
    </div>
  );
}
import React from "react";

export default function TurfCard({ turf, isActive = false, onClick }) {
  const { name, location, sports, pricePerHour, rating, reviews, image, available } = turf;

  return (
    <div
      onClick={() => onClick && onClick(turf)}
      className={`flex gap-3 p-3 rounded-xl cursor-pointer border transition-all duration-200
        ${isActive
          ? "border-turf-green bg-turf-light shadow-md"
          : "border-gray-100 bg-white hover:border-turf-green hover:shadow-sm"
        }`}
    >
      <div className="relative flex-shrink-0 w-24 h-20 rounded-lg overflow-hidden bg-gray-100">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        {!available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-xs font-semibold">Booked</span>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-display font-semibold text-gray-900 text-sm truncate">{name}</h3>
        <p className="text-xs text-gray-500 mt-0.5 truncate">📍 {location}</p>
        <div className="flex flex-wrap gap-1 mt-1.5">
          {sports.map((s) => (
            <span key={s} className="text-xs bg-turf-light text-turf-green px-2 py-0.5 rounded-full font-medium">
              {s}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-600">
            ⭐ <span className="font-semibold text-gray-800">{rating}</span>
            <span className="text-gray-400 ml-1">({reviews})</span>
          </span>
          <span className="text-sm font-bold text-turf-dark">
            ₹{pricePerHour}<span className="text-xs font-normal text-gray-400">/hr</span>
          </span>
        </div>
      </div>
    </div>
  );
}
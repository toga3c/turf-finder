import React from "react";
import TurfCard from "./TurfCard";

export default function TurfList({ turfs = [], activeTurfId, onTurfClick, loading = false }) {
  if (loading) {
    return (
      <div className="flex flex-col gap-3 p-4">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex gap-3 p-3 rounded-xl border border-gray-100 animate-pulse">
            <div className="w-24 h-20 rounded-lg bg-gray-200 flex-shrink-0" />
            <div className="flex-1 space-y-2 py-1">
              <div className="h-3 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="h-3 bg-gray-200 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (turfs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center px-6">
        <span className="text-5xl mb-3">🏟️</span>
        <p className="font-display font-semibold text-gray-700">No turfs found</p>
        <p className="text-sm text-gray-400 mt-1">Try a different search term or location</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 p-4">
      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
        {turfs.length} turf{turfs.length !== 1 ? "s" : ""} found
      </p>
      {turfs.map((turf) => (
        <TurfCard
          key={turf.id}
          turf={turf}
          isActive={turf.id === activeTurfId}
          onClick={onTurfClick}
        />
      ))}
    </div>
  );
}
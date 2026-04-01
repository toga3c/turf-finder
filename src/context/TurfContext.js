import React, { createContext, useContext, useState } from "react";
import defaultTurfs from "../data/turfs";

const TurfContext = createContext(null);

export function TurfProvider({ children }) {
  const [turfs, setTurfs] = useState(defaultTurfs);

  const addTurf = (turf) => {
    const newTurf = {
      ...turf,
      id: Date.now(),
      rating: 0,
      reviews: 0,
      image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&q=80",
      lat: 22.5726 + (Math.random() - 0.5) * 0.1,
      lng: 88.3639 + (Math.random() - 0.5) * 0.1,
    };
    setTurfs((prev) => [newTurf, ...prev]);
    return newTurf;
  };

  const removeTurf = (id) => {
    setTurfs((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTurf = (id, updates) => {
    setTurfs((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  return (
    <TurfContext.Provider value={{ turfs, addTurf, removeTurf, updateTurf }}>
      {children}
    </TurfContext.Provider>
  );
}

export function useTurf() {
  const ctx = useContext(TurfContext);
  if (!ctx) throw new Error("useTurf must be used inside <TurfProvider>");
  return ctx;
}
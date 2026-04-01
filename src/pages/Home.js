import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/Sidebar";
import TurfList from "../components/TurfList";
import MapContainer from "../components/MapContainer";
import { useTurf } from "../context/TurfContext";

export default function Home() {
  const { turfs: allTurfs } = useTurf();
  const [filteredTurfs, setFilteredTurfs]   = useState([]);
  const [activeTurfId, setActiveTurfId]     = useState(null);
  const [searchQuery, setSearchQuery]       = useState("");
  const [filters, setFilters]               = useState({ sports: [], maxPrice: null, onlyAvailable: false });

  useEffect(() => {
    setFilteredTurfs(allTurfs);
  }, [allTurfs]);

  useEffect(() => {
    let result = allTurfs;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.location.toLowerCase().includes(q) ||
          t.sports.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (filters.sports.length > 0) {
      result = result.filter((t) =>
        filters.sports.some((s) => t.sports.includes(s))
      );
    }

    if (filters.maxPrice) {
      const { max } = filters.maxPrice;
      const min = max === 700 ? 0 : max === 1000 ? 700 : 1000;
      result = result.filter((t) => t.pricePerHour >= min && t.pricePerHour < max);
    }

    if (filters.onlyAvailable) {
      result = result.filter((t) => t.available);
    }

    setFilteredTurfs(result);
  }, [searchQuery, filters, allTurfs]);

  return (
    <div className="flex h-[calc(100vh-64px)] mt-16 overflow-hidden">
      <aside className="w-full md:w-[38%] flex flex-col border-r border-gray-100 bg-white overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <SearchBar onSearch={setSearchQuery} />
        </div>
        <Sidebar onFilterChange={setFilters} />
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <TurfList
            turfs={filteredTurfs}
            activeTurfId={activeTurfId}
            onTurfClick={(turf) => setActiveTurfId(turf.id === activeTurfId ? null : turf.id)}
            loading={false}
          />
        </div>
      </aside>
      <main className="hidden md:block flex-1 relative">
        <MapContainer
          turfs={filteredTurfs}
          activeTurfId={activeTurfId}
          onMarkerClick={(turf) => setActiveTurfId(turf.id === activeTurfId ? null : turf.id)}
        />
      </main>
    </div>
  );
}
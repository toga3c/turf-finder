import React, { useCallback, useRef, useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";

const MAP_CONTAINER_STYLE = { width: "100%", height: "100%" };
const DEFAULT_CENTER = { lat: 22.5726, lng: 88.3639 }; // Kolkata fallback

const MAP_OPTIONS = {
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: true,
  styles: [
    { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
  ],
};

export default function MapContainer({ turfs = [], activeTurfId, onMarkerClick }) {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "";
  const mapRef = useRef(null);
  const [selectedTurf, setSelectedTurf] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState("");
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);

  // ── Get user's current location on mount ──────────────────────────────────
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const location = { lat: latitude, lng: longitude };
        setUserLocation(location);
        setMapCenter(location);
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError("Location access denied. Showing Kolkata.");
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError("Location unavailable. Showing Kolkata.");
            break;
          case error.TIMEOUT:
            setLocationError("Location request timed out. Showing Kolkata.");
            break;
          default:
            setLocationError("Could not get location. Showing Kolkata.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    id: "google-map-script",
  });

  const onLoad = useCallback((map) => { mapRef.current = map; }, []);
  const onUnmount = useCallback(() => { mapRef.current = null; }, []);

  const handleMarkerClick = (turf) => {
    setSelectedTurf(turf);
    onMarkerClick && onMarkerClick(turf);
  };

  const handleInfoWindowClose = () => setSelectedTurf(null);

  // ── Re-center map to user location ────────────────────────────────────────
  const handleRecenter = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.panTo(userLocation);
      mapRef.current.setZoom(14);
    }
  };

  // ── No API key placeholder ─────────────────────────────────────────────────
  if (!apiKey) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-turf-light to-green-100 gap-4">
        <span className="text-6xl">🗺️</span>
        <div className="text-center">
          <p className="font-display font-bold text-turf-dark text-lg">Google Maps Preview</p>
          <p className="text-sm text-gray-600 mt-1 max-w-xs">Add your API key to .env file:</p>
          <code className="block mt-2 text-xs bg-white/70 px-3 py-2 rounded-lg text-gray-700">
            REACT_APP_GOOGLE_MAPS_API_KEY=your_key
          </code>
        </div>
        <div className="flex flex-wrap gap-2 justify-center max-w-sm">
          {turfs.map((t) => (
            <div
              key={t.id}
              onClick={() => onMarkerClick && onMarkerClick(t)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer border transition-all
                ${t.id === activeTurfId
                  ? "bg-turf-green text-white border-turf-green scale-105"
                  : "bg-white text-turf-dark border-turf-green hover:bg-turf-light"
                }`}
            >
              📍 {t.name}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 gap-3">
        <span className="text-4xl">🗺️</span>
        <p className="font-display font-semibold text-gray-700">Map failed to load</p>
        <p className="text-sm text-gray-400">Check your API key in .env</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-turf-green border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Loading map…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <GoogleMap
        mapContainerStyle={MAP_CONTAINER_STYLE}
        center={mapCenter}
        zoom={13}
        options={MAP_OPTIONS}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Turf markers */}
        {turfs.map((turf) => (
          <Marker
            key={turf.id}
            position={{ lat: turf.lat, lng: turf.lng }}
            title={turf.name}
            onClick={() => handleMarkerClick(turf)}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: turf.id === activeTurfId ? 12 : 9,
              fillColor: turf.id === activeTurfId ? "#16a34a" : "#22c55e",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 2,
            }}
          />
        ))}

        {/* User's current location marker */}
        {userLocation && (
          <Marker
            position={userLocation}
            title="You are here"
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: "#3b82f6",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 3,
            }}
          />
        )}

        {/* Info window for selected turf */}
        {selectedTurf && (
          <InfoWindow
            position={{ lat: selectedTurf.lat, lng: selectedTurf.lng }}
            onCloseClick={handleInfoWindowClose}
          >
            <div className="text-sm p-1">
              <p className="font-semibold text-gray-800">{selectedTurf.name}</p>
              <p className="text-gray-500 text-xs mt-0.5">{selectedTurf.location}</p>
              <p className="text-green-600 font-bold mt-1">₹{selectedTurf.pricePerHour}/hr</p>
              <p className="text-xs text-gray-400 mt-0.5">⭐ {selectedTurf.rating} ({selectedTurf.reviews} reviews)</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Recenter button */}
      {userLocation && (
        <button
          onClick={handleRecenter}
          title="Go to my location"
          className="absolute bottom-6 right-4 z-10 bg-white shadow-md rounded-full w-11 h-11
                     flex items-center justify-center text-xl hover:bg-turf-light
                     border border-gray-200 transition-all hover:scale-105"
        >
          📍
        </button>
      )}

      {/* Location error toast */}
      {locationError && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-white border border-yellow-200
                        text-yellow-700 text-xs px-4 py-2 rounded-full shadow-md whitespace-nowrap">
          ⚠️ {locationError}
        </div>
      )}
    </div>
  );
}
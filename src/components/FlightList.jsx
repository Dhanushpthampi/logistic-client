import React, { useState, useMemo, useEffect } from "react";
import { Plane, Users, ArrowRight } from 'lucide-react';
import FlightTable from './FlightTable';
import FlightModal from './FlightModal';
import LoadingState from './LoadingState';
import EmptyState from './EmptyState';

export default function FlightList({ flights = [], title = "Flights", isLoading = false }) {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [initialMode, setInitialMode] = useState("upcoming");

  const now = new Date();

  // Detect initial mode on mount
  useEffect(() => {
    if (!flights || flights.length === 0) return;
    
    const hasUpcoming = flights.some((flight) => {
      const scheduledTime = flight.arrival?.scheduled || flight.departure?.scheduled;
      if (!scheduledTime) return false;
      const flightTime = new Date(scheduledTime);
      const diffInMinutes = (flightTime - now) / (1000 * 60);
      return diffInMinutes >= 0 && diffInMinutes <= 60;
    });

    if (!hasUpcoming) {
      setInitialMode("recent");
    }
  }, [flights, now]);

  const filteredFlights = useMemo(() => {
    if (!flights || flights.length === 0) return [];
    if (showAll) return flights;

    const nowTime = now.getTime();
    const eightHours = 8 * 60 * 60 * 1000;

    const validFlights = flights
      .map((flight) => {
        const scheduledTime = flight.arrival?.scheduled || flight.departure?.scheduled;
        if (!scheduledTime || !flight.flight?.iata || !flight.airline?.name ||
            !(flight.departure?.airport || flight.estDepartureAirport) ||
            !(flight.arrival?.airport || flight.estArrivalAirport)) {
          return null;
        }
        return { ...flight, flightTime: new Date(scheduledTime).getTime() };
      })
      .filter(Boolean);

    const nearestFlights = validFlights
      .map((f) => ({
        ...f,
        diff: Math.abs(f.flightTime - nowTime),
      }))
      .sort((a, b) => a.diff - b.diff);

    const closeFlights = nearestFlights.filter((f) => f.diff <= eightHours);
    return closeFlights.slice(0, 5);
  }, [flights, now, showAll]);

  // Show loading state
  if (isLoading) {
    return <LoadingState />;
  }

  // Show empty state
  if (!flights || flights.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-8">
      {/* Flight Table */}
      <FlightTable 
        flights={filteredFlights}
        onSelectFlight={setSelectedFlight}
      />

      {/* Show All Button */}
      {flights.length > filteredFlights.length && (
        <div className="text-center">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Users size={18} />
            {showAll ? `Show Recent Only` : `Show All ${title} (${flights.length})`}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      )}

      {/* Flight Modal */}
      {selectedFlight && (
        <FlightModal 
          flight={selectedFlight}
          onClose={() => setSelectedFlight(null)}
        />
      )}
    </div>
  );
}
import React, { useState } from "react";
import {
  AiOutlineLoading3Quarters,
  AiOutlineClockCircle,
} from "react-icons/ai";
import {
  FaPlaneArrival,
  FaPlaneDeparture,
  FaRegSadTear,
} from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import FlightList from "../components/FlightList";
import useFlights from "../hooks/useFlights";

const airports = [
  { code: "BLR", name: "Bangalore" },
  { code: "DEL", name: "Delhi" },
  { code: "MUM", name: "Mumbai" },
  { code: "HYD", name: "Hyderabad" },
  { code: "PNQ", name: "Pune" },
  { code: "CCU", name: "Kolkata" },
];

export default function Home() {
  const [selectedAirport, setSelectedAirport] = useState("BLR");

  //  Use custom hook
  const { arrivals, departures, loading, error } = useFlights(selectedAirport);

  const LoadingSpinner = () => (
    <div className="w-full py-16">
      <div className="flex flex-col items-center justify-center gap-3">
        <AiOutlineLoading3Quarters className="animate-spin text-4xl text-blue-500" />
        <p className="text-gray-500 flex items-center gap-2 text-sm">
          <AiOutlineClockCircle /> Fetching latest flights...
        </p>
      </div>
    </div>
  );

  const EmptyState = ({ message }) => (
    <div className="w-full py-16">
      <div className="flex flex-col items-center justify-center text-gray-500">
        <FaRegSadTear className="text-4xl mb-2" />
        <p>{message}</p>
      </div>
    </div>
  );

  const ErrorState = ({ error }) => (
    <div className="w-full py-16">
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-2 bg-red-50 p-4 rounded-lg border border-red-200 text-red-700 max-w-lg">
          <MdErrorOutline className="text-lg flex-shrink-0" />
          <div>
            <span className="font-medium">Error:</span> {error}
          </div>
        </div>
      </div>
    </div>
  );

  const SectionCard = ({ title, icon, color, flights }) => (
    <section className="bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-xl p-4 mb-8 border border-gray-100 transition hover:shadow-2xl w-full">
      {/* Header - Always visible */}
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-full bg-${color}-100`}>{icon}</div>
        <h2 className="text-2xl font-bold text-gray-800">
          {title}{" "}
          <span className={`text-${color}-600`}>{selectedAirport}</span>
        </h2>
      </div>

      {/* Content Container - Full width, consistent layout */}
      <div className="w-full">
        {loading && <LoadingSpinner />}
        
        {error && !loading && <ErrorState error={error} />}

        {!loading && !error && flights.length === 0 && (
          <EmptyState
            message={`No ${title.toLowerCase()} found for this airport.`}
          />
        )}

        {!loading && !error && flights.length > 0 && (
          <FlightList title={title} flights={flights} />
        )}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen w-full py-6">
      {/* App Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-blue-700 flex items-center justify-center gap-3">
          ✈ Flight Tracker
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Real-time flight updates from major Indian airports 🚀
        </p>
      </div>

      {/* Airport Selector */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center gap-3 bg-white rounded-xl shadow-md px-5 py-3 border border-gray-100 hover:shadow-lg transition">
          <label
            htmlFor="airport-select"
            className="text-base font-medium text-gray-700"
          >
            Select Airport:
          </label>
          <select
            id="airport-select"
            value={selectedAirport}
            onChange={(e) => setSelectedAirport(e.target.value)}
            className="border border-gray-300 rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {airports.map((airport) => (
              <option key={airport.code} value={airport.code}>
                {airport.name} ({airport.code})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Full Width Container for Flight Sections */}
      <div className="w-full max-w-none">
        {/* Arrivals Section */}
        <SectionCard
          title="Arrivals at"
          icon={<FaPlaneArrival className="text-green-600 text-xl" />}
          color="green"
          flights={arrivals}
        />

        {/* Departures Section */}
        <SectionCard
          title="Departures from"
          icon={<FaPlaneDeparture className="text-orange-600 text-xl" />}
          color="orange"
          flights={departures}
        />
      </div>
    </div>
  );
}
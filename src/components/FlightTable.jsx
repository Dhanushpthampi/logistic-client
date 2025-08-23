import React, { useState } from 'react';
import { Plane, MapPin, Clock, Calendar, Users, Zap, ArrowRight } from 'lucide-react';

export default function FlightTable({ flights, onSelectFlight }) {
  const [hoveredRow, setHoveredRow] = useState(null);

  // status info mapping
  const statusInfo = {
    scheduled: "Flight is confirmed and ready for boarding - departure imminent",
    active: "Flight is currently airborne - tracking in real-time",
    landed: "Flight has successfully completed journey - passengers disembarked",
    cancelled: "Flight was cancelled - please contact airline for rebooking",
  };

  // status configuration with more modern styling
  const getStatusConfig = (status) => {
    const configs = {
      active: { 
        bg: 'bg-gradient-to-r from-emerald-500 to-green-500',
        text: 'text-white',
        border: 'border-emerald-300',
        dot: 'bg-white',
        glow: 'shadow-emerald-500/25'
      },
      cancelled: { 
        bg: 'bg-gradient-to-r from-red-500 to-rose-500',
        text: 'text-white',
        border: 'border-red-300',
        dot: 'bg-white',
        glow: 'shadow-red-500/25'
      },
      landed: { 
        bg: 'bg-gradient-to-r from-blue-500 to-indigo-600',
        text: 'text-white',
        border: 'border-blue-300',
        dot: 'bg-white',
        glow: 'shadow-blue-500/25'
      },
      scheduled: { 
        bg: 'bg-gradient-to-r from-amber-500 to-orange-500',
        text: 'text-white',
        border: 'border-amber-300',
        dot: 'bg-white',
        glow: 'shadow-amber-500/25'
      }
    };
    return configs[status?.toLowerCase()] || { 
      bg: 'bg-gradient-to-r from-gray-500 to-slate-500',
      text: 'text-white',
      border: 'border-gray-300',
      dot: 'bg-white',
      glow: 'shadow-gray-500/25'
    };
  };

  return (
    <div className="relative overflow-hidden shadow-2xl rounded-3xl bg-white border border-gray-200 min-h-[400px]">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/30 to-transparent rounded-full -translate-y-32 translate-x-32" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-100/30 to-transparent rounded-full translate-y-24 -translate-x-24" />
      
      <div className="relative overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white relative">
            <tr>
              {["Flight", "Airline", "From", "To", "Date", "Time", "Status"].map((header, idx) => (
                <th key={header} className="px-6 py-5 text-left font-bold tracking-wider text-sm uppercase relative">
                  <div className="flex items-center gap-2">
                    {header === "Flight" && <Plane size={16} />}
                    {header === "From" && <MapPin size={16} />}
                    {header === "To" && <MapPin size={16} />}
                    {header === "Date" && <Calendar size={16} />}
                    {header === "Time" && <Clock size={16} />}
                    {header === "Status" && <Zap size={16} />}
                    {header}
                  </div>
                  {idx < 6 && <div className="absolute right-0 top-1/2 w-px h-6 bg-white/20 -translate-y-1/2" />}
                </th>
              ))}
            </tr>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </thead>
          <tbody className="relative">
            {flights.map((flight, index) => {
              const scheduledTime = flight.arrival?.scheduled || flight.departure?.scheduled;
              const dateObj = scheduledTime ? new Date(scheduledTime) : null;
              const statusConfig = getStatusConfig(flight.flight_status);

              return (
                <tr
                  key={index}
                  onClick={() => onSelectFlight(flight)}
                  onMouseEnter={() => setHoveredRow(index)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`cursor-pointer border-b border-gray-100 text-sm transition-all duration-300 relative group ${
                    hoveredRow === index 
                      ? 'bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 shadow-lg transform scale-[1.01]' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <td className="px-6 py-5 relative">
                    <div className="font-bold text-gray-900 text-base flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                      {flight.flight?.iata || "NA"}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="font-semibold text-gray-800">{flight.airline?.name || "NA"}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 font-medium text-gray-700">
                      <MapPin size={14} className="text-blue-500" />
                      {flight.departure?.airport || flight.estDepartureAirport || "NA"}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 font-medium text-gray-700">
                      <ArrowRight size={14} className="text-indigo-500" />
                      {flight.arrival?.airport || flight.estArrivalAirport || "NA"}
                    </div>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div className="font-medium text-gray-800">
                      {dateObj ? dateObj.toLocaleDateString("en-US", {
                        year: "numeric", month: "short", day: "numeric",
                      }) : "NA"}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="font-semibold text-gray-900">
                      {dateObj ? dateObj.toLocaleTimeString("en-US", {
                        hour: "numeric", minute: "2-digit", hour12: true,
                      }) : "NA"}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs capitalize tracking-wider shadow-lg transition-all duration-300 hover:scale-105 ${statusConfig.bg} ${statusConfig.text} ${statusConfig.glow}`}
                      title={statusInfo[flight.flight_status?.toLowerCase()] || "Status info not available"}
                    >
                      <div className={`w-2 h-2 rounded-full ${statusConfig.dot} animate-pulse`} />
                      {flight.flight_status || "Unknown"}
                    </span>
                  </td>
                  {hoveredRow === index && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 pointer-events-none" />
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
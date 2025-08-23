import React from 'react';
import { X, Plane, MapPin, Building, DoorOpen, Zap } from 'lucide-react';

export default function FlightModal({ flight, onClose }) {
  // Status info
  const statusInfo = {
    scheduled: "Flight is confirmed and ready for boarding - departure imminent",
    active: "Flight is currently airborne - tracking in real-time",
    landed: "Flight has successfully completed journey - passengers disembarked",
    cancelled: "Flight was cancelled - please contact airline for rebooking",
  };

  // Status style config
  const getStatusConfig = (status) => {
    const configs = {
      active: { bg: 'bg-gradient-to-r from-emerald-500 to-green-500', text: 'text-white', border: 'border-emerald-300', dot: 'bg-white' },
      cancelled: { bg: 'bg-gradient-to-r from-red-500 to-rose-500', text: 'text-white', border: 'border-red-300', dot: 'bg-white' },
      landed: { bg: 'bg-gradient-to-r from-blue-500 to-indigo-600', text: 'text-white', border: 'border-blue-300', dot: 'bg-white' },
      scheduled: { bg: 'bg-gradient-to-r from-amber-500 to-orange-500', text: 'text-white', border: 'border-amber-300', dot: 'bg-white' },
    };
    return configs[status?.toLowerCase()] || { bg: 'bg-gradient-to-r from-gray-500 to-slate-500', text: 'text-white', border: 'border-gray-300', dot: 'bg-white' };
  };

  // Detail component
  const Detail = ({ icon: Icon, label, children, highlight = false }) => (
    <div className={`group relative overflow-hidden rounded-2xl transition-all duration-500 ${
      highlight 
        ? 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 shadow' 
        : 'bg-white border border-gray-100 shadow-sm'
    } p-4 sm:p-5`}>
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 p-2 rounded-lg ${
          highlight 
            ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white' 
            : 'bg-gray-100 text-gray-600 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-indigo-600 group-hover:text-white'
        }`}>
          <Icon size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">{label}</p>
          <div className="text-gray-900 font-semibold text-sm sm:text-base break-words">
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  const formatDateTime = (dateString) => {
    if (!dateString || dateString === "NA") return { date: "NA", time: "NA" };
    try {
      const date = new Date(dateString);
      return {
        date: date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        time: date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
      };
    } catch {
      return { date: "NA", time: "NA" };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative transform overflow-hidden rounded-2xl bg-white shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-blue-800 px-6 py-6 sm:px-8 sm:py-8 text-white flex-shrink-0">
          {/* Close */}
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
          >
            <X size={20} className="text-white" />
          </button>

          {/* Flight header */}
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/15 rounded-xl">
              <Plane size={32} className="text-white" />
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-black">{flight.flight?.iata || "NA"}</h2>
              <p className="text-blue-100 text-left text-sm sm:text-base font-medium">
                {flight.airline?.name || "Unknown Airline"}
              </p>
            </div>
          </div>

          {/* Status */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs sm:text-sm font-bold uppercase tracking-wide ${getStatusConfig(flight.flight_status).bg} ${getStatusConfig(flight.flight_status).text} ${getStatusConfig(flight.flight_status).border}`}
          >
            <div className={`w-2 h-2 rounded-full ${getStatusConfig(flight.flight_status).dot} animate-ping`} />
            <span>{flight.flight_status || "Information Pending"}</span>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 sm:px-8 sm:py-8 bg-gradient-to-br from-gray-50 to-blue-50/30 overflow-y-auto flex-1 text-sm">
          {/* Route */}
          <div className="mb-6 p-4 bg-white rounded-xl shadow border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="text-center flex-1">
                <div className="text-lg sm:text-xl font-bold text-gray-900">
                  {formatDateTime(flight.departure?.scheduled).time}
                </div>
                <div className="text-xs text-gray-600 font-medium">
                  {formatDateTime(flight.departure?.scheduled).date}
                </div>
                <div className="text-xs font-semibold text-blue-600 mt-1 uppercase">
                  Departure
                </div>
              </div>
              <div className="mx-4">
                <Plane size={18} className="text-blue-600" />
              </div>
              <div className="text-center flex-1">
                <div className="text-lg sm:text-xl font-bold text-gray-900">
                  {formatDateTime(flight.arrival?.scheduled).time}
                </div>
                <div className="text-xs text-gray-600 font-medium">
                  {formatDateTime(flight.arrival?.scheduled).date}
                </div>
                <div className="text-xs font-semibold text-indigo-600 mt-1 uppercase">
                  Arrival
                </div>
              </div>
            </div>
          </div>

          {/* Flight details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <Detail icon={MapPin} label="From">
              {flight.departure?.airport || "NA"}
            </Detail>

            <Detail icon={MapPin} label="To">
              {flight.arrival?.airport || "NA"}
            </Detail>

            <Detail icon={Building} label="Terminal">
              {flight.departure?.terminal || "NA"}
            </Detail>

            <Detail icon={DoorOpen} label="Gate">
              {flight.departure?.gate || "NA"}
            </Detail>

            <Detail icon={Zap} label="Flight Duration" highlight>
              {flight.flight_time || "NA"}
            </Detail>

            <Detail icon={Zap} label="Delay">
              {flight.arrival?.delay ? `${flight.arrival.delay} mins` : "No Delay"}
            </Detail>
          </div>
        </div>
      </div>
    </div>
  );
}
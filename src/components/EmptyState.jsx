import React from 'react';
import { Plane, Search, Calendar, MapPin, RefreshCw } from 'lucide-react';

const EmptyState = ({ 
  type = 'flights',
  title,
  message,
  actionText,
  onAction,
  icon: CustomIcon,
  className = '' 
}) => {
  // Default configurations for different empty states
  const configs = {
    flights: {
      icon: Plane,
      title: 'No flights found',
      message: 'There are no flights available for the selected criteria. Try adjusting your search parameters or check back later.',
      actionText: 'Refresh Flights',
      iconAnimation: 'animate-pulse'
    },
    search: {
      icon: Search,
      title: 'No search results',
      message: 'We couldn\'t find any flights matching your search criteria. Try different dates, destinations, or airlines.',
      actionText: 'Clear Filters',
      iconAnimation: 'animate-bounce'
    },
    upcoming: {
      icon: Calendar,
      title: 'No upcoming flights',
      message: 'You don\'t have any flights scheduled in the near future. Your next adventure awaits!',
      actionText: 'View All Flights',
      iconAnimation: 'animate-pulse'
    },
    recent: {
      icon: MapPin,
      title: 'No recent flights',
      message: 'No recent flight activity found. When you have flights, they\'ll appear here.',
      actionText: 'Check Upcoming',
      iconAnimation: 'animate-bounce'
    },
    error: {
      icon: RefreshCw,
      title: 'Unable to load flights',
      message: 'We\'re having trouble loading your flight information. Please check your connection and try again.',
      actionText: 'Try Again',
      iconAnimation: 'animate-spin'
    }
  };

  const config = configs[type] || configs.flights;
  const IconComponent = CustomIcon || config.icon;
  const displayTitle = title || config.title;
  const displayMessage = message || config.message;
  const displayActionText = actionText || config.actionText;

  return (
    <div className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}>
      {/* Icon */}
      <div className="mb-6">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full mb-4">
          <IconComponent 
            size={40} 
            className={`text-blue-400 ${config.iconAnimation}`}
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">
          {displayTitle}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {displayMessage}
        </p>
      </div>

      {/* Action Button */}
      {onAction && displayActionText && (
        <div className="mt-8">
          <button
            onClick={onAction}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transform hover:scale-105"
          >
            <span>{displayActionText}</span>
            {type === 'error' ? (
              <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-300" />
            ) : (
              <div className="w-2 h-2 bg-white rounded-full group-hover:animate-ping"></div>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

// Specific empty state variants for common use cases
export const NoFlightsFound = ({ onRefresh }) => (
  <EmptyState
    type="flights"
    onAction={onRefresh}
  />
);

export const NoSearchResults = ({ onClearFilters }) => (
  <EmptyState
    type="search"
    onAction={onClearFilters}
  />
);

export const NoUpcomingFlights = ({ onViewAll }) => (
  <EmptyState
    type="upcoming"
    onAction={onViewAll}
  />
);

export const NoRecentFlights = ({ onCheckUpcoming }) => (
  <EmptyState
    type="recent"
    onAction={onCheckUpcoming}
  />
);

export const FlightLoadError = ({ onRetry }) => (
  <EmptyState
    type="error"
    onAction={onRetry}
  />
);

// Table empty state for when flight table is empty
export const EmptyFlightTable = ({ message = "No flights to display", onAction, actionText }) => (
  <div className="text-center py-12 px-6">
    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
      <Plane size={32} className="text-gray-400" />
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">No flights available</h3>
    <p className="text-gray-600 mb-6 max-w-sm mx-auto">{message}</p>
    {onAction && actionText && (
      <button
        onClick={onAction}
        className="inline-flex items-center gap-2 px-4 py-2 text-blue-600 font-medium hover:text-blue-700 transition-colors"
      >
        <RefreshCw size={16} />
        {actionText}
      </button>
    )}
  </div>
);

export default EmptyState;
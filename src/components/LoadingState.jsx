import React from 'react';
import { Plane } from 'lucide-react';

const LoadingState = ({ 
  message = 'Loading flights...', 
  variant = 'flight',
  className = '' 
}) => {
  const FlightLoader = () => (
    <div className="relative">
      {/* Animated plane */}
      <div className="relative w-16 h-16 mx-auto mb-4">
        <Plane 
          size={32} 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-600 animate-bounce" 
        />
        {/* Circular path animation */}
        <div className="absolute inset-0 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    </div>
  );

  const SpinnerLoader = () => (
    <div className="w-8 h-8 mx-auto mb-4">
      <div className="animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 h-8 w-8"></div>
    </div>
  );

  const DotsLoader = () => (
    <div className="flex justify-center space-x-2 mb-4">
      <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
      <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
      <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
    </div>
  );

  const PulseLoader = () => (
    <div className="w-12 h-12 mx-auto mb-4">
      <div className="w-full h-full bg-blue-600 rounded-full animate-pulse"></div>
    </div>
  );

  const renderLoader = () => {
    switch (variant) {
      case 'spinner':
        return <SpinnerLoader />;
      case 'dots':
        return <DotsLoader />;
      case 'pulse':
        return <PulseLoader />;
      case 'flight':
      default:
        return <FlightLoader />;
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
      {renderLoader()}
      {message && (
        <p className="text-gray-600 text-base font-medium text-center animate-pulse max-w-sm">
          {message}
        </p>
      )}
    </div>
  );
};

// Table skeleton loader for flight data
export const FlightTableSkeleton = ({ rows = 5 }) => {
  return (
    <div className="space-y-4">
      {/* Header skeleton */}
      <div className="grid grid-cols-6 gap-4 p-4 border-b">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-4 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
      
      {/* Row skeletons */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-6 gap-4 p-4 border-b border-gray-100">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 bg-gray-100 rounded animate-pulse w-2/3"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 bg-gray-100 rounded animate-pulse w-3/4"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 bg-gray-100 rounded animate-pulse w-1/2"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 bg-gray-100 rounded animate-pulse w-3/4"></div>
          </div>
          <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
        </div>
      ))}
    </div>
  );
};

// Loading overlay for modals
export const LoadingOverlay = ({ 
  isVisible = false, 
  message = 'Loading flight details...',
  variant = 'flight'
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm mx-4">
        <LoadingState message={message} variant={variant} />
      </div>
    </div>
  );
};

// Inline loading for buttons
export const LoadingButton = ({ 
  children, 
  isLoading = false, 
  disabled = false,
  onClick,
  className = '',
  loadingText = 'Loading...'
}) => {
  const baseClasses = "group relative inline-flex items-center gap-3 px-8 py-4 font-semibold rounded-2xl transition-all duration-300 transform";
  const enabledClasses = "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105";
  const disabledClasses = "bg-gray-400 text-gray-200 cursor-not-allowed";

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${disabled || isLoading ? disabledClasses : enabledClasses} ${className}`}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <span className={isLoading ? 'invisible' : 'visible'}>
        {isLoading ? loadingText : children}
      </span>
    </button>
  );
};

export default LoadingState;
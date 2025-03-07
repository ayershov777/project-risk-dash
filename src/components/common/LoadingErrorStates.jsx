import React from 'react';

/**
 * Loading state component
 */
export const LoadingState = ({ message = 'Loading...' }) => (
    <div className="text-center py-10">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
        <p>{message}</p>
    </div>
);

/**
 * Error state component
 */
export const ErrorState = ({ message = 'An error occurred.' }) => (
    <div className="text-center py-10 text-red-500">{message}</div>
);

/**
 * Empty state component
 */
export const EmptyState = ({ message = 'No data available.', icon }) => (
    <div className="text-center py-10 bg-gray-50 rounded-lg">
        {icon && <div className="mb-2 text-2xl">{icon}</div>}
        <p className="text-gray-600">{message}</p>
    </div>
);

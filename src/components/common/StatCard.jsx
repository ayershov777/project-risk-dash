import React from 'react';

/**
 * Reusable component for displaying a statistic card
 */
const StatCard = ({ title, value, valueColor = 'text-gray-900', icon, footer }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <div className="flex items-center">
                {icon && <div className="mr-3">{icon}</div>}
                <p className={`text-3xl font-bold ${valueColor}`}>{value}</p>
            </div>
            {footer && <div className="mt-2 text-sm text-gray-500">{footer}</div>}
        </div>
    );
};

export default StatCard;

import React from 'react';

/**
 * InfoItem component for displaying a label and value
 */
export const InfoItem = ({ label, value, valueClassName = 'font-medium' }) => (
    <div className="bg-gray-50 p-3 rounded">
        <span className="block text-gray-500 text-sm">{label}</span>
        <span className={valueClassName}>{value}</span>
    </div>
);

/**
 * Reusable grid component for displaying info cards
 */
const InfoGrid = ({
    items,
    gridClassName = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'
}) => {
    return (
        <div className={`grid ${gridClassName}`}>
            {items.map((item, index) => (
                <InfoItem
                    key={index}
                    label={item.label}
                    value={item.value}
                    valueClassName={item.valueClassName}
                />
            ))}
        </div>
    );
};

export default InfoGrid;

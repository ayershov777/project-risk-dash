import React from 'react';
import { EmptyState } from './LoadingErrorStates';

/**
 * Reusable grid component for displaying cards
 */
const CardGrid = ({
    items,
    renderItem,
    emptyMessage = 'No items found.',
    gridClassName = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
    header,
    footer
}) => {
    if (!items || items.length === 0) {
        return <EmptyState message={emptyMessage} />;
    }

    return (
        <div className="bg-white rounded-lg shadow">
            {header && (
                <div className="p-4 bg-gray-50 border-b">
                    {header}
                </div>
            )}
            <div className="p-4">
                <div className={`grid ${gridClassName}`}>
                    {items.map((item, index) => renderItem(item, index))}
                </div>
                {footer && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardGrid;

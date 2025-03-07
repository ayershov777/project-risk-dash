import React from 'react';

/**
 * Reusable tab navigation component
 * @param {Object} props Component props
 * @param {Array<{id: string, label: string}>} props.tabs - Array of tab objects with id and label
 * @param {string} props.activeTab - Current active tab ID
 * @param {Function} props.onTabChange - Tab change handler function
 */
const TabNavigation = ({ tabs, activeTab, onTabChange }) => {
    return (
        <div className="mb-6">
            <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`mr-2 py-2 px-4 text-sm font-medium ${activeTab === tab.id
                                    ? 'border-b-2 border-blue-500 text-blue-600'
                                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default TabNavigation;

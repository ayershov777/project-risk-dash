import React from 'react';

/**
 * Reusable search and filter bar component
 */
const SearchFilterBar = ({
    title,
    searchTerm,
    onSearchChange,
    filterOptions,
    filterValue,
    onFilterChange,
    searchPlaceholder = 'Search',
    filterPlaceholder = 'All Types'
}) => {
    return (
        <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-4 bg-gray-50 border-b">
                <h2 className="text-lg font-semibold">{title}</h2>
            </div>
            <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="search" className="block mb-2 text-sm font-medium text-gray-700">Search</label>
                        <input
                            type="text"
                            id="search"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder={searchPlaceholder}
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                        />
                    </div>
                    {filterOptions && filterOptions.length > 0 && (
                        <div>
                            <label htmlFor="filter" className="block mb-2 text-sm font-medium text-gray-700">Filter</label>
                            <select
                                id="filter"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                value={filterValue}
                                onChange={(e) => onFilterChange(e.target.value)}
                            >
                                <option value="">{filterPlaceholder}</option>
                                {filterOptions.map(option => (
                                    <option key={option.value || option} value={option.value || option}>
                                        {option.label || option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchFilterBar;

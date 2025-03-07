import React from 'react';

const RiskDetails = ({
    results,
    categoryFilter,
    severityFilter,
    handleCategoryFilterChange,
    handleSeverityFilterChange
}) => {
    return (
        <div className="bg-white rounded-lg shadow">
            <div className="p-4 bg-gray-50 border-b">
                <h3 className="text-lg font-semibold">Risk Details</h3>
            </div>
            <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <h4 className="text-sm font-medium mb-2">Filter by Category</h4>
                        <div className="flex flex-wrap gap-2">
                            {results?.risks && [...new Set(results.risks.map(risk => risk.category))].map(category => (
                                <button
                                    key={category}
                                    onClick={() => handleCategoryFilterChange(category)}
                                    className={`px-3 py-1 rounded-full text-sm ${categoryFilter.includes(category)
                                            ? "bg-purple-600 text-white"
                                            : "bg-gray-200 text-gray-700 hover:bg-purple-600 hover:text-white"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium mb-2">Filter by Severity</h4>
                        <div className="flex flex-wrap gap-2">
                            {['HIGH', 'MEDIUM', 'LOW'].map(severity => (
                                <button
                                    key={severity}
                                    onClick={() => handleSeverityFilterChange(severity)}
                                    className={`px-3 py-1 rounded-full text-sm ${severityFilter.includes(severity)
                                            ? severity === 'HIGH'
                                                ? 'bg-red-600 text-white'
                                                : severity === 'MEDIUM'
                                                    ? 'bg-orange-500 text-white'
                                                    : 'bg-green-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:' + (
                                                severity === 'HIGH'
                                                    ? 'bg-red-600'
                                                    : severity === 'MEDIUM'
                                                        ? 'bg-orange-500'
                                                        : 'bg-green-600'
                                            ) + ' hover:text-white'
                                        }`}
                                >
                                    {severity}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    {results?.risks && results.risks.length > 0 ? (
                        results.risks
                            .filter(risk =>
                                (categoryFilter.length === 0 || categoryFilter.includes(risk.category)) &&
                                (severityFilter.length === 0 || severityFilter.includes(risk.severity))
                            )
                            .map((risk, index) => (
                                <div key={index} className="p-4 border rounded-lg">
                                    <div className="flex justify-between mb-2">
                                        <span className="font-medium">{risk.category}</span>
                                        <span className={`px-2 py-1 rounded text-xs text-white ${risk.severity === 'HIGH'
                                                ? 'bg-red-600'
                                                : risk.severity === 'MEDIUM'
                                                    ? 'bg-orange-500'
                                                    : 'bg-green-600'
                                            }`}>
                                            {risk.severity}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 mb-2">{risk.description}</p>
                                    <div className="text-sm text-gray-600">
                                        <span className="font-medium">Mitigation: </span>
                                        {risk.mitigation}
                                    </div>
                                </div>
                            ))
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            No risks found or matching the selected filters.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RiskDetails;

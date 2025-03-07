import React from 'react';
import RiskCategoryChart from './RiskCategoryChart';
import RiskSeverityChart from './RiskSeverityChart';

/**
 * Risk visualizations component that displays multiple charts
 */
const RiskCharts = ({ results }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Risks by Category</h3>
                <div style={{ height: '300px' }}>
                    {results?.risks ? (
                        <RiskCategoryChart risks={results.risks} />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            No risk data available
                        </div>
                    )}
                </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Risks by Severity</h3>
                <div style={{ height: '300px' }}>
                    {results?.risks ? (
                        <RiskSeverityChart risks={results.risks} />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            No risk data available
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RiskCharts;

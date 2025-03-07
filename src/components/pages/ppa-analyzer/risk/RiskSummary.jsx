import React from 'react';

const RiskSummary = ({ results }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-2xl font-bold">{results?.risks?.length || 0}</div>
                <div className="text-sm text-gray-500">Total Risks</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-2xl font-bold" style={{ color: '#cf6679' }}>
                    {results?.risks?.filter(r => r.severity === 'HIGH').length || 0}
                </div>
                <div className="text-sm text-gray-500">High Risks</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-2xl font-bold" style={{ color: '#fb8c00' }}>
                    {results?.risks?.filter(r => r.severity === 'MEDIUM').length || 0}
                </div>
                <div className="text-sm text-gray-500">Medium Risks</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-2xl font-bold" style={{ color: '#4caf50' }}>
                    {results?.risks?.filter(r => r.severity === 'LOW').length || 0}
                </div>
                <div className="text-sm text-gray-500">Low Risks</div>
            </div>
        </div>
    );
};

export default RiskSummary;

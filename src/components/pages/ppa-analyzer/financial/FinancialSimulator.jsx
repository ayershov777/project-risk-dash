import React from 'react';
import PriceEvolutionChart from './PriceEvolutionChart';
import RevenueChart from './RevenueChart';
import CumulativeChart from './CumulativeChart';
// import ProjectionChart from './charts/ProjectionChart';

const FinancialSimulator = ({ simulationParams, handleParamChange, projections }) => {
    const formatCurrency = (value) => {
        if (value >= 1e9) {
            return `$${(value / 1e9).toFixed(1)}B`;
        } else if (value >= 1e6) {
            return `$${(value / 1e6).toFixed(1)}M`;
        } else if (value >= 1e3) {
            return `$${(value / 1e3).toFixed(1)}K`;
        } else {
            return `$${value.toFixed(2)}`;
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Financial Impact Simulator</h3>
            <p className="text-gray-700 mb-4">Adjust parameters to simulate different scenarios</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Base Energy Price ($/MWh)
                        </label>
                        <input
                            type="number"
                            name="basePrice"
                            value={simulationParams.basePrice}
                            onChange={handleParamChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Annual Capacity (MW)
                        </label>
                        <input
                            type="number"
                            name="annualCapacity"
                            value={simulationParams.annualCapacity}
                            onChange={handleParamChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Capacity Factor (%)
                        </label>
                        <input
                            type="number"
                            name="capacityFactor"
                            value={simulationParams.capacityFactor}
                            onChange={handleParamChange}
                            min="1"
                            max="100"
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>

                <div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Contract Duration (Years)
                        </label>
                        <input
                            type="number"
                            name="contractYears"
                            value={simulationParams.contractYears}
                            onChange={handleParamChange}
                            min="1"
                            max="50"
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Annual Price Escalation (%)
                        </label>
                        <input
                            type="number"
                            name="escalationRate"
                            value={simulationParams.escalationRate}
                            onChange={handleParamChange}
                            step="0.1"
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Discount Rate (%)
                        </label>
                        <input
                            type="number"
                            name="discountRate"
                            value={simulationParams.discountRate}
                            onChange={handleParamChange}
                            step="0.1"
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Total Revenue</h4>
                    <p className="text-2xl font-bold text-purple-700">
                        {formatCurrency(projections.totalRevenue)}
                    </p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Net Present Value</h4>
                    <p className="text-2xl font-bold text-purple-700">
                        {formatCurrency(projections.netPresentValue)}
                    </p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Levelized Cost</h4>
                    <p className="text-2xl font-bold text-purple-700">
                        ${projections.levelizedCost.toFixed(2)}/MWh
                    </p>
                </div>
            </div>

            <div className="mb-6">
                <h4 className="text-lg font-medium mb-3">Price Evolution</h4>
                <div style={{ height: '300px' }} className="border rounded-lg p-4 bg-gray-50">
                    <PriceEvolutionChart projections={projections} />
                </div>
            </div>

            <div className="mb-6">
                <h4 className="text-lg font-medium mb-3">Annual Revenue and Present Value</h4>
                <div style={{ height: '300px' }} className="border rounded-lg p-4 bg-gray-50">
                    <RevenueChart projections={projections} />
                </div>
            </div>

            <div>
                <h4 className="text-lg font-medium mb-3">Cumulative Cash Flow</h4>
                <div style={{ height: '300px' }} className="border rounded-lg p-4 bg-gray-50">
                    <CumulativeChart projections={projections} />
                </div>
            </div>
        </div>
    );
};

export default FinancialSimulator;

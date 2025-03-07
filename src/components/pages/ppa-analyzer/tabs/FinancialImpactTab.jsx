import React from 'react';
import FinancialTerms from '../financial/FinancialTerms';
import FinancialSimulator from '../financial/FinancialSimulator';

const FinancialImpactTab = ({
    ppaDocument,
    financialTerms,
    simulationParams,
    handleParamChange
}) => {
    // Calculate financial projections
    const calculateProjections = () => {
        const { basePrice, annualCapacity, capacityFactor, contractYears, escalationRate, discountRate } = simulationParams;

        const annualHours = 8760;
        const annualGeneration = annualCapacity * (capacityFactor / 100) * annualHours;

        const years = Array.from({ length: contractYears }, (_, i) => i + 1);
        const prices = years.map(year => basePrice * Math.pow(1 + escalationRate / 100, year - 1));
        const revenues = prices.map(price => price * annualGeneration);
        const presentValues = revenues.map((revenue, index) => revenue / Math.pow(1 + discountRate / 100, years[index]));

        const totalRevenue = revenues.reduce((sum, value) => sum + value, 0);
        const netPresentValue = presentValues.reduce((sum, value) => sum + value, 0);
        const levelizedCost = netPresentValue / (annualGeneration * contractYears);

        return {
            years,
            prices,
            revenues,
            presentValues,
            totalRevenue,
            netPresentValue,
            levelizedCost,
            cumulativeRevenue: revenues.reduce((acc, val, i) => {
                const prev = i === 0 ? 0 : acc[i - 1];
                return [...acc, prev + val];
            }, []),
            cumulativeNPV: presentValues.reduce((acc, val, i) => {
                const prev = i === 0 ? 0 : acc[i - 1];
                return [...acc, prev + val];
            }, [])
        };
    };

    const projections = calculateProjections();

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Financial Impact</h2>
            {!ppaDocument ? (
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                    <p className="text-gray-600">
                        Financial impact assessment will be displayed here after processing the document.
                    </p>
                </div>
            ) : (
                <div>
                    {/* Financial Terms Section */}
                    <FinancialTerms financialTerms={financialTerms} />

                    {/* Financial Simulator */}
                    <FinancialSimulator
                        simulationParams={simulationParams}
                        handleParamChange={handleParamChange}
                        projections={projections}
                    />
                </div>
            )}
        </div>
    );
};

export default FinancialImpactTab;

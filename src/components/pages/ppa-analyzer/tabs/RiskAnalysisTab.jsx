import React, { useState } from 'react';
import RiskSummary from '../risk/RiskSummary';
import RiskCharts from '../risk/RiskCharts';
import RiskDetails from '../risk/RiskDetails';

const RiskAnalysisTab = ({ ppaDocument, results }) => {
    const [categoryFilter, setCategoryFilter] = useState([]);
    const [severityFilter, setSeverityFilter] = useState([]);
    
    const handleCategoryFilterChange = (category) => {
        setCategoryFilter(prevFilter => {
            if (prevFilter.includes(category)) {
                return prevFilter.filter(c => c !== category);
            } else {
                return [...prevFilter, category];
            }
        });
    };

    const handleSeverityFilterChange = (severity) => {
        setSeverityFilter(prevFilter => {
            if (prevFilter.includes(severity)) {
                return prevFilter.filter(s => s !== severity);
            } else {
                return [...prevFilter, severity];
            }
        });
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Risk Analysis</h2>
            {!ppaDocument ? (
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                    <p className="text-gray-600">
                        Risk analysis content will be displayed here after processing the document.
                    </p>
                </div>
            ) : (
                <div>
                    {/* Risk Summary Cards */}
                    <RiskSummary results={results} />
                    
                    {/* Risk Charts */}
                    <RiskCharts results={results} />
                    
                    {/* Risk Details */}
                    <RiskDetails 
                        results={results} 
                        categoryFilter={categoryFilter}
                        severityFilter={severityFilter}
                        handleCategoryFilterChange={handleCategoryFilterChange}
                        handleSeverityFilterChange={handleSeverityFilterChange}
                    />
                </div>
            )}
        </div>
    );
};

export default RiskAnalysisTab;
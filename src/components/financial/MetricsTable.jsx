import React from 'react';
import RiskIndicator, { getRiskLevel } from '../common/RiskIndicator';

// Industry benchmarks configuration - could be moved to a separate file
const INDUSTRY_BENCHMARKS = {
    'Developers': {
        debt_to_equity: 2.0,
        current_ratio: 1.5,
        interest_coverage: 2.5,
        return_on_equity: 18.0,
        dividend_yield: 3.5
    },
    'OEM': {
        debt_to_equity: 1.5,
        current_ratio: 1.7,
        interest_coverage: 3.0,
        return_on_equity: 15.0,
        dividend_yield: 2.0
    },
    'O&M': {
        debt_to_equity: 1.0,
        current_ratio: 2.0,
        interest_coverage: 4.0,
        return_on_equity: 15.0,
        dividend_yield: 2.5
    },
    // Additional industry types...
};

// Metric definitions
const METRIC_DEFINITIONS = {
    debt_to_equity: {
        label: 'Debt to Equity',
        description: 'Shows how much debt a company is using to finance its assets relative to its shareholder equity',
        format: (value) => value.toFixed(2),
        compareMode: 'lower-better'
    },
    current_ratio: {
        label: 'Current Ratio',
        description: 'Measures a company\'s ability to pay short-term obligations within one year',
        format: (value) => value.toFixed(2),
        compareMode: 'higher-better'
    },
    interest_coverage: {
        label: 'Interest Coverage',
        description: 'Determines how easily a company can pay interest on its outstanding debt',
        format: (value) => value.toFixed(2),
        compareMode: 'higher-better'
    },
    return_on_equity: {
        label: 'Return on Equity (%)',
        description: 'Measures financial performance by dividing net income by shareholders\' equity',
        format: (value) => (value * 100).toFixed(2) + '%',
        compareMode: 'higher-better'
    },
    dividend_yield: {
        label: 'Dividend Yield (%)',
        description: 'Shows how much a company pays out in dividends relative to its stock price',
        format: (value) => (value * 100).toFixed(2) + '%',
        compareMode: 'closer-better'
    }
};

/**
 * Component for displaying financial metrics with industry benchmarks
 */
const MetricsTable = ({ metrics, companyType }) => {
    // Get appropriate benchmark for company type, default to Developers if not found
    const benchmark = INDUSTRY_BENCHMARKS[companyType] || INDUSTRY_BENCHMARKS['Developers'];

    /**
     * Determine comparison status for a metric against benchmark
     * @param {string} metric - Metric key
     * @param {number} value - Metric value
     * @returns {Object} Status info including indicator and CSS class
     */
    const getComparisonStatus = (metric, value) => {
        if (!benchmark || typeof value !== 'number') {
            return { status: 'neutral', indicator: '⚫' };
        }

        const metricDef = METRIC_DEFINITIONS[metric];
        const compareMode = metricDef?.compareMode || 'higher-better';
        const benchmarkValue = benchmark[metric];

        // For metrics where closer to benchmark is better (like dividend yield)
        if (compareMode === 'closer-better') {
            const diff = Math.abs(value - benchmarkValue) / benchmarkValue;
            if (diff <= 0.1) return { status: 'good', indicator: '🟢' };
            if (diff <= 0.3) return { status: 'fair', indicator: '🟡' };
            return { status: 'poor', indicator: '🔴' };
        }

        // For metrics where higher is better
        if (compareMode === 'higher-better') {
            if (value >= benchmarkValue * 1.1) return { status: 'good', indicator: '🟢' };
            if (value >= benchmarkValue * 0.9) return { status: 'fair', indicator: '🟡' };
            return { status: 'poor', indicator: '🔴' };
        }

        // For metrics where lower is better
        if (compareMode === 'lower-better') {
            if (value <= benchmarkValue * 0.9) return { status: 'good', indicator: '🟢' };
            if (value <= benchmarkValue * 1.1) return { status: 'fair', indicator: '🟡' };
            return { status: 'poor', indicator: '🔴' };
        }

        return { status: 'neutral', indicator: '⚫' };
    };

    /**
     * Calculate financial risk score based on metrics
     * @returns {number} Risk score from 0-100
     */
    const calculateRiskScore = () => {
        if (!metrics) return 0;

        const debtRatio = Math.min(metrics.debt_to_equity / 3, 1);
        const currentRatio = Math.min(metrics.current_ratio / 3, 1);
        const interestCoverage = Math.min(metrics.interest_coverage / 6, 1);

        const avgScore = (debtRatio + (1 - currentRatio) + (1 - interestCoverage)) / 3;
        return Math.min(avgScore * 100, 100);
    };

    const riskScore = calculateRiskScore();

    return (
        <div>
            {/* Financial Risk Score Visualization */}
            {metrics && (
                <div className="mb-6 bg-gray-50 p-6 rounded-lg">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold">Market Based Financial Risk</h3>
                        <div className="text-2xl font-bold">
                            <RiskIndicator score={riskScore} />
                        </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                        <div
                            className={`h-3 rounded-full ${metrics.debt_to_equity > 2 ? 'bg-red-500' :
                                    metrics.current_ratio < 1 ? 'bg-red-500' :
                                        metrics.interest_coverage < 1.5 ? 'bg-yellow-500' : 'bg-green-500'
                                }`}
                            style={{ width: `${riskScore}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Low Risk</span>
                        <span>Medium Risk</span>
                        <span>High Risk</span>
                    </div>
                </div>
            )}

            {/* Metrics Table */}
            <div className="bg-white overflow-hidden border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Metric
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Value
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Industry Benchmark
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {metrics && Object.entries(METRIC_DEFINITIONS).map(([key, definition]) => {
                            if (metrics[key] === undefined) return null;

                            const value = metrics[key];
                            const benchmarkValue = benchmark?.[key] || 'N/A';
                            const { status, indicator } = getComparisonStatus(key, value);

                            let statusClass = 'bg-gray-100 text-gray-800';
                            if (status === 'good') statusClass = 'bg-green-100 text-green-800';
                            if (status === 'fair') statusClass = 'bg-yellow-100 text-yellow-800';
                            if (status === 'poor') statusClass = 'bg-red-100 text-red-800';

                            return (
                                <tr key={key} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <div className="text-sm font-medium text-gray-900">{definition.label}</div>
                                            <div className="text-xs text-gray-500">{definition.description}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {typeof value === 'number' ? definition.format(value) : 'N/A'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {benchmarkValue === 'N/A' ? 'N/A' :
                                                definition.format(benchmarkValue)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}`}>
                                            {indicator} {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MetricsTable;

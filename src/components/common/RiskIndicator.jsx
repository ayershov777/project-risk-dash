import React from 'react';

/**
 * Get risk level info based on score
 * @param {number} score - Risk score
 * @returns {Object} Risk level information
 */
export const getRiskLevel = (score) => {
    if (!score) return { level: 'Unknown', color: 'gray', indicator: '⚫' };
    if (score < 35) return { level: 'Low Risk', color: 'green', indicator: '🟢' };
    if (score < 45) return { level: 'Medium Risk', color: 'yellow', indicator: '🟡' };
    return { level: 'High Risk', color: 'red', indicator: '🔴' };
};

/**
 * Risk indicator component for consistent display of risk scores
 */
const RiskIndicator = ({ score, showLabel = false, size = 'normal' }) => {
    const riskLevel = getRiskLevel(score);

    // Size classes
    const sizeClasses = {
        small: 'text-xs',
        normal: 'text-sm',
        large: 'text-base'
    };

    return (
        <div
            className={`inline-flex items-center ${sizeClasses[size]} font-medium`}
            title={`Risk Score: ${score} - ${riskLevel.level}`}
        >
            <span className="mr-1">{riskLevel.indicator}</span>
            <span>{score}</span>
            {showLabel && (
                <span className="ml-1 text-gray-700">- {riskLevel.level}</span>
            )}
        </div>
    );
};

export default RiskIndicator;

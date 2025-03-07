import React from 'react';

/**
 * Get sentiment info based on score
 * @param {number} sentiment - Sentiment score (typically -1 to 1)
 * @returns {Object} Sentiment information including color classes and label
 */
export const getSentimentInfo = (sentiment) => {
    if (sentiment === undefined || sentiment === null) return {
        label: 'Unknown',
        colorClass: 'bg-gray-100 text-gray-800 border-gray-200',
        indicator: '⚫'
    };

    if (sentiment >= 0.5) return {
        label: 'Positive',
        colorClass: 'bg-green-100 text-green-800 border-green-200',
        indicator: '🟢'
    };

    if (sentiment >= 0) return {
        label: 'Neutral',
        colorClass: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        indicator: '🟡'
    };

    return {
        label: 'Negative',
        colorClass: 'bg-red-100 text-red-800 border-red-200',
        indicator: '🔴'
    };
};

/**
 * Sentiment indicator component for consistent display of sentiment scores
 */
const SentimentIndicator = ({
    score,
    showScore = true,
    showLabel = true,
    className = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
}) => {
    const sentimentInfo = getSentimentInfo(score);

    if (score === undefined || score === null) {
        return null;
    }

    return (
        <span
            className={`${className} ${sentimentInfo.colorClass}`}
            title={`Sentiment Score: ${score !== undefined ? score.toFixed(2) : 'N/A'}`}
        >
            {sentimentInfo.indicator}
            {showScore && <span className="ml-1">{score.toFixed(2)}</span>}
            {showLabel && <span className="ml-1">{sentimentInfo.label}</span>}
        </span>
    );
};

export default SentimentIndicator;

import React from 'react';
import SentimentIndicator from '../common/SentimentIndicator';

/**
 * Component for displaying company news articles with sentiment analysis
 */
const NewsCard = ({ news }) => {
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';

        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(date);
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow transition-shadow">
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{news.title}</h3>
                    {news.sentiment !== undefined && (
                        <SentimentIndicator score={news.sentiment} />
                    )}
                </div>

                <p className="text-gray-700 mb-3">{news.description}</p>

                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">
                        {news.source ? `Source: ${news.source}` : ''}
                    </span>
                    <span className="text-gray-500">
                        {formatDate(news.publishedAt)}
                    </span>
                </div>

                {news.url && (
                    <div className="mt-3">
                        <a
                            href={news.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:text-blue-700"
                        >
                            Read Full Article
                            <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsCard;

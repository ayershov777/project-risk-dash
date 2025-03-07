import React from 'react';
import { getDocumentIcon, getCategoryLabel } from '../../../utils/documentUtils';
import SentimentIndicator from '../../common/SentimentIndicator';

/**
 * Component for displaying a single document item in the list
 */
const DocumentItem = ({ document, projectId, onDelete }) => {
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <li className="block hover:bg-gray-50">
            <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="min-w-0 flex-1 flex items-center">
                    <div className="flex-shrink-0 text-3xl mr-4">
                        {getDocumentIcon(document.filename)}
                    </div>
                    <div className="min-w-0 flex-1 px-4">
                        <div>
                            <p className="text-sm font-medium text-blue-600 truncate">
                                {document.filename}
                            </p>
                            <p className="mt-1 flex items-center text-sm text-gray-500">
                                <span className="truncate capitalize">{getCategoryLabel(document.category)}</span>
                                {document.sentimentScore !== undefined && (
                                    <SentimentIndicator
                                        score={document.sentimentScore}
                                        className="ml-2 flex-shrink-0 inline-block px-2 py-0.5 text-xs font-medium rounded-full"
                                    />
                                )}
                            </p>
                            {document.sentimentAnalysis && (
                                <p className="mt-1 text-sm text-gray-500 truncate">
                                    {document.sentimentAnalysis}
                                </p>
                            )}
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                            <p>Uploaded: {formatDate(document.createdAt)}</p>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <a
                        href={`/api/projects/${projectId}/documents/${document._id}/download`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        View
                    </a>
                    <button
                        onClick={() => onDelete(document._id)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </li>
    );
};

export default DocumentItem;

import React from 'react';
import DocumentItem from './DocumentItem';
import { LoadingState, EmptyState } from '../../common/LoadingErrorStates';

/**
 * Document category tabs configuration
 */
const CATEGORY_TABS = [
    { id: 'all', label: 'All Documents' },
    { id: 'technical', label: 'Technical' },
    { id: 'environmental', label: 'Environmental' },
    { id: 'contract', label: 'Contracts' },
    { id: 'financial', label: 'Financial' },
    { id: 'regulatory', label: 'Regulatory' }
];

/**
 * Component for displaying the categorized list of documents
 */
const DocumentList = ({
    documents,
    loading,
    activeTab,
    setActiveTab,
    projectId,
    handleDeleteDocument
}) => {
    const filteredDocuments = activeTab === 'all'
        ? documents
        : documents.filter(doc => doc.category === activeTab);

    return (
        <div>
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-4">
                <nav className="flex -mb-px space-x-8 overflow-x-auto">
                    {CATEGORY_TABS.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Document List */}
            {loading ? (
                <LoadingState message="Loading documents..." />
            ) : filteredDocuments.length === 0 ? (
                <EmptyState message="No documents found in this category." />
            ) : (
                <div className="overflow-hidden bg-white shadow sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {filteredDocuments.map(document => (
                            <DocumentItem
                                key={document._id}
                                document={document}
                                projectId={projectId}
                                onDelete={handleDeleteDocument}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DocumentList;

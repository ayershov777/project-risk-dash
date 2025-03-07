import React from 'react';
import { isValidFileType } from '../../../utils/documentUtils';

/**
 * Document upload section component
 */
const UploadSection = ({
    selectedCategory,
    setSelectedCategory,
    handleFileUpload,
    uploading,
    error
}) => {
    const validateAndUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file type
        const validFileTypes = [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/csv',
            'text/plain'
        ];

        if (!isValidFileType(file.type, validFileTypes)) {
            alert('Invalid file type. Please upload PDF, DOCX, CSV, or TXT files only.');
            event.target.value = '';
            return;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            alert('File size exceeds 10MB. Please upload a smaller file.');
            event.target.value = '';
            return;
        }

        // Call the parent component's upload handler
        handleFileUpload(event);
    };

    return (
        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Upload New Document</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Document
                    </label>
                    <input
                        type="file"
                        accept=".pdf,.docx,.csv,.txt"
                        onChange={validateAndUpload}
                        disabled={uploading}
                        className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                        Supported file types: PDF, DOCX, CSV, TXT (Max 10MB)
                    </p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Document Category
                    </label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                        <option value="technical">Technical Document</option>
                        <option value="environmental">Environmental Document</option>
                        <option value="contract">Contract Document</option>
                        <option value="financial">Financial Document</option>
                        <option value="regulatory">Regulatory Document</option>
                    </select>
                </div>
            </div>

            {uploading && (
                <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full w-full animate-pulse"></div>
                    </div>
                    <p className="text-center mt-2 text-sm text-gray-600">Uploading document...</p>
                </div>
            )}

            {error && (
                <div className="mt-4 text-sm text-red-600">
                    {error}
                </div>
            )}
        </div>
    );
};

export default UploadSection;

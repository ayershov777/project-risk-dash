/**
 * Utility functions for document handling
 */

/**
 * Get appropriate icon for a document based on its file extension
 * @param {string} fileName - Name of the file
 * @returns {string} Emoji icon representing the file type
 */
export const getDocumentIcon = (fileName) => {
    if (!fileName) return '📁';

    const extension = fileName.split('.').pop().toLowerCase();

    switch (extension) {
        case 'pdf':
            return '📄';
        case 'docx':
        case 'doc':
            return '📝';
        case 'csv':
        case 'xls':
        case 'xlsx':
            return '📊';
        case 'txt':
            return '📃';
        case 'ppt':
        case 'pptx':
            return '📑';
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
            return '🖼️';
        case 'zip':
        case 'rar':
            return '🗜️';
        default:
            return '📁';
    }
};

/**
 * Format file size to human readable format
 * @param {number} bytes - Size in bytes
 * @returns {string} Formatted file size string
 */
export const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Validate if a file type is allowed
 * @param {string} fileType - MIME type of the file
 * @param {Array} allowedTypes - Array of allowed MIME types
 * @returns {boolean} Whether the file type is allowed
 */
export const isValidFileType = (fileType, allowedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'text/csv',
    'text/plain',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
]) => {
    return allowedTypes.includes(fileType);
};

/**
 * Get category label from category value
 * @param {string} category - Category value
 * @returns {string} Human-readable category label
 */
export const getCategoryLabel = (category) => {
    const categories = {
        'technical': 'Technical Document',
        'environmental': 'Environmental Document',
        'contract': 'Contract Document',
        'financial': 'Financial Document',
        'regulatory': 'Regulatory Document',
        'legal': 'Legal Document',
        'misc': 'Miscellaneous'
    };

    return categories[category] || 'Document';
};

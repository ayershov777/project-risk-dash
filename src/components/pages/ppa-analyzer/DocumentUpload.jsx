import React from 'react';

const DocumentUpload = ({
    ppaDocument,
    documentLoading,
    handleFileChange,
    handleRemoveFile,
    loading,
    error,
    uploadStatus,
    fileInputRef
}) => {
    return (
        <div className="mt-4 pt-4 border-t border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Document Upload</h2>

            {!ppaDocument && !documentLoading ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        accept="application/pdf"
                        ref={fileInputRef}
                        id="file-upload"
                    />
                    <label
                        htmlFor="file-upload"
                        className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md inline-block mb-3"
                    >
                        {loading ? 'Uploading...' : 'Select PPA Document'}
                    </label>
                    <p className="text-gray-500 text-sm mt-2">Upload a PDF file of your Power Purchase Agreement</p>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    {uploadStatus && <p className="text-green-500 mt-2">{uploadStatus}</p>}
                </div>
            ) : documentLoading ? (
                <div className="text-center py-16">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    <p className="mt-4 text-gray-600">Loading document preview...</p>
                </div>
            ) : (
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h3 className="font-medium">
                                <a
                                    href={ppaDocument.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 hover:underline"
                                >
                                    {ppaDocument.name}
                                </a>
                            </h3>
                            <div className="text-sm text-gray-500">
                                <span>{ppaDocument.size}</span>
                                {ppaDocument.uploadDate && (
                                    <span className="ml-2">Uploaded: {ppaDocument.uploadDate}</span>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={handleRemoveFile}
                            className="text-red-500 hover:text-red-700"
                            disabled={loading}
                        >
                            {loading ? 'Removing...' : 'Remove'}
                        </button>
                    </div>

                    <div className="border rounded-lg bg-gray-50 p-4">
                        <iframe
                            src={ppaDocument.url}
                            title="PPA Document Preview"
                            className="w-full"
                            style={{ height: '500px' }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default DocumentUpload;

import React from 'react';

const FinancialTerms = ({ financialTerms }) => {
    return (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">Key Financial Terms</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 className="font-medium mb-2">Price Structure:</h4>
                    <p className="text-gray-700">{financialTerms?.price_structure || 'Not available'}</p>

                    <h4 className="font-medium mt-4 mb-2">Contract Duration:</h4>
                    <p className="text-gray-700">{financialTerms?.duration || 'Not available'}</p>

                    <h4 className="font-medium mt-4 mb-2">Payment Terms:</h4>
                    <p className="text-gray-700">{financialTerms?.payment_terms || 'Not available'}</p>
                </div>
                <div>
                    <h4 className="font-medium mb-2">Capacity & Energy Commitments:</h4>
                    <p className="text-gray-700">{financialTerms?.commitments || 'Not available'}</p>

                    <h4 className="font-medium mt-4 mb-2">Price Escalation:</h4>
                    <p className="text-gray-700">{financialTerms?.escalation || 'Not available'}</p>

                    <h4 className="font-medium mt-4 mb-2">Credit Requirements:</h4>
                    <p className="text-gray-700">{financialTerms?.credit_requirements || 'Not available'}</p>
                </div>
            </div>
        </div>
    );
};

export default FinancialTerms;

import React from 'react';

const ComplianceRequirements = () => {
    // Mock data for compliance requirements
    const requirements = [
        {
            name: 'Annual Performance Certification',
            dueDate: 'Due by June 30th each year'
        },
        {
            name: 'Quarterly Generation Reports',
            dueDate: 'Due within 15 days of quarter end'
        },
        {
            name: 'Credit Support Renewal',
            dueDate: 'Annual renewal by October 1st'
        },
        {
            name: 'Monthly Settlement Payments',
            dueDate: 'Due by the 15th of each month'
        },
        {
            name: 'Maintenance Notifications',
            dueDate: '30 days prior to scheduled maintenance'
        }
    ];

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Key Compliance Requirements</h3>
            <ul className="space-y-3">
                {requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-700">{req.name}</p>
                            <p className="text-xs text-gray-500">{req.dueDate}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ComplianceRequirements;

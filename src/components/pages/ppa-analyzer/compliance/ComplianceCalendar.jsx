import React from 'react';

const ComplianceCalendar = () => {
    // Mock data for compliance calendar
    const complianceItems = [
        {
            type: 'Deadline',
            dueDate: 'Jun 30, 2025',
            description: 'Annual compliance certification due',
            status: 'Upcoming',
            statusClass: 'bg-yellow-100 text-yellow-800'
        },
        {
            type: 'Reporting',
            dueDate: 'Apr 15, 2025',
            description: 'Quarterly generation report',
            status: 'Upcoming',
            statusClass: 'bg-yellow-100 text-yellow-800'
        },
        {
            type: 'Payment',
            dueDate: 'Mar 15, 2025',
            description: 'Monthly settlement payment',
            status: 'Upcoming',
            statusClass: 'bg-yellow-100 text-yellow-800'
        }
    ];

    return (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">Compliance Calendar</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {complianceItems.map((item, index) => (
                            <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.type === 'Deadline'
                                            ? 'bg-blue-100 text-blue-800'
                                            : item.type === 'Reporting'
                                                ? 'bg-purple-100 text-purple-800'
                                                : 'bg-green-100 text-green-800'
                                        }`}>
                                        {item.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.dueDate}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{item.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.statusClass}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button className="text-indigo-600 hover:text-indigo-900">Set Reminder</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ComplianceCalendar;

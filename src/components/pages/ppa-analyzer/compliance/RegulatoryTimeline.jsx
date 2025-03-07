import React from 'react';

const RegulatoryTimeline = () => {
    // Mock data for regulatory timeline
    const timelineEvents = [
        {
            year: 2025,
            month: 'MARCH',
            description: 'Monthly Settlement Payment due'
        },
        {
            year: 2025,
            month: 'APRIL',
            description: 'Q1 Generation Report submission'
        },
        {
            year: 2025,
            month: 'JUNE',
            description: 'Annual Compliance Certification due'
        },
        {
            year: 2025,
            month: 'OCTOBER',
            description: 'Credit Support annual renewal'
        }
    ];

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Regulatory Timeline</h3>
            <div className="relative">
                <div className="absolute h-full w-0.5 bg-gray-200 left-5"></div>

                {timelineEvents.map((event, index) => (
                    <div key={index} className={`relative ${index < timelineEvents.length - 1 ? 'pb-8' : ''}`}>
                        <div className="flex items-center mb-1">
                            <div className="bg-blue-500 rounded-full h-10 w-10 flex items-center justify-center text-white text-sm font-medium z-10">
                                {event.year}
                            </div>
                            <div className="ml-4 text-sm font-semibold text-gray-500">{event.month}</div>
                        </div>
                        <div className="ml-14">
                            <p className="text-sm text-gray-700">{event.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RegulatoryTimeline;

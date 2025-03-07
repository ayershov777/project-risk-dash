import React from 'react';
import ComplianceCalendar from '../compliance/ComplianceCalendar';
import ComplianceRequirements from '../compliance/ComplianceRequirements';
import RegulatoryTimeline from '../compliance/RegulatoryTimeline';

const ComplianceMonitorTab = ({ ppaDocument }) => {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Compliance Monitor</h2>
            {!ppaDocument ? (
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                    <p className="text-gray-600">
                        Compliance monitoring results will be displayed here after processing the document.
                    </p>
                </div>
            ) : (
                <div>
                    {/* Compliance Calendar */}
                    <ComplianceCalendar />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Key Compliance Requirements */}
                        <ComplianceRequirements />

                        {/* Regulatory Timeline */}
                        <RegulatoryTimeline />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ComplianceMonitorTab;

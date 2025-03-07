import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/**
 * Component for displaying risks by severity level
 */
const RiskSeverityChart = ({ risks }) => {
    // Count risks by severity
    const getRiskBySeverity = () => {
        const counts = {
            'HIGH': 0,
            'MEDIUM': 0,
            'LOW': 0
        };

        risks.forEach(risk => {
            if (counts[risk.severity] !== undefined) {
                counts[risk.severity] += 1;
            }
        });

        // Convert to array format for charts
        return [
            { name: 'High', value: counts['HIGH'], color: '#ef4444' },
            { name: 'Medium', value: counts['MEDIUM'], color: '#f97316' },
            { name: 'Low', value: counts['LOW'], color: '#22c55e' }
        ];
    };

    const data = getRiskBySeverity();

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} risks`, 'Count']} />
                <Legend />
                <Bar
                    dataKey="value"
                    name="Risk Count"
                    fill="#8884d8"
                    isAnimationActive={true}
                    animationDuration={1000}
                    barSize={60}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default RiskSeverityChart;

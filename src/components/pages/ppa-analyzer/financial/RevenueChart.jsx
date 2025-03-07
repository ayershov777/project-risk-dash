import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RevenueChart = ({ projections }) => {
    // Create data for chart from projections
    const data = projections.years.map((year, index) => ({
        year: `Year ${year}`,
        revenue: projections.revenues[index] / 1e6, // Convert to millions
        presentValue: projections.presentValues[index] / 1e6 // Convert to millions
    }));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis
                    label={{ value: '$ Millions', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip
                    formatter={(value) => [`$${value.toFixed(2)}M`, '']}
                />
                <Legend />
                <Bar dataKey="revenue" fill="#8884d8" name="Annual Revenue" />
                <Bar dataKey="presentValue" fill="#82ca9d" name="Present Value" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default RevenueChart;

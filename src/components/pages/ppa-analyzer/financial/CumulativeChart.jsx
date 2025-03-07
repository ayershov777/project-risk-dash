import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CumulativeChart = ({ projections }) => {
    // Create data for chart from projections
    const data = projections.years.map((year, index) => ({
        year: `Year ${year}`,
        cumulativeRevenue: projections.cumulativeRevenue[index] / 1e6, // Convert to millions
        cumulativeNPV: projections.cumulativeNPV[index] / 1e6 // Convert to millions
    }));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
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
                <Line
                    type="monotone"
                    dataKey="cumulativeRevenue"
                    stroke="#8884d8"
                    name="Cumulative Revenue"
                    strokeWidth={2}
                />
                <Line
                    type="monotone"
                    dataKey="cumulativeNPV"
                    stroke="#82ca9d"
                    name="Cumulative NPV"
                    strokeWidth={2}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default CumulativeChart;

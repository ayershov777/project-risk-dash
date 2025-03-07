import React from 'react';
import { Line } from 'recharts';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PriceEvolutionChart = ({ projections }) => {
    // Create data for chart from projections
    const data = projections.years.map((year, index) => ({
        year: `Year ${year}`,
        price: projections.prices[index]
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
                    label={{ value: 'Price ($/MWh)', angle: -90, position: 'insideLeft' }}
                    domain={['auto', 'auto']}
                />
                <Tooltip formatter={(value) => [`$${value.toFixed(2)}/MWh`, 'Price']} />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    name="Energy Price"
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default PriceEvolutionChart;

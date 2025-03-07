import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

/**
 * Component for displaying risk distribution by category
 */
const RiskCategoryChart = ({ risks }) => {
    // Count risks by category
    const getRiskByCategory = () => {
        const categories = {};

        risks.forEach(risk => {
            if (!categories[risk.category]) {
                categories[risk.category] = {
                    count: 0,
                    highCount: 0
                };
            }

            categories[risk.category].count += 1;

            if (risk.severity === 'HIGH') {
                categories[risk.category].highCount += 1;
            }
        });

        // Convert to array format for charts
        return Object.keys(categories).map(category => ({
            name: category,
            value: categories[category].count,
            highRiskCount: categories[category].highCount
        }));
    };

    const data = getRiskByCategory();

    // Colors for different risk categories
    const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57'];

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="#fff"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const customTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white p-3 border border-gray-200 shadow-md rounded">
                    <p className="font-medium">{data.name}</p>
                    <p className="text-sm">Total Risks: <span className="font-medium">{data.value}</span></p>
                    <p className="text-sm">High Risks: <span className="font-medium text-red-600">{data.highRiskCount}</span></p>
                </div>
            );
        }
        return null;
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip content={customTooltip} />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default RiskCategoryChart;

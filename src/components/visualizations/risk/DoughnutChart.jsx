import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const RiskDoughnutChart = ({ financialRisk, operationalRisk, regulatoryRisk, overallRisk }) => {
    const svgRef = useRef();

    useEffect(() => {
        if (!svgRef.current) return;

        // Clear any existing chart
        d3.select(svgRef.current).selectAll('*').remove();

        // Set up dimensions
        const width = 300;
        const height = 300;
        const margin = 40;
        const radius = Math.min(width, height) / 2 - margin;
        const innerRadius = radius * 0.6;

        // Create SVG
        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        // Data for the chart
        const data = [
            { name: 'Financial', value: financialRisk, color: '#4299E1' },
            { name: 'Operational', value: operationalRisk, color: '#48BB78' },
            { name: 'Regulatory', value: regulatoryRisk, color: '#F6AD55' }
        ];

        // Set up scales
        const color = d3.scaleOrdinal()
            .domain(data.map(d => d.name))
            .range(data.map(d => d.color));

        const pie = d3.pie()
            .value(d => d.value)
            .sort(null);

        const arc = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(radius);

        // Draw chart
        const arcs = svg.selectAll('arc')
            .data(pie(data))
            .enter()
            .append('g')
            .attr('class', 'arc');

        arcs.append('path')
            .attr('d', arc)
            .attr('fill', d => color(d.data.name))
            .attr('stroke', 'white')
            .style('stroke-width', '2px')
            .style('opacity', 0.8);

        // Add labels
        arcs.append('text')
            .attr('transform', d => {
                const centroid = arc.centroid(d);
                const x = centroid[0] * 1.5;
                const y = centroid[1] * 1.5;
                return `translate(${x}, ${y})`;
            })
            .attr('text-anchor', 'middle')
            .text(d => `${d.data.name}`)
            .style('font-size', '12px')
            .style('fill', '#333');

        // Add center text with the backend-calculated overall risk
        svg.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '-0.2em')
            .style('font-size', '2rem')
            .style('font-weight', 'bold')
            .text(overallRisk);

        svg.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '1.5em')
            .style('font-size', '1rem')
            .text('Risk Score');

        // Add legend
        const legendGroup = svg.append('g')
            .attr('transform', `translate(${radius + 20}, ${-radius})`);

        const legend = legendGroup.selectAll('.legend')
            .data(data)
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', (d, i) => `translate(0, ${i * 20})`);

        legend.append('rect')
            .attr('width', 15)
            .attr('height', 15)
            .attr('fill', d => d.color);

        legend.append('text')
            .attr('x', 20)
            .attr('y', 12)
            .text(d => `${d.name}: ${d.value}`)
            .style('font-size', '12px');

    }, [financialRisk, operationalRisk, regulatoryRisk, overallRisk]);

    return (
        <div className="flex justify-center">
            <svg ref={svgRef}></svg>
        </div>
    );
};

export default RiskDoughnutChart;

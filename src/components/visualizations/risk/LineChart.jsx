import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const RiskLineChart = ({ data, title }) => {
    const svgRef = useRef();

    useEffect(() => {
        if (!svgRef.current || !data) return;

        // Clear any existing chart
        d3.select(svgRef.current).selectAll('*').remove();

        // Set up dimensions
        const margin = { top: 20, right: 80, bottom: 30, left: 50 };
        const width = svgRef.current.clientWidth || 600;
        const height = 300;
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        // Create SVG
        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        // Prepare the data
        const parseDate = d3.timeParse('%Y-%m-%dT%H:%M:%S.%LZ');

        const seriesData = [
            {
                name: 'Overall Risk',
                color: '#4338CA',
                values: data.overallRisk.map(d => ({
                    date: new Date(d.date),
                    value: d.value
                }))
            },
            {
                name: 'Technical Risk',
                color: '#10B981',
                values: data.technicalRisk.map(d => ({
                    date: new Date(d.date),
                    value: d.value
                }))
            },
            {
                name: 'Financial Risk',
                color: '#F59E0B',
                values: data.financialRisk.map(d => ({
                    date: new Date(d.date),
                    value: d.value
                }))
            }
        ];

        // Get all dates and values for scales
        const allDates = seriesData.flatMap(s => s.values.map(d => d.date));
        const allValues = seriesData.flatMap(s => s.values.map(d => d.value));

        // Set up scales
        const xScale = d3.scaleTime()
            .domain(d3.extent(allDates))
            .range([0, innerWidth]);

        const yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([innerHeight, 0]);

        // Define the line
        const line = d3.line()
            .x(d => xScale(d.date))
            .y(d => yScale(d.value))
            .curve(d3.curveMonotoneX);

        // Add title
        if (title) {
            svg.append('text')
                .attr('x', innerWidth / 2)
                .attr('y', -5)
                .attr('text-anchor', 'middle')
                .style('font-size', '14px')
                .style('font-weight', 'bold')
                .text(title);
        }

        // Add X axis
        svg.append('g')
            .attr('transform', `translate(0, ${innerHeight})`)
            .call(d3.axisBottom(xScale)
                .ticks(5)
                .tickFormat(d3.timeFormat('%b %Y')))
            .selectAll('text')
            .style('text-anchor', 'middle');

        // Add Y axis
        svg.append('g')
            .call(d3.axisLeft(yScale).ticks(5));

        // Add Y axis label
        svg.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 0 - margin.left)
            .attr('x', 0 - (innerHeight / 2))
            .attr('dy', '1em')
            .style('text-anchor', 'middle')
            .style('font-size', '12px')
            .text('Risk Score');

        // Add grid lines
        svg.append('g')
            .attr('class', 'grid')
            .call(d3.axisLeft(yScale)
                .ticks(5)
                .tickSize(-innerWidth)
                .tickFormat(''))
            .selectAll('line')
            .style('stroke', '#e0e0e0')
            .style('stroke-opacity', 0.7);

        // Add lines
        seriesData.forEach(series => {
            // Add the line
            svg.append('path')
                .datum(series.values)
                .attr('fill', 'none')
                .attr('stroke', series.color)
                .attr('stroke-width', 2)
                .attr('d', line);

            // Add dots for each data point
            svg.selectAll(`dot-${series.name}`)
                .data(series.values)
                .enter()
                .append('circle')
                .attr('cx', d => xScale(d.date))
                .attr('cy', d => yScale(d.value))
                .attr('r', 3)
                .attr('fill', series.color)
                .attr('stroke', 'white')
                .attr('stroke-width', 1);
        });

        // Add legend
        const legend = svg.append('g')
            .attr('class', 'legend')
            .attr('transform', `translate(${innerWidth - 150}, 0)`);

        seriesData.forEach((series, i) => {
            const legendRow = legend.append('g')
                .attr('transform', `translate(0, ${i * 20})`);

            legendRow.append('rect')
                .attr('width', 10)
                .attr('height', 10)
                .attr('fill', series.color);

            legendRow.append('text')
                .attr('x', 15)
                .attr('y', 10)
                .attr('text-anchor', 'start')
                .style('font-size', '12px')
                .text(series.name);
        });

        // Add tooltip
        const tooltip = d3.select('body').append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0)
            .style('position', 'absolute')
            .style('background-color', 'white')
            .style('border', '1px solid #ddd')
            .style('border-radius', '4px')
            .style('padding', '8px')
            .style('pointer-events', 'none')
            .style('font-size', '12px')
            .style('z-index', 1000);

        const mouseover = function () {
            tooltip.style('opacity', 1);
        };

        const mousemove = function (event, d) {
            const date = d3.timeFormat('%b %Y')(d.date);
            tooltip
                .html(`Date: ${date}<br>Risk Score: ${d.value.toFixed(1)}`)
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY - 28) + 'px');
        };

        const mouseleave = function () {
            tooltip.style('opacity', 0);
        };

        // Add hover interaction to dots
        seriesData.forEach(series => {
            svg.selectAll('circle')
                .on('mouseover', mouseover)
                .on('mousemove', mousemove)
                .on('mouseleave', mouseleave);
        });

        // Clean up tooltip when component unmounts
        return () => {
            d3.select('body').selectAll('.tooltip').remove();
        };
    }, [data, title]);

    return (
        <div className="w-full h-full">
            <svg ref={svgRef} width="100%" height="100%" preserveAspectRatio="xMidYMid meet"></svg>
        </div>
    );
};

export default RiskLineChart;

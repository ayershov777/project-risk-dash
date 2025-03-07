import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProject, getProjectCompanies, getProjectHistoricalRisks } from '../../services/api';
import RiskDoughnutChart from '../visualizations/risk/DoughnutChart';
import RiskLineChart from '../visualizations/risk/LineChart';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import PageHeader from '../common/PageHeader';
import TabNavigation from '../common/TabNavigation';
import InfoGrid, { InfoItem } from '../common/InfoGrid';
import RiskIndicator, { getRiskLevel } from '../common/RiskIndicator';
import { LoadingState, ErrorState, EmptyState } from '../common/LoadingErrorStates';

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [companies, setCompanies] = useState([]);
    const [historicalRisks, setHistoricalRisks] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('risk_metrics');

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                setLoading(true);
                const [projectData, companiesData, risksData] = await Promise.all([
                    getProject(id),
                    getProjectCompanies(id),
                    getProjectHistoricalRisks(id),
                ]);

                setProject(projectData);
                setCompanies(companiesData);
                setHistoricalRisks(risksData);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch project data');
                setLoading(false);
            }
        };

        fetchProjectData();
    }, [id]);

    if (loading) return <LoadingState message="Loading project details..." />;
    if (error) return <ErrorState message={error} />;
    if (!project) return <EmptyState message="Project not found" />;

    // Use the backend-calculated average risk score
    const riskScore = project.averageRiskScore;
    const riskLevel = getRiskLevel(riskScore);

    // Check if coordinates are available for the map
    const hasCoordinates = project.coordinates && project.coordinates.length === 2;
    const mapPosition = hasCoordinates ? [project.coordinates[1], project.coordinates[0]] : [39.8283, -98.5795]; // Default to center of US
    const mapZoom = hasCoordinates ? 10 : 4; // Zoom in if we have coordinates, show more context if not

    // Create info grid items
    const infoItems = [
        { label: 'Location', value: project.location },
        { label: 'Budget', value: `$${project.budget}` },
        { label: 'Capacity', value: project.capacity },
        {
            label: 'Completion',
            value: (
                <div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${project.completion}%` }}
                        ></div>
                    </div>
                    <span className="text-xs">{project.completion}%</span>
                </div>
            ),
            valueClassName: ''
        }
    ];

    // Tab configuration
    const tabs = [
        { id: 'risk_metrics', label: 'Risk Metrics' },
        { id: 'partners', label: 'Partners' },
        { id: 'location', label: 'Location' }
    ];

    // Risk metrics for grid display
    const riskMetrics = [
        {
            title: 'Financial Risk',
            score: project.risk_metrics.financial_risk,
            description: 'Based on debt ratio, liquidity, and market conditions'
        },
        {
            title: 'Operational Risk',
            score: project.risk_metrics.operational_risk,
            description: 'Based on process efficiency, supply chain, and management'
        },
        {
            title: 'Regulatory Risk',
            score: project.risk_metrics.regulatory_risk,
            description: 'Based on compliance history, policy changes, and legal factors'
        }
    ];

    // Component for Risk Metric Card
    const RiskMetricCard = ({ title, score, description }) => {
        const metricRiskLevel = getRiskLevel(score);
        const borderColorClass =
            metricRiskLevel.color === 'green' ? 'border-green-500' :
                metricRiskLevel.color === 'yellow' ? 'border-yellow-500' : 'border-red-500';

        return (
            <div className={`bg-gray-50 p-4 rounded-lg border-l-4 ${borderColorClass}`}>
                <h3 className="text-lg font-medium mb-2">{title}</h3>
                <div className="flex items-center">
                    <span className="text-2xl font-bold mr-2">{score}</span>
                    <span>{metricRiskLevel.indicator}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">{description}</p>
            </div>
        );
    };

    return (
        <div className="pb-10">
            {/* Project Header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <PageHeader
                    title={project.name}
                    subtitle={`${project.type} | ${project.status}`}
                    rightContent={
                        <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg">
                            <span className="font-semibold mr-2">Risk Score:</span>
                            <span className={`text-${riskLevel.color}-600 font-bold`}>
                                <RiskIndicator score={riskScore} showLabel={true} />
                            </span>
                        </div>
                    }
                />
                <p className="text-gray-700 mb-4">{project.description}</p>
                <InfoGrid items={infoItems} />
            </div>

            {/* Tabs Navigation */}
            <TabNavigation
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            {/* Tab Content */}
            <div className="bg-white rounded-lg shadow-md p-6">
                {activeTab === 'risk_metrics' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Risk Assessment</h2>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <RiskDoughnutChart
                                    financialRisk={project.risk_metrics.financial_risk}
                                    operationalRisk={project.risk_metrics.operational_risk}
                                    regulatoryRisk={project.risk_metrics.regulatory_risk}
                                    overallRisk={riskScore}
                                />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Historical Risk Trends</h2>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                {historicalRisks ? (
                                    <RiskLineChart
                                        data={{
                                            overallRisk: historicalRisks.financial.map(item => ({
                                                date: item.date,
                                                value: (
                                                    item.score * 0.4 +
                                                    historicalRisks.operational.find(op => op.date === item.date)?.score * 0.3 +
                                                    historicalRisks.regulatory.find(reg => reg.date === item.date)?.score * 0.3
                                                )
                                            })),
                                            technicalRisk: historicalRisks.operational.map(item => ({
                                                date: item.date,
                                                value: item.score
                                            })),
                                            financialRisk: historicalRisks.financial.map(item => ({
                                                date: item.date,
                                                value: item.score
                                            }))
                                        }}
                                        title="Risk History"
                                    />
                                ) : (
                                    <EmptyState message="Historical data not available" />
                                )}
                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <h2 className="text-xl font-semibold mb-4">Key Risk Metrics</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {riskMetrics.map((metric, index) => (
                                    <RiskMetricCard
                                        key={index}
                                        title={metric.title}
                                        score={metric.score}
                                        description={metric.description}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'partners' && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Companies Involved</h2>

                        {companies.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {companies.map(company => (
                                    <CompanyCard key={company._id} company={company} project={project} />
                                ))}
                            </div>
                        ) : (
                            <EmptyState message="No companies found for this project." />
                        )}
                    </div>
                )}

                {activeTab === 'location' && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Location</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <InfoItem label="Address" value={project.address || 'N/A'} />
                                <InfoItem
                                    label="Coordinates"
                                    value={hasCoordinates
                                        ? `Latitude: ${project.coordinates[1]}, Longitude: ${project.coordinates[0]}`
                                        : 'N/A'}
                                />
                                <InfoItem label="Region" value={project.location} />
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-lg font-medium mb-2">Project Map</h3>
                                <div className="h-80 w-full rounded-lg overflow-hidden border border-gray-300">
                                    {hasCoordinates ? (
                                        <MapContainer
                                            center={mapPosition}
                                            zoom={mapZoom}
                                            scrollWheelZoom={false}
                                            style={{ height: '100%', width: '100%' }}
                                        >
                                            <TileLayer
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />
                                            <Marker position={mapPosition}>
                                                <Popup>
                                                    <div>
                                                        <h3 className="font-bold">{project.name}</h3>
                                                        <p>{project.type}</p>
                                                        <p>{project.capacity}</p>
                                                        {project.address && <p>{project.address}</p>}
                                                    </div>
                                                </Popup>
                                            </Marker>
                                        </MapContainer>
                                    ) : (
                                        <div className="flex items-center justify-center h-full bg-gray-100 text-gray-500">
                                            <p>No coordinates available for mapping</p>
                                        </div>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    {hasCoordinates
                                        ? 'Interactive map showing the project location.'
                                        : 'Map will be available when coordinates are provided.'}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Company Card Component for Partners tab
const CompanyCard = ({ company, project }) => {
    // Use the backend-calculated risk score
    const companyRiskScore = company.averageRiskScore;
    const riskLevel = getRiskLevel(companyRiskScore);

    return (
        <Link
            to={`/companies/${company._id}`}
            className="bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
        >
            <div className="p-4 border-b">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
                    <RiskIndicator score={companyRiskScore} />
                </div>
                <p className="text-sm text-gray-600">{company.type}</p>
            </div>

            <div className="p-4">
                <p className="text-sm text-gray-700 mb-4">{company.description && company.description.substring(0, 100)}...</p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-gray-500">Status</p>
                        <p className="font-medium">{company.status}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Role</p>
                        <p className="font-medium">{
                            project.partners &&
                            project.partners.find(p => p.company === company.name)?.role || 'Partner'
                        }</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProjectDetail;

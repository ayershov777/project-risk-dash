import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCompany, getCompanyHistoricalRisks, getCompanyNews, getFinancialMetrics } from '../../services/api';
import DoughnutChart from '../visualizations/risk/DoughnutChart';
import LineChart from '../visualizations/risk/LineChart';
import MetricsTable from '../financial/MetricsTable';
import NewsCard from '../company/NewsCard';
import PageHeader from '../common/PageHeader';
import TabNavigation from '../common/TabNavigation';
import InfoGrid from '../common/InfoGrid';
import RiskIndicator, { getRiskLevel } from '../common/RiskIndicator';
import { LoadingState, ErrorState, EmptyState } from '../common/LoadingErrorStates';

const CompanyProfile = () => {
    const { id } = useParams();
    const [company, setCompany] = useState(null);
    const [news, setNews] = useState([]);
    const [financialMetrics, setFinancialMetrics] = useState(null);
    const [historicalRisks, setHistoricalRisks] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('risk_metrics');

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                setLoading(true);
                const companyData = await getCompany(id);
                setCompany(companyData);

                // Fetch additional data in parallel
                const [newsData, metricsData, risksData] = await Promise.all([
                    getCompanyNews(id),
                    companyData.ticker ? getFinancialMetrics(id).catch(() => null) : Promise.resolve(null),
                    getCompanyHistoricalRisks(id),
                ]);

                setNews(newsData);
                setFinancialMetrics(metricsData);
                setHistoricalRisks(risksData);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch company data');
                setLoading(false);
            }
        };

        fetchCompanyData();
    }, [id]);

    if (loading) return <LoadingState />;
    if (error) return <ErrorState message={error} />;
    if (!company) return <EmptyState message="Company not found" />;

    // Use the backend-calculated average risk score
    const riskScore = company.averageRiskScore;
    const riskLevel = getRiskLevel(riskScore);

    // Create info grid items
    const infoItems = [
        { label: 'Founded', value: company.founded || 'N/A' },
        { label: 'Headquarters', value: company.headquarters || 'N/A' },
        { label: 'Employees', value: company.employees || 'N/A' },
        { label: 'Market Cap', value: company.market_cap || 'N/A' }
    ];

    // Tab configuration
    const tabs = [
        { id: 'risk_metrics', label: 'Risk Metrics' },
        { id: 'financials', label: 'Financial Metrics' },
        { id: 'news', label: 'Latest News' }
    ];

    // Risk metrics for grid display
    const riskMetrics = [
        {
            title: 'Financial Risk',
            score: company.risk_metrics.financial_risk,
            description: 'Based on debt ratio, liquidity, and market conditions'
        },
        {
            title: 'Operational Risk',
            score: company.risk_metrics.operational_risk,
            description: 'Based on process efficiency, supply chain, and management'
        },
        {
            title: 'Regulatory Risk',
            score: company.risk_metrics.regulatory_risk,
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
        <div className="mb-10">
            {/* Company Header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <PageHeader
                    title={company.name}
                    subtitle={`${company.type} | ${company.status}`}
                    rightContent={
                        <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg">
                            <span className="font-semibold mr-2">Overall Risk:</span>
                            <span className={`text-${riskLevel.color}-600 font-bold`}>
                                <RiskIndicator score={riskScore} showLabel={true} />
                            </span>
                        </div>
                    }
                />
                <p className="text-gray-700 mb-4">{company.description}</p>
                <InfoGrid items={infoItems} />
            </div>

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
                                <DoughnutChart
                                    financialRisk={company.risk_metrics.financial_risk}
                                    operationalRisk={company.risk_metrics.operational_risk}
                                    regulatoryRisk={company.risk_metrics.regulatory_risk}
                                    overallRisk={riskScore}
                                />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Historical Risk Trends</h2>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                {historicalRisks ? (
                                    <LineChart
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

                {activeTab === 'financials' && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Overall Financial Risk Score</h2>
                        {financialMetrics ? (
                            <MetricsTable metrics={financialMetrics} companyType={company.type} />
                        ) : (
                            <EmptyState
                                message={
                                    company.ticker
                                        ? 'Financial metrics are currently unavailable for this company.'
                                        : 'Financial metrics are not available for private companies.'
                                }
                            />
                        )}
                    </div>
                )}

                {activeTab === 'news' && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Latest News</h2>
                        {news.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4">
                                {news.map((item, index) => (
                                    <NewsCard key={index} news={item} />
                                ))}
                            </div>
                        ) : (
                            <EmptyState message="No recent news available for this company." />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompanyProfile;

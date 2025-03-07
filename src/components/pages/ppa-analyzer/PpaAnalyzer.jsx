import React, { useState, useRef, useEffect } from 'react';
import {
    getProjects,
    getProject,
    uploadPpaDocument,
    deletePpaDocument
} from '../../../services/api';
import ProjectSelection from './ProjectSelection';
import DocumentUpload from './DocumentUpload';
import RiskAnalysisTab from './tabs/RiskAnalysisTab';
import FinancialImpactTab from './tabs/FinancialImpactTab';
import ComplianceMonitorTab from './tabs/ComplianceMonitorTab';
import TabNavigation from '../../common/TabNavigation';
import PageHeader from '../../common/PageHeader';
import { formatFileSize } from './utils/formatters';

const PpaAnalyzer = () => {
    const [ppaDocument, setPpaDocument] = useState(null);
    const [loading, setLoading] = useState(false);
    const [projectsLoading, setProjectsLoading] = useState(false);
    const [documentLoading, setDocumentLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('risk_analysis');
    const [projects, setProjects] = useState([]);
    const [projectsWithPpa, setProjectsWithPpa] = useState({});
    const [selectedProject, setSelectedProject] = useState('');
    const [uploadStatus, setUploadStatus] = useState('');
    const fileInputRef = useRef(null);
    const [results, setResults] = useState(null);
    const [financialTerms, setFinancialTerms] = useState(null);
    const [simulationParams, setSimulationParams] = useState({
        basePrice: 50,
        annualCapacity: 100,
        capacityFactor: 85,
        contractYears: 20,
        escalationRate: 2.0,
        discountRate: 5.0
    });

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

    // Fetch projects on component mount
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setProjectsLoading(true);
                const projectsData = await getProjects();

                // Create a mapping of project IDs to whether they have PPAs
                const ppaMapping = {};
                for (const project of projectsData) {
                    ppaMapping[project._id] = !!project.ppaDocument;
                }

                setProjectsWithPpa(ppaMapping);
                setProjects(projectsData);
                setProjectsLoading(false);
            } catch (err) {
                setError('Failed to fetch projects');
                setProjectsLoading(false);
                console.error('Error fetching projects:', err);
            }
        };

        fetchProjects();
    }, []);

    // Handle project selection change with immediate loading state
    const handleProjectChange = (e) => {
        const newProjectId = e.target.value;

        // Set loading state immediately if selecting a project with PPA
        if (newProjectId && projectsWithPpa[newProjectId]) {
            setDocumentLoading(true);
        }

        setSelectedProject(newProjectId);
        setUploadStatus(''); // Clear upload status when switching projects
    };

    // Fetch PPA document when project is selected
    useEffect(() => {
        if (selectedProject) {
            fetchPpaDocument();
        } else {
            setPpaDocument(null);
            setDocumentLoading(false);
        }
    }, [selectedProject]);

    const simulatePpaAnalysis = () => {
        // Mock results - in a real app, this would come from API
        const mockResults = {
            summary: "This Power Purchase Agreement (PPA) establishes a 20-year contract for the purchase of electricity from a 100MW solar facility.",
            risks: [
                { id: 1, category: "Pricing", severity: "HIGH", description: "Escalation clause allows for price increases above market rates", mitigation: "Consider renegotiating the escalation formula or adding caps" },
                { id: 2, category: "Operational", severity: "MEDIUM", description: "Ambiguous performance guarantees for capacity factors", mitigation: "Clarify minimum performance standards and consequences" },
                // More risks would be here
            ]
        };

        setResults(mockResults);

        // Mock financial terms
        const mockFinancialTerms = {
            price_structure: "Fixed base price of $50/MWh with 2% annual escalation",
            duration: "20-year term with optional 5-year extension",
            payment_terms: "Monthly payments with 30-day settlement period",
            commitments: "100MW capacity with 85% annual capacity factor guarantee",
            escalation: "2% annual escalation with adjustment for CPI over 3%",
            credit_requirements: "Initial $5M letter of credit, adjusted annually based on project value"
        };

        setFinancialTerms(mockFinancialTerms);

        // Set simulation params based on extracted terms
        setSimulationParams({
            basePrice: 50,
            annualCapacity: 100,
            capacityFactor: 85,
            contractYears: 20,
            escalationRate: 2.0,
            discountRate: 5.0
        });
    };

    const fetchPpaDocument = async () => {
        if (!selectedProject) return;

        // If we already know this project doesn't have a PPA, don't even try to fetch
        if (projectsWithPpa[selectedProject] === false) {
            setPpaDocument(null);
            setDocumentLoading(false);
            return;
        }

        try {
            setError(null);

            // Check if project has a PPA document
            const projectData = await getProject(selectedProject);

            if (projectData.ppaDocument) {
                // Create document URL
                const url = `${API_URL}/projects/${selectedProject}/documents/ppa`;

                setPpaDocument({
                    name: projectData.ppaDocument.filename,
                    url: url,
                    size: formatFileSize(projectData.ppaDocument.fileSize),
                    uploadDate: new Date(projectData.ppaDocument.uploadDate).toLocaleDateString()
                });

                // Update our tracking map in case it was wrong
                setProjectsWithPpa(prev => ({
                    ...prev,
                    [selectedProject]: true
                }));

                // Add this line to simulate loading results
                simulatePpaAnalysis();
            } else {
                setPpaDocument(null);

                // Update our tracking map in case it was wrong
                setProjectsWithPpa(prev => ({
                    ...prev,
                    [selectedProject]: false
                }));
            }

            // Always turn off loading when done
            setDocumentLoading(false);
        } catch (err) {
            setError('Failed to fetch PPA document');
            setDocumentLoading(false);
            setPpaDocument(null);
            console.error('Error fetching PPA document:', err);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            setError(null);
            uploadPpaDocumentHandler(file);
        } else if (file) {
            setError('Please upload a valid PDF file');
        }
    };

    const uploadPpaDocumentHandler = async (file) => {
        if (!selectedProject) {
            setError('Please select a project first');
            return;
        }

        try {
            setLoading(true);
            setUploadStatus('Uploading...');

            const formData = new FormData();
            formData.append('ppaDocument', file);

            await uploadPpaDocument(selectedProject, formData);

            setProjectsWithPpa({
                ...projectsWithPpa,
                [selectedProject]: true
            });

            setUploadStatus('Upload successful');
            await fetchPpaDocument();
            setLoading(false);
        } catch (err) {
            setError('Failed to upload PPA document');
            setUploadStatus('Upload failed');
            setLoading(false);
            console.error('Error uploading PPA document:', err);
        }
    };

    const handleRemoveFile = async () => {
        if (!selectedProject || !ppaDocument) return;

        try {
            setLoading(true);
            await deletePpaDocument(selectedProject);

            setProjectsWithPpa({
                ...projectsWithPpa,
                [selectedProject]: false
            });

            setPpaDocument(null);
            setResults(null);
            setFinancialTerms(null);
            setLoading(false);

            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (err) {
            setError('Failed to delete PPA document');
            setLoading(false);
            console.error('Error deleting PPA document:', err);
        }
    };

    const handleParamChange = (e) => {
        const { name, value } = e.target;
        setSimulationParams(prevParams => ({
            ...prevParams,
            [name]: parseFloat(value)
        }));
    };

    return (
        <div className="mb-10">
            {/* Header and Project Selection */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <PageHeader
                    title="PPA Document Analyzer"
                    subtitle="Upload and analyze Power Purchase Agreement documents"
                />

                <ProjectSelection
                    projects={projects}
                    selectedProject={selectedProject}
                    handleProjectChange={handleProjectChange}
                    projectsLoading={projectsLoading}
                    error={error}
                />

                {/* Document Upload Component */}
                {selectedProject && (
                    <DocumentUpload
                        ppaDocument={ppaDocument}
                        documentLoading={documentLoading}
                        handleFileChange={handleFileChange}
                        handleRemoveFile={handleRemoveFile}
                        loading={loading}
                        error={error}
                        uploadStatus={uploadStatus}
                        fileInputRef={fileInputRef}
                    />
                )}
            </div>

            {/* Tabs Navigation and Content */}
            {ppaDocument && (
                <>
                    <TabNavigation
                        tabs={[
                            { id: 'risk_analysis', label: 'Risk Analysis' },
                            { id: 'financial_impact', label: 'Financial Impact' },
                            { id: 'compliance_monitor', label: 'Compliance Monitor' }
                        ]}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />

                    {/* Tab Content */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        {activeTab === 'risk_analysis' && (
                            <RiskAnalysisTab ppaDocument={ppaDocument} results={results} />
                        )}

                        {activeTab === 'financial_impact' && (
                            <FinancialImpactTab
                                ppaDocument={ppaDocument}
                                financialTerms={financialTerms}
                                simulationParams={simulationParams}
                                handleParamChange={handleParamChange}
                            />
                        )}

                        {activeTab === 'compliance_monitor' && (
                            <ComplianceMonitorTab ppaDocument={ppaDocument} />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default PpaAnalyzer;

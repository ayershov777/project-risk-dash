import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import PageHeader from '../common/PageHeader';
import SearchFilterBar from '../common/SearchFilterBar';
import RiskIndicator from '../common/RiskIndicator';
import { LoadingState, ErrorState, EmptyState } from '../common/LoadingErrorStates';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getProjects();
                setProjects(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch projects');
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) return <LoadingState message="Loading projects..." />;
    if (error) return <ErrorState message={error} />;

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === '' || project.type === filterType;
        return matchesSearch && matchesType;
    });

    const projectTypes = [...new Set(projects.map(project => project.type))];

    return (
        <div>
            <PageHeader title="My Projects" />

            <SearchFilterBar
                title="Filter Projects"
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                searchPlaceholder="Search by project name"
                filterOptions={projectTypes}
                filterValue={filterType}
                onFilterChange={setFilterType}
                filterPlaceholder="All Types"
            />

            {filteredProjects.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <p className="text-gray-700 mb-4">No projects found that involve your company.</p>
                    <p className="text-gray-600">Projects that involve {user.company.name} will appear here.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map(project => (
                        <ProjectCard key={project._id} project={project} />
                    ))}
                </div>
            )}
        </div>
    );
};

const ProjectCard = ({ project }) => {
    const riskScore = project.averageRiskScore;

    return (
        <Link
            to={`/projects/${project._id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
            <div className="p-4 border-b">
                <div className="flex justify-between items-start">
                    <h2 className="text-lg font-semibold text-gray-900">{project.name}</h2>
                    <RiskIndicator score={riskScore} />
                </div>
                <p className="text-sm text-gray-600">{project.type}</p>
            </div>

            <div className="p-4">
                <div className="mb-4">
                    <p className="text-sm text-gray-500">Completion</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                        <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${project.completion}%` }}
                        ></div>
                    </div>
                    <p className="text-right text-xs text-gray-500 mt-1">{project.completion}%</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-gray-500">Location</p>
                        <p className="font-medium">{project.location}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Status</p>
                        <p className="font-medium">{project.status}</p>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                    <p className="text-xs text-gray-500">Companies Involved</p>
                    <div className="flex flex-wrap mt-2">
                        {project.partners && project.partners.map((partner, index) => (
                            <span
                                key={index}
                                className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded"
                                title={partner.role}
                            >
                                {partner.company}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProjectList;

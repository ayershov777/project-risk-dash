import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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

    if (loading) return <div className="text-center py-10">Loading dashboard...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

    // Calculate high risk projects
    const highRiskProjects = projects.filter(project => project.averageRiskScore >= 45);

    // Get projects by status
    const projectsByStatus = projects.reduce((acc, project) => {
        acc[project.status] = (acc[project.status] || 0) + 1;
        return acc;
    }, {});

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">Total Projects</h2>
                    <p className="text-3xl font-bold">{projects.length}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">High Risk Projects</h2>
                    <p className="text-3xl font-bold text-red-600">{highRiskProjects.length}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">Active Projects</h2>
                    <p className="text-3xl font-bold">{projectsByStatus['Under Construction'] || 0}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">Completed Projects</h2>
                    <p className="text-3xl font-bold">{projectsByStatus['Operational'] || 0}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* High Risk Projects Section */}
                <div className="bg-white rounded-lg shadow">
                    <div className="p-4 border-b">
                        <h2 className="text-lg font-semibold">High Risk Projects</h2>
                    </div>
                    <div className="p-4">
                        {highRiskProjects.length > 0 ? (
                            <div className="space-y-4">
                                {highRiskProjects.map(project => (
                                    <Link
                                        key={project._id}
                                        to={`/projects/${project._id}`}
                                        className="block p-4 border rounded-lg hover:bg-gray-50"
                                    >
                                        <div className="flex justify-between">
                                            <div>
                                                <h3 className="font-medium">{project.name}</h3>
                                                <p className="text-sm text-gray-600">{project.type}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-semibold text-red-600">🔴 {project.averageRiskScore}</p>
                                                <p className="text-sm text-gray-600">{project.status}</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center py-4 text-gray-600">No high risk projects found.</p>
                        )}
                    </div>
                </div>

                {/* Recent Projects Section */}
                <div className="bg-white rounded-lg shadow">
                    <div className="p-4 border-b">
                        <h2 className="text-lg font-semibold">Recent Projects</h2>
                    </div>
                    <div className="p-4">
                        {projects.length > 0 ? (
                            <div className="space-y-4">
                                {projects.slice(0, 5).map(project => {
                                    const riskIndicator = project.averageRiskScore < 35 ? '🟢' : project.averageRiskScore < 45 ? '🟡' : '🔴';

                                    return (
                                        <Link
                                            key={project._id}
                                            to={`/projects/${project._id}`}
                                            className="block p-4 border rounded-lg hover:bg-gray-50"
                                        >
                                            <div className="flex justify-between">
                                                <div>
                                                    <h3 className="font-medium">{project.name}</h3>
                                                    <p className="text-sm text-gray-600">{project.type}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-lg font-semibold">{riskIndicator} {project.averageRiskScore}</p>
                                                    <p className="text-sm text-gray-600">{project.status}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-center py-4 text-gray-600">No projects found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

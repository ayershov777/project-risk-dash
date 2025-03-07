import React from 'react';

const ProjectSelection = ({
    projects,
    selectedProject,
    handleProjectChange,
    projectsLoading,
    error
}) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center my-6">
            <h2 className="text-xl font-semibold">Project Selection</h2>

            {projectsLoading && projects.length === 0 ? (
                <div className="text-center py-2">Loading projects...</div>
            ) : error && projects.length === 0 ? (
                <div className="text-center py-2 text-red-500">{error}</div>
            ) : (
                <div className="w-full md:w-1/2 lg:w-1/3">
                    <label htmlFor="project-select" className="block text-sm font-medium text-gray-700 mb-1">
                        Select a project
                    </label>
                    <select
                        id="project-select"
                        value={selectedProject}
                        onChange={handleProjectChange}
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                        <option value="">-- Select a project --</option>
                        {projects.map((project) => (
                            <option key={project._id} value={project._id}>
                                {project.name} - {project.type} ({project.status})
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
};

export default ProjectSelection;

// client/src/components/layout/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
    const location = useLocation();
    const { user } = useAuth();

    if (!user) return null;

    const isActive = (path) => {
        return location.pathname === path ? 'bg-blue-700 text-white' : 'text-gray-700 hover:bg-gray-100';
    };

    return (
        <aside className="w-64 h-screen bg-white border-r border-gray-200 fixed pt-16 left-0">
            <div className="h-full px-3 py-4 overflow-y-auto">
                <div className="mb-5 px-4 py-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">Logged in as</p>
                    <p className="text-base font-semibold text-gray-900 truncate">{user.name}</p>
                    <p className="text-sm text-gray-600 truncate">{user.company.name}</p>
                </div>

                <ul className="space-y-2">
                    <li>
                        <Link to="/" className={`flex items-center p-2 rounded-lg ${isActive('/')}`}>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                            </svg>
                            <span className="ml-3">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/projects" className={`flex items-center p-2 rounded-lg ${isActive('/projects')}`}>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"></path>
                            </svg>
                            <span className="ml-3">My Projects</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/companies" className={`flex items-center p-2 rounded-lg ${isActive('/companies')}`}>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h6v4H7V5zm2 5h2v1H9v-1zm0 2h2v1H9v-1zm6-2h-2v1h2v-1zm0 2h-2v1h2v-1zM7 13h6v1H7v-1z" clipRule="evenodd"></path>
                            </svg>
                            <span className="ml-3">Companies</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/ppa" className={`flex items-center p-2 rounded-lg ${isActive('/ppa')}`}>
                            <svg className="w-6 h-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <mask id="dollar-mask">
                                        <rect width="20" height="20" fill="white" />
                                        <text x="10" y="12" textAnchor="middle" fontSize="8" fontWeight="bold" fill="black">$</text>
                                    </mask>
                                </defs>
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" fill="currentColor" mask="url(#dollar-mask)" />
                            </svg>
                            <span className="ml-3">PPA Analyzer</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;

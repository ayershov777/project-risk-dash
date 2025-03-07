import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Sidebar from './layout/Sidebar';
import Dashboard from './pages/Dashboard';
import ProjectList from './pages/ProjectList';
import ProjectDetail from './pages/ProjectDetail';
import CompanyProfile from './pages/CompanyProfile';
import AllCompanies from './pages/AllCompanies';
import Login from './auth/Login';
import Signup from './auth/Signup';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import PpaAnalyzer from './pages/ppa-analyzer/PpaAnalyzer';

// Protected route component
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

const AppContent = () => {
    const { user } = useAuth();

    return (
        <div className="flex h-screen bg-gray-100">
            {user && <Sidebar />}
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className={`flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 ${user ? 'pl-64' : ''} pt-16`}>
                    <div className="p-6">
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />

                            <Route path="/" element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            } />

                            <Route path="/projects" element={
                                <ProtectedRoute>
                                    <ProjectList />
                                </ProtectedRoute>
                            } />

                            <Route path="/projects/:id" element={
                                <ProtectedRoute>
                                    <ProjectDetail />
                                </ProtectedRoute>
                            } />

                            <Route path="/companies" element={
                                <ProtectedRoute>
                                    <AllCompanies />
                                </ProtectedRoute>
                            } />

                            <Route path="/companies/:id" element={
                                <ProtectedRoute>
                                    <CompanyProfile />
                                </ProtectedRoute>
                            } />

                            <Route path="/ppa" element={
                                <ProtectedRoute>
                                    <PpaAnalyzer />
                                </ProtectedRoute>
                            } />
                        </Routes>
                    </div>
                </main>
            </div>
        </div>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
};

export default App;

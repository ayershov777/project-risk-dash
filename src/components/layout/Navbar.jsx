import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white border-b border-gray-200 px-4 py-2.5 fixed w-full z-50">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <div className="flex items-center">
                    <Link to="/" className="flex items-center">
                        <span className="self-center text-xl font-semibold whitespace-nowrap">Renewable Risk Dashboard</span>
                    </Link>
                </div>
                <div className="flex items-center">
                    {user ? (
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">
                                {user.company.name}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                            >
                                Logout
                            </button>
                            <button type="button" className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300">
                                <span className="sr-only">Open user menu</span>
                                <img className="w-8 h-8 rounded-full" src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} alt="user" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex space-x-4">
                            <Link
                                to="/login"
                                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2"
                            >
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

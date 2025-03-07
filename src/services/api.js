// client/src/services/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Important for cookies with credentials
});

// Auth

export const login = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const signup = async (userData) => {
    try {
        const response = await api.post('/auth/signup', userData);
        return response.data;
    } catch (error) {
        console.error('Signup error:', error);
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await api.post('/auth/logout');
        return response.data;
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
};

// Projects

export const getProjects = async () => {
    try {
        const response = await api.get('/projects');
        return response.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
};

export const getProject = async (id) => {
    try {
        const response = await api.get(`/projects/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching project ${id}:`, error);
        throw error;
    }
};

export const getProjectCompanies = async (id) => {
    try {
        const response = await api.get(`/projects/${id}/companies`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching companies for project ${id}:`, error);
        throw error;
    }
};

// Project Documents
export const getProjectDocuments = async (projectId) => {
    try {
        const response = await api.get(`/projects/${projectId}/documents`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching documents for project ${projectId}:`, error);
        throw error;
    }
};

export const uploadProjectDocument = async (projectId, formData) => {
    try {
        const response = await api.post(`/projects/${projectId}/documents`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error uploading document for project ${projectId}:`, error);
        throw error;
    }
};

export const deleteProjectDocument = async (projectId, documentId) => {
    try {
        const response = await api.delete(`/projects/${projectId}/documents/${documentId}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting document ${documentId} for project ${projectId}:`, error);
        throw error;
    }
};

export const analyzeDocument = async (projectId, filename) => {
    try {
        const response = await api.post(`/projects/${projectId}/documents/analyze`, { filename });
        return response.data;
    } catch (error) {
        console.error(`Error analyzing document for project ${projectId}:`, error);
        throw error;
    }
};

// Companies

export const getAllCompanies = async () => {
    try {
        const response = await api.get('/companies');
        return response.data;
    } catch (error) {
        console.error('Error fetching all companies:', error);
        throw error;
    }
};

export const getCompany = async (id) => {
    try {
        const response = await api.get(`/companies/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching company ${id}:`, error);
        throw error;
    }
};

export const getCompanyNews = async (id) => {
    try {
        const response = await api.get(`/companies/${id}/news`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching news for company ${id}:`, error);
        throw error;
    }
};

export const getFinancialMetrics = async (id) => {
    try {
        const response = await api.get(`/companies/${id}/financial`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching financial metrics for company ${id}:`, error);
        throw error;
    }
};

export const getCompanyHistoricalRisks = async (id) => {
    try {
        const response = await api.get(`/companies/${id}/historical-risks`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching historical risks for company ${id}:`, error);
        throw error;
    }
};

export const getProjectHistoricalRisks = async (id) => {
    try {
        const response = await api.get(`/projects/${id}/historical-risks`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching historical risks for project ${id}:`, error);
        throw error;
    }
};

export const uploadPpaDocument = async (projectId, formData) => {
    try {
        const response = await api.post(`/projects/${projectId}/documents/ppa`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error uploading PPA document for project ${projectId}:`, error);
        throw error;
    }
};

export const getPpaDocument = async (projectId) => {
    try {
        const response = await api.get(`/projects/${projectId}/documents/ppa`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching PPA document for project ${projectId}:`, error);
        throw error;
    }
};

export const deletePpaDocument = async (projectId) => {
    try {
        const response = await api.delete(`/projects/${projectId}/documents/ppa`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting PPA document for project ${projectId}:`, error);
        throw error;
    }
};

export default api;

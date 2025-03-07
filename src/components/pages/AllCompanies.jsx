import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCompanies } from '../../services/api';
import PageHeader from '../common/PageHeader';
import SearchFilterBar from '../common/SearchFilterBar';
import RiskIndicator, { getRiskLevel } from '../common/RiskIndicator';
import { LoadingState, ErrorState } from '../common/LoadingErrorStates';

const AllCompanies = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('');

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                setLoading(true);
                const data = await getAllCompanies();
                setCompanies(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch companies');
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    if (loading) return <LoadingState message="Loading companies..." />;
    if (error) return <ErrorState message={error} />;

    const filteredCompanies = companies.filter(company => {
        const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === '' || company.type === filterType;
        return matchesSearch && matchesType;
    });

    const companyTypes = [...new Set(companies.map(company => company.type))];

    return (
        <div>
            <PageHeader title="Companies" />

            <SearchFilterBar
                title="Filter Companies"
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                searchPlaceholder="Search by company name"
                filterOptions={companyTypes}
                filterValue={filterType}
                onFilterChange={setFilterType}
                filterPlaceholder="All Types"
            />

            <div className="bg-white rounded-lg shadow">
                <div className="p-4 bg-gray-50 border-b">
                    <h2 className="text-lg font-semibold">
                        Company Directory
                        <span className="ml-2 text-sm font-normal text-gray-500">
                            ({filteredCompanies.length} companies)
                        </span>
                    </h2>
                </div>
                <div className="p-4">
                    {filteredCompanies.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredCompanies.map(company => (
                                <CompanyCard key={company._id} company={company} />
                            ))}
                        </div>
                    ) : (
                        <div className="col-span-full text-center py-10 text-gray-500">
                            No companies found matching your filters.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const CompanyCard = ({ company }) => {
    // Use the backend-calculated risk score
    const riskScore = company.averageRiskScore;

    return (
        <Link
            to={`/companies/${company._id}`}
            className="bg-white border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
        >
            <div className="p-4 border-b">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
                    <RiskIndicator score={riskScore} />
                </div>
                <p className="text-sm text-gray-600">{company.type}</p>
            </div>

            <div className="p-4">
                <p className="text-sm text-gray-700 mb-4">{company.description && company.description.substring(0, 100)}...</p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-gray-500">Founded</p>
                        <p className="font-medium">{company.founded || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Status</p>
                        <p className="font-medium">{company.status}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Headquarters</p>
                        <p className="font-medium">{company.headquarters || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Employees</p>
                        <p className="font-medium">{company.employees || 'N/A'}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default AllCompanies;

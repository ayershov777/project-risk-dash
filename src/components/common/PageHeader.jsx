import React from 'react';

/**
 * Reusable page header component with title and optional right content
 */
const PageHeader = ({ title, subtitle, rightContent }) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
                <h1 className="text-2xl font-bold">{title}</h1>
                {subtitle && <p className="text-gray-600">{subtitle}</p>}
            </div>
            {rightContent && (
                <div className="mt-4 md:mt-0">
                    {rightContent}
                </div>
            )}
        </div>
    );
};

export default PageHeader;

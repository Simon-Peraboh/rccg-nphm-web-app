import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReport, SpecialProjectsReportDTO } from '../services/AuthServiceSpecialProjects';
import { toast, ToastContainer } from 'react-toastify';

const SpecialProjectsView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const reportId = id as string;

    const [report, setReport] = useState<SpecialProjectsReportDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await getReport(reportId);
                setReport(response.data); // Ensure the response structure matches
                setLoading(false);
            } catch (error) {
                toast.error('Failed to fetch report');
                setLoading(false);
            }
        };

        fetchReport();
    }, [reportId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!report) {
        return <div>Report not found</div>;
    }

    return (
        <div className="max-w-lg mx-auto p-4 shadow-lg rounded-md bg-white">
            <h1 className="text-2xl font-bold mb-4 text-center">Special Projects Details</h1>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Project Name:</label>
                <p>{report.projectName}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Project Description:</label>
                <p>{report.projectDescription}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Project Location:</label>
                <p>{report.projectLocation}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">State:</label>
                <p>{report.state}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Project Estimate:</label>
                <p>{report.projectEstimate}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Project Cost:</label>
                <p>{report.projectCost}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Project Start Date:</label>
                <p>{report.projectStartDate}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Project Completed Date:</label>
                <p>{report.projectCompletedDate}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Project Manager:</label>
                <p>{report.projectManager}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Project Aid:</label>
                <p>{report.projectAid}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Remarks:</label>
                <p>{report.projectRemarks}</p>
            </div>
             <ToastContainer position='top-center' />
        </div>
    );
};

export default SpecialProjectsView;

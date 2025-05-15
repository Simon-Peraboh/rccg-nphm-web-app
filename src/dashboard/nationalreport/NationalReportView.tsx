import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReportById, NationalReportDTO } from '../services/AuthServiceNationalReport';
import { toast } from 'react-toastify';

const NationalReportView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const reportId = id as string;

    const [report, setReport] = useState<NationalReportDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await getReportById(reportId);
                setReport(response.data);
                console.log(response);
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
            <h1 className="text-2xl font-bold mb-4 text-center">National Report Details</h1>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Core Duties:</label>
                <p>{report.coreDuties}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Monthly Task:</label>
                <p>{report.monthlyTask}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Task Done:</label>
                <p>{report.taskDone}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Strength:</label>
                <p>{report.strength}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Weakness:</label>
                <p>{report.weakness}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Opportunities:</label>
                <p>{report.opportunities}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Threats:</label>
                <p>{report.threats}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Amount Budgeted:</label>
                <p>{report.amountBudgeted}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Amount Spent:</label>
                <p>{report.amountSpent}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Created Date:</label>
                <p>{report.createdDate}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Remark:</label>
                <p>{report.remarks}</p>
            </div>
        </div>
    );
};

export default NationalReportView;

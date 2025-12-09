import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReport, QuarterlyReportDTO } from '../services/AuthServiceQuarterlyReport';
import { toast } from 'react-toastify';

const QuarterlyReportView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const reportId = id as string;

    const [report, setReport] = useState<QuarterlyReportDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await getReport(reportId);
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
            <h1 className="text-2xl font-bold mb-4 text-center">Quarterly Report Details</h1>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Year:</label>
                <p>{report.whichYear}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Period:</label>
                <p>{report.period}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Total Souls:</label>
                <p>{report.totalSouls}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Total Amount:</label>
                <p>{report.totalAmount}</p>
            </div>
        </div>
    );
};

export default QuarterlyReportView;

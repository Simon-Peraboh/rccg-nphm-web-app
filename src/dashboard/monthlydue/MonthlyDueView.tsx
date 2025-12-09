import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReport, MonthlyDuePaymentDTO } from '../services/AuthServiceDuePayment';
import { toast } from 'react-toastify';

const MonthlyDueView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const reportId = id as string;

    const [report, setReport] = useState<MonthlyDuePaymentDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await getReport(reportId);
                setReport(response.data);
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
            <h1 className="text-2xl font-bold mb-4">Monthly Due Report Details</h1>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Amount Paid:</label>
                <p>{report.amount}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Province:</label>
                <p>{report.province}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Payment Date:</label>
                <p>{report.paymentDate}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Province Coordinator:</label>
                <p>{report.provinceCoordinator}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Reference Month:</label>
                <p>{report.refMonth}</p>
            </div>
            {/* <div className="mb-4">
                <label className="block text-gray-700 font-bold">Created Date:</label>
                <p>{report.createdDate}</p>
            </div> */}
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Remark:</label>
                <p>{report.remark}</p>
            </div>
        </div>
    );
};

export default MonthlyDueView;

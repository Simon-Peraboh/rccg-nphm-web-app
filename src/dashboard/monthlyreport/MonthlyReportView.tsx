import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReportById, MonthlyReportDTO } from '../services/AuthServiceMonthlyReport';
import { toast } from 'react-toastify';

const MonthlyReportView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const reportId = id as string;

    const [report, setReport] = useState<MonthlyReportDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await getReportById(reportId);
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
            <h1 className="text-2xl font-bold mb-4 text-center">Monthly Report Details</h1>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">State:</label>
                <p>{report.state}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Region:</label>
                <p>{report.region}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Province:</label>
                <p>{report.province}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Province Coordinator:</label>
                <p>{report.coordinatorName}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Prison Visited:</label>
                <p>{report.prisonVisited}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Hospital Visited:</label>
                <p>{report.hospitalVisited}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Police Station Visited:</label>
                <p>{report.policeStationVisited}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Province Coordinator:</label>
                <p>{report.coordinatorName}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Other Places Visited:</label>
                <p>{report.others}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Items Used For The Visit:</label>
                <p>{report.items}</p>
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
                <label className="block text-gray-700 font-bold">Team Members:</label>
                <p>{report.teamMembers}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Souls Won:</label>
                <p>{report.soulsWon}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Challenges:</label>
                <p>{report.challenges}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Suggestion:</label>
                <p>{report.suggestion}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Date Of Visitation:</label>
                <p>{report.activityDate}</p>
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

export default MonthlyReportView;

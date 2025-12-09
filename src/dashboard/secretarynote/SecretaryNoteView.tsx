import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getNote, SecretaryNoteDTO } from '../services/AuthServiceSecretaryNote';
import { toast, ToastContainer } from 'react-toastify';

const SecretaryNoteView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const reportId = id as string;

    const [report, setReport] = useState<SecretaryNoteDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await getNote(reportId);
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
            <h1 className="text-2xl font-bold mb-4 text-center">Secretary Note Details</h1>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Meeting Venue:</label>
                <p>{report.meetingVenue}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Meeting Anchor:</label>
                <p>{report.meetingAnchor}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Attendance Men:</label>
                <p>{report.attendanceMen}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Attendance Women:</label>
                <p>{report.attendanceWomen}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Attendance Children:</label>
                <p>{report.attendanceChildren}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Attendance Total:</label>
                <p>{report.attendanceTotal}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Detail Of Meeting:</label>
                <p>{report.detailOfMeeting}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Actionable Points:</label>
                <p>{report.actionablePoints}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Actionable Points Assigned:</label>
                <p>{report.actionablePointsAssigned}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Date Of Meeting:</label>
                <p>{report.meetingDate}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold">Created Date:</label>
                <p>{report.createdDate}</p>
            </div>
            <ToastContainer position='top-center' />
        </div>
    );
};

export default SecretaryNoteView;

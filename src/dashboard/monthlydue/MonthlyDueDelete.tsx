import React from 'react';
import { deleteReport } from '../services/AuthServiceDuePayment';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DeleteReport: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

     // Type assertion to ensure `id` is a string
     const reportId = id as string;


    const handleDelete = async () => {
        try {
            const response = await deleteReport(reportId);
            toast.success(response.data.message);
            navigate('/monthlyDuesReport'); // Redirect to list view after deletion
        } catch (error) {
            toast.error('Failed to delete report');
        }
    };

    return (
        <div>
            <h2>Delete Report</h2>
            <button onClick={handleDelete}>Confirm Delete</button>
        </div>
    );
};

export default DeleteReport;

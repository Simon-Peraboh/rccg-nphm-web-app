import React, { useEffect } from 'react';
import { deleteReport } from '../services/AuthServiceDuePayment';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const DeleteReport: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      toast.error('Missing report ID');
      navigate('/dashboard/monthlyDueTable');
      return;
    }

    const handleDelete = async () => {
      try {
        const response = await deleteReport(id);
        toast.success(response.data.message || 'Report deleted successfully');
        setTimeout(() => navigate('/dashboard/monthlyDueTable'), 2000);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const msg =
            error.response?.data?.message ||
            error.response?.data?.error ||
            'Failed to delete report';
          toast.error(msg);
        } else {
          toast.error('Unexpected error');
        }
      }
    };

    handleDelete();
  }, [id, navigate]);

  return (
    <div>
      <h2 className="text-xl text-center mt-10 font-bold">Deleting Report...</h2>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default DeleteReport;

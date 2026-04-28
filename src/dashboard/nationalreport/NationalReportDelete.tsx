import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useDeleteNationalReport } from "../hooks/useNationalReport";

const NationalReportDelete: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const deleteMutation = useDeleteNationalReport();

  useEffect(() => {
    if (!id) {
      toast.error("Missing report ID");
      navigate("/dashboard/nationalReportTable");
      return;
    }

    const handleDelete = async () => {
      try {
        await deleteMutation.mutateAsync(id);
        setTimeout(() => navigate("/dashboard/nationalReportTable"), 1500);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          toast.error(
            error.response?.data?.message ||
              error.response?.data?.error ||
              "Failed to delete report"
          );
        } else if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Unexpected error");
        }
      }
    };

    handleDelete();
  }, [id, navigate, deleteMutation]);

  return (
    <div className="p-10 text-center">
      <h2 className="text-xl font-bold">Deleting Report...</h2>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default NationalReportDelete;
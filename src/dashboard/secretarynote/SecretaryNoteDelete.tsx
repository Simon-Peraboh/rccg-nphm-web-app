import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useDeleteSecretaryNote } from "../hooks/useSecretaryNote";

const SecretaryNoteDelete: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const deleteMutation = useDeleteSecretaryNote();

  useEffect(() => {
    if (!id) {
      toast.error("Missing note ID");
      navigate("/dashboard/secretaryNoteTable");
      return;
    }

    const handleDelete = async () => {
      try {
        await deleteMutation.mutateAsync(id);
        setTimeout(() => navigate("/dashboard/secretaryNoteTable"), 1500);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          toast.error(
            error.response?.data?.message ||
              error.response?.data?.error ||
              "Failed to delete note"
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
      <h2 className="text-xl font-bold">Deleting Note...</h2>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default SecretaryNoteDelete;
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDeleteUserProfile } from "../hooks/useUserProfile";

const UserProfileDelete: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const deleteMutation = useDeleteUserProfile();

  useEffect(() => {
    if (!id) {
      toast.error("Missing profile ID");
      navigate("/dashboard/userProfileTable");
      return;
    }

    const handleDelete = async () => {
      try {
        await deleteMutation.mutateAsync(Number(id));
        setTimeout(() => navigate("/dashboard/userProfileTable"), 1200);
      } catch (error: unknown) {
        toast.error(error instanceof Error ? error.message : "Delete failed");
      }
    };

    handleDelete();
  }, [id, navigate, deleteMutation]);

  return (
    <div className="p-10 text-center">
      <h2 className="text-xl font-bold">Deleting Profile...</h2>
      <ToastContainer position="top-right" theme="colored" />
    </div>
  );
};

export default UserProfileDelete;
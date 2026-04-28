import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDeleteTodo } from "../hooks/useTodos";

const TodoDeletePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const deleteMutation = useDeleteTodo();

  useEffect(() => {
    if (!id) {
      navigate("/dashboard/todos");
      return;
    }

    const handleDelete = async () => {
      await deleteMutation.mutateAsync(id);
      setTimeout(() => navigate("/dashboard/todos"), 1000);
    };

    handleDelete();
  }, [id, navigate, deleteMutation]);

  return (
    <div className="p-10 text-center">
      <h2 className="text-xl font-bold">Deleting Task...</h2>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default TodoDeletePage;
import React from 'react';
import { createReport, TodoListDTO } from '../services/AuthServiceTodoList';
import TodoForm from './TodoListForm';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const TodoListCreate: React.FC = () => {

  const navigation = useNavigate();

  const handleCreate = async (data: TodoListDTO) => {
    try {
      await createReport(data);
      toast.success('Todo created successfully');
      // Introduce a short delay before navigating
      setTimeout(() => {
        navigation('/dashboard/todoListTable');
      }, 3000); // Display message for 3 seconds
    } catch (error) {
      toast.error('Failed to create todo');
    }
  };

  return (
    <div>
      <h1 className='text text-center text-4xl'>Create Todo</h1>
      <TodoForm onSubmit={handleCreate} todo={null} />
    </div>
  );
};

export default TodoListCreate;

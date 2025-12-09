import React from 'react';
import { createList, TodoListDTO } from '../services/AuthServiceTodoList';
import TodoForm from './TodoListForm';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';
import axios from 'axios';

const TodoListCreate: React.FC = () => {

  const navigation = useNavigate();

  const handleCreate = async (data: TodoListDTO) => {
  try {
    await createList(data);
    toast.success('Todo created successfully');

    setTimeout(() => {
      navigation('/dashboard/todoListTable');
    }, 3000);
  } catch (error: unknown) {
    let message = 'Failed to create todo';

    if (axios.isAxiosError(error)) {
      const backendMessage = error.response?.data?.message;
      const validationErrors = error.response?.data?.errors;

      if (typeof backendMessage === 'string') {
        message = backendMessage;
      } else if (validationErrors && typeof validationErrors === 'object') {
        message = Object.values(validationErrors).flat().join(' ');
      }
    }

    toast.error(message);
  }
};


  return (
    <div>
      <h1 className='text text-center text-4xl'>Create Todo</h1>
      <TodoForm onSubmit={handleCreate} todo={null} />
      <ToastContainer position='top-right' />
    </div>
  );
};

export default TodoListCreate;

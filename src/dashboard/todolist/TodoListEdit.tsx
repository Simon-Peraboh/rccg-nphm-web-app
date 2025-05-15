import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getProjectById, updateReport, TodoListDTO } from '../services/AuthServiceTodoList';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// Define the validation schema using yup
const schema = yup.object().shape({
  task: yup.string().required('Core Duties is required'),
  description: yup.string().required('Monthly task is required'),
  assignee: yup.string().required('Task done is required'),
  startDate: yup.string().required('State is Required'),
  dueDate: yup.string().required('Estimate Time Frame Is Required'),
  status: yup.string().required('Project Cost Required'),
  priority: yup.string().required('Start Date Reuired'),
  assigned: yup.string().required('Amount Budgeted is required'),
  
});

const TodoListEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const reportId = id as string;

  const navigate = useNavigate(); // Hook for navigation

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<TodoListDTO>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await getProjectById(reportId);
        const data = response.data;
        console.log('Fetched data:', data); // Add logging here
        setValue('task', data.task);
        setValue('description', data.description);
        setValue('assignee', data.assignee);
        setValue('startDate', data.startDate);
        setValue('dueDate', data.dueDate);
        setValue('status', data.status);
        setValue('priority', data.priority);
        setValue('assigned', data.assigned || '');
      } catch (error) {
        console.error('Error fetching report:', error); // Add logging here
        toast.error('Failed to fetch report');
      }
    };

    fetchReport();
  }, [reportId, setValue]);

  const onSubmit = async (data: TodoListDTO) => {
    try {
      const response = await updateReport(reportId, data);
      console.log('Response from backend:', response); // Log the response for debugging
      toast.success(response.data.message);

      // Introduce a short delay before navigating
      setTimeout(() => {
        navigate('/dashboard/todoListTable');
      }, 3000); // Display message for 3 seconds

    } catch (error) {
      console.error('Error updating report:', error); // Log the error for debugging
      toast.error('Failed to update report');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-4 shadow-lg rounded-md bg-white">
      <h1 className='text-center text-gray-800'>Edit Task</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Task</label>
        <input 
          type="text" 
          {...register('task')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.task && <p className="text-red-500 text-sm">{errors.task.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <input 
          type="text" 
          {...register('description')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Assignee</label>
        <input 
          type="text" 
          {...register('assignee')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.assignee && <p className="text-red-500 text-sm">{errors.assignee.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Start Date</label>
        <input 
          type="date" 
          {...register('startDate')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Due Date</label>
        <input 
          type="date" 
          {...register('dueDate')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Status</label>
        <input 
          type="text" 
          {...register('status')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Priority</label>
        <input 
          type="text" 
          {...register('priority')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.priority && <p className="text-red-500 text-sm">{errors.priority.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Assigned</label>
        <input 
          type="text" 
          {...register('assigned')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.assigned && <p className="text-red-500 text-sm">{errors.assigned.message}</p>}
      </div>
      
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600">Update Task</button>
    </form>
  );
};

export default TodoListEdit;

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TodoListDTO } from '../services/AuthServiceTodoList';

interface TodoFormProps {
  onSubmit: SubmitHandler<TodoListDTO>;
  todo?: TodoListDTO | null;
}

const TodoListForm: React.FC<TodoFormProps> = ({ onSubmit, todo }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<TodoListDTO>({
    defaultValues: todo || {}
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-4 shadow-lg rounded-md bg-white">
      <div className="mb-4">
        <label className="block text-gray-700">Task</label>
        <input 
          type="text" 
          {...register('task', { required: 'Task is required' })} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.task && <p className="text-red-500 text-sm">{errors.task.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea 
          {...register('description', { required: 'Description is required' })} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        ></textarea>
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Assignee</label>
        <input 
          type="text" 
          {...register('assignee', { required: 'Assignee is required' })} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.assignee && <p className="text-red-500 text-sm">{errors.assignee.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Start Date</label>
        <input 
          type="date" 
          {...register('startDate', { required: 'Start Date is required' })} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Due Date</label>
        <input 
          type="date" 
          {...register('dueDate', { required: 'Due Date is required' })} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Assigned</label>
        <select
          {...register('assigned', {
            required: 'Assigned is required',
            setValueAs: (val) => val === 'yes'
          })}
          className="..."
        >
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>

        {errors.assigned && <p className="text-red-500 text-sm">{errors.assigned.message}</p>}
      </div>

      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600">Save</button>
    </form>
  );
};

export default TodoListForm;

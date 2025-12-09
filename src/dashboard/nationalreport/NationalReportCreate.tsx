import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createReport, NationalReportDTO } from '../services/AuthServiceNationalReport';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Define the validation schema using yup
const schema = yup.object().shape({
  core_duties: yup.string().required('Core Duties is required'),
  monthly_task: yup.string().required('Monthly is required'),
  task_done: yup.string().required('Task Done is required'),
  strength: yup.string().optional(),
  weakness: yup.string().optional(),
  opportunities: yup.string().optional(),
  threats: yup.string().optional(),
  amount_budgeted: yup.string().required('Amount Budgeted is required'),
  amount_spent: yup.string().required('Amount Spent is required'),
  remarks: yup.string().optional(),
});

const NationalReportCreate: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<NationalReportDTO>({
    resolver: yupResolver(schema),
  });

  const navigator = useNavigate();

 const onSubmit = async (data: NationalReportDTO) => {
  try {
    const response = await createReport(data);
    toast.success(response.data.message || "Report created successfully");
    setTimeout(() => navigator('/dashboard/nationalReportTable'), 3000);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data;
      let message = "Failed to create report";

      if (typeof responseData?.message === 'string') {
        message = responseData.message;
      } else if (typeof responseData?.errors === 'object') {
        // Laravel-style validation errors
        const allErrors = Object.values(responseData.errors).flat().join(' ');
        message = allErrors;
      }

      toast.error(message);
    } else {
      toast.error("An unexpected error occurred");
    }
  }
};


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-4 shadow-lg rounded-md bg-white">
      <h1 className='text top-1 text-center text-gray-800'>Create Monthly National Report</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Core Duties</label>
        <input 
          type="text" 
          placeholder='Enter Core Duties'
          {...register('core_duties')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.core_duties && <p className="text-red-500 text-sm">{errors.core_duties.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Monthly Task</label>
        <input 
          type="text"
          placeholder='Enter Monthly Task'
          {...register('monthly_task')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.monthly_task && <p className="text-red-500 text-sm">{errors.monthly_task.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Task Done</label>
        <input 
          type="text" 
          placeholder='Enter Task Done'
          {...register('task_done')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.task_done && <p className="text-red-500 text-sm">{errors.task_done.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Strength</label>
        <input 
          type="text"
          placeholder='Enter Area Of Strength'
          {...register('strength')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.strength && <p className="text-red-500 text-sm">{errors.strength.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Weakness</label>
        <input 
          type="text" 
          placeholder='Enter Area  Of Weakness'
          {...register('weakness')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.weakness && <p className="text-red-500 text-sm">{errors.weakness.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Opportunities</label>
        <input 
          type="text"
          placeholder='Enter Opportunities If Any'
          {...register('opportunities')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.opportunities && <p className="text-red-500 text-sm">{errors.opportunities.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Threats</label>
        <input 
          type="text"
          placeholder='Enter Threats If Any'
          {...register('threats')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.threats && <p className="text-red-500 text-sm">{errors.threats.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Amount Budgeted</label>
        <input 
          type="text"
          placeholder='Enter Amount Budgeted '
          {...register('amount_budgeted')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.amount_budgeted && <p className="text-red-500 text-sm">{errors.amount_budgeted.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Amount Spent</label>
        <input 
          type="text"
          placeholder='How Much Was Spent'
          {...register('amount_spent')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.amount_spent && <p className="text-red-500 text-sm">{errors.amount_spent.message}</p>}
      </div>
     

      <div className="mb-4">
        <label className="block text-gray-700">Remark</label>
        <input 
          type="text"
          placeholder='Enter Remarks If Any'
          {...register('remarks')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.remarks && <p className="text-red-500 text-sm">{errors.remarks.message}</p>}
      </div>

      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600">Create Report</button>
      <ToastContainer position = 'top-center' />
    </form>
  );
};

export default NationalReportCreate;

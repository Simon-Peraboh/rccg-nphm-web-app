import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createReport, NationalReportDTO } from '../services/AuthServiceNationalReport';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Define the validation schema using yup
const schema = yup.object().shape({
  coreDuties: yup.string().required('Core Duties is required'),
  monthlyTask: yup.string().required('Monthly is required'),
  taskDone: yup.string().required('Task Done is required'),
  strength: yup.string().optional(),
  weakness: yup.string().optional(),
  opportunities: yup.string().optional(),
  threats: yup.string().optional(),
  amountBudgeted: yup.string().required('Amount Budgeted is required'),
  amountSpent: yup.string().required('Amount Spent is required'),
  createdDate: yup.string().required('Created Date is required'),
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
      toast.success(response.data.message);
      // Introduce a short delay before navigating
      setTimeout(() => {
        navigator('/dashboard/nationalReportTable');
      }, 3000); // Display message for 3 seconds
    } catch (error) {
      toast.error('Failed to create report');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-4 shadow-lg rounded-md bg-white">
      <h1 className='text top-1 text-center text-gray-800'>Create Monthly Report</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Core Duties</label>
        <input 
          type="text" 
          placeholder='Enter Core Duties'
          {...register('coreDuties')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.coreDuties && <p className="text-red-500 text-sm">{errors.coreDuties.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Monthly Task</label>
        <input 
          type="text"
          placeholder='Enter Monthly Task'
          {...register('monthlyTask')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.monthlyTask && <p className="text-red-500 text-sm">{errors.monthlyTask.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Task Done</label>
        <input 
          type="text" 
          placeholder='Enter Task Done'
          {...register('taskDone')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.taskDone && <p className="text-red-500 text-sm">{errors.taskDone.message}</p>}
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
          {...register('amountBudgeted')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.amountBudgeted && <p className="text-red-500 text-sm">{errors.amountBudgeted.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Amount Spent</label>
        <input 
          type="text"
          placeholder='How Much Was Spent'
          {...register('amountSpent')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.amountSpent && <p className="text-red-500 text-sm">{errors.amountSpent.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Created Date</label>
        <input 
          type="date" 
          {...register('createdDate')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.createdDate && <p className="text-red-500 text-sm">{errors.createdDate.message}</p>}
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
    </form>
  );
};

export default NationalReportCreate;

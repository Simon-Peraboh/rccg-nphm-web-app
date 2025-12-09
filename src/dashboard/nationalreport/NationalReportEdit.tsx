import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getReport, updateReport, NationalReportDTO } from '../services/AuthServiceNationalReport';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

// Define the validation schema using yup
const schema = yup.object().shape({
  core_duties: yup.string().required('Core Duties is required'),
  monthly_task: yup.string().required('Monthly task is required'),
  task_done: yup.string().required('Task done is required'),
  strength: yup.string().optional(),
  weakness: yup.string().optional(),
  opportunities: yup.string().optional(),
  threats: yup.string().optional(),
  amount_budgeted: yup.string().required('Amount Budgeted is required'),
  amount_spent: yup.string().required('Amount Spent is required'),
  remarks: yup.string().optional(),
});

const NationalReportEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const reportId = id as string;

  const navigate = useNavigate(); // Hook for navigation

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<NationalReportDTO>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await getReport(reportId);
        const data = response.data;
        console.log('Fetched data:', data); // Add logging here
        setValue('core_duties', data.core_duties);
        setValue('monthly_task', data.monthly_task);
        setValue('task_done', data.task_done);
        setValue('strength', data.strength);
        setValue('weakness', data.weakness);
        setValue('opportunities', data.opportunities);
        setValue('threats', data.threats);
        setValue('amount_budgeted', data.amount_budgeted);
        setValue('amount_spent', data.amount_spent);
        setValue('remarks', data.remarks || '');
      } catch (error) {
        console.error('Error fetching report:', error); // Add logging here
        toast.error('Failed to fetch report');
      }
    };

    fetchReport();
  }, [reportId, setValue]);

  const onSubmit = async (data: NationalReportDTO) => {
    try {
      const response = await updateReport(reportId, data);
      console.log('Response from backend:', response); // Log the response for debugging
      toast.success(response.data.message);

      // Introduce a short delay before navigating
      setTimeout(() => {
        navigate('/dashboard/nationalReportTable');
      }, 3000); // Display message for 3 seconds

    } catch (error) {
      console.error('Error updating report:', error); // Log the error for debugging
      toast.error('Failed to update report');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-4 shadow-lg rounded-md bg-white">
      <h1 className='text-center text-gray-800'>Edit Report</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Core Duties</label>
        <input 
          type="text" 
          {...register('core_duties')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.core_duties && <p className="text-red-500 text-sm">{errors.core_duties.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Monthly Task</label>
        <input 
          type="text" 
          {...register('monthly_task')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.monthly_task && <p className="text-red-500 text-sm">{errors.monthly_task.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Task Done</label>
        <input 
          type="text" 
          {...register('task_done')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.task_done && <p className="text-red-500 text-sm">{errors.task_done.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Strength</label>
        <input 
          type="text" 
          {...register('strength')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.strength && <p className="text-red-500 text-sm">{errors.strength.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Weakness</label>
        <input 
          type="text" 
          {...register('weakness')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.weakness && <p className="text-red-500 text-sm">{errors.weakness.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Opportunities</label>
        <input 
          type="text" 
          {...register('opportunities')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.opportunities && <p className="text-red-500 text-sm">{errors.opportunities.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Threats</label>
        <input 
          type="text" 
          {...register('threats')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.threats && <p className="text-red-500 text-sm">{errors.threats.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Amount Budgeted</label>
        <input 
          type="text" 
          {...register('amount_budgeted')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.amount_budgeted && <p className="text-red-500 text-sm">{errors.amount_budgeted.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Amount Spent</label>
        <input 
          type="text" 
          {...register('amount_spent')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.amount_spent && <p className="text-red-500 text-sm">{errors.amount_spent.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Remark</label>
        <input 
          type="text" 
          {...register('remarks')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.remarks && <p className="text-red-500 text-sm">{errors.remarks.message}</p>}
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600">Update Report</button>
      <ToastContainer position='top-center' />
    </form>
  );
};

export default NationalReportEdit;

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getProjectById, updateReport, QuarterlyReportDTO } from '../services/AuthServiceQuarterlyReport';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// Define the validation schema using yup
const schema = yup.object().shape({
  whichYear: yup.string().required('Year is required'),
  period: yup.string().required('Period is required'),
  totalSouls: yup.string().required('Souls is required'),
  totalAmount: yup.string().required('Amount is required'),
  creationDate: yup.string().required('Date is required'),
 
});

const QuarterlyReportEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const reportId = id as string;

  const navigate = useNavigate(); // Hook for navigation

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<QuarterlyReportDTO>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await getProjectById(reportId);
        const data = response.data;
        console.log('Fetched data:', data); // Add logging here
        setValue('whichYear', data.whichYear);
        setValue('period', data.period);
        setValue('totalSouls', data.totalSouls);
        setValue('totalAmount', data.totalAmount);
        setValue('creationDate', data.creationDate || '');
        } catch (error) {
        console.error('Error fetching report:', error); // Add logging here
        toast.error('Failed to fetch report');
      }
    };

    fetchReport();
  }, [reportId, setValue]);

  const onSubmit = async (data: QuarterlyReportDTO) => {
    try {
      const response = await updateReport(reportId, data);
      console.log('Response from backend:', response); // Log the response for debugging
      toast.success(response.data.message);

      // Introduce a short delay before navigating
      setTimeout(() => {
        navigate('/dashboard/quarterlyReportTable');
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
        <label className="block text-gray-700">Year</label>
        <input 
          type="text" 
          {...register('whichYear')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.whichYear && <p className="text-red-500 text-sm">{errors.whichYear.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Period</label>
        <input 
          type="text" 
          {...register('period')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.period && <p className="text-red-500 text-sm">{errors.period.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Total Souls</label>
        <input 
          type="text" 
          {...register('totalSouls')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.totalSouls && <p className="text-red-500 text-sm">{errors.totalSouls.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Total Amount</label>
        <input 
          type="text" 
          {...register('totalAmount')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.totalAmount && <p className="text-red-500 text-sm">{errors.totalAmount.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Creation Date</label>
        <input 
          type="date" 
          {...register('creationDate')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.creationDate && <p className="text-red-500 text-sm">{errors.creationDate.message}</p>}
      </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600">Update Report</button>
    </form>
  );
};

export default QuarterlyReportEdit;

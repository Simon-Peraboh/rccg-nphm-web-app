import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createReport, QuarterlyReportDTO } from '../services/AuthServiceQuarterlyReport';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Define the validation schema using yup
const schema = yup.object().shape({
  whichYear: yup.string().required('Year required'),
  period: yup.string().required('Period is required'),
  totalSouls: yup.string().required('Total Souls is required'),
  totalAmount: yup.string().required('Total Amount is required'),
  creationDate: yup.string().required(''),

});

const QuarterlyReportCreate: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<QuarterlyReportDTO>({
    resolver: yupResolver(schema),
  });

  const navigator = useNavigate();

  const onSubmit = async (data: QuarterlyReportDTO) => {
    try {
      const response = await createReport(data);
      toast.success(response.data.message);
      // Introduce a short delay before navigating
      setTimeout(() => {
        navigator('/dashboard/quarterlyReportTable');
      }, 3000); // Display message for 3 seconds
    } catch (error) {
      toast.error('Failed to create report');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-4 shadow-lg rounded-md bg-white">
      <h1 className='text top-1 text-center text-gray-800'>Create Quarterly Report</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Which Year:</label>
        <input 
          type="text" 
          placeholder='Enter Year'
          {...register('whichYear')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.whichYear && <p className="text-red-500 text-sm">{errors.whichYear.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Period</label>
        <input 
          type="text"
          placeholder='Enter Period e.g June-August'
          {...register('period')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.period && <p className="text-red-500 text-sm">{errors.period.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Total Souls</label>
        <input 
          type="text" 
          placeholder='Enter Total Souls Saved In his Period'
          {...register('totalSouls')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.totalSouls && <p className="text-red-500 text-sm">{errors.totalSouls.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Total Amount</label>
        <input 
          type="text"
          placeholder='Enter Amount Spent In This Period'
          {...register('totalAmount')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.totalAmount && <p className="text-red-500 text-sm">{errors.totalAmount.message}</p>}
      </div>

        <div className="mb-4">
        <label className="block text-gray-700">Date Of Creation</label>
        <input 
          type="date" 
          {...register('creationDate')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.creationDate && <p className="text-red-500 text-sm">{errors.creationDate.message}</p>}
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600">Create Report</button>
    </form>
  );
};

export default QuarterlyReportCreate;

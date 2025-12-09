import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createReport, SpecialProjectsReportDTO } from '../services/AuthServiceSpecialProjects';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Define the validation schema using yup
const schema = yup.object().shape({
  projectName: yup.string().required('Core Duties is required'),
  projectDescription: yup.string().required('Monthly is required'),
  projectLocation: yup.string().required('Task Done is required'),
  state: yup.string().required('Women Info is required'),
  projectEstimate: yup.string().required('Children Info is required'),
  projectCost: yup.string().required('Total Attendance required'),
  projectStartDate: yup.string().required('Please Give Some About Meeting'),
  projectCompletedDate: yup.string().required('Amount Budgeted is required'),
  projectManager: yup.string().required('Amount Spent is required'),
  projectAid: yup.string().required('Created Date is required'),
  projectRemarks: yup.string().optional(),
});

const SpecialProjectsCreate: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SpecialProjectsReportDTO>({
    resolver: yupResolver(schema),
  });

  const navigator = useNavigate();

  const onSubmit = async (data: SpecialProjectsReportDTO) => {
    try {
      const response = await createReport(data);
      toast.success(response.data.message);
      // Introduce a short delay before navigating
      setTimeout(() => {
        navigator('/dashboard/specialProjectsTable');
      }, 3000); // Display message for 3 seconds
    } catch (error) {
      toast.error('Failed to create report');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-4 shadow-lg rounded-md bg-white">
      <h1 className='text top-1 text-center text-gray-800'>Create Special Project Report</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Project Name:</label>
        <input 
          type="text" 
          placeholder='Enter Project Name'
          {...register('projectName')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.projectName && <p className="text-red-500 text-sm">{errors.projectName.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Project Description</label>
        <input 
          type="text"
          placeholder='Enter Project Description'
          {...register('projectDescription')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.projectDescription && <p className="text-red-500 text-sm">{errors.projectDescription.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Project Location</label>
        <input 
          type="text" 
          placeholder='Enter Project Location'
          {...register('projectLocation')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.projectLocation && <p className="text-red-500 text-sm">{errors.projectLocation.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">State</label>
        <input 
          type="text"
          placeholder='Enter State Where Project Was Executed'
          {...register('state')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Project Estimate</label>
        <input 
          type="text" 
          placeholder='Enter Project Estimate Time Frame  '
          {...register('projectEstimate')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.projectCost && <p className="text-red-500 text-sm">{errors.projectCost.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700"> Project Start Date</label>
        <input 
          type="date"
          placeholder='Enter Project Start Date'
          {...register('projectStartDate')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.projectStartDate && <p className="text-red-500 text-sm">{errors.projectStartDate.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Project Completed Date</label>
        <input 
          type="date"
          placeholder='Enter Project Completed Date'
          {...register('projectCompletedDate')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.projectCompletedDate && <p className="text-red-500 text-sm">{errors.projectCompletedDate.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Project Manager</label>
        <input 
          type="text"
          placeholder='Enter Project Manager Name '
          {...register('projectManager')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.projectManager && <p className="text-red-500 text-sm">{errors.projectManager.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">How Was The Project Funded</label>
        <input 
          type="text"
          placeholder='Was Any Financial Aid From Church '
          {...register('projectAid')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.projectAid && <p className="text-red-500 text-sm">{errors.projectAid.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Project Cost</label>
        <input 
          type="text" 
          placeholder='How Much Does It Cost'
          {...register('projectCost')}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.projectCost && <p className="text-red-500 text-sm">{errors.projectCost.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Remark</label>
        <input 
          type="text"
          placeholder='Enter Remarks If Any'
          {...register('projectRemarks')}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.projectRemarks && <p className="text-red-500 text-sm">{errors.projectRemarks.message}</p>}
      </div>

      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600">Create Report</button>
      <ToastContainer position='top-center' />
    </form>
  );
};

export default SpecialProjectsCreate;

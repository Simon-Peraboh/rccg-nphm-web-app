import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getReport, updateReport, SpecialProjectsReportDTO } from '../services/AuthServiceSpecialProjects';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

// Define the validation schema using yup
const schema = yup.object().shape({
  projectName: yup.string().required('Core Duties is required'),
  projectDescription: yup.string().required('Monthly task is required'),
  projectLocation: yup.string().required('Task done is required'),
  state: yup.string().required('State is Required'),
  projectEstimate: yup.string().required('Estimate Time Frame Is Required'),
  projectCost: yup.string().required('Project Cost Required'),
  projectStartDate: yup.string().required('Start Date Reuired'),
  projectCompletedDate: yup.string().required('Amount Budgeted is required'),
  projectManager: yup.string().required('Amount Spent is required'),
  projectAid: yup.string().required('Created Date is required'),
  projectRemarks: yup.string().optional(),
});

const SpecialProjectsEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const reportId = id as string;

  const navigate = useNavigate(); // Hook for navigation

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<SpecialProjectsReportDTO>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await getReport(reportId);
        const data = response.data;
        console.log('Fetched data:', data); // Add logging here
        setValue('projectName', data.projectName);
        setValue('projectDescription', data.projectDescription);
        setValue('projectLocation', data.projectLocation);
        setValue('state', data.state);
        setValue('projectEstimate', data.projectEstimate);
        setValue('projectCost', data.projectCost);
        setValue('projectStartDate', data.projectStartDate);
        setValue('projectCompletedDate', data.projectCompletedDate);
        setValue('projectManager', data.projectManager);
        setValue('projectAid', data.projectAid);
        setValue('projectRemarks', data.projectRemarks || '');
      } catch (error) {
        console.error('Error fetching report:', error); // Add logging here
        toast.error('Failed to fetch report');
      }
    };

    fetchReport();
  }, [reportId, setValue]);

  const onSubmit = async (data: SpecialProjectsReportDTO) => {
    try {
      const response = await updateReport(reportId, data);
      console.log('Response from backend:', response); // Log the response for debugging
      toast.success(response.data.message);

      // Introduce a short delay before navigating
      setTimeout(() => {
        navigate('/dashboard/specialProjectsTable');
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
        <label className="block text-gray-700">Project Name</label>
        <input 
          type="text" 
          {...register('projectName')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.projectName && <p className="text-red-500 text-sm">{errors.projectName.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Project Description</label>
        <input 
          type="text" 
          {...register('projectDescription')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.projectDescription && <p className="text-red-500 text-sm">{errors.projectDescription.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">State</label>
        <input 
          type="text" 
          {...register('state')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Project Estimate</label>
        <input 
          type="text" 
          {...register('projectEstimate')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.projectEstimate && <p className="text-red-500 text-sm">{errors.projectEstimate.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Project Cost</label>
        <input 
          type="text" 
          {...register('projectCost')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.projectCost && <p className="text-red-500 text-sm">{errors.projectCost.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Project Start Date</label>
        <input 
          type="text" 
          {...register('projectStartDate')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.projectStartDate && <p className="text-red-500 text-sm">{errors.projectStartDate.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Project Completed Date</label>
        <input 
          type="text" 
          {...register('projectCompletedDate')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.projectCompletedDate && <p className="text-red-500 text-sm">{errors.projectCompletedDate.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Project Manager</label>
        <input 
          type="text" 
          {...register('projectManager')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.projectManager && <p className="text-red-500 text-sm">{errors.projectManager.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Project Aid</label>
        <input 
          type="text" 
          {...register('projectAid')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.projectAid && <p className="text-red-500 text-sm">{errors.projectAid.message}</p>}
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
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600">Update Report</button>
       <ToastContainer position='top-center' />
    </form>
  );
};

export default SpecialProjectsEdit;

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getReportById, updateReport, MonthlyReportDTO } from '../services/AuthServiceMonthlyReport';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// Define the validation schema using yup
const schema = yup.object().shape({
  state: yup.string().required('State is required'),
  region: yup.string().required('Region is required'),
  province: yup.string().required('Province is required'),
  coordinatorName: yup.string().required('Coordinator Name is required'),
  prisonVisited: yup.string().optional(),
  hospitalVisited: yup.string().optional(),
  policeStationVisited: yup.string().optional(),
  others: yup.string().optional(),
  items: yup.string().required('Items are required'),
  amountBudgeted: yup.string().required('Amount Budgeted is required'),
  amountSpent: yup.string().required('Amount Spent is required'),
  teamMembers: yup.string().required('Team Members are required'),
  soulsWon: yup.string().required('Souls Won is required'),
  challenges: yup.string().optional(),
  suggestion: yup.string().optional(),
  activityDate: yup.string().required('Activity Date is required'),
  createdDate: yup.string().required('Created Date is required'),
  remarks: yup.string().optional(),
});

const MonthlyReportEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const reportId = id as string;

  const navigate = useNavigate(); // Hook for navigation

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<MonthlyReportDTO>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await getReportById(reportId);
        const data = response.data;
        console.log('Fetched data:', data); // Add logging here
        setValue('state', data.state);
        setValue('region', data.region);
        setValue('province', data.province);
        setValue('coordinatorName', data.coordinatorName);
        setValue('prisonVisited', data.prisonVisited);
        setValue('hospitalVisited', data.hospitalVisited);
        setValue('policeStationVisited', data.policeStationVisited);
        setValue('others', data.others);
        setValue('items', data.items);
        setValue('amountBudgeted', data.amountBudgeted);
        setValue('amountSpent', data.amountSpent);
        setValue('teamMembers', data.teamMembers);
        setValue('soulsWon', data.soulsWon);
        setValue('challenges', data.challenges);
        setValue('suggestion', data.suggestion);
        setValue('activityDate', data.activityDate);
        setValue('createdDate', data.createdDate);
        setValue('remarks', data.remarks || '');
      } catch (error) {
        console.error('Error fetching report:', error); // Add logging here
        toast.error('Failed to fetch report');
      }
    };

    fetchReport();
  }, [reportId, setValue]);

  const onSubmit = async (data: MonthlyReportDTO) => {
    try {
      const response = await updateReport(reportId, data);
      console.log('Response from backend:', response); // Log the response for debugging
      toast.success(response.data.message);

      // Introduce a short delay before navigating
      setTimeout(() => {
        navigate('/dashboard/monthlyReportTable');
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
        <label className="block text-gray-700">State</label>
        <input 
          type="text" 
          {...register('state')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Region</label>
        <input 
          type="text" 
          {...register('region')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.region && <p className="text-red-500 text-sm">{errors.region.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Province</label>
        <input 
          type="text" 
          {...register('province')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.province && <p className="text-red-500 text-sm">{errors.province.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Province Coordinator Name</label>
        <input 
          type="text" 
          {...register('coordinatorName')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.coordinatorName && <p className="text-red-500 text-sm">{errors.coordinatorName.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Prison Visited</label>
        <input 
          type="text" 
          {...register('prisonVisited')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.prisonVisited && <p className="text-red-500 text-sm">{errors.prisonVisited.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Hospital Visited</label>
        <input 
          type="text" 
          {...register('hospitalVisited')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.hospitalVisited && <p className="text-red-500 text-sm">{errors.hospitalVisited.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Police Station Visited</label>
        <input 
          type="text" 
          {...register('policeStationVisited')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.policeStationVisited && <p className="text-red-500 text-sm">{errors.policeStationVisited.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Others Places Visited</label>
        <input 
          type="text" 
          {...register('others')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.others && <p className="text-red-500 text-sm">{errors.others.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Items</label>
        <input 
          type="text" 
          {...register('items')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.items && <p className="text-red-500 text-sm">{errors.items.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Amount Budgeted</label>
        <input 
          type="text" 
          {...register('amountBudgeted')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.amountBudgeted && <p className="text-red-500 text-sm">{errors.amountBudgeted.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Amount Spent</label>
        <input 
          type="text" 
          {...register('amountSpent')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.amountSpent && <p className="text-red-500 text-sm">{errors.amountSpent.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Team Members</label>
        <input 
          type="text" 
          {...register('teamMembers')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.teamMembers && <p className="text-red-500 text-sm">{errors.teamMembers.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Souls Won</label>
        <input 
          type="text" 
          {...register('soulsWon')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.soulsWon && <p className="text-red-500 text-sm">{errors.soulsWon.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Challenges</label>
        <input 
          type="text" 
          {...register('challenges')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.challenges && <p className="text-red-500 text-sm">{errors.challenges.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Suggestion</label>
        <input 
          type="text" 
          {...register('suggestion')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.suggestion && <p className="text-red-500 text-sm">{errors.suggestion.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Visitation Date</label>
        <input 
          type="date" 
          {...register('activityDate')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.activityDate && <p className="text-red-500 text-sm">{errors.activityDate.message}</p>}
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
          {...register('remarks')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.remarks && <p className="text-red-500 text-sm">{errors.remarks.message}</p>}
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600">Update Report</button>
    </form>
  );
};

export default MonthlyReportEdit;

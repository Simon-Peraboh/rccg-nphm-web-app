import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getReport, updateReport, MonthlyReportDTO } from '../services/AuthServiceMonthlyReport';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// Define the validation schema using yup
const schema = yup.object().shape({
  state: yup.string().required('State is required'),
  region: yup.string().required('Region is required'),
  province: yup.string().required('Province is required'),
  coordinator_name: yup.string().required('Coordinator Name is required'),
  prison_visited: yup.string().optional(),
  hospital_visited: yup.string().optional(),
  police_station_visited: yup.string().optional(),
  others: yup.string().optional(),
  items: yup.string().required('Items are required'),
  amount_budgeted: yup.string().required('Amount Budgeted is required'),
  amount_spent: yup.string().required('Amount Spent is required'),
  team_members: yup.string().required('Team Members are required'),
  souls_won: yup.string().required('Souls Won is required'),
  challenges: yup.string().optional(),
  suggestion: yup.string().optional(),
  remarks: yup.string().optional(),
  activity_date: yup.string().required('Activity Date is required'),
  report_created_by: yup.string().required("Creator of Report is required"),

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
        const response = await getReport(reportId);
        const data = response.data;
        console.log('Fetched data:', data); // Add logging here
        setValue('state', data.state);
        setValue('region', data.region);
        setValue('province', data.province);
        setValue('coordinator_name', data.coordinator_name);
        setValue('prison_visited', data.prison_visited);
        setValue('hospital_visited', data.hospital_visited);
        setValue('police_station_visited', data.police_station_visited);
        setValue('others', data.others);
        setValue('items', data.items);
        setValue('amount_budgeted', data.amount_budgeted);
        setValue('amount_spent', data.amount_spent);
        setValue('team_members', data.team_members);
        setValue('souls_won', data.souls_won);
        setValue('challenges', data.challenges);
        setValue('suggestion', data.suggestion);
        setValue('activity_date', data.activity_date);
        setValue('report_created_by', data.report_created_by);
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
          {...register('coordinator_name')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.coordinator_name && <p className="text-red-500 text-sm">{errors.coordinator_name.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Prison Visited</label>
        <input 
          type="text" 
          {...register('prison_visited')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.prison_visited && <p className="text-red-500 text-sm">{errors.prison_visited.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Hospital Visited</label>
        <input 
          type="text" 
          {...register('hospital_visited')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.hospital_visited && <p className="text-red-500 text-sm">{errors.hospital_visited.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Police Station Visited</label>
        <input 
          type="text" 
          {...register('police_station_visited')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.police_station_visited && <p className="text-red-500 text-sm">{errors.police_station_visited.message}</p>}
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
        <label className="block text-gray-700">Team Members</label>
        <input 
          type="text" 
          {...register('team_members')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.team_members && <p className="text-red-500 text-sm">{errors.team_members.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Souls Won</label>
        <input 
          type="text" 
          {...register('souls_won')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.souls_won && <p className="text-red-500 text-sm">{errors.souls_won.message}</p>}
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
          {...register('activity_date')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.activity_date && <p className="text-red-500 text-sm">{errors.activity_date.message}</p>}
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
      <div className="mb-4">
        <label className="block text-gray-700">Report Created By Who</label>
        <input 
          type="text" 
          {...register('report_created_by')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.report_created_by && <p className="text-red-500 text-sm">{errors.report_created_by.message}</p>}
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600">Update Report</button>
    </form>
  );
};

export default MonthlyReportEdit;

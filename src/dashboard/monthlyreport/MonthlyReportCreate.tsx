import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createReport, MonthlyReportDTO } from '../services/AuthServiceMonthlyReport';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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

const MonthlyReportCreate: React.FC = () => {
  const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
   } = useForm<MonthlyReportDTO>({

    resolver: yupResolver(schema),
  });

  const navigator = useNavigate(); 

  const onSubmit = async (data: MonthlyReportDTO) => {
    try {
      const response = await createReport(data);
      toast.success(response.data.message);
      // Introduce a short delay before navigating
      setTimeout(() => {
        navigator('/dashboard/monthlyReportTable');
      }, 3000); // Display message for 3 seconds
    } catch (error) {
      toast.error('Failed to create report');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-4 shadow-lg rounded-md bg-white">
      <h1 className='text top-1 text-center text-gray-800'>Create Monthly Report</h1>
      <div className="mb-4">
        <label className="block text-gray-700">State</label>
        <input 
          type="text" 
          placeholder='Enter Name Of State'
          {...register('state')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Region</label>
        <input 
          type="text"
          placeholder='Enter Your Region'
          {...register('region')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.region && <p className="text-red-500 text-sm">{errors.region.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Province</label>
        <input 
          type="text" 
          placeholder='Enter Province Name'
          {...register('province')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.province && <p className="text-red-500 text-sm">{errors.province.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Coordinator Name</label>
        <input 
          type="text"
          placeholder='Enter Coordinator Name'
          {...register('coordinator_name')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.coordinator_name && <p className="text-red-500 text-sm">{errors.coordinator_name.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Prison Visited</label>
        <input 
          type="text" 
          placeholder='Enter Correctional Center Visited'
          {...register('prison_visited')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.prison_visited && <p className="text-red-500 text-sm">{errors.prison_visited.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Hospital Visited</label>
        <input 
          type="text"
          placeholder='Enter Hospital Visited'
          {...register('hospital_visited')}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.hospital_visited && <p className="text-red-500 text-sm">{errors.hospital_visited.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Police Station Visited</label>
        <input 
          type="text"
          placeholder='Enter Police Station Visited'
          {...register('police_station_visited')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.police_station_visited && <p className="text-red-500 text-sm">{errors.police_station_visited.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Other Places Visited</label>
        <input 
          type="text"
          placeholder='What Other Places Visited E.G Old People Home'
          {...register('others')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.others && <p className="text-red-500 text-sm">{errors.others.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Items Used For The Visit</label>
        <input 
          type="text"
          placeholder='E.G Rice, Detergent'
          {...register('items')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.items && <p className="text-red-500 text-sm">{errors.items.message}</p>}
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
        <label className="block text-gray-700">Team Members</label>
        <input 
          type="text"
          placeholder='How Many People Went'
          {...register('team_members')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.team_members && <p className="text-red-500 text-sm">{errors.team_members.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Souls Won</label>
        <input 
          type="text"
          placeholder='How Many Souls Got Saved'
          {...register('souls_won')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.souls_won && <p className="text-red-500 text-sm">{errors.souls_won.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Challenges</label>
        <input 
          type="text"
          placeholder='What Are The Challenges?'
          {...register('challenges')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.challenges && <p className="text-red-500 text-sm">{errors.challenges.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Suggestion</label>
        <input 
          type="text"
          placeholder='Any Suggestions'
          {...register('suggestion')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.suggestion && <p className="text-red-500 text-sm">{errors.suggestion.message}</p>}
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

      <div className="mb-4">
        <label className="block text-gray-700"> Date Of Visitation</label>
        <input 
          type="date" 
          {...register('activity_date')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.activity_date && <p className="text-red-500 text-sm">{errors.activity_date.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Report Created By Who</label>
        <input 
          type="text"
          placeholder='Your Name'
          {...register('report_created_by')}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.report_created_by && <p className="text-red-500 text-sm">{errors.report_created_by.message}</p>}
      </div>


      <button
        disabled={isSubmitting}
        type="submit"
        className={`w-full p-2 rounded mt-4 text-white ${isSubmitting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
      >
        {isSubmitting ? 'Submitting...' : 'Create Report'}
      </button>
       <ToastContainer position="top-right" autoClose={4000} />
    </form>
  );
};

export default MonthlyReportCreate;

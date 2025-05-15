import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createReport, MonthlyReportDTO } from '../services/AuthServiceMonthlyReport';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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

const MonthlyReportCreate: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<MonthlyReportDTO>({
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
          {...register('coordinatorName')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.coordinatorName && <p className="text-red-500 text-sm">{errors.coordinatorName.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Prison Visited</label>
        <input 
          type="text" 
          placeholder='Enter Correctional Center Visited'
          {...register('prisonVisited')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.prisonVisited && <p className="text-red-500 text-sm">{errors.prisonVisited.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Hospital Visited</label>
        <input 
          type="text"
          placeholder='Enter Hospital Visited'
          {...register('hospitalVisited')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.hospitalVisited && <p className="text-red-500 text-sm">{errors.hospitalVisited.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Police Station Visited</label>
        <input 
          type="text"
          placeholder='Enter Police Station Visited'
          {...register('policeStationVisited')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.policeStationVisited && <p className="text-red-500 text-sm">{errors.policeStationVisited.message}</p>}
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
        <label className="block text-gray-700">Team Members</label>
        <input 
          type="text"
          placeholder='How Many People Went'
          {...register('teamMembers')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.teamMembers && <p className="text-red-500 text-sm">{errors.teamMembers.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Souls Won</label>
        <input 
          type="text"
          placeholder='How Many Souls Got Saved'
          {...register('soulsWon')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.soulsWon && <p className="text-red-500 text-sm">{errors.soulsWon.message}</p>}
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
        <label className="block text-gray-700"> Date Of Visitation</label>
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

export default MonthlyReportCreate;

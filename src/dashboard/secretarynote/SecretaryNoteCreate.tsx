import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createNote, SecretaryNoteDTO } from '../services/AuthServiceSecretaryNote';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Define the validation schema using yup
const schema = yup.object().shape({
  meetingVenue: yup.string().required('Core Duties is required'),
  meetingAnchor: yup.string().required('Monthly is required'),
  attendanceMen: yup.string().required('Task Done is required'),
  attendanceWomen: yup.string().required('Women Info is required'),
  attendanceChildren: yup.string().required('Children Info is required'),
  attendanceTotal: yup.string().required('Total Attendance required'),
  detailOfMeeting: yup.string().required('Please Give Some About Meeting'),
  actionablePoints: yup.string().required('Amount Budgeted is required'),
  actionablePointsAssigned: yup.string().required('Amount Spent is required'),
  meetingDate: yup.string().required('Created Date is required'),
  createdDate: yup.string().optional(),
});

const SecretaryNoteCreate: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SecretaryNoteDTO>({
    resolver: yupResolver(schema),
  });

  const navigator = useNavigate();

  const onSubmit = async (data: SecretaryNoteDTO) => {
    try {
      const response = await createNote(data);
      toast.success(response.data.message);
      // Introduce a short delay before navigating
      setTimeout(() => {
        navigator('/dashboard/secretaryNoteTable');
      }, 3000); // Display message for 3 seconds
    } catch (error) {
      toast.error('Failed to create report');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-4 shadow-lg rounded-md bg-white">
      <h1 className='text top-1 text-center text-gray-800'>Create Minutes of Meeting</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Meeting Venue:</label>
        <input 
          type="text" 
          placeholder='Enter Meeting Venue'
          {...register('meetingVenue')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.meetingVenue && <p className="text-red-500 text-sm">{errors.meetingVenue.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Meeting Anchor</label>
        <input 
          type="text"
          placeholder='Enter Who Anchor The Meeting'
          {...register('meetingAnchor')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.meetingAnchor && <p className="text-red-500 text-sm">{errors.meetingAnchor.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Attendance Men</label>
        <input 
          type="text" 
          placeholder='Enter The Number Of Men'
          {...register('attendanceMen')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.attendanceMen && <p className="text-red-500 text-sm">{errors.attendanceMen.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Attendance Women</label>
        <input 
          type="text"
          placeholder='Enter The Number Of Women'
          {...register('attendanceWomen')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.attendanceWomen && <p className="text-red-500 text-sm">{errors.attendanceWomen.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Attendance Children</label>
        <input 
          type="text" 
          placeholder='Enter The Number Of Children '
          {...register('attendanceChildren')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.attendanceChildren && <p className="text-red-500 text-sm">{errors.attendanceChildren.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700"> Total Attendance</label>
        <input 
          type="text"
          placeholder='Enter Total Attendance'
          {...register('attendanceTotal')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.attendanceTotal && <p className="text-red-500 text-sm">{errors.attendanceTotal.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Detail Of Meeting</label>
        <textarea
        placeholder='Enter Meeting Detail'
          {...register('detailOfMeeting', { required: 'Meeting Details required' })} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        ></textarea>
        {errors.detailOfMeeting && <p className="text-red-500 text-sm">{errors.detailOfMeeting.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Actionable Points</label>
        <input 
          type="text"
          placeholder='Enter Actionable Points '
          {...register('actionablePoints')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.actionablePoints && <p className="text-red-500 text-sm">{errors.actionablePoints.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Actionable Points Assigned To Who</label>
        <input 
          type="text"
          placeholder='Actionable Points Assigned To Who'
          {...register('actionablePointsAssigned')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.actionablePointsAssigned && <p className="text-red-500 text-sm">{errors.actionablePointsAssigned.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Date Of Meeting</label>
        <input 
          type="date" 
          {...register('meetingDate')}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.meetingDate && <p className="text-red-500 text-sm">{errors.meetingDate.message}</p>}
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600">Create Report</button>
      <ToastContainer position='top-center' />
    </form>
  );
};

export default SecretaryNoteCreate;

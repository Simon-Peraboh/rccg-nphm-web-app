import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getNote, updateNote, SecretaryNoteDTO } from '../services/AuthServiceSecretaryNote';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

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
  remarks: yup.string().optional(),
});

const SecretaryNoteEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const reportId = id as string;

  const navigate = useNavigate(); // Hook for navigation

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<SecretaryNoteDTO>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await getNote(reportId);
        const data = response.data;
        console.log('Fetched data:', data); // Add logging here
        setValue('meetingVenue', data.meetingVenue);
        setValue('meetingAnchor', data.meetingAnchor);
        setValue('attendanceMen', data.attendanceMen);
        setValue('attendanceWomen', data.attendanceWomen);
        setValue('attendanceChildren', data.attendanceChildren);
        setValue('attendanceTotal', data.attendanceTotal);
        setValue('detailOfMeeting', data.detailOfMeeting);
        setValue('actionablePoints', data.actionablePoints);
        setValue('actionablePointsAssigned', data.actionablePointsAssigned);
        setValue('meetingDate', data.meetingDate);
        setValue('createdDate', data.createdDate || '');
      } catch (error) {
        console.error('Error fetching report:', error); // Add logging here
        toast.error('Failed to fetch report');
      }
    };

    fetchReport();
  }, [reportId, setValue]);

  const onSubmit = async (data: SecretaryNoteDTO) => {
    try {
      const response = await updateNote(reportId, data);
      console.log('Response from backend:', response); // Log the response for debugging
      toast.success(response.data.message);

      // Introduce a short delay before navigating
      setTimeout(() => {
        navigate('/dashboard/secretaryNoteTable');
      }, 3000); // Display message for 3 seconds

    } catch (error) {
      console.error('Error updating report:', error); // Log the error for debugging
      toast.error('Failed to update report');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-4 shadow-lg rounded-md bg-white">
      <h1 className='text-center text-gray-800'>Edit Note</h1>
      <div className="mb-4">
        <label className="block text-gray-700">Meeting Venue</label>
        <input 
          type="text" 
          {...register('meetingVenue')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.meetingVenue && <p className="text-red-500 text-sm">{errors.meetingVenue.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Meeting Anchor</label>
        <input 
          type="text" 
          {...register('meetingAnchor')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.meetingAnchor && <p className="text-red-500 text-sm">{errors.meetingAnchor.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Attendance Men</label>
        <input 
          type="text" 
          {...register('attendanceMen')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.attendanceMen && <p className="text-red-500 text-sm">{errors.attendanceMen.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Attendance Women</label>
        <input 
          type="text" 
          {...register('attendanceWomen')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.attendanceWomen && <p className="text-red-500 text-sm">{errors.attendanceWomen.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Attendance Children</label>
        <input 
          type="text" 
          {...register('attendanceChildren')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.attendanceChildren && <p className="text-red-500 text-sm">{errors.attendanceChildren.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Attendance Total</label>
        <input 
          type="text" 
          {...register('attendanceTotal')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.attendanceTotal && <p className="text-red-500 text-sm">{errors.attendanceTotal.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Detail Of Meeting</label>
        <input 
          type="text" 
          {...register('detailOfMeeting')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.detailOfMeeting && <p className="text-red-500 text-sm">{errors.detailOfMeeting.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Actionable Points</label>
        <input 
          type="text" 
          {...register('actionablePoints')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.actionablePoints && <p className="text-red-500 text-sm">{errors.actionablePoints.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Actionable Points Assigned</label>
        <input 
          type="text" 
          {...register('actionablePointsAssigned')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.actionablePointsAssigned && <p className="text-red-500 text-sm">{errors.actionablePointsAssigned.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Meeting Date</label>
        <input 
          type="date" 
          {...register('meetingDate')} 
          className="w-full p-2 border border-gray-300 rounded mt-1"
        />
        {errors.meetingDate && <p className="text-red-500 text-sm">{errors.meetingDate.message}</p>}
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
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600">Update Report</button>
      <ToastContainer position='top-center' />
    </form>
  );
};

export default SecretaryNoteEdit;

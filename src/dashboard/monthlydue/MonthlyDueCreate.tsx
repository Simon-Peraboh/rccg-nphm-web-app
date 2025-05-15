import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createReport, MonthlyDuePaymentDTO } from '../services/AuthServiceDuePayment';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

// Define the validation schema using yup
const schema = yup.object().shape({
    amount: yup.string().required('Amount is required'),
    province: yup.string().required('Province is required'),
    paymentDate: yup.string().required('Payment date is required'),
    provinceCoordinator: yup.string().required('Province Coordinator Name is required'),
    refMonth: yup.string().required('Reference month is required'),
    createdDate: yup.string().required('Created date is required'),
    remark: yup.string().optional(),
});

const MonthlyDueCreate: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<MonthlyDuePaymentDTO>({
        resolver: yupResolver(schema),
    });

    const navigator = useNavigate(); 

    const onSubmit = async (data: MonthlyDuePaymentDTO) => {
        try {
            const response = await createReport(data);
            toast.success(response.data.message);
            // Introduce a short delay before navigating
            setTimeout(() => {
                navigator('/dashboard/monthlyDueTable');
            }, 3000); // Display message for 3 seconds
        } catch (error) {
            toast.error('Failed to create report');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-4 shadow-lg rounded-md bg-white">
            <div className="mb-4">
                <label className="block text-gray-700">Amount Paid</label>
                <input 
                    type="text" 
                    placeholder='Enter Amount Paid'
                    {...register('amount')} 
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                />
                {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
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
                <label className="block text-gray-700">Payment Date</label>
                <input 
                    type="date" 
                    {...register('paymentDate')} 
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                />
                {errors.paymentDate && <p className="text-red-500 text-sm">{errors.paymentDate.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Province Coordinator Name</label>
                <input 
                    type="text"
                    placeholder='Enter Province Coordinator Name'
                    {...register('provinceCoordinator')} 
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                />
                {errors.provinceCoordinator && <p className="text-red-500 text-sm">{errors.provinceCoordinator.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Reference Month</label>
                <input 
                    type="text"
                    placeholder='Enter Monthly Paid For'
                    {...register('refMonth')} 
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                />
                {errors.refMonth && <p className="text-red-500 text-sm">{errors.refMonth.message}</p>}
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
                    {...register('remark')} 
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                />
                {errors.remark && <p className="text-red-500 text-sm">{errors.remark.message}</p>}
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600">Create Report</button>
        </form>
    );
};

export default MonthlyDueCreate;

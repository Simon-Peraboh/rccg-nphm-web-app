import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getReport, updateReport, MonthlyDuePaymentDTO } from '../services/AuthServiceDuePayment';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

// Define the validation schema using yup
const schema = yup.object().shape({
    amount: yup.string().required('Amount is required'),
    province: yup.string().required('Province is required'),
    paymentDate: yup.string().required('Payment date is required'),
    provinceCoordinator: yup.string().required('Province Coordinator Name is required'),
    refMonth: yup.string().required('Reference month is required'),
    whoPaid:yup.string().optional(),
    remark: yup.string().optional(),
});

const MonthlyDueEdit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const reportId = id as string;

    const navigator = useNavigate(); // Hook for navigation

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<MonthlyDuePaymentDTO>({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await getReport(reportId);
                const data = response.data;
                setValue('amount', data.amount);
                setValue('province', data.province);
                setValue('paymentDate', data.paymentDate);
                setValue('provinceCoordinator', data.provinceCoordinator);
                setValue('refMonth', data.refMonth);
                setValue('whoPaid', data.whoPaid);
                setValue('remark', data.remark || '');
            } catch (error) {
                toast.error('Failed to fetch report');
            }
        };

        fetchReport();
    }, [reportId, setValue]);

    const onSubmit = async (data: MonthlyDuePaymentDTO) => {
        try {
            const response = await updateReport(reportId, data);
            console.log('Response from backend:', response); // Log the response for debugging
            toast.success(response.data.message);

                // Introduce a short delay before navigating
                setTimeout(() => {
                    navigator('/dashboard/monthlyDueTable');
                }, 3000); // Display message for 3 seconds
                
        } catch (error) {
            console.error('Error updating report:', error); // Log the error for debugging
            toast.error('Failed to update report');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-4 shadow-lg rounded-md bg-white">
            <div className="mb-4">
                <h1 className='text text-center text-gray-800'>
                    <span>
                    Edit Report
                    </span>
                </h1>
                <label className="block text-gray-700">Amount Paid</label>
                <input 
                    type="text" 
                    {...register('amount')} 
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                />
                {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
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
                    {...register('provinceCoordinator')} 
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                />
                {errors.provinceCoordinator && <p className="text-red-500 text-sm">{errors.provinceCoordinator.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Reference Month</label>
                <input 
                    type="text" 
                    {...register('refMonth')} 
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                />
                {errors.refMonth && <p className="text-red-500 text-sm">{errors.refMonth.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Who Paid</label>
                <input 
                    type="text" 
                    {...register('whoPaid')} 
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                />
                {errors.whoPaid && <p className="text-red-500 text-sm">{errors.whoPaid.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Remark</label>
                <input 
                    type="text" 
                    {...register('remark')} 
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                />
                {errors.remark && <p className="text-red-500 text-sm">{errors.remark.message}</p>}
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600">Update Report</button>
            <ToastContainer position="top-center" />
        </form>
    );
};

export default MonthlyDueEdit;

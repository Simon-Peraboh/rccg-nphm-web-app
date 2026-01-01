import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { resetPasswordAPICall } from '../services/AuthServiceLoginRegister';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error('Invalid reset link.');
      navigate('/forgetPassword');
      return;
    }


    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }


    setLoading(true);

    try {
      const response = await resetPasswordAPICall({
        token,
        password,
        password_confirmation: confirmPassword,
      });

      toast.success(response.data.message || 'Password reset successful');

      setTimeout(() => {
        navigate('/dashboard/loginUser');
      }, 2000);

    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.error ||
          error.response?.data?.message ||
          'Password reset failed';

        toast.error(message);

        if (error.response?.status === 400) {
          setTimeout(() => {
            navigate('/dashboard/forgetPassword');
          }, 2000);
        }
      } else {
        toast.error('Unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-blue-200 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Reset Password
      </h2>

      <p className="text-sm text-gray-600 text-center mb-6">
        Enter your new password below.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="New password"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Confirm password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>

      <div className="text-center mt-4">
        <Link to="/dashboard/loginUser" className="text-sm text-blue-600 hover:underline">
          Back to Login
        </Link>
      </div>

      <ToastContainer position="top-right" />
    </div>
  );
};

export default ResetPassword;

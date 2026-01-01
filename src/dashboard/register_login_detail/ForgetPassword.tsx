import React, { useState } from 'react';
import { forgotPasswordAPICall } from '../services/AuthServiceLoginRegister';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await forgotPasswordAPICall({ email });

      toast.success(response.data.message || 'Reset link sent successfully');
      setEmail('');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.error ||
          error.response?.data?.message ||
          'Failed to send reset link'
        );
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
        Forgot Password
      </h2>

      <p className="text-sm text-gray-600 text-center mb-6">
        Enter your email address and we’ll send you a reset link.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="you@example.com"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
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

export default ForgotPassword;

import React, { useEffect, useState } from 'react';
import { loginAPICall, saveLoggedInUser, storeToken } from '../services/AuthServiceLoginRegister';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { checkNetworkSpeed } from "../services/NetworkSpeedService";

const LoginUser: React.FC = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

        useEffect(() => {
        checkNetworkSpeed();

        // Retest every 10 seconds
        const interval = setInterval(checkNetworkSpeed, 10000);

        return () => clearInterval(interval);
      }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginAPICall({ usernameOrEmail, password });

      const { user, token, message } = response.data;

      // Save session
      storeToken(token);
      saveLoggedInUser({ email: user.email, role: user.role });

      toast.success(message || 'Login successful');
      setTimeout(() => navigate('/dashboard'), 1500);

    } catch (error: unknown) {
      console.error('Login error:', error);

      if (axios.isAxiosError(error)) {
        // Pull out backend message cleanly
        const backendMessage =
          error.response?.data?.message ||
          error.response?.data?.error ||
          'Login failed. Please try again.';

        toast.error(backendMessage);
      } else {
        toast.error('Unexpected error occurred. Please try again.');
      }
    }
  };


  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-blue-200 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-5 text-center">Login</h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Username or Email</label>
          <input
            type="text"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Username or Email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Password"
          />
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="showPassword"
              className="mr-2"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassword" className="text-sm text-gray-700">Show Password</label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </form>

      <ToastContainer position="top-right" />
    </div>
  );
};

export default LoginUser;

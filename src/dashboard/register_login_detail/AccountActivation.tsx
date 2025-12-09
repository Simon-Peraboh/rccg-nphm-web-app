import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { activateAccountAPICall } from '../services/AuthServiceLoginRegister';
import { toast, ToastContainer } from 'react-toastify';

const AccountActivation: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');
  const [tempPassword, setTempPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const t = query.get('token');
    if (t) setToken(t);
    else {
      toast.error('Invalid activation link');
      navigate('/');
    }
  }, [location.search, navigate]);

  useEffect(() => {
    const getStrength = (pwd: string) => {
      if (pwd.length < 6) return 'Weak';
      if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[!@#$%^&*]/.test(pwd)) return 'Strong';
      return 'Medium';
    };
    setStrength(getStrength(newPassword));
  }, [newPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('New password and confirmation do not match');
      return;
    }


    try {
      await activateAccountAPICall(token, tempPassword, newPassword, confirmPassword);
      toast.success('Account activated successfully! You can now log in.');
      setTimeout(() => navigate('/dashboard/loginUser'), 2000);
    } catch (error: unknown) {
      console.error('Activation error:', error);

      if (error instanceof Error) {
        toast.error(error.message || 'Account activation failed');
      } else {
        toast.error('Account activation failed');
      }
    }
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-200 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Activate Your Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Temporary Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={tempPassword}
              onChange={(e) => setTempPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm"
              placeholder="From email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm"
              placeholder="Enter new password"
            />
            {newPassword && (
              <p className={`text-sm mt-1 font-medium ${strength === 'Strong' ? 'text-green-600' : strength === 'Medium' ? 'text-yellow-600' : 'text-red-600'}`}>
                Strength: {strength}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md shadow-sm"
              placeholder="Re-enter new password"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              id="showPassword"
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="form-checkbox"
            />
            <label htmlFor="showPassword" className="text-sm text-gray-600">
              Show Passwords
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Activate Account
          </button>
        </form>

        <ToastContainer position="top-right" />
      </div>
    </div>

  );
};

export default AccountActivation;

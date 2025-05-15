import React, { useState } from 'react';
import { loginAPICall, LoginDTO, storeToken, saveLoggedInUser, getToken, refreshTokenAPICall, getRefreshToken } from '../services/AuthServiceLoginRegister';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import axios from 'axios';

// Function to check if the token is expired or about to expire, and refresh it if necessary
const checkAndRefreshToken = async () => {
  const token = getToken();
  if (token) {
    // Decode the token to check its expiration time
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    const expirationDate = new Date(tokenPayload.exp * 1000); // Convert JWT exp (in seconds) to milliseconds
    const currentTime = new Date();

    // Check if the token is expired or about to expire (within 1 minute)
    if (currentTime.getTime() >= expirationDate.getTime() || (expirationDate.getTime() - currentTime.getTime()) < 60000) {
      console.log('Token expired or about to expire, refreshing...');

      const refreshToken = getRefreshToken(); // Retrieve the refresh token from localStorage
      if (!refreshToken) {
        throw new Error('Refresh token not found, please log in again.');
      }

      try {
        const refreshTokenObj = { refreshToken }; // Create object with refreshToken for API call

        // Call API to refresh token
        const response = await refreshTokenAPICall(refreshTokenObj);
        const newAccessToken = response.data.accessToken; // Access the new accessToken from response

        storeToken(newAccessToken); // Store the new access token in localStorage
        console.log('Token refreshed and stored');
      } catch (error) {
        console.error('Error during token refresh:', error);
        throw new Error('Session expired, please log in again.');
      }
    }
  }
};

const LoginUser: React.FC = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState(''); // State to store the username or email input
  const [password, setPassword] = useState(''); // State to store the password input
  const navigate = useNavigate(); // Hook to programmatically navigate to another route

  // Function to handle login when the form is submitted
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    const loginObj: LoginDTO = { usernameOrEmail, password }; // Create login object from the form inputs

    try {
      // Call the login API and get the response
      const response = await loginAPICall(loginObj);
      const { accessToken, refreshToken, tokenType, role, message } = response;

      // Store the access token in localStorage
      storeToken(`${tokenType} ${accessToken}`);
      // Store the refresh token in localStorage
      localStorage.setItem('refreshToken', refreshToken);

      // Save the logged-in user's information in sessionStorage
      saveLoggedInUser({ username: usernameOrEmail, role });
      // Show a success message via toast notification
      toast.success(message || 'Login successful');

      // Delay navigation to the dashboard to ensure the toast message is displayed
      setTimeout(() => navigate('/dashboard'), 3000);
    } catch (error) {
      console.error('Error during login:', error);

      // If the error is an Axios error, display the appropriate message from the response
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.message || 'Login failed';
        toast.error(errorMessage);
      } else {
        // Otherwise, display a generic login failed message
        toast.error('Login failed');
      }
    }
  };

  // Function to handle protected requests that require a valid token
  const handleProtectedRequest = async () => {
    try {
      // Check and refresh the token if necessary before making the request
      await checkAndRefreshToken();

      // Get the current token from localStorage
      const token = getToken();
      // Make a request to the protected endpoint with the token in the Authorization header
      const response = await axios.get('http://rccgphmbackend-env.eba-utgxehmc.eu-west-2.elasticbeanstalk.com/api/protected-endpoint', {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log('Protected data:', response.data);
      toast.success('Protected request successful');
    } catch (error) {
      console.error('Error during protected request:', error);
      toast.error('Protected request failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-blue-200 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-5">Login</h2>
      <form onSubmit={handleLogin}>
        {/* Username or Email input field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Username or Email</label>
          <input
            type="text"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)} // Update state when user types in the input
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        {/* Password input field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update state when user types in the input
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        {/* Submit button to log in */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      {/* Button to trigger protected request */}
      <button
        onClick={handleProtectedRequest}
        className="mt-4 bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
      >
        Make Protected Request
      </button>
    </div>
  );
};

export default LoginUser;

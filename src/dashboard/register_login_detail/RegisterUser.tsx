import React, { useState } from 'react';
import { registerAPICall, RegisterDTO } from '../services/AuthServiceLoginRegister';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const RegisterUser: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [roles, setRoles] = useState<string[]>([]);
    const navigate = useNavigate(); // Hook to programmatically navigate to another route

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        const registerObj: RegisterDTO = { username, email, password, roles };

        try {
            const response = await registerAPICall(registerObj);
            console.log(response.data);
            toast.success('Registration successful');
            // Delay navigation to the dashboard to ensure the toast message is displayed
           setTimeout(() => navigate('/dashboard'), 3000);
        } catch (error) {
            console.error(error);
            toast.error('Registration failed');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-5">Register</h2>
            <form onSubmit={handleRegister}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Roles</label>
                    <input
                        type="text"
                        value={roles.join(',')}
                        onChange={(e) => setRoles(e.target.value.split(','))}
                        placeholder="ROLE_USER,ROLE_ADMIN"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterUser;

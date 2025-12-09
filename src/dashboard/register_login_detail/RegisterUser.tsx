import React, { useState } from 'react';
import { registerAPICall, RegisterDTO } from '../services/AuthServiceLoginRegister';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import axios from 'axios';

const RegisterUser: React.FC = () => {
    const [surname, setSurname] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        const registerObj: RegisterDTO = { name, surname, email, role };

        try {
            const response = await registerAPICall(registerObj);
            console.log(response.data);
            toast.success('Registration successful');
            // Delay navigation to the dashboard to ensure the toast message is displayed
           setTimeout(() => navigate('/dashboard'), 3000);
         }  catch (error: unknown) {
            console.error(error);

            if (axios.isAxiosError(error)) {
                const responseData = error.response?.data;

                // Laravel validation errors are usually under `message` or `errors`
                if (typeof responseData?.message === 'object') {
                const messages = Object.values(responseData.message)
                    .flat()
                    .join(' ');
                toast.error(messages);
                } else {
                toast.error(responseData?.message || 'Registration failed');
                }
            } else {
                toast.error('Unexpected error during registration');
            }
         }
    };


    return (
        <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-5">Register</h2>
            <form onSubmit={handleRegister}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                       title='name'
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Surname</label>
                    <input
                        type="text"
                        title='surname'
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        title='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Roles</label>
                    <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
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

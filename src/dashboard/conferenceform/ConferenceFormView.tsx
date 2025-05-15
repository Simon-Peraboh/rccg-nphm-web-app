import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../apicalls/conference/api";

interface User {
  id: number;
  conference_date: string;
  conference_theme: string;
  full_name: string;
  email: string;
  state: string;
  region: string;
  province: string;
  position: string;
  phone_number: string;
  accommodation: boolean;
  arrival_date: string;
  departure_date: string;
  first_timer: boolean;
}

const ConferenceFormView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`/conference/${id}`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (!user) {
    return <div className="p-4 text-center">User not found</div>;
  }

  return (
    <div className="p-6 bg-blue-200 rounded-lg shadow-md">
      <h1 className="mb-6 text-3xl font-bold text-center">User Details</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center">
            <p className="text-gray-600 w-36">Conference Date:</p>
            <p>{user.conference_date}</p>
          </div>
          <div className="flex items-center">
            <p className="text-gray-600 w-36">Conference Theme:</p>
            <p>{user.conference_theme}</p>
          </div>
          <div className="flex items-center">
            <p className="text-gray-600 w-36">Full Name:</p>
            <p>{user.full_name}</p>
          </div>
          <div className="flex items-center">
            <p className="text-gray-600 w-36">Email:</p>
            <p>{user.email}</p>
          </div>
          <div className="flex items-center">
            <p className="text-gray-600 w-36">State:</p>
            <p>{user.state}</p>
          </div>
          <div className="flex items-center">
            <p className="text-gray-600 w-36">Region:</p>
            <p>{user.region}</p>
          </div>
          <div className="flex items-center">
            <p className="text-gray-600 w-36">Province:</p>
            <p>{user.province}</p>
          </div>
          <div className="flex items-center">
            <p className="text-gray-600 w-36">Position In Parish:</p>
            <p>{user.position}</p>
          </div>
          <div className="flex items-center">
            <p className="text-gray-600 w-36">Phone Number:</p>
            <p>{user.phone_number}</p>
          </div>
          <div className="flex flex-wrap items-center">  {/* Added flex-wrap */}
            <p className="text-gray-600 w-36">Logging:</p>
            <p>{user.accommodation ? "Yes" : "No"}</p> 
          </div>
          <div className="flex items-center">
            <p className="text-gray-600 w-36">Arrival Date:</p>
            <p>{user.arrival_date}</p>
          </div>
          <div className="flex items-center">
            <p className="text-gray-600 w-36">Departure Date:</p>
            <p>{user.departure_date}</p>
          </div>
          <div className="flex items-center">
            <p className="text-gray-600 w-36">First Timer:</p>
            <p>{user.first_timer ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConferenceFormView;

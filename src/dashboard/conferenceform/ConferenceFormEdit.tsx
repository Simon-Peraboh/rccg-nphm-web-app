import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

// interface UserProfileCreationResponse {
//   message: string;
//   userProfileDTO: User; // Or whatever your DTO type is
// }

const ConferenceFormEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`/conference/${id}`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {

        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
  
    if (user) {
      setUser({
        ...user,
        [name]: type === "checkbox" ? e.target.checked : value, // ✅ Handle boolean fields
      });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!user) return; // ✅ Prevent sending empty data
  
    const updatedUser = Object.fromEntries(
      Object.entries(user).filter(([_, value]) => value !== null && value !== undefined)
    ); // ✅ Remove null/undefined values
  
    try {
      console.log("📡 Sending API Request:", updatedUser);
  
      const response = await axiosInstance.put(`/conference/update/${id}`, updatedUser);
  
      console.log("✅ API Response:", response.data);
      setSuccessMessage(response.data.message); // ✅ Show success message
  
      setTimeout(() => {
        navigate("/dashboard/conferenceTable");
      }, 5000);
    } catch (error) {
      console.error("🚨 API Update Failed:", error);
    }
  };
  

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (!user) {
    return <div className="p-4 text-center">User not found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold text-center">Edit User</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block">
              Conference Date:
              <input
                type="text"
                name="title"
                value={user.conference_date}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded form-input"
              />
            </label>
          </div>
          <div>
            <label className="block">
              Conference Theme:
              <input
                type="text"
                name="conference_theme"
                value={user.conference_theme}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded form-input"
              />
            </label>
          </div>
          <div>
            <label className="block">
              Full Name:
              <input
                type="text"
                name="full_name"
                value={user.full_name}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded form-input"
              />
            </label>
          </div>
          <div>
            <label className="block">
              Email:
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded form-input"
              />
            </label>
          </div>
          <div>
            <label className="block">
              State:
              <input
                type="text"
                name="state"
                value={user.state}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded form-input"
              />
            </label>
          </div>
          <div>
            <label className="block">
              Region:
              <input
                type="text"
                name="region"
                value={user.region}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded form-input"
              />
            </label>
          </div>
          <div>
            <label className="block">
              Province:
              <input
                type="text"
                name="province"
                value={user.province}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded form-input"
              />
            </label>
          </div>
          <div>
            <label className="block">
              Position In Parish:
              <input
                type="text"
                name="position"
                value={user.position}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded form-input"
              />
            </label>
          </div>
          <div>
            <label className="block">
              Phone Number:
              <input
                type="text"
                name="phone_number"
                value={user.phone_number}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded form-input"
              />
            </label>
          </div>
          <div>
            <label className="block">
              Accommodation:
              <input
                type="text"
                name="accommodation"
                value={user.accommodation ? 'Yes ' : 'No '}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded form-input"
              />
            </label>
          </div>
          <div>
            <label className="block">
               Arrival Date:
              <input
                type="text"
                name="arrival_date"
                value={user.arrival_date}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded form-input"
              />
            </label>
          </div>
          <div>
            <label className="block">
               Departure Date:
              <input
                type="text"
                name="departure_date"
                value={user.departure_date}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded form-input"
              />
            </label>
          </div>
          <div>
            <label className="block">
               First Timer:
              <input
                type="text"
                name="nextOfKin"
                value={user.first_timer ? 'Yes ' : 'No '}
                onChange={handleChange}
                className="block w-full mt-1 border-gray-300 rounded form-input"
              />
            </label>
          </div>
        </div>

        <button type="submit" className="p-2 mt-4 text-white bg-blue-500 rounded">
          Update User
        </button>
      </form>
      <div>
      {successMessage && (
        <div className="mt-2 text-green-500">{successMessage}</div>
      )}
      </div>
    </div>
  );
};

export default ConferenceFormEdit;
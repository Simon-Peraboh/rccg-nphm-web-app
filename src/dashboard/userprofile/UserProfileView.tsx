import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface User {
  id: number;
  title: string;
  first_name: string;
  others: string;
  last_name: string;
  email: string;
  state: string;
  city: string;
  region: string;
  province: string;
  lga: string;
  zone: string;
  area: string;
  parish: string;
  position: string;
  join_ministry: string;
  occupation: string;
  industry: string;
  dob: string;
  gender: string;
  phone_whatsapp: string;
  social_handle: string;
  address_home: string;
  nearest_busstop: string;
  address_office: string;
  next_of_kin: string;
  next_of_kin_phone: string;
  image_path: File | string;
  ordination_category: string;
}

const UserProfileTableView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://app2.rccgphm.org/api/userProfile/getUser/${id}`);
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
    <div className="p-4 bg-blue-200 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">User Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="flex items-center">
            <p className="w-36 text-gray-600">Title:</p>
            <p>{user.title}</p>
          </div>
          <div className="flex items-center">
            <p className="w-36 text-gray-600">First Name:</p>
            <p>{user.first_name}</p>
          </div>
          <div className="flex items-center">
            <p className="w-36 text-gray-600">Middle Name:</p>
            <p>{user.others}</p>
          </div>
          <div className="flex items-center">
            <p className="w-36 text-gray-600">Last Name:</p>
            <p>{user.last_name}</p>
          </div>
          <div className="flex items-center">
            <p className="w-36 text-gray-600">Email:</p>
            <p>{user.email}</p>
          </div>
          <div className="flex items-center">
            <p className="w-36 text-gray-600">State:</p>
            <p>{user.state}</p>
          </div>
          <div className="flex items-center">
            <p className="w-36 text-gray-600">Region:</p>
            <p>{user.region}</p>
          </div>
          <div className="flex items-center">
            <p className="w-36 text-gray-600">Local Govt:</p>
            <p>{user.lga}</p>
          </div>
          <div className="flex items-center">
            <p className="w-36 text-gray-600">Province:</p>
            <p>{user.province}</p>
          </div>
          <div className="flex items-center">
            <p className="w-36 text-gray-600">Zone:</p>
            <p>{user.zone}</p>
          </div>
          <div className="flex items-center">
            <p className="w-36 text-gray-600">Area:</p>
            <p>{user.area}</p>
          </div>
          <div className="flex items-center">
            <p className="w-36 text-gray-600">Parish:</p>
            <p>{user.parish}</p>
          </div>
          <div className="flex items-center">
            <p className="w-36 text-gray-600">Position In Parish:</p>
            <p>{user.position}</p>
          </div>
          <div className="flex items-center">
            <p className="w-36 text-gray-600">Join Ministry When:</p>
            <p>{user.join_ministry}</p>
          </div>
          <div className="flex items-center">
            <p className="w-36 text-gray-600">Your Occupation:</p>
            <p>{user.occupation}</p>
          </div>
          <div className="flex items-center">
            <p className="w-36 text-gray-600">Your Industry:</p>
            <p>{user.industry}</p>
          </div>
          <div className="flex items-center">
            <p className="w-36 text-gray-600">Date Of Birth:</p>
            <p> {user.dob} </p>
          </div>
          <div className="flex items-center">
            <p className="w-36 text-gray-600">Phone Number:</p>
            <p>{user.phone_whatsapp}</p>
          </div>
          <div className="flex items-center">
            <p className="w-36 text-gray-600">Preferred Social Media Handle:</p>
            <p>{user.social_handle}</p>
          </div>
          <div className="flex items-center">
            <p className="w-36 text-gray-600">Home Address:</p>
            <p>{user.address_home}</p>
          </div>
          <div className="flex items-center">
            <p className="w-36 text-gray-600">Nearest Bus Stop:</p>
            <p>{user.nearest_busstop}</p>
          </div>
          <div className="flex items-center">
            <p className="w-36 text-gray-600">Office Address:</p>
            <p>{user.address_office}</p>
          </div>
          <div className="flex items-center">
            <p className="w-36 text-gray-600">Next Of Kin name:</p>
            <p>{user.next_of_kin}</p>
          </div>
          <div className="flex items-center">
            <p className="w-36 text-gray-600">Next Of Kin Phone Number:</p>
            <p>{user.next_of_kin_phone}</p>
          </div>
          <div className="flex items-center">
            <p className="w-36 text-gray-600">Image:</p>
            {user.image_path ? (
              <img
                src={
                  typeof user.image_path === 'string' && user.image_path.startsWith('http')
                    ? user.image_path
                    : `https://app2.rccgphm.org/storage/${user.image_path}`
                }
                alt="User"
                className="h-24 w-24 rounded-full border object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.onerror = null;
                  target.src = '/placeholder.png';
                }}
              />
            ) : (
              <span className="italic text-gray-500">No Image</span>
            )}
          </div>
          <div className="flex items-center">
            <p className="w-36 text-gray-600">Ordination Category:</p>
            <p>{user.ordination_category}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileTableView;

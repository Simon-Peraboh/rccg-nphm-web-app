import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

interface User {
  id: number;
  title: string;
  first_name: string;
  others: string;
  last_name: string;
  email: string;
  gender: string;
  state: string;
  region: string;
  province: string;
  lga: string;
  city: string;
  zone: string;
  area: string;
  parish: string;
  position: string;
  join_ministry: string;
  occupation: string;
  dob: string;
  phone_whatsapp: string;
  social_handle: string;
  address_home: string;
  nearest_busstop: string;
  address_office: string;
  industry: string;
  next_of_kin: string;
  next_of_kin_phone: string;
  image_path: File | null;
  ordination_category: string;
}

// interface UserProfileCreationResponse {
//   message: string;
//   userProfileDTO: User; // Or whatever your DTO type is
// }

const UserProfileEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [successMessage,] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [user, setUser] = useState<User>({
    id: 0,
    title: "",
    first_name: "",
    others: "",
    last_name: "",
    email: "",
    gender: "",
    state: "",
    region: "",
    province: "",
    lga: "",
    city: "",
    zone: "",
    area: "",
    parish: "",
    position: "",
    join_ministry: "",
    occupation: "",
    dob: "",
    phone_whatsapp: "",
    social_handle: "",
    address_home: "",
    nearest_busstop: "",
    address_office: "",
    industry: "",
    next_of_kin: "",
    next_of_kin_phone: "",
    image_path: null, // ✅ Ensure image_path is initialized
    ordination_category: "",
  });

  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://nphmapp.rccgphm.org/api/userProfile/getUser/${id}`);
        setUser(response.data);

        // ✅ Ensure image persists on refresh
        if (response.data.image_path && typeof response.data.image_path === "string") {
          setPreviewUrl(response.data.image_path);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;

    if (e.target.name === "image_path" && e.target.files) {
      const file = e.target.files[0];
      setUser({ ...user, image_path: file });

      // ✅ Create a preview URL for the image
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const validateFields = () => {
    const requiredFields = [
    "title",
    "first_name",
    "others",
    "last_name",
    "email",
    "gender",
    "state",
    "region",
    "province",
    "lga",
    "city",
    "zone",
    "area",
    "parish",
    "position",
    "join_ministry",
    "occupation",
    "dob",
    "phone_whatsapp",
    "social_handle",
    "address_home",
    "nearest_busstop",
    "address_office",
    "industry",
    "next_of_kin",
    "next_of_kin_phone",
    "image_path", // ✅ Ensure image_path is initialized
    "ordination_category",
    ];

    const missingFields = requiredFields.filter(field => !user?.[field as keyof User]);

    if (missingFields.length > 0) {
      alert(`Please fill in the required fields: ${missingFields.join(", ")}`);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFields()) return;

    const formData = new FormData();
    Object.entries(user).forEach(([key, value]) => {
      formData.append(key, value instanceof File ? value : value.toString());
    });

    console.log("🛠 FormData Before Sending:", [...formData.entries()]);

    // ✅ Add request headers to match Postman
    const config = {
      headers: {
        "Accept": "application/json",
        "Content-Type": "multipart/form-data",
      },
    };

    try {
            const response = await axios.put(
        `https://nphmapp.rccgphm.org/api/userProfile/updateUser/${user.id}`,
        formData, // ✅ Send as multipart/form-data
        config
      );


      console.log("✅ Server Response:", response.data);

      // ✅ Delay navigation after success
      setTimeout(() => {
        navigate("/dashboard/monthlyReportTable");
      }, 3000);
    } catch (error: unknown) {
      console.error('Update error:', error);

      if (error instanceof Error) {
        toast.error(error.message || 'User Profile Update failed');
      } else {
        toast.error('User Profile Update failed');
      }
    }
  }
  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (!user) {
    return <div className="p-4 text-center">User not found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Edit User</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block">
              Title:
              <input
                type="text"
                name="title"
                value={user.title}
                onChange={handleChange}
                className="form-input mt-1 block w-full rounded border-gray-300"
              />
            </label>
          </div>
          <div>
            <label className="block">
              First Name:
              <input
                type="text"
                name="first_name"
                value={user.first_name}
                onChange={handleChange}
                className="form-input mt-1 block w-full rounded border-gray-300"
              />
            </label>
          </div>
          <div>
            <label className="block">
              Other Name:
              <input
                type="text"
                name="others"
                value={user.others}
                onChange={handleChange}
                className="form-input mt-1 block w-full rounded border-gray-300"
              />
            </label>
          </div>
          <div>
            <label className="block">
              Last Name:
              <input
                type="text"
                name="last_name"
                value={user.last_name}
                onChange={handleChange}
                className="form-input mt-1 block w-full rounded border-gray-300"
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
                className="form-input mt-1 block w-full rounded border-gray-300"
              />
            </label>
          </div>
          <div>
            <label className="block">
              Gender:
              <input
                type="text"
                name="gender"
                value={user.gender}
                onChange={handleChange}
                className="form-input mt-1 block w-full rounded border-gray-300"
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
                className="form-input mt-1 block w-full rounded border-gray-300"
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
                className="form-input mt-1 block w-full rounded border-gray-300"
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
                className="form-input mt-1 block w-full rounded border-gray-300"
              />
            </label>
          </div>
          <div>
            <label className="block">
              Local Govt:
              <input
                type="text"
                name="lga"
                value={user.lga}
                onChange={handleChange}
                className="form-input mt-1 block w-full rounded border-gray-300"
              />
            </label>
          </div>
          <div>
            <label className="block">
              City:
              <input
                type="text"
                name="city"
                value={user.city}
                onChange={handleChange}
                className="form-input mt-1 block w-full rounded border-gray-300"
              />
            </label>
          </div>
          <div>
            <label className="block">
              Zone:
              <input
                type="text"
                name="zone"
                value={user.zone}
                onChange={handleChange}
                className="form-input mt-1 block w-full rounded border-gray-300"
              />
            </label>
          </div>
          <div>
            <label className="block">
              Area:
              <input
                type="text"
                name="area"
                value={user.area}
                onChange={handleChange}
                className="form-input mt-1 block w-full rounded border-gray-300"
              />
            </label>
          </div>
          <div>
            <label className="block">
              Parish:
              <input
                type="text"
                name="parish"
                value={user.parish}
                onChange={handleChange}
                className="form-input mt-1 block w-full rounded border-gray-300"
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
                className="form-input mt-1 block w-full rounded border-gray-300"
              />
            </label>
          </div>
          <div>
            <label className="block">
              Join Ministry When:
              <input
                type="text"
                name="join_ministry"
                value={user.join_ministry}
                onChange={handleChange}
                className="form-input mt-1 block w-full rounded border-gray-300"
              />
            </label>
          </div>
          <div>
            <label className="block">
              Your Occupation:
              <input
                type="text"
                name="occupation"
                value={user.occupation}
                onChange={handleChange}
                className="form-input mt-1 block w-full rounded border-gray-300"
              />
            </label>
          </div>
          <div>
            <label className="block">
              Your Industry:
              <input
                type="text"
                name="industry"
                value={user.industry}
                onChange={handleChange}
                className="form-input mt-1 block w-full rounded border-gray-300"
              />
            </label>
          </div>
          <div>
            <label className="block">
              Date Of Birth:
              <input
                type="text"
                name="dob"
                value={user.dob}
                onChange={handleChange}
                className="form-input mt-1 block w-full rounded border-gray-300"
              />
            </label>
          </div>
          <div>
            <label className="block">
              Phone Number:
              <input
                type="text"
                name="phone_whatsapp"
                value={user.phone_whatsapp}
                onChange={handleChange}
                className="form-input mt-1 block w-full rounded border-gray-300"
              />
            </label>
          </div>
          <div>
            <label className="block">
              Your Preferred Social Media Handle:
              <input
                type="text"
                name="social_handle"
                value={user.social_handle}
                onChange={handleChange}
                className="form-input mt-1 block w-full rounded border-gray-300"
              />
            </label>
          </div>
          <div>
            <label className="block">
              Home Address:
              <input
                type="text"
                name="address_home"
                value={user.address_home}
                onChange={handleChange}
                className="form-input mt-1 block w-full rounded border-gray-300"
              />
            </label>
          </div>
          <div>
            <label className="block">
              Nearest Bus Stop:
              <input
                type="text"
                name="nearest_busstop"
                value={user.nearest_busstop}
                onChange={handleChange}
                className="form-input mt-1 block w-full rounded border-gray-300"
              />
            </label>
          </div>
          <div>
            <label className="block">
              Office Address:
              <input
                type="text"
                name="address_office"
                value={user.address_office}
                onChange={handleChange}
                className="form-input mt-1 block w-full rounded border-gray-300"
              />
            </label>
          </div>
          <div>
            <label className="block">
              Your Next Of Kin Name:
              <input
                type="text"
                name="next_of_kin"
                value={user.next_of_kin}
                onChange={handleChange}
                className="form-input mt-1 block w-full rounded border-gray-300"
              />
            </label>
          </div>
          <div>
            <label className="block">
              Your Next Of Kin PhoneNumber:
              <input
                type="text"
                name="next_of_kin_phone"
                value={user.next_of_kin_phone}
                onChange={handleChange}
                className="form-input mt-1 block w-full rounded border-gray-300"
              />
            </label>
          </div>
          <div>
            <label htmlFor="image_path" className="block">Upload Image:</label>
            <input
              id="image_path"
              type="file"
              name="image_path"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (user && file) {
                  setUser({ ...user, image_path: file });
                  setPreviewUrl(URL.createObjectURL(file));
                }
              }}
              className="block mb-2"
            />
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="h-20 w-20 object-cover border rounded-full"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.png";
                }}
              />
            ) : (
              <span className="text-gray-400 italic">No Image</span>
            )}
          </div>
          <div>
            <label className="block">
              Ordination Category:
              <input
                type="text"
                name="ordination_category"
                value={user.ordination_category}
                onChange={handleChange}
                className="form-input mt-1 block w-full rounded border-gray-300"
              />
            </label>
          </div>
        </div>

        <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">
          Update User
        </button>
      </form>
      <div>

        {successMessage && (
          <div className="text-green-500 mt-2">{successMessage}</div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} />
    </div>
  );
};

export default UserProfileEdit;
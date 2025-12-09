import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';

// The states are expected as an array of strings.
type StateOptions = string[];

interface FormDataType {
  full_name: string;
  state: string;
  province: string;
  facebook: string;
  twitter: string;
  instagram: string;
  image_path: File | null;
}

const defaultFormData: FormDataType = {
  full_name: '',
  state: '',
  province: '',
  facebook: '',
  twitter: '',
  instagram: '',
  image_path: null,
};


const LOCAL_STORAGE_KEY = "nphm_form";

const loadFromLocalStorage = (): FormDataType | null => {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  try {
    const parsedData = saved ? JSON.parse(saved) : null;
    if (parsedData) {
      parsedData.image_path = null; // Reset image_path as null since JSON doesn't support Files
    }
    return parsedData;
  } catch (error) {
    return null;
  }
};

const saveToLocalStorage = (data: FormDataType) => {
  const sanitizedData = { ...data, image_path: data.image_path instanceof File ? data.image_path : null };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sanitizedData));
};


const StateCoordinatorForm: React.FC = () => {
  const navigate = useNavigate();
  const [stateOptions, setStateOptions] = useState<StateOptions>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [, setErrors] = useState<Record<string, string>>({});
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [form, setForm] = useState<FormDataType>(() => loadFromLocalStorage() ?? defaultFormData);
  
  
  // Fetch the available states from backend
  useEffect(() => {
    axios
      .get('https://app.rccgphm.org/api/stateCoordinators/states')
      .then((response) => {
        console.log("Fetched states response:", response.data);
        if (Array.isArray(response.data)) {
          setStateOptions(response.data);
          setForm((prev) => ({
            ...prev,
            state: response.data[0] || '',
          }));
        } else {
          toast.error('Unexpected data format for states.', {
            position: "top-right",
            autoClose: 5000,
          });
          console.error("Unexpected states format:", response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching states:', error);
        toast.error('Failed to load state options.', {
          position: "top-right",
          autoClose: 5000,
        });
      });
  }, []);

  useEffect(() => {
      const saved = loadFromLocalStorage();
      if (saved) setForm(saved);
    }, []);
    
    useEffect(() => {
      saveToLocalStorage(form);
    }, [form]);
  

  // Update formData for inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm(prev => ({ ...prev, image_path: file }));
      setPreviewUrl(URL.createObjectURL(file)); // 🔍 creates temporary preview URL
    }
  };


  const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setErrors({});

  const submissionData = new FormData();

  Object.entries(form).forEach(([key, val]) => {
    if (val !== null && val !== undefined) {
      submissionData.append(key, val as string | Blob);
    }
  });

  try {
    const response = await axios.post(
      'https://app.rccgphm.org/api/stateCoordinators/create',
      submissionData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );

    if (response.status >= 200 && response.status < 300) {
      const successMsg = response.data.message || '✅ Form submitted successfully!';
      toast.success(successMsg, {
        position: 'top-right',
        autoClose: 5000,
      });
      console.log("✅ Submission response:", response);
      // Optionally reset form here
    } else {
      console.warn("⚠️ Unexpected status:", response.status);
    }
      setTimeout(() => {
        navigate("/");
      }, 3000);

  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const errorData = error.response.data;
      const validationErrors = errorData.errors ?? (
        typeof errorData.message === 'object' ? errorData.message : null
      );

      if (validationErrors) {
        Object.entries(validationErrors).forEach(([field, messages]) => {
          const msgStr = Array.isArray(messages) ? messages.join(' ') : String(messages);
          toast.error(`${field}: ${msgStr}`, {
            position: 'top-right',
            autoClose: 5000,
          });
        });
        setErrors(validationErrors);
      } else {
        const fallbackMsg = errorData.message || '❌ Error submitting form.';
        toast.error(fallbackMsg, {
          position: 'top-right',
          autoClose: 5000,
        });
        console.error("Server Error:", fallbackMsg);
      }
    } else {
      toast.error('❌ Network or unexpected error.', {
        position: 'top-right',
        autoClose: 5000,
      });
      console.error("Unknown error:", error);
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="max-w-xl mx-auto p-10 bg-blue-200 shadow-md rounded-lg">
  <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
    State Coordinator Form
  </h2>
  <form onSubmit={handleSubmit} encType="multipart/form-data">
    {/* Full Name */}
    <div className="mb-5">
      <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">
        Full Name
      </label>
      <input
        type="text"
        id="full_name"
        name="full_name"
        value={form.full_name}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    {/* State */}
    <div className="mb-5">
      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
        State
      </label>
      <select
        id="state"
        name="state"
        value={form.state}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {stateOptions.map((state, index) => (
          <option key={index} value={state}>
            {state}
          </option>
        ))}
      </select>
    </div>

    {/* Province */}
    <div className="mb-5">
      <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">
        Province
      </label>
      <input
        type="text"
        id="province"
        name="province"
        value={form.province}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    {/* Facebook URL */}
    <div className="mb-5">
      <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 mb-1">
        Facebook URL
      </label>
      <input
        type="url"
        id="facebook"
        name="facebook"
        value={form.facebook}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    {/* Twitter URL */}
    <div className="mb-5">
      <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-1">
        Twitter URL
      </label>
      <input
        type="url"
        id="twitter"
        name="twitter"
        value={form.twitter}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    {/* Instagram URL */}
    <div className="mb-5">
      <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-1">
        Instagram URL
      </label>
      <input
        type="url"
        id="instagram"
        name="instagram"
        value={form.instagram}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>

    {/* Profile Image with Preview */}
    <div className="mb-5">
      <label htmlFor="image_path" className="block text-sm font-semibold text-gray-700 mb-1">
        Upload Image
      </label>
      <input
        id="image_path"
        type="file"
        name="image_path"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {previewUrl && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">Image Preview:</p>
          <img src={previewUrl} alt="Preview" className="h-40 rounded shadow-lg mt-2" />
        </div>
      )}
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
      disabled={loading}
    >
      {loading ? 'Submitting...' : 'Submit'}
    </button>
  </form>

  <ToastContainer position="top-right" autoClose={4000} />
</div>

  );
};

export default StateCoordinatorForm;

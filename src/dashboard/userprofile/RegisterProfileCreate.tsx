// File: RegisterProfileCreate.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {ToastContainer, toast } from "react-toastify";

interface UserForm {
  title: string;
  first_name: string;
  others: string;
  last_name: string;
  email: string;
  gender: string;
  region: string;
  province: string;
  zone: string;
  area: string;
  parish: string;
  state: string;
  lga: string;
  city: string;
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

const LOCAL_STORAGE_KEY = "nphm_form";

const loadFromLocalStorage = (): UserForm | null => {
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

const saveToLocalStorage = (data: UserForm) => {
  const sanitizedData = { ...data, image_path: data.image_path instanceof File ? data.image_path : null };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sanitizedData));
};

const defaultForm: UserForm = {
  title: "",
  first_name: "",
  others: "",
  last_name: "",
  email: "",
  phone_whatsapp: "",
  dob: "",
  join_ministry: "",
  occupation: "",
  industry: "",
  zone: "",
  area: "",
  parish: "",
  city: "",
  position: "",
  address_home: "",
  nearest_busstop: "",
  address_office: "",
  next_of_kin: "",
  next_of_kin_phone: "",
  social_handle: "",
  gender: "",
  ordination_category: "",
  region: "",
  province: "",
  state: "",
  lga: "",
  image_path: null,
};


const RegisterProfileCreate: React.FC = () => {
  const navigate = useNavigate();

  const [regions, setRegions] = useState<string[]>([]);
  const [provinces, setProvinces] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [lgas, setLgas] = useState<string[]>([]);
  const [form, setForm] = useState<UserForm>(() => loadFromLocalStorage() ?? defaultForm);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);



  const genderOptions = ["MALE", "FEMALE"];
  const ordinationOptions = ["DEACON", "DEACONESS", "ASST PASTOR", "FULL PASTOR"];
 
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/userProfile/regions").then((res) => {
      setRegions(res.data);
    });

    axios.get("http://127.0.0.1:8000/api/userProfile/states").then((res) => {
      setStates(res.data);
    });
  }, []);

  useEffect(() => {
    if (form.region) {
      axios
        .get(`http://127.0.0.1:8000/api/userProfile/provinces/${form.region}`)
        .then((res) => setProvinces(res.data));
    }
  }, [form.region]);

  useEffect(() => {
    if (form.state) {
      axios
        .get(`http://127.0.0.1:8000/api/userProfile/lgas/${form.state}`)
        .then((res) => setLgas(res.data));
    }
  }, [form.state]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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


  useEffect(() => {
    const saved = loadFromLocalStorage();
    if (saved) setForm(saved);
  }, []);
  
  useEffect(() => {
    saveToLocalStorage(form);
  }, [form]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (val !== null && val !== undefined) {
        formData.append(key, val instanceof File ? val : String(val));
      }
    });

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/userProfile/createUser", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

       // Extract success message from backend response
      const successMessage = res.data.message || "✅ Submission successful";
      toast.success(`✅ ${successMessage}`);

      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data;

        if (!errorData || typeof errorData !== "object") {
          toast.error("❌ Submission failed");
        } else if (errorData.message && typeof errorData.message === "object") {
          Object.entries(errorData.message).forEach(([field, messages]) => {
            const messageArray = Array.isArray(messages) ? messages : [String(messages)];
            messageArray.forEach((msg) => {
              toast.error(`❌ ${field}: ${msg}`);
            });
          });
        } else {
          toast.error(`❌ ${errorData.error}`);
        }
      } else {
        toast.error("❌ An unexpected error occurred");
      }
    }
  };

  const renderInput = (label: string, name: keyof UserForm, type = "text", placeholder = "") => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={form[name] as string}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border rounded"
      />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto bg-blue-200 shadow-lg rounded-lg p-8 sm:p-10">
      <h2 className="text-4xl font-bold text-center text-blue-800 mb-10">NPHM Bio-Data Form</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderInput("Title", "title", "text", "Mr / Mrs / Dr")}
          {renderInput("First Name", "first_name", "text", "e.g. John")}
          {renderInput("Middle Name", "others", "text", "Optional")}
          {renderInput("Last Name", "last_name", "text", "e.g. Doe")}
          {renderInput("Email", "email", "email", "e.g. john@example.com")}
          {renderInput("Phone Number", "phone_whatsapp", "text", "e.g. +2348012345678")}
          {renderInput("Date of Birth", "dob", "date")}
          {renderInput("Join The Ministry When", "join_ministry", "date")}
          {renderInput("Occupation", "occupation", "text", "e.g. Teacher")}
          {renderInput("Industry", "industry", "text", "e.g. Education")}
          {renderInput("Zone", "zone", "text", "e.g. Zone A")}
          {renderInput("Area", "area", "text", "e.g. Area 1")}
          {renderInput("Parish", "parish", "text", "e.g. RCCG Grace Chapel")}
          {renderInput("City", "city", "text", "e.g. Lagos")}
          {renderInput("Position", "position", "text", "e.g. Choir Leader")}
          {renderInput("Home Address", "address_home", "text", "123 Example Street")}
          {renderInput("Nearest Bus Stop", "nearest_busstop", "text", "e.g. Ikeja Underbridge")}
          {renderInput("Office Address", "address_office", "text", "Office Location")}
          {renderInput("Next of Kin Name", "next_of_kin", "text", "e.g. Jane Doe")}
          {renderInput("Next of Kin Phone", "next_of_kin_phone", "text", "e.g. +2348012345679")}
          {renderInput("Social Media Handle", "social_handle", "text", "@yourhandle")}
          <div>

            <label htmlFor="gender" className="block text-sm font-semibold mb-1">Gender</label>
            <select
              id="gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select Gender</option>
              {genderOptions.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="ordination_category" className="block text-sm font-semibold mb-1">Ordination Category</label>
            <select
              id="ordination_category"
              name="ordination_category"
              value={form.ordination_category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Ordination</option>
              {ordinationOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="region" className="block text-sm font-semibold mb-1">Region</label>
            <select
              id="region"
              name="region"
              value={form.region}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select Region</option>
              {regions.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="province" className="block text-sm font-semibold mb-1">Province</label>
            <select
              id="province"
              name="province"
              value={form.province}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select Province</option>
              {provinces.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-semibold mb-1">State</label>
            <select
              id="state"
              name="state"
              value={form.state}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select State</option>
              {states.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="lga" className="block text-sm font-semibold mb-1">Local Government Area</label>
            <select
              id="lga"
              name="lga"
              value={form.lga}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select LGA</option>
              {lgas.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>

         <div className="md:col-span-2">
            <label htmlFor="image_path" className="block text-sm font-semibold text-gray-700 mb-1">Upload Image</label>
            <input
              id="image_path"
              type="file"
              name="image_path"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500"
            />

            {previewUrl && (
              <div className="mt-4">
                <p className="text-sm text-gray-600">Image Preview:</p>
                <img src={previewUrl} alt="Preview" className="h-40 rounded shadow" />
              </div>
            )}
          </div>
        </div>
        <div className="mt-10 flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-green-500 text-white font-bold px-8 py-3 rounded-md shadow transition-all duration-200"
          >
            Submit
          </button>
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={4000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        theme="colored"
       />
    </div>

  );
};

export default RegisterProfileCreate;

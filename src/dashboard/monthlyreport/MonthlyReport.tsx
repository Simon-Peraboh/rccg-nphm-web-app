import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface User {
  state: string;
  region: string;
  province: string;
  coordinator_name: string;
  prison_visited: string;
  hospital_visited: string;
  police_station_visited: string;
  others?: string;
  items: string;
  amount_budgeted: string;
  amount_spent: string;
  team_members: string;
  souls_won: string;
  challenges?: string;
  suggestion?: string;
  remarks?: string;
  activity_date: string;
  report_created_by: string;
}

const MonthlyReport: React.FC = () => {
  const [regions, setRegions] = useState<string[]>([]);
  const [provinces, setProvinces] = useState<string[]>([]);
  const [reviewMode, setReviewMode] = useState<boolean>(false);

  const [user, setUser] = useState<User>({
    state: "",
    region: "",
    province: "",
    coordinator_name: "",
    prison_visited: "",
    hospital_visited: "",
    police_station_visited: "",
    others: "",
    items: "",
    amount_budgeted: "",
    amount_spent: "",
    team_members: "",
    souls_won: "",
    challenges: "",
    suggestion: "",
    remarks: "",
    activity_date: "",
    report_created_by: ""
  });

  const navigate = useNavigate();

    // ✅ Fetch regions
  useEffect(() => {
    axios.get("https://app.rccgphm.org/api/monthlyReports/regions")
      .then(res => setRegions(res.data.regions || res.data))
      .catch(() => toast.error("Failed to fetch regions"));
  }, []);

  // ✅ Fetch provinces when region changes
  useEffect(() => {
    if (user.region) {
      axios.get(`https://app.rccgphm.org/api/monthlyReports/provinces/${user.region}`)
        .then(res => setProvinces(res.data.provinces || res.data))
        .catch(() => toast.error("Failed to fetch provinces"));
    } else {
      setProvinces([]);
    }
  }, [user.region]);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewMode(true);
  };

   const onConfirmSubmit = async () => {
    try {
      const response = await axios.post("https://app.rccgphm.org/api/monthlyReports/createReport", user);
      toast.success(response.data.message || "Report submitted successfully!");
      setTimeout(() => navigate("/dashboard/monthlyReportTable"), 3000);
    } catch (error) {
      const msg = axios.isAxiosError(error)
        ? error.response?.data?.message || 'Failed to submit report.'
        : 'An unexpected error occurred.';
      toast.error(msg);
    }
  };

  return (
    <div className='container mx-auto mt-10'>
      <ToastContainer position='top-center' />
      {reviewMode ? (
        <div className='flex justify-center'>
          <div className='w-full max-w-md p-8 bg-blue-200 shadow-md rounded'>
            <h2 className='text-2xl font-bold mb-6'>Review Your Submission</h2>
            {Object.entries(user).map(([key, val]) => (
              <div key={key} className='mb-4'>
                <strong className='capitalize'>{key.replace(/_/g, ' ')}:</strong> {val}
              </div>
            ))}
            <div className='flex justify-between mt-6'>
              <button
                className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                onClick={() => setReviewMode(false)}
              >
                Edit
              </button>
              <div>
                <button
                  className='bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded mr-2'
                  onClick={onConfirmSubmit}
                >
                  Submit
                </button>
                <Link to="/" className='bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded'>
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex justify-center'>
          <div className='w-full max-w-6xl p-8 bg-blue-200 shadow-md rounded'>
            <h2 className='text-2xl font-bold mb-6 text-center'>Create Monthly Report</h2>
            <form onSubmit={onSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium">Region</label>
                  <select
                     title='region'
                    name="region"
                    value={user.region}
                    onChange={onInputChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  >
                    <option value="">Select Region</option>
                    {regions.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium">Province</label>
                  <select
                    title='province'
                    name="province"
                    value={user.province}
                    onChange={onInputChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  >
                    <option value="">Select Province</option>
                    {provinces.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                {[
                  ["state", "Enter Your State"],
                  // ["region", "Enter Your Region"],
                  // ["province", "Enter Your Province"],
                  ["coordinator_name", "Enter Coordinator Name"],
                  ["prison_visited", "Enter Name Of Prison"],
                  ["hospital_visited", "Enter Name Of Hospital"],
                  ["police_station_visited", "Enter Name Of Police Station"],
                  ["others", "Other Places Visited"],
                  ["items", "Items e.g Rice, Garri"],
                  ["amount_budgeted", "Enter Budgeted Amount"],
                  ["amount_spent", "Enter Actual Amount Spent"],
                  ["team_members", "Total Number Who Went"],
                  ["souls_won", "Souls Won e.g 5"],
                  ["challenges", "Challenges Faced If Any"],
                  ["suggestion", "Any Suggestions?"],
                  ["remarks", "Any Remarks"],
                  ["report_created_by", "Enter Your Name"]
                ].map(([name, placeholder]) => (
                  <div key={name}>
                    <label htmlFor={name} className='block text-sm font-medium capitalize'>
                      {name.replace(/_/g, " ")}
                    </label>
                    <input
                      type="text"
                      name={name}
                      placeholder={placeholder}
                      value={user[name as keyof User] as string}
                      onChange={onInputChange}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required={!["others", "challenges", "suggestion", "remarks"].includes(name)}
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="activity_date" className='block text-sm font-medium'>Date Of Visitation</label>
                  <input
                    id='activity_date'
                    type="date"
                    name="activity_date"
                    value={user.activity_date}
                    onChange={onInputChange}
                    className='mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                    required
                  />
                </div>
              </div>

              <div className='flex justify-between mt-8'>
                <button
                  type='submit'
                  className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
                >
                  Review
                </button>
                <Link
                  to="/"
                  className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600'
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthlyReport;

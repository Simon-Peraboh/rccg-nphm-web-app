import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/Store";
import { fetchAttendances } from "../redux/AttendanceSlice";
import { getUsers, submitAttendance } from "../../apicalls/attendance/api";
import dayjs from "dayjs";
import { toast, ToastContainer } from "react-toastify";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router";
import "react-datepicker/dist/react-datepicker.css"; // ✅ Import styles



const UserAttendanceForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { attendances } = useSelector((state: RootState) => state.attendance);

  const [users, setUsers] = useState<{ id: number; full_name: string }[]>([]);
  const [selectedUser, setSelectedUser] = useState<{ id: number; full_name: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    conference_id: 0,
    arrival_time: "",
    comments: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => toast.error("❌ Failed to fetch users"));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchAttendances());
    }, 5000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const userAttendance = useMemo(() => {
    if (!selectedUser) return null; // ✅ Avoid errors when selectedUser is undefined
    return attendances.find((att) => att.conference.id === selectedUser.id); // ✅ Correct reference
  }, [attendances, selectedUser]);

  useEffect(() => {
    if (userAttendance?.status === "acknowledged") {
      toast.success("✅ Attendance Acknowledged! Redirecting...");
      setTimeout(() => navigate("/"), 2000);
    }
  }, [userAttendance, navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formattedData = {
      ...formData,
      arrival_time: dayjs(formData.arrival_time).format("YYYY-MM-DD HH:mm:ss"),
    };

    try {
      const response = await submitAttendance(formattedData);
      toast.success(response.data.message);
      await dispatch(fetchAttendances()).unwrap();
    } catch (error) {
      toast.error("❌ Failed to submit attendance");
    }
  };

  return (
    <div className="p-6 bg-blue-200 rounded-lg shadow-md max-w-lg mx-auto"
      >
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Submit Attendance</h2>

      {/* ✅ Search input */}
      <input
        type="text"
        placeholder="Search for your name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-3 border rounded-lg mb-4 focus:border-blue-400 transition"
      />

      {/* ✅ User list */}
      <div className="max-h-64 overflow-y-auto border rounded-lg">
        {users
          .filter((user) => user.full_name.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((user) => (
            <div
              key={user.id}
              onClick={() => {
                setSelectedUser(user);
                setFormData({ ...formData, conference_id: user.id });
              }}
              className={`p-3 cursor-pointer transition ${
                selectedUser?.id === user.id ? "bg-blue-500 text-white" : "hover:bg-gray-100"
              }`}
            >
              {user.full_name}
            </div>
          ))}
      </div>

      {selectedUser && (
        <form onSubmit={handleSubmit} className="mt-6 p-4 bg-gray-100 rounded-lg shadow">
          <label className="block font-semibold text-gray-700">Arrival Time:</label>
          <input
            type="datetime-local"
            value={formData.arrival_time}
            onChange={(e) => {
              setFormData({ ...formData, arrival_time: e.target.value });
              setIsModalOpen(true);
            }}
            className="w-full p-2 border rounded-lg mb-4"
          />

          <label className="block font-semibold text-gray-700">Comments:</label>
          <textarea
            value={formData.comments || ""}
            onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
            className="w-full p-2 border rounded-lg mb-4"
          />

          <button
            type="submit"
            className="w-full p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Attendance
          </button>

          {userAttendance && (
            <p className="mt-4 text-center font-medium text-gray-700">
              {userAttendance.status === "acknowledged"
                ? "✅ Attendance Acknowledged - Redirecting..."
                : "⏳ Waiting for Admin Approval"}
            </p>
          )}
        </form>
      )}

      {/* ✅ Modal Component */}
      {isModalOpen && (
        <div className="modal mt-4">
          <DatePicker
            selected={formData.arrival_time ? new Date(formData.arrival_time) : null}
            onChange={(date: Date | null) => {
              if (date) {
                setFormData({ ...formData, arrival_time: date.toISOString() });
                setIsModalOpen(false);
              }
            }}
          />
        </div>
      )}
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

export default UserAttendanceForm;
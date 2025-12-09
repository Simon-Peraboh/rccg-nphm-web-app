import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAttendances, acknowledgeAttendance } from "../redux/AttendanceSlice";
import { RootState, AppDispatch } from "../redux/Store";
import { toast } from "react-toastify";

const AttendanceAdminDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { attendances, loading, error, statusUpdatedAt } = useSelector((state: RootState) => state.attendance);
 

  // ✅ Fetch once on initial mount
  useEffect(() => {
    const interval = setInterval(() => {
          dispatch(fetchAttendances());
        }, 5000); // Fetch every 10 seconds
    dispatch(fetchAttendances());
    return () => clearInterval(interval)
  }, [dispatch, statusUpdatedAt]);

  const handleAcknowledge = async (id: number) => {
    try {
      // ✅ Update UI immediately before API call
      dispatch({
        type: "attendance/acknowledgeOptimistic",
        payload: id,
      });
  
      await dispatch(acknowledgeAttendance(id)).unwrap();
      toast.success("Acknowledged successfully");
  
      // ✅ Trigger update without waiting for fetch
      dispatch(fetchAttendances());
    } catch (error) {
      toast.error("Failed to acknowledge");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Admin Dashboard</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <table className="w-full mt-4 border">
        <thead>
          <tr>
            <th className="p-2">User</th>
            <th className="p-2">Arrival Time</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {attendances.map((att) => (
            <tr key={att.id}>
              <td className="p-2">{att.conference?.full_name || "Unknown"}</td>
              <td className="p-2">{att.arrival_time}</td>
              <td className="p-2">{att.status}</td>
              <td className="p-2">
                {att.status === "pending" ? (
                  <button
                    className="px-3 py-1 text-white bg-blue-500 rounded"
                    onClick={() => handleAcknowledge(att.id)}
                  >
                    Acknowledge
                  </button>
                ) : (
                  <span className="text-green-500">Acknowledged</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceAdminDashboard;

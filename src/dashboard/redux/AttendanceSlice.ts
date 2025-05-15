import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../apicalls/attendance/api";


// ✅ Define State Type (Fixes 'any' errors)
interface AttendanceState {
  attendances: Array<{ 
    id: number;
    status: string;
    arrival_time: string;
    conference: { // ✅ Store conference object properly
      id: number;
      full_name: string;
    };
  }>;


  loading: boolean;
  error: string | null;
  lastUpdated: number;
  statusUpdatedAt: number;
  submissionTrigger: number;
}

// ✅ Define Initial State with Type
const initialState: AttendanceState = {
  attendances: [],
  loading: false,
  error: null,
  lastUpdated: 0,
  statusUpdatedAt: 0,
  submissionTrigger: 0,
};

// ✅ Fetch all attendances (Admin)
export const fetchAttendances = createAsyncThunk("attendance/fetchAll", async () => {
  const response = await axiosInstance.get("/attendance/all");
  return response.data;
});

// ✅ Acknowledge attendance (Admin)
export const acknowledgeAttendance = createAsyncThunk(
  "attendance/acknowledge",
  async (id: number) => {
    const response = await axiosInstance.patch(`/attendance/admin/${id}`);
    return response.data;
  }
);

// ✅ Create Redux Slice
const AttendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    // ✅ Optimistic Update Before API Call
    acknowledgeOptimistic: (state, action: PayloadAction<number>) => {
      state.attendances = state.attendances.map((att) =>
        att.id === action.payload ? { ...att, status: "acknowledged" } : att
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Fetch Attendances
      .addCase(fetchAttendances.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAttendances.fulfilled, (state, action) => {
        state.loading = false;
        state.attendances = action.payload;
        state.lastUpdated = Date.now();
      })
      .addCase(fetchAttendances.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch attendances";
      })

      // ✅ Acknowledge Attendance (After API Success)
      .addCase(acknowledgeAttendance.fulfilled, (state, action) => {
        const updated = action.payload.data;
        state.attendances = state.attendances.map((att) =>
          att.id === updated.id
            ? { ...att, status: updated.status, conference: updated.conference }
            : att
        );
        state.statusUpdatedAt = Date.now(); // ✅ Trigger UI re-render
      });
  },
});

export const { acknowledgeOptimistic } = AttendanceSlice.actions;
export default AttendanceSlice.reducer;
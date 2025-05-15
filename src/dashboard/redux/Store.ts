import { configureStore } from "@reduxjs/toolkit";
import attendanceReducer from "./AttendanceSlice";

const Store = configureStore({
    reducer: {
        attendance: attendanceReducer,
    },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
export default Store;

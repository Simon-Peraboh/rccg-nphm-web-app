import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { InAction, HopOnboard, WeAre, Connect, Report, Blog, Contact } from './pages/index.tsx'
import {createBrowserRouter, RouterProvider, } from "react-router-dom";
import HomePage from './components/home/Home.tsx';
import Dashboard from './dashboard/Dashboard.tsx'
import UserProfileTableView from './dashboard/userprofile/UserProfileView.tsx'
import UserProfileEdit from './dashboard/userprofile/UserProfileEdit.tsx'
import ConferenceForm from './dashboard/conferenceform/ConferenceForm.tsx'
import ConferenceFormTable from './dashboard/conferenceform/ConferenceFormTable.tsx'
import ConferenceFormView from './dashboard/conferenceform/ConferenceFormView.tsx'
import ConferenceFormEdit from './dashboard/conferenceform/ConferenceFormEdit.tsx'
import MonthlyReport from './dashboard/monthlyreport/MonthlyReport.tsx'
import RegisterUser from './dashboard/register_login_detail/RegisterUser.tsx'
import ProtectedRoute from './dashboard/protectroutes/ProtectedRoute.tsx'
import LoginUser from './dashboard/register_login_detail/LoginUser.tsx'
import MonthlyDueCreate from './dashboard/monthlydue/MonthlyDueCreate.tsx'
import MonthlyDueTable from './dashboard/monthlydue/MonthlyDueTable.tsx'
import MonthlyDueEdit from './dashboard/monthlydue/MonthlyDueEdit.tsx'
import MonthlyDueView from './dashboard/monthlydue/MonthlyDueView.tsx'
import MonthlyReportCreate from './dashboard/monthlyreport/MonthlyReportCreate.tsx'
import MonthlyReportTable from './dashboard/monthlyreport/MonthlyReportTable.tsx'
import MonthlyReportEdit from './dashboard/monthlyreport/MonthlyReportEdit.tsx'
import MonthlyReportView from './dashboard/monthlyreport/MonthlyReportView.tsx'
import NationalReportCreate from './dashboard/nationalreport/NationalReportCreate.tsx'
import NationalReportTable from './dashboard/nationalreport/NationalReportTable.tsx'
import NationalReportView from './dashboard/nationalreport/NationalReportView.tsx'
import NationalReportEdit from './dashboard/nationalreport/NationalReportEdit.tsx'
import SecretaryNoteCreate from './dashboard/secretarynote/SecretaryNoteCreate.tsx'
import SecretaryNoteTable from './dashboard/secretarynote/SecretaryNoteTable.tsx'
import SecretaryNoteView from './dashboard/secretarynote/SecretaryNoteView.tsx'
import SecretaryNoteEdit from './dashboard/secretarynote/SecretaryNoteEdit.tsx'
import SpecialProjectsCreate from './dashboard/specialproject/SpecialProjectsCreate.tsx'
import SpecialProjectsTable from './dashboard/specialproject/SpecialProjectsTable.tsx'
import SpecialProjectsView from './dashboard/specialproject/SpecialProjectsView.tsx'
import SpecialProjectsEdit from './dashboard/specialproject/SpecialProjectsEdit.tsx'
import QuarterlyReportCreate from './dashboard/quarterlyreport/QuarterlyReportCreate.tsx'
import QuarterlyReportTable from './dashboard/quarterlyreport/QuarterlyReportTable.tsx'
import QuarterlyReportEdit from './dashboard/quarterlyreport/QuarterlyReportEdit.tsx'
import QuarterlyReportView from './dashboard/quarterlyreport/QuarterlyReportView.tsx'
import QuarterlyReportTable2 from './dashboard/quarterlyreport/QuarterlyReportTable2.tsx'
import TodoListTable from './dashboard/todolist/TodoListTable.tsx'
import TodoListCreate from './dashboard/todolist/TodoListCreate.tsx'
import TodoListEdit from './dashboard/todolist/TodoListEdit.tsx'
import Unauthorized from './dashboard/register_login_detail/Unauthorized.tsx'
import UserProfileTable from './dashboard/userprofile/UserProfileTable.tsx'
import RegisterProfileCreate from './dashboard/userprofile/RegisterProfileCreate.tsx'
import UserAttendanceForm from './dashboard/attendance/AttendanceSheet.tsx'
import AttendanceAdminDashboard from './dashboard/attendance/AttendanceAdmin.tsx'
import {Provider } from 'react-redux'
import Store from './dashboard/redux/Store';
import Conference from './pages/conference/Conference.tsx'
import 'react-toastify/dist/ReactToastify.css';
import ToastTest from './dashboard/toasttest/ToastTest.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "InAction", element: <InAction /> },
      { path: "HopOnboard", element: <HopOnboard /> },
      { path: "WeAre", element: <WeAre /> },
      { path: "Conference", element: <Conference /> },
      { path: "Connect", element: <Connect /> },
      { path: "Report", element: <Report /> },
      { path: "Blog", element: <Blog /> },
      { path: "Contact", element: <Contact /> },
    ],
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute><App /></ProtectedRoute>,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      // { path: "/dashboard/register", element: <RegisterProfileCreate /> },
      // { path: "userprofile", element: <UserProfileTable />},
      // { path: "userprofileView/:id", element: <UserProfileTableView /> },
      // { path: "userprofileEdit/:id", element: <UserProfileEdit /> },

      // { path: "conference", element: <ConferenceForm /> },
      // { path: "conferenceTable", element: <ConferenceFormTable />},
      // { path: "conferenceView/:id", element: <ConferenceFormView /> },
      // { path: "conferenceEdit/:id", element: <ConferenceFormEdit /> },
      { path: "monthlyReport", element: <MonthlyReport /> },
      { path: "registerUser", element: <RegisterUser /> },
      { path: "monthlyDue", element: <MonthlyDueCreate /> },
      { path: "monthlyDueEdit/:id", element: <MonthlyDueEdit /> },
      { path: "monthlyDueView/:id", element: <MonthlyDueView /> },
      { path: "monthlyDueTable", element: <ProtectedRoute roles={['SUPERADMIN', 'TREASURER']}><MonthlyDueTable /></ProtectedRoute> },
      { path: "monthlyReportCreate", element: <ProtectedRoute roles={['SUPERADMIN', 'TREASURER', 'SECRETARY', 'ADMIN']}><MonthlyReportCreate /></ProtectedRoute> },
      { path: "monthlyReportTable", element: <ProtectedRoute roles={['SUPERADMIN', 'TREASURER', 'SECRETARY', 'ADMIN']}><MonthlyReportTable /></ProtectedRoute> },
      { path: "monthlyReportEdit/:id", element: <ProtectedRoute roles={['SUPERADMIN', 'TREASURER', 'SECRETARY', 'ADMIN']}><MonthlyReportEdit /></ProtectedRoute> },
      { path: "monthlyReportView/:id", element: <ProtectedRoute roles={['SUPERADMIN', 'TREASURER', 'SECRETARY', 'ADMIN']}><MonthlyReportView /></ProtectedRoute> },
      { path: "nationalReportCreate", element: <NationalReportCreate /> },
      { path: "nationalReportTable", element: <ProtectedRoute roles={['SUPERADMIN']}><NationalReportTable /></ProtectedRoute> },
      { path: "nationalReportView/:id", element: <NationalReportView /> },
      { path: "nationalReportEdit/:id", element: <NationalReportEdit /> },
      { path: "secretaryNoteCreate", element: <SecretaryNoteCreate /> },
      { path: "secretaryNoteTable", element: <ProtectedRoute roles={['SUPERADMIN', 'SECRETARY']}><SecretaryNoteTable /></ProtectedRoute> },
      { path: "secretaryNoteView/:id", element: <SecretaryNoteView /> },
      { path: "secretaryNoteEdit/:id", element: <SecretaryNoteEdit /> },
      { path: "specialProjectsCreate", element: <SpecialProjectsCreate /> },
      { path: "specialProjectsTable", element: <ProtectedRoute roles={['SUPERADMIN', 'SECRETARY', 'TREASURER', 'ADMIN']}><SpecialProjectsTable /></ProtectedRoute> },
      { path: "specialProjectsView/:id", element: <SpecialProjectsView /> },
      { path: "specialProjectsEdit/:id", element: <SpecialProjectsEdit /> },
      { path: "quarterlyReportCreate", element: <QuarterlyReportCreate /> },
      { path: "quarterlyReportTable", element: <ProtectedRoute roles={['SUPERADMIN']}><QuarterlyReportTable /></ProtectedRoute> },
      { path: "quarterlyReportEdit/:id", element: <QuarterlyReportEdit /> },
      { path: "quarterlyReportView/:id", element: <QuarterlyReportView /> },
      { path: "quarterlyReportTable2", element: <QuarterlyReportTable2 /> },
      { path: "todoListTable", element: <ProtectedRoute roles={['SUPERADMIN', 'SECRETARY', 'TREASURER', 'ADMIN']}><TodoListTable /></ProtectedRoute> },
      { path: "todoListCreate", element: <TodoListCreate /> },
      { path: "todoListEdit/:id", element: <TodoListEdit /> },
      { path: "registerUser", element: <ProtectedRoute roles={['SUPERADMIN']}><RegisterUser /></ProtectedRoute> },
    ],
  },
  { path: "/dashboard/loginUser", element: <LoginUser /> },
  { path: "/dashboard/unauthorized", element: <Unauthorized /> },
  { path: "/dashboard/conference", element: <ConferenceForm /> },
  { path: "/dashboard/conferenceTable", element: <ConferenceFormTable />},
  { path: "/dashboard/conferenceView/:id", element: <ConferenceFormView /> },
  { path: "/dashboard/conferenceEdit/:id", element: <ConferenceFormEdit /> },
  { path: "/dashboard/attendanceSheet", element: <UserAttendanceForm /> },
  { path: "/dashboard/attendanceAdmin", element: <AttendanceAdminDashboard /> },
  { path: "/dashboard/attendance/AttendanceSheet", element: <UserAttendanceForm /> },
  { path: "/dashboard/register", element: <RegisterProfileCreate /> },
  { path: "userprofile", element: <UserProfileTable />},
  { path: "userprofileView/:id", element: <UserProfileTableView /> },
  { path: "userprofileEdit/:id", element: <UserProfileEdit /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store= {Store} >
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import * as XLSX from "xlsx";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

interface SecretaryNote {
  id: string;
  meetingVenue: string;
  meetingAnchor: string;
  attendanceMen: string;
  attendanceWomen: string;
  attendanceChildren: string;
  attendanceTotal: string;
  detailOfMeeting: string;
  actionablePoints: string;
  actionablePointsAssigned: string;
  meetingDate: string;
  remarks: string;
}

const SecretaryNoteTable: React.FC = () => {
  const [reports, setReports] = useState<SecretaryNote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [reportsPerPage, setReportsPerPage] = useState<number>(10);
  const [selectedReports, setSelectedReports] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get<SecretaryNote[]>("http://rccgphmbackend-env.eba-utgxehmc.eu-west-2.elasticbeanstalk.com/api/v1/secretaryNote");
      setReports(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reports:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this report?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await axios.delete(`http://rccgphmbackend-env.eba-utgxehmc.eu-west-2.elasticbeanstalk.com/api/v1/secretaryNote/${id}`);
              setReports(reports.filter(report => report.id !== id));
              toast.success("Report deleted successfully");
            } catch (error) {
              toast.error("Error deleting report");
              console.error("Error deleting report:", error);
            }
          }
        },
        {
          label: 'No',
          onClick: () => toast.info("Deletion cancelled")
        }
      ]
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleReportsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setReportsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when changing reports per page
  };

  const handleCheckboxChange = (id: string) => {
    const updatedSelectedReports = new Set(selectedReports);
    if (updatedSelectedReports.has(id)) {
      updatedSelectedReports.delete(id);
    } else {
      updatedSelectedReports.add(id);
    }
    setSelectedReports(updatedSelectedReports);
  };

  const exportToExcel = (exportAll: boolean = false) => {
    const dataToExport = exportAll ? reports : reports.filter(report => selectedReports.has(report.id));
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reports");
    XLSX.writeFile(wb, "SecretaryNote.xlsx");
  };

  // Pagination
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = reports.filter(report => {
    const reportDate = new Date(report.meetingDate);
    const reportMonthYear = `${reportDate.getMonth() + 1}/${reportDate.getFullYear()}`;
    return reportMonthYear.includes(searchTerm);
  }).slice(indexOfFirstReport, indexOfLastReport);

  const totalPages = Math.ceil(reports.length / reportsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto mr-1 ml-1">
      <div className="flex justify-between items-center mb-4 p-2 rounded-xl">
        <input
          type="text"
          placeholder="Search by Month/Year (e.g. 6/2020 for June 2020)"
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border rounded w-1/2 mr-2"
        />
        <div className="flex space-x-2">
          <Link to="/dashboard/secretaryNoteCreate" className="p-2 bg-gray-400 text-white rounded text-xl">Create Report</Link>
          <button
            onClick={() => exportToExcel(true)}
            className="p-1 bg-blue-500 text-white rounded text-sm"
          >
            Export All
          </button>
          <button
            onClick={() => exportToExcel()}
            className="p-1 bg-green-500 text-white rounded text-sm"
            disabled={selectedReports.size === 0}
          >
            Export Selected
          </button>
        </div>
      </div>
      {reports.length === 0 ? (
        <div className="text-center text-gray-500">No data available</div>
      ) : (
        <>
          <table className="min-w-full table-auto bg-cyan-50 rounded-md shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-2 py-1">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        const newSelectedReports = new Set(reports.map(report => report.id));
                        setSelectedReports(newSelectedReports);
                      } else {
                        setSelectedReports(new Set());
                      }
                    }}
                    checked={selectedReports.size === reports.length}
                  />
                </th>
                <th className="px-2 py-1">SN</th>
                <th className="px-2 py-1">Venue</th>
                <th className="px-2 py-1">Anchor</th>
                <th className="px-2 py-1">Meeting Details</th>
                <th className="px-2 py-1">Actionable Points</th>
                <th className="px-2 py-1">Assigned To</th>
                 <th className="px-2 py-1">Attendance</th>
                <th className="px-2 py-1">Date</th>
                <th className="px-2 py-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentReports.map((report, index) => (
                <tr key={report.id} className="border-b-2 border-gray-400 hover:bg-white">
                  <td className="px-2 py-1">
                    <input
                      type="checkbox"
                      checked={selectedReports.has(report.id)}
                      onChange={() => handleCheckboxChange(report.id)}
                    />
                  </td>
                  <td className="px-2 py-1">{indexOfFirstReport + index + 1}</td>
                  <td className="px-2 py-1">{report.meetingVenue}</td>
                  <td className="px-2 py-1">{report.meetingAnchor}</td>
                  <td className="px-2 py-1">{report.detailOfMeeting}</td>
                  <td className="px-2 py-1">{report.actionablePoints}</td>
                  <td className="px-2 py-1">{report.actionablePointsAssigned}</td>
                  <td className="px-2 py-1">{report.attendanceTotal}</td>
                  <td className="px-2 py-1">{report.meetingDate}</td>
                  <td className="px-2 py-1 flex space-x-2 justify-center">
                    <Link to={`/dashboard/secretaryNoteView/${report.id}`} className="text-blue-500 hover:text-blue-700">
                      <FaEye />
                    </Link>
                    <Link to={`/dashboard/secretaryNoteEdit/${report.id}`} className="text-yellow-500 hover:text-yellow-700">
                      <FaEdit />
                    </Link>
                    <button onClick={() => handleDelete(report.id)} className="text-red-500 hover:text-red-700">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 mb-1 ml-1 py-2 bg-yellow-500 rounded disabled:opacity-50 text-sm"
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <select
              value={reportsPerPage}
              onChange={handleReportsPerPageChange}
              className="ml-2 p-2 border rounded mb-1 text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 mb-1 mr-2 py-2 bg-green-500 rounded disabled:opacity-50 text-sm"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SecretaryNoteTable;

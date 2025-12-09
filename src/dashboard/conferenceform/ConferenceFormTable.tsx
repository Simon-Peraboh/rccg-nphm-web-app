import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import * as XLSX from "xlsx";
import axiosInstance from "../../apicalls/conference/api";

interface User {
  id: number;
  conference_date: string;
  conference_theme: string;
  full_name: string;
  phone_number: string;
  state: string;
  region: string;
  province: string;
  position: string;
  accommodation: boolean;
}

const ConferenceFormTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchYear, setSearchYear] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage, setUsersPerPage] = useState<number>(10);
  const [selectedUsers, setSelectedUsers] = useState<Set<number>>(new Set());

  
  useEffect(() => {
    fetchUsers();  // ✅ Fetch users when component mounts
}, []);

  

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get<User[]>("/conference/all");
      
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };
  

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/conference/delete/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error("❌ Error deleting user:", error); // ✅ Log error properly
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchYear(event.target.value);
  };

  const handleUsersPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUsersPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when changing users per page
  };

  const handleCheckboxChange = (id: number) => {
    const updatedSelectedUsers = new Set(selectedUsers);
    if (updatedSelectedUsers.has(id)) {
      updatedSelectedUsers.delete(id);
    } else {
      updatedSelectedUsers.add(id);
    }
    setSelectedUsers(updatedSelectedUsers);
  };

  const exportToExcel = (exportAll: boolean = false) => {
    const dataToExport = exportAll ? users : users.filter(user => selectedUsers.has(user.id));
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");
    XLSX.writeFile(wb, "UsersData.xlsx");
  };

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  console.log("Users before filtering:", users.length);
const currentUsers = users.filter(user => {
  console.log("Checking user:", user);
  const userYear = user.conference_date ? new Date(user.conference_date).getFullYear().toString() : "";
  return (
    (user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.province?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (searchYear === "" || userYear === searchYear)
  );
}).slice(indexOfFirstUser, indexOfLastUser);
console.log("Users after filtering:", currentUsers.length);

  

  const totalPages = Math.ceil(users.length / usersPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-between p-2 mb-4 rounded-xl">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-1/3 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Search by year"
          value={searchYear}
          onChange={handleYearChange}
          className="w-1/3 p-2 border rounded"
        />
        <div className="flex space-x-2">
          <button
            onClick={() => exportToExcel(true)}
            className="p-2 text-white bg-blue-500 rounded"
          >
            Export All
          </button>
          <button
            onClick={() => exportToExcel()}
            className="p-2 text-white bg-green-500 rounded"
            disabled={selectedUsers.size === 0}
          >
            Export Selected
          </button>
        </div>
      </div>
      <table className="min-w-full rounded-md shadow-md table-auto bg-cyan-50">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-2 py-1">
          <input
            type="checkbox"
            id="select-all"
            title="Select all users"
            aria-label="Select all users"
            onChange={(e) => {
              if (e.target.checked) {
                const newSelectedUsers = new Set(users.map(user => user.id));
                setSelectedUsers(newSelectedUsers);
              } else {
                setSelectedUsers(new Set());
              }
            }}
            checked={selectedUsers.size === users.length}
          />
          <label htmlFor="select-all">Select all users</label>
            </th>
            <th className="px-2 py-1">SN</th>
            {/* <th className="px-2 py-1">Date</th> */}
            <th className="px-2 py-1">Theme</th>
            <th className="px-2 py-1">Full Name</th>
            <th className="px-2 py-1">State</th>
            <th className="px-2 py-1">Region</th>
            <th className="px-2 py-1">Province</th>
            <th className="px-2 py-1">Position</th>
            <th className="px-2 py-1">Phone Number</th>
            <th className="px-2 py-1">Accommodation</th>
            <th className="px-2 py-1">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user.id} className="border-b-2 border-gray-400 hover:bg-white">
              <td className="px-2 py-1">
                <input
                  type="checkbox"
                  id="select-all"
                  title="Select all users"
                  aria-label="Select all users"
                  checked={selectedUsers.has(user.id)}
                  onChange={() => handleCheckboxChange(user.id)}
                />
              </td>
              <td className="px-2 py-1">{indexOfFirstUser + index + 1}</td>
              {/* <td className="px-2 py-1">{user.conference_date}</td> */}
              <td className="px-2 py-1">{user.conference_theme}</td>
              <td className="px-2 py-1">{user.full_name}</td>
              <td className="px-2 py-1">{user.state}</td>
              <td className="px-2 py-1">{user.region}</td>
              <td className="px-2 py-1">{user.province}</td>
              <td className="px-2 py-1">{user.position}</td>
              <td className="px-2 py-1">{user.phone_number}</td>
              <td className="px-2 py-1">{user.accommodation ? "Yes" : "No"}</td>
              <td className="flex justify-center px-2 py-1 space-x-2">
                <Link to={`/dashboard/conferenceView/${user.id}`} className="flex justify-center px-2 py-1 space-x-2">
                  <FaEye />
                </Link>
                <Link to={`/dashboard/conferenceEdit/${user.id}`} className="text-yellow-500 hover:text-yellow-700">
                  <FaEdit />
                </Link>
                <button 
                   type="button" 
                   title="Delete user" 
                   onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mb-1 ml-1 bg-yellow-500 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <select
          title="Select page"
          aria-label="Select page"
          value={usersPerPage}
          onChange={handleUsersPerPageChange}
          className="p-2 mb-1 ml-2 border rounded"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mb-1 mr-2 bg-green-500 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ConferenceFormTable;

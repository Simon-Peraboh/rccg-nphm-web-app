import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import axios, { AxiosResponse } from "axios";
import * as XLSX from "xlsx";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

interface User {
  id: number;
  title: string;
  first_name: string;
  others: string;
  last_name: string;
  email: string;
  state: string;
  region: string;
  province: string;
  image_path?: string;
}

const UserProfileTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage, setUsersPerPage] = useState<number>(10);
  const [selectedUsers, setSelectedUsers] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response: AxiosResponse<User[]> = await axios.get("http://127.0.0.1:8000/api/userProfile/getAllUsers");
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this user?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              await axios.delete(`http://127.0.0.1:8000/api/userProfile/deleteUser/${id}`);
              setUsers(users.filter(user => user.id !== id));
              toast.success("User deleted successfully");
            } catch (error) {
              toast.error("Error deleting user");
              console.error("Error deleting user:", error);
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
  const currentUsers = users.filter(user =>
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.last_name.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4 p-2 rounded-xl">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border rounded w-1/3"
        />
        <div className="flex space-x-2">
          <Link to="/dashboard/register" className="p-2 bg-gray-400 text-white rounded text-xl">Create User</Link>
          <button
            onClick={() => exportToExcel(true)}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Export All
          </button>
          <button
            onClick={() => exportToExcel()}
            className="p-2 bg-green-500 text-white rounded"
            disabled={selectedUsers.size === 0}
          >
            Export Selected
          </button>
        </div>
      </div>
      <table className="min-w-full table-auto bg-cyan-50 rounded-md shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-2 py-1">
              <input
                itemID=""
                type="checkbox"
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
            </th>
            <th className="px-2 py-1">SN</th>
            <th className="px-2 py-1">Title</th>
            <th className="px-2 py-1">First Name</th>
            <th className="px-2 py-1">Last Name</th>
            <th className="px-2 py-1">Email</th>
            <th className="px-2 py-1">State</th>
            <th className="px-2 py-1">Region</th>
            <th className="px-2 py-1">Province</th>
            <th className="px-2 py-1">Image</th>
            <th className="px-2 py-1">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user.id} className="border-b-2 border-gray-400 hover:bg-white">
              <td className="px-2 py-1">

                <input
                  itemID=""
                  type="checkbox"
                  checked={selectedUsers.has(user.id)}
                  onChange={() => handleCheckboxChange(user.id)}
                />
              </td>
              <td className="px-2 py-1">{indexOfFirstUser + index + 1}</td>
              <td className="px-2 py-1">{user.title}</td>
              <td className="px-2 py-1">{user.first_name}</td>
              <td className="px-2 py-1">{user.last_name}</td>
              <td className="px-2 py-1">{user.email}</td>
              <td className="px-2 py-1">{user.state}</td>
              <td className="px-2 py-1">{user.region}</td>
              <td className="px-2 py-1">{user.province}</td>
              <td className="px-2 py-1">
                {user.image_path ? (
                  <img
                    src={
                      user.image_path.startsWith('http')
                        ? user.image_path
                        : `http://127.0.0.1:8000/storage/${user.image_path}`
                    }
                    alt="User"
                    className="h-14 w-14 rounded-full border object-cover"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = '/placeholder.png'; // fallback image path in public folder
                    }}
                  />
                ) : (
                  <span className="text-gray-400 italic">No Image</span>
                )}
              </td>
              <td className="px-2 py-1 flex space-x-2 justify-center">
                <Link to={`/dashboard/userprofileView/${user.id}`} className="text-blue-500 hover:text-blue-700">
                  <FaEye />
                </Link>
                <Link to={`/dashboard/userprofileEdit/${user.id}`} className="text-yellow-500 hover:text-yellow-700">
                  <FaEdit />
                </Link>

                <button
                  type="button"
                  onClick={() => handleDelete(user.id)}
                  title="Delete"
                  className="text-red-500 hover:text-red-700"
                >
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
          className="px-4 mb-1 ml-1 py-2 bg-yellow-500 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <label htmlFor="usersPerPage" className="block text-sm font-semibold mb-1">
          <span>Page {currentPage} of {totalPages}</span>
        </label>
        <select
          id="usersPerPage"
          value={usersPerPage}
          onChange={handleUsersPerPageChange}
          className="ml-2 p-2 border rounded mb-1"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 mb-1 mr-2 py-2 bg-green-500 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
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

export default UserProfileTable;

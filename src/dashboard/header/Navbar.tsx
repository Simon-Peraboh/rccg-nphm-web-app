import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSun, FaMoon, FaBell, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { getLoggedInUser, logout } from '../services/AuthServiceLoginRegister';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState<{ username: string, role: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = getLoggedInUser();
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const confirmLogout = () => {
    const toastId = toast.info(
      <div>
        <p>Are you sure you want to log out?</p>
        <div>
          <button
            onClick={() => {
              logout();
              toast.dismiss(toastId);
              navigate('/dashboard/loginUser');
            }}
            className="bg-red-500 text-white px-3 py-1 rounded mr-2"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(toastId)}
            className="bg-gray-500 text-white px-3 py-1 rounded"
          >
            No
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
      }
    );
  };

  return (
    <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
      <nav className="flex-1 flex justify-center items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-700 text-white rounded-full px-4 py-1 focus:outline-none w-64"
        />
      </nav>
      <div className="flex items-center space-x-4">
        <button onClick={toggleDarkMode} className="focus:outline-none">
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
        <button className="focus:outline-none">
          <FaBell />
        </button>
        <div className="flex items-center space-x-2">
          <FaUserCircle className="text-2xl" />
          <span>{user ? user.username : 'Guest'}</span>
        </div>
        <div className="relative">
          <button onClick={toggleDropdown} className="focus:outline-none">
            <FaCog className="text-2xl" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg py-1">
              <Link to="/profile" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                Profile
              </Link>
              <Link to="/settings" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                <FaCog className="mr-2" /> Settings
              </Link>
              <button
                onClick={confirmLogout}
                className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

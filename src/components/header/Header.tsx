import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Images/logo1_ed3.jpg';

const Header: React.FC = () => {
  const handleLinkClick = () => window.scrollTo(0, 0);

  return (
    <header className="bg-blue-200 shadow-md">
      <div className="container mx-auto flex flex-col items-center justify-between px-6 py-4 lg:flex-row">
        
        {/* Logo Section */}
        <div className="flex items-center mb-4 lg:mb-0">
          <Link to="/" onClick={handleLinkClick} className="flex items-center space-x-3">
            <img src={Logo} alt="Logo" className="h-14" />
            <h1 className="text-2xl font-bold text-gray-800">RCCG NPHM</h1>
          </Link>
        </div>

        {/* Dropdown Wrapper with expanded hover area */}
        <div className="relative group mb-4 lg:mb-0 lg:ml-auto">
          {/* Trigger */}
          <div className="text-lg font-medium text-gray-700 hover:text-blue-600 cursor-pointer">
            <span className="font-sans text-lg font-medium tracking-wide">
                See More ☰
            </span>
          </div>

          {/* Dropdown Content */}
          <div className="absolute right-0 pt-2 w-48 z-50 hidden group-hover:block">
            <div className="bg-gray-300 rounded-md shadow-lg transition-all">
              {[
                ['InAction', 'In-Action'],
                ['HopOnboard', 'Hop-Onboard'],
                ['WeAre', 'We Are'],
                ['Conference', 'Conference'],
                ['Connect', 'Connect'],
                ['Report', 'Report'],
                ['Blog', 'Blog'],
                ['Contact', 'Contact Us'],
              ].map(([path, label]) => (
                <Link
                  key={path}
                  to={`/${path}`}
                  onClick={handleLinkClick}
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-center space-y-2 lg:flex-row lg:space-y-0 lg:space-x-6">
          <Link to='#'>
             <button className="bg-blue-200 px-4 py-2 rounded-md font-semibold text-gray-700 hover:bg-red-500 hover:text-white transition">
            Donate
          </button>
          </Link>

          <Link to="/dashboard/register" onClick={handleLinkClick}>
            <button className="bg-blue-200 px-4 py-2 rounded-md font-semibold text-gray-700 hover:bg-green-500 hover:text-white transition">
              Register
            </button>
          </Link>

          <Link to="/dashboard/loginUser" onClick={handleLinkClick}>
            <button className="bg-blue-200 px-4 py-2 rounded-md font-semibold text-gray-700 hover:bg-orange-500 hover:text-white transition">
              Login
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

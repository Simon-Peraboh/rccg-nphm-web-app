import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Images/logo1_ed3.jpg';
import Banner from '../../assets/Images/cover3.jpg'

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = (): void => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <header className="bg-blue-200 py-4 relative">
     
      {/* Logo and Menu */}
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={Logo} alt="Logo" className="h-8 mr-4" />
          <h1 className="text-gray-500 font-bold text-lg">RCCG NPHM</h1>
        </div>
        <div className="relative text-xl cursor-pointer text-gray-500">
          <div onClick={handleMenuToggle}>See More ☰</div>
          {isMenuOpen && (
            <div className="absolute bg-blue-200 mt-2 p-2 rounded shadow z-20">
              <Link to="/link1" className="block text-gray-500 py-1">In-Action</Link>
              <Link to="/link2" className="block text-gray-500 py-1">Hop-Onboard</Link>
              <Link to="/link3" className="block text-gray-500 py-1">We Are</Link>
              <Link to="/link3" className="block text-gray-500 py-1">Connect</Link>
              <Link to="/link3" className="block text-gray-500 py-1">Report</Link>
              <Link to="/link3" className="block text-gray-500 py-1">Blog</Link>
              <Link to="/link3" className="block text-gray-500 py-1">Contact Us</Link>
            </div>
          )}
        </div>
        {/* Buttons */}
        <div className="flex items-center">
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg mr-40">Donate</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg mr-10">Register</button>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg mr-10">Login</button>
        </div>
      </div>
       {/* Banner Image */}
       <div className="relative">
        <img src={Banner} alt="Banner" className="w-full h-72 object-cover" />
        <div className="absolute inset-0 flex items-center justify-center text-white text-center">
          <h1 className="text-4xl font-bold">Welcome to RCCG National Prison And Hospital Ministry</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;

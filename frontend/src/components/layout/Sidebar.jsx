import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaList,
  FaUser,
  FaCog,
  FaCreditCard,
  FaBars,
} from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-gray-800 p-2 rounded"
        onClick={toggleSidebar}
      >
        <FaBars className="text-xl" />
      </button>
      <div
        className={`bg-gray-800 text-white h-screen w-64 fixed left-0 top-0 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-10 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <nav>
            <ul className="space-y-6">
              <Link
                to="/"
                className="flex items-center space-x-3 w-full p-3 rounded-lg transition-all duration-200 hover:bg-gray-700 hover:translate-x-2"
              >
                <FaHome className="text-xl text-blue-400" />
                <span className="font-medium">Home</span>
              </Link>

              <Link
                to="/clients"
                className="flex items-center space-x-3 w-full p-3 rounded-lg transition-all duration-200 hover:bg-gray-700 hover:translate-x-2"
              >
                <FaUser className="text-xl text-purple-400" />
                <span className="font-medium">Clients</span>
              </Link>

              <Link
                to="/invoices"
                className="flex items-center space-x-3 w-full p-3 rounded-lg transition-all duration-200 hover:bg-gray-700 hover:translate-x-2"
              >
                <FaCreditCard className="text-xl text-green-400" />
                <span className="font-medium">Invoices</span>
              </Link>

              <Link
                to="/profile"
                className="flex items-center space-x-3 w-full p-3 rounded-lg transition-all duration-200 hover:bg-gray-700 hover:translate-x-2"
              >
                <FaUser className="text-xl text-pink-400" />
                <span className="font-medium">Profile</span>
              </Link>

              <Link
                to="/settings"
                className="flex items-center space-x-3 w-full p-3 rounded-lg transition-all duration-200 hover:bg-gray-700 hover:translate-x-2"
              >
                <FaCog className="text-xl text-yellow-400" />
                <span className="font-medium">Settings</span>
              </Link>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="w-64 bg-white shadow-lg">
        {/* Basic Sidebar */}
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">CRM Dashboard</h2>
          <nav>
            <Link
              to="/dashboard"
              className="block py-2 text-gray-600 hover:text-gray-900"
            >
              Dashboard
            </Link>
            <Link
              to="/customers"
              className="block py-2 text-gray-600 hover:text-gray-900"
            >
              Customers
            </Link>
            <Link
              to="/sales"
              className="block py-2 text-gray-600 hover:text-gray-900"
            >
              Sales
            </Link>
            <Link
              to="/tasks"
              className="block py-2 text-gray-600 hover:text-gray-900"
            >
              Tasks
            </Link>
          </nav>
        </div>
      </div>

      <main className="flex-1 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome to CRM Dashboard
            </h1>
            <Menu as="div" className="relative">
              <Menu.Button className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Options
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? 'bg-blue-500 text-white' : 'text-gray-900'
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          Export Data
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? 'bg-blue-500 text-white' : 'text-gray-900'
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          Settings
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Stats Cards */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-900">
                Total Customers
              </h3>
              <p className="text-3xl font-bold text-blue-600">1,234</p>
              <p className="text-sm text-green-600">+14% from last month</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-900">
                Total Sales
              </h3>
              <p className="text-3xl font-bold text-blue-600">$45,678</p>
              <p className="text-sm text-green-600">+7.5% from last month</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-900">
                Active Deals
              </h3>
              <p className="text-3xl font-bold text-blue-600">89</p>
              <p className="text-sm text-green-600">+2.5% from last month</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-900">Tasks</h3>
              <p className="text-3xl font-bold text-blue-600">156</p>
              <p className="text-sm text-green-600">+12% from last month</p>
            </div>

            {/* Charts Section */}
            <div className="col-span-1 lg:col-span-2 bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Sales Overview
              </h2>
              <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                <p className="text-gray-500">Sales Chart Coming Soon</p>
              </div>
            </div>
            <div className="col-span-1 lg:col-span-2 bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Lead Generation
              </h2>
              <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                <p className="text-gray-500">Leads Chart Coming Soon</p>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="col-span-1 lg:col-span-2 bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Recent Activities
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded">
                  <p className="text-gray-600">New customer signed up</p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
                <div className="p-4 bg-gray-50 rounded">
                  <p className="text-gray-600">Sales target achieved</p>
                  <p className="text-sm text-gray-500">5 hours ago</p>
                </div>
              </div>
            </div>

            {/* Tasks List */}
            <div className="col-span-1 lg:col-span-2 bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Pending Tasks
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded">
                  <p className="text-gray-600">Follow up with clients</p>
                  <p className="text-sm text-gray-500">Due today</p>
                </div>
                <div className="p-4 bg-gray-50 rounded">
                  <p className="text-gray-600">Prepare monthly report</p>
                  <p className="text-sm text-gray-500">Due tomorrow</p>
                </div>
              </div>
            </div>

            {/* Recent Customers Table */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-4 bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Recent Customers
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        john@example.com
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        Jane Smith
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        jane@example.com
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;

import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { data, Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <main className="flex-1 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome to CRM Dashboard
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Stats Cards */}
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-900">
                Total Customers
              </h3>
              <p className="text-3xl font-bold text-gray-600">
                {data?.totalCustomers || '1,234'}
              </p>
              <p className="text-sm text-green-600">
                {data?.customerGrowth || '+14% from last month'}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-900">
                Total Sales
              </h3>
              <p className="text-3xl font-bold text-gray-600">
                {data?.totalSales || '$45,678'}
              </p>
              <p className="text-sm text-green-600">
                {data?.salesGrowth || '+7.5% from last month'}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-900">
                Active Deals
              </h3>
              <p className="text-3xl font-bold text-gray-600">
                {data?.activeDeals || '89'}
              </p>
              <p className="text-sm text-green-600">
                {data?.dealsGrowth || '+2.5% from last month'}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-900">Tasks</h3>
              <p className="text-3xl font-bold text-gray-600">
                {data?.totalTasks || '156'}
              </p>
              <p className="text-sm text-green-600">
                {data?.tasksGrowth || '+12% from last month'}
              </p>
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

            {/* Recent Customers Table */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-4 bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Recent Clients
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

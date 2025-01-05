import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { PlusIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';

const InvoicePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [invoices, setInvoices] = useState([
    {
      id: 1,
      invoiceNumber: 'INV-001',
      client: 'Acme Corp',
      amount: 1500.0,
      dueDate: '2025-02-01',
      isPaid: false,
      createdAt: '2025-01-05',
    },
    {
      id: 2,
      invoiceNumber: 'INV-002',
      client: 'TechStart Inc',
      amount: 2300.0,
      dueDate: '2025-01-20',
      isPaid: true,
      createdAt: '2025-01-03',
    },
    {
      id: 3,
      invoiceNumber: 'INV-003',
      client: 'Global Solutions',
      amount: 3450.0,
      dueDate: '2025-02-15',
      isPaid: false,
      createdAt: '2025-01-07',
    },
    {
      id: 4,
      invoiceNumber: 'INV-004',
      client: 'Digital Dynamics',
      amount: 1800.0,
      dueDate: '2025-02-28',
      isPaid: true,
      createdAt: '2025-01-10',
    },
    {
      id: 5,
      invoiceNumber: 'INV-005',
      client: 'Innovation Labs',
      amount: 4200.0,
      dueDate: '2025-03-05',
      isPaid: false,
      createdAt: '2025-01-12',
    },
    {
      id: 6,
      invoiceNumber: 'INV-006',
      client: 'Future Systems',
      amount: 2750.0,
      dueDate: '2025-02-10',
      isPaid: true,
      createdAt: '2025-01-15',
    },
    {
      id: 7,
      invoiceNumber: 'INV-007',
      client: 'Smart Solutions',
      amount: 3100.0,
      dueDate: '2025-03-15',
      isPaid: false,
      createdAt: '2025-01-18',
    },
    {
      id: 8,
      invoiceNumber: 'INV-008',
      client: 'Tech Ventures',
      amount: 1950.0,
      dueDate: '2025-02-20',
      isPaid: true,
      createdAt: '2025-01-20',
    },
    {
      id: 9,
      invoiceNumber: 'INV-009',
      client: 'Cloud Nine Ltd',
      amount: 2800.0,
      dueDate: '2025-03-01',
      isPaid: false,
      createdAt: '2025-01-22',
    },
    {
      id: 10,
      invoiceNumber: 'INV-010',
      client: 'Quantum Corp',
      amount: 3900.0,
      dueDate: '2025-03-10',
      isPaid: true,
      createdAt: '2025-01-25',
    },
  ]);
  const togglePaymentStatus = (id) => {
    setInvoices(
      invoices.map((invoice) =>
        invoice.id === id ? { ...invoice, isPaid: !invoice.isPaid } : invoice
      )
    );
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Invoice Management</h1>

        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          New Invoice
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {invoice.invoiceNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {invoice.client}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${invoice.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {invoice.createdAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {invoice.dueDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      invoice.isPaid
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {invoice.isPaid ? 'Paid' : 'Pending'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => togglePaymentStatus(invoice.id)}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {invoice.isPaid ? (
                      <XCircleIcon className="w-4 h-4 mr-1 text-red-500" />
                    ) : (
                      <CheckCircleIcon className="w-4 h-4 mr-1 text-green-500" />
                    )}
                    {invoice.isPaid ? 'Mark Unpaid' : 'Mark Paid'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoicePage;

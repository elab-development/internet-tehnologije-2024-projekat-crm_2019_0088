import React, { useEffect, useState } from 'react';
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
    {
      id: 11,
      invoiceNumber: 'INV-011',
      client: 'New Tech Solutions',
      amount: 2500.0,
      dueDate: '2025-03-20',
      isPaid: false,
      createdAt: '2025-01-28',
    },
  ]);
  // Ucitavanje racuna iz localStorage-a kada se komponenta mountuje
  useEffect(() => {
    const savedInvoices = JSON.parse(localStorage.getItem('invoices'));
    if (savedInvoices) {
      setInvoices(savedInvoices);
    }
  }, []);

  // Cuvanje racuna u localStorage svaki put kada se promeni niz racuna
  useEffect(() => {
    localStorage.setItem('invoices', JSON.stringify(invoices));
  }, [invoices]);

  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    invoiceNumber: '',
    client: '',
    amount: '',
    dueDate: '',
  });

  const handleAddInvoice = () => {
    // Kreiranje novog racuna
    const invoice = {
      id: invoices.length + 1, // Automatski ID
      ...newInvoice, // Podaci uneti u formu
      isPaid: false, // Novi računi su uvek "neplaceni" na pocetku
      createdAt: new Date().toISOString().split('T')[0], // Datum kreiranja
      amount: parseFloat(newInvoice.amount), // Pretvara iz stringa u broj
    };
    // Validacija podataka
    if (
      !newInvoice.invoiceNumber ||
      !newInvoice.client ||
      !newInvoice.amount ||
      !newInvoice.dueDate
    ) {
      alert('Please fill in all fields');
      return;
    }
    // Dodavanje novog racuna u listu
    setInvoices([...invoices, invoice]);

    // Resetovanje forme
    setNewInvoice({
      invoiceNumber: '',
      client: '',
      amount: '',
      dueDate: '',
    });

    // Zatvaranje modala
    setShowModal(false);
  };
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
        <h1 className="text-3xl font-bold">Invoices</h1>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          New Invoice
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Create New Invoice</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Invoice Number
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={newInvoice.invoiceNumber}
                  onChange={(e) =>
                    setNewInvoice({
                      ...newInvoice,
                      invoiceNumber: e.target.value,
                    })
                  }
                  placeholder="INV-001"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={newInvoice.client}
                  onChange={(e) =>
                    setNewInvoice({ ...newInvoice, client: e.target.value })
                  }
                  placeholder="Client name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={newInvoice.amount}
                  onChange={(e) =>
                    setNewInvoice({ ...newInvoice, amount: e.target.value })
                  }
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={newInvoice.dueDate}
                  onChange={(e) =>
                    setNewInvoice({ ...newInvoice, dueDate: e.target.value })
                  }
                  required
                />
              </div>

              <button
                onClick={handleAddInvoice}
                className="w-full px-4 py-2  text-white rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Add Invoice
              </button>
            </div>
          </div>
        </div>
      )}
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

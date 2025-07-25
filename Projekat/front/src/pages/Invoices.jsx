import React, { useEffect, useState } from 'react';
import {
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  DollarSign,
  Calendar,
  X,
  Eye,
  Edit,
  Trash2,
  AlertCircle,
  ChevronDown,
} from 'lucide-react';

// Mock API for demonstration
const invoiceAPI = {
  getAll: () =>
    Promise.resolve({
      data: [
        {
          id: 1,
          invoice_number: 'INV-001',
          client_name: 'John Doe',
          client_email: 'john@example.com',
          amount: 1500.0,
          due_date: '2025-08-15',
          created_at: '2025-07-15',
          description: 'Web development services',
          status: 'pending',
        },
        {
          id: 2,
          invoice_number: 'INV-002',
          client_name: 'Jane Smith',
          client_email: 'jane@example.com',
          amount: 2300.5,
          due_date: '2025-08-20',
          created_at: '2025-07-10',
          description: 'Logo design and branding',
          status: 'paid',
        },
        {
          id: 3,
          invoice_number: 'INV-003',
          client_name: 'Acme Corp',
          client_email: 'billing@acme.com',
          amount: 750.0,
          due_date: '2025-07-20',
          created_at: '2025-06-20',
          description: 'Consulting services',
          status: 'overdue',
        },
        {
          id: 4,
          invoice_number: 'INV-004',
          client_name: 'Tech Solutions',
          client_email: 'contact@techsol.com',
          amount: 3200.0,
          due_date: '2025-09-01',
          created_at: '2025-07-20',
          description: 'Software development',
          status: 'pending',
        },
      ],
    }),
  create: (data) =>
    Promise.resolve({
      data: {
        ...data,
        id: Date.now(),
        created_at: new Date().toISOString().split('T')[0],
      },
    }),
  updateStatus: (id, data) => Promise.resolve({ data }),
  delete: (id) => Promise.resolve({}),
  export: () => Promise.resolve({ data: 'CSV data' }),
};

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [deleteInvoiceId, setDeleteInvoiceId] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // New filter states
  const [amountFilter, setAmountFilter] = useState({
    min: '',
    max: '',
  });
  const [dateFilter, setDateFilter] = useState({
    startDate: '',
    endDate: '',
    dateType: 'created', // 'created' or 'due'
  });

  const [newInvoice, setNewInvoice] = useState({
    invoice_number: '',
    client_name: '',
    client_email: '',
    amount: '',
    due_date: '',
    description: '',
    status: 'pending',
  });

  // Load invoices from database
  useEffect(() => {
    fetchInvoices();
  }, []);

  // Filter invoices based on search term, status, amount, and date
  useEffect(() => {
    let filtered = invoices;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (invoice) =>
          invoice.invoice_number
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          invoice.client_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          invoice.client_email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((invoice) => invoice.status === statusFilter);
    }

    // Amount filter
    if (amountFilter.min !== '') {
      filtered = filtered.filter(
        (invoice) => parseFloat(invoice.amount) >= parseFloat(amountFilter.min)
      );
    }
    if (amountFilter.max !== '') {
      filtered = filtered.filter(
        (invoice) => parseFloat(invoice.amount) <= parseFloat(amountFilter.max)
      );
    }

    // Date filter
    if (dateFilter.startDate) {
      const startDate = new Date(dateFilter.startDate);
      filtered = filtered.filter((invoice) => {
        const invoiceDate = new Date(
          dateFilter.dateType === 'created'
            ? invoice.created_at
            : invoice.due_date
        );
        return invoiceDate >= startDate;
      });
    }
    if (dateFilter.endDate) {
      const endDate = new Date(dateFilter.endDate);
      filtered = filtered.filter((invoice) => {
        const invoiceDate = new Date(
          dateFilter.dateType === 'created'
            ? invoice.created_at
            : invoice.due_date
        );
        return invoiceDate <= endDate;
      });
    }

    setFilteredInvoices(filtered);
  }, [searchTerm, statusFilter, invoices, amountFilter, dateFilter]);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const response = await invoiceAPI.getAll();
      setInvoices(response.data || []);
    } catch (error) {
      console.error('Error fetching invoices:', error);
      setErrors({ general: 'Failed to load invoices' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setNewInvoice((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear field error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const validateInvoice = () => {
    const newErrors = {};

    if (!newInvoice.invoice_number.trim()) {
      newErrors.invoice_number = 'Invoice number is required';
    }

    if (!newInvoice.client_name.trim()) {
      newErrors.client_name = 'Client name is required';
    }

    if (!newInvoice.client_email.trim()) {
      newErrors.client_email = 'Client email is required';
    } else if (!/\S+@\S+\.\S+/.test(newInvoice.client_email)) {
      newErrors.client_email = 'Please enter a valid email address';
    }

    if (!newInvoice.amount) {
      newErrors.amount = 'Amount is required';
    } else if (parseFloat(newInvoice.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (!newInvoice.due_date) {
      newErrors.due_date = 'Due date is required';
    }

    return newErrors;
  };

  const handleAddInvoice = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');

    const validationErrors = validateInvoice();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    try {
      const invoiceData = {
        ...newInvoice,
        amount: parseFloat(newInvoice.amount),
      };

      const response = await invoiceAPI.create(invoiceData);
      setInvoices((prev) => [response.data, ...prev]);
      setNewInvoice({
        invoice_number: '',
        client_name: '',
        client_email: '',
        amount: '',
        due_date: '',
        description: '',
        status: 'pending',
      });
      setShowModal(false);
      setSuccessMessage('Invoice created successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: 'Failed to create invoice' });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const togglePaymentStatus = async (invoice) => {
    const newStatus = invoice.status === 'paid' ? 'pending' : 'paid';

    try {
      await invoiceAPI.updateStatus(invoice.id, { status: newStatus });
      setInvoices((prev) =>
        prev.map((inv) =>
          inv.id === invoice.id ? { ...inv, status: newStatus } : inv
        )
      );
      setSuccessMessage(`Invoice marked as ${newStatus}!`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrors({ general: 'Failed to update invoice status' });
    }
  };

  const handleDeleteInvoice = async () => {
    try {
      await invoiceAPI.delete(deleteInvoiceId);
      setInvoices((prev) => prev.filter((inv) => inv.id !== deleteInvoiceId));
      setShowDeleteModal(false);
      setDeleteInvoiceId(null);
      setSuccessMessage('Invoice deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrors({ general: 'Failed to delete invoice' });
    }
  };

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setShowViewModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setNewInvoice({
      invoice_number: '',
      client_name: '',
      client_email: '',
      amount: '',
      due_date: '',
      description: '',
      status: 'pending',
    });
    setErrors({});
  };

  const exportInvoices = async () => {
    try {
      const response = await invoiceAPI.export();
      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'invoices.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setErrors({ general: 'Failed to export invoices' });
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setAmountFilter({ min: '', max: '' });
    setDateFilter({ startDate: '', endDate: '', dateType: 'created' });
  };

  // Calculate stats
  const totalAmount = invoices.reduce(
    (sum, invoice) => sum + parseFloat(invoice.amount || 0),
    0
  );
  const paidAmount = invoices
    .filter((inv) => inv.status === 'paid')
    .reduce((sum, invoice) => sum + parseFloat(invoice.amount || 0), 0);
  const pendingAmount = totalAmount - paidAmount;
  const paidCount = invoices.filter((inv) => inv.status === 'paid').length;
  const pendingCount = invoices.filter(
    (inv) => inv.status === 'pending'
  ).length;
  const overdueCount = invoices.filter(
    (inv) => inv.status === 'overdue'
  ).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}

      {/* Error Message */}
      {errors.general && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{errors.general}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
          <p className="text-gray-600">
            Track and manage your invoices and payments
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Invoice
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Invoices
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {invoices.length}
              </p>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Paid ({paidCount})
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ${paidAmount.toFixed(2)}
              </p>
            </div>
            <div className="bg-green-500 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Pending ({pendingCount})
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ${pendingAmount.toFixed(2)}
              </p>
            </div>
            <div className="bg-yellow-500 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Overdue ({overdueCount})
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                $
                {invoices
                  .filter((inv) => inv.status === 'overdue')
                  .reduce(
                    (sum, invoice) => sum + parseFloat(invoice.amount || 0),
                    0
                  )
                  .toFixed(2)}
              </p>
            </div>
            <div className="bg-red-500 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ${totalAmount.toFixed(2)}
              </p>
            </div>
            <div className="bg-purple-500 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Invoice List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Invoice List</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center px-3 py-2 border rounded-md text-sm font-medium transition-colors ${
                showFilters
                  ? 'border-blue-500 text-blue-700 bg-blue-50'
                  : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
              }`}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              <ChevronDown
                className={`w-4 h-4 ml-2 transition-transform ${
                  showFilters ? 'rotate-180' : ''
                }`}
              />
            </button>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
            </select>
            <button
              onClick={exportInvoices}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Amount Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount Range
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={amountFilter.min}
                    onChange={(e) =>
                      setAmountFilter((prev) => ({
                        ...prev,
                        min: e.target.value,
                      }))
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={amountFilter.max}
                    onChange={(e) =>
                      setAmountFilter((prev) => ({
                        ...prev,
                        max: e.target.value,
                      }))
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Date Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Type
                </label>
                <select
                  value={dateFilter.dateType}
                  onChange={(e) =>
                    setDateFilter((prev) => ({
                      ...prev,
                      dateType: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="created">Created Date</option>
                  <option value="due">Due Date</option>
                </select>
              </div>

              {/* Date Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Range
                </label>
                <div className="flex space-x-2">
                  <input
                    type="date"
                    value={dateFilter.startDate}
                    onChange={(e) =>
                      setDateFilter((prev) => ({
                        ...prev,
                        startDate: e.target.value,
                      }))
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="date"
                    value={dateFilter.endDate}
                    onChange={(e) =>
                      setDateFilter((prev) => ({
                        ...prev,
                        endDate: e.target.value,
                      }))
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
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
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {invoice.invoice_number}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {invoice.client_name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {invoice.client_email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${parseFloat(invoice.amount).toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(invoice.created_at).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(invoice.due_date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        invoice.status === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : invoice.status === 'overdue'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {invoice.status.charAt(0).toUpperCase() +
                        invoice.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewInvoice(invoice)}
                        className="text-blue-600 hover:text-blue-900"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => togglePaymentStatus(invoice)}
                        className={`${
                          invoice.status === 'paid'
                            ? 'text-yellow-600 hover:text-yellow-900'
                            : 'text-green-600 hover:text-green-900'
                        }`}
                        title={
                          invoice.status === 'paid'
                            ? 'Mark as Pending'
                            : 'Mark as Paid'
                        }
                      >
                        {invoice.status === 'paid' ? (
                          <XCircle className="w-4 h-4" />
                        ) : (
                          <CheckCircle className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setDeleteInvoiceId(invoice.id);
                          setShowDeleteModal(true);
                        }}
                        className="text-red-600 hover:text-red-900"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredInvoices.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No invoices found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Create Invoice Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Create New Invoice
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddInvoice} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Invoice Number
                </label>
                <input
                  type="text"
                  value={newInvoice.invoice_number}
                  onChange={(e) =>
                    handleInputChange('invoice_number', e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.invoice_number ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="INV-001"
                />
                {errors.invoice_number && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.invoice_number}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client Name
                </label>
                <input
                  type="text"
                  value={newInvoice.client_name}
                  onChange={(e) =>
                    handleInputChange('client_name', e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.client_name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="John Doe"
                />
                {errors.client_name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.client_name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client Email
                </label>
                <input
                  type="email"
                  value={newInvoice.client_email}
                  onChange={(e) =>
                    handleInputChange('client_email', e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.client_email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="john@example.com"
                />
                {errors.client_email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.client_email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={newInvoice.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.amount ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="1500.00"
                />
                {errors.amount && (
                  <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={newInvoice.due_date}
                  onChange={(e) =>
                    handleInputChange('due_date', e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.due_date ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.due_date && (
                  <p className="text-red-500 text-xs mt-1">{errors.due_date}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newInvoice.description}
                  onChange={(e) =>
                    handleInputChange('description', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  placeholder="Description of services or products..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={newInvoice.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Creating...' : 'Create Invoice'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Invoice Modal */}
      {showViewModal && selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Invoice Details
              </h2>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Invoice Number
                  </label>
                  <p className="text-sm text-gray-900 mt-1">
                    {selectedInvoice.invoice_number}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${
                      selectedInvoice.status === 'paid'
                        ? 'bg-green-100 text-green-800'
                        : selectedInvoice.status === 'overdue'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {selectedInvoice.status.charAt(0).toUpperCase() +
                      selectedInvoice.status.slice(1)}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Client Name
                </label>
                <p className="text-sm text-gray-900 mt-1">
                  {selectedInvoice.client_name}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Client Email
                </label>
                <p className="text-sm text-gray-900 mt-1">
                  {selectedInvoice.client_email}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Amount
                  </label>
                  <p className="text-sm text-gray-900 mt-1 font-semibold">
                    ${parseFloat(selectedInvoice.amount).toFixed(2)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Due Date
                  </label>
                  <p className="text-sm text-gray-900 mt-1">
                    {new Date(selectedInvoice.due_date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Created Date
                </label>
                <p className="text-sm text-gray-900 mt-1">
                  {new Date(selectedInvoice.created_at).toLocaleDateString()}
                </p>
              </div>

              {selectedInvoice.description && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <p className="text-sm text-gray-900 mt-1">
                    {selectedInvoice.description}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-6">
              <button
                onClick={() => setShowViewModal(false)}
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Confirm Delete
              </h2>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this invoice? This action cannot
              be undone.
            </p>

            <div className="flex space-x-3">
              <button
                onClick={handleDeleteInvoice}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoicesPage;

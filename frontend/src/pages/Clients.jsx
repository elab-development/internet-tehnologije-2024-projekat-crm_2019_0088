import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import ButtonClose from '../components/common/ButtonClose';
import SearchButton from '../components/common/SearchButton';

const Clients = () => {
  const initialClients = [
    {
      id: 1,
      name: 'Acme Corp',
      email: 'contact@acme.com',
      phone: '123-456-7890',
      company: 'Acme Holdings',
      createdBy: 'John Doe',
      timestamp: '2023-01-01',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Global Industries',
      email: 'info@global.com',
      phone: '234-567-8901',
      company: 'Global Ltd',
      createdBy: 'Jane Smith',
      timestamp: '2023-02-15',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Tech Solutions',
      email: 'support@techsol.com',
      phone: '345-678-9012',
      company: 'Tech Inc',
      createdBy: 'Mike Johnson',
      timestamp: '2023-03-20',
      status: 'Inactive',
    },
    {
      id: 4,
      name: 'Digital Dynamics',
      email: 'hello@digital.com',
      phone: '456-789-0123',
      company: 'Digital Corp',
      createdBy: 'Sarah Wilson',
      timestamp: '2023-04-05',
      status: 'Active',
    },
    {
      id: 5,
      name: 'Future Systems',
      email: 'info@future.com',
      phone: '567-890-1234',
      company: 'Future Ltd',
      createdBy: 'Tom Brown',
      timestamp: '2023-05-10',
      status: 'Active',
    },
    {
      id: 6,
      name: 'Smart Services',
      email: 'contact@smart.com',
      phone: '678-901-2345',
      company: 'Smart Inc',
      createdBy: 'Lisa Davis',
      timestamp: '2023-06-15',
      status: 'Inactive',
    },
    {
      id: 7,
      name: 'Innovative Solutions',
      email: 'help@innovative.com',
      phone: '789-012-3456',
      company: 'Innovative Corp',
      createdBy: 'David Miller',
      timestamp: '2023-07-20',
      status: 'Active',
    },
    {
      id: 8,
      name: 'Premier Products',
      email: 'sales@premier.com',
      phone: '890-123-4567',
      company: 'Premier Ltd',
      createdBy: 'Emma White',
      timestamp: '2023-08-25',
      status: 'Active',
    },
    {
      id: 9,
      name: 'Elite Enterprises',
      email: 'info@elite.com',
      phone: '901-234-5678',
      company: 'Elite Inc',
      createdBy: 'Chris Taylor',
      timestamp: '2023-09-30',
      status: 'Inactive',
    },
    {
      id: 10,
      name: 'Peak Performance',
      email: 'contact@peak.com',
      phone: '012-345-6789',
      company: 'Peak Corp',
      createdBy: 'Amanda Black',
      timestamp: '2023-10-05',
      status: 'Active',
    },
  ];

  const [clients, setClients] = useState(initialClients);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchEmail, setSearchEmail] = useState('');

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(client) {
    setSelectedClient(client);
    setIsOpen(true);
  }

  function toggleSearchModal() {
    setIsSearchOpen(!isSearchOpen);
  }

  function handleSearch() {
    const searchTerm = searchEmail.toLowerCase();
    const foundClients = initialClients.filter((client) =>
      Object.values(client).some((value) =>
        value.toString().toLowerCase().includes(searchTerm)
      )
    );

    if (foundClients.length > 0) {
      setClients(foundClients);
    } else {
      alert('No matching clients found!');
      setClients(initialClients);
    }
  }

  function handleEdit(client) {
    // Implement edit logic here
    console.log('Editing client:', client);
  }

  function handleDelete(clientId) {
    setClients(clients.filter((client) => client.id !== clientId));
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Clients
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-700">
            A list of all clients including their details.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <SearchButton
            onClick={() => {
              const searchTerm = prompt('Enter search term:');
              if (searchTerm) {
                const foundClients = initialClients.filter((client) =>
                  Object.values(client).some((value) =>
                    value
                      .toString()
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                );

                if (foundClients.length > 0) {
                  setClients(foundClients);
                } else {
                  alert('No matching clients found!');
                  setClients(initialClients);
                }
              }
            }}
          />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
                  ID
                </th>
                <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
                  Name
                </th>
                <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
                  Email
                </th>
                <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
                  Phone
                </th>
                <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
                  Company
                </th>
                <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
                  Created By
                </th>
                <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
                  Timestamp
                </th>
                <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th className="relative px-2 sm:px-4 md:px-6 py-2 sm:py-4">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {clients.map((client) => (
                <tr
                  key={client.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="whitespace-nowrap px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-900">
                    {client.id}
                  </td>
                  <td className="whitespace-nowrap px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-900">
                    {client.name}
                  </td>
                  <td className="whitespace-nowrap px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-500">
                    {client.email}
                  </td>
                  <td className="whitespace-nowrap px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-500">
                    {client.phone}
                  </td>
                  <td className="whitespace-nowrap px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-500">
                    {client.company}
                  </td>
                  <td className="whitespace-nowrap px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-500">
                    {client.createdBy}
                  </td>
                  <td className="whitespace-nowrap px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-500">
                    {client.timestamp}
                  </td>
                  <td className="whitespace-nowrap px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-xs sm:text-sm">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-xs font-medium ${
                        client.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {client.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-right text-xs sm:text-sm">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => openModal(client)}
                        className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEdit(client)}
                        className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(client.id)}
                        className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xs sm:max-w-sm md:max-w-md transform overflow-hidden rounded-2xl bg-white p-4 sm:p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg sm:text-xl font-bold leading-6 text-gray-900 mb-4"
                  >
                    Client Details
                  </Dialog.Title>
                  {selectedClient && (
                    <div className="space-y-3">
                      <div className="flex flex-col bg-gray-50 p-3 sm:p-4 rounded-lg">
                        <p className="text-xs sm:text-sm md:text-base text-gray-700">
                          <span className="font-semibold">Name:</span>{' '}
                          {selectedClient.name}
                        </p>
                        <p className="text-xs sm:text-sm md:text-base text-gray-700">
                          <span className="font-semibold">Email:</span>{' '}
                          {selectedClient.email}
                        </p>
                        <p className="text-xs sm:text-sm md:text-base text-gray-700">
                          <span className="font-semibold">Phone:</span>{' '}
                          {selectedClient.phone}
                        </p>
                        <p className="text-xs sm:text-sm md:text-base text-gray-700">
                          <span className="font-semibold">Company:</span>{' '}
                          {selectedClient.company}
                        </p>
                        <p className="text-xs sm:text-sm md:text-base text-gray-700">
                          <span className="font-semibold">Created By:</span>{' '}
                          {selectedClient.createdBy}
                        </p>
                        <p className="text-xs sm:text-sm md:text-base text-gray-700">
                          <span className="font-semibold">Timestamp:</span>{' '}
                          {selectedClient.timestamp}
                        </p>
                        <p className="text-xs sm:text-sm md:text-base text-gray-700">
                          <span className="font-semibold">Status:</span>{' '}
                          <span
                            className={`inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-xs font-medium ${
                              selectedClient.status === 'Active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {selectedClient.status}
                          </span>
                        </p>
                      </div>
                    </div>
                  )}
                  <ButtonClose />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isSearchOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={toggleSearchModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xs sm:max-w-sm md:max-w-md transform overflow-hidden rounded-2xl bg-white p-4 sm:p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg sm:text-xl font-bold leading-6 text-gray-900 mb-4"
                  >
                    Client Details
                  </Dialog.Title>
                  {selectedClient && (
                    <div className="space-y-3">
                      <div className="flex flex-col bg-gray-50 p-3 sm:p-4 rounded-lg">
                        <p className="text-xs sm:text-sm md:text-base text-gray-700">
                          <span className="font-semibold">Name:</span>{' '}
                          {selectedClient.name}
                        </p>
                        <p className="text-xs sm:text-sm md:text-base text-gray-700">
                          <span className="font-semibold">Email:</span>{' '}
                          {selectedClient.email}
                        </p>
                        <p className="text-xs sm:text-sm md:text-base text-gray-700">
                          <span className="font-semibold">Phone:</span>{' '}
                          {selectedClient.phone}
                        </p>
                        <p className="text-xs sm:text-sm md:text-base text-gray-700">
                          <span className="font-semibold">Company:</span>{' '}
                          {selectedClient.company}
                        </p>
                        <p className="text-xs sm:text-sm md:text-base text-gray-700">
                          <span className="font-semibold">Created By:</span>{' '}
                          {selectedClient.createdBy}
                        </p>
                        <p className="text-xs sm:text-sm md:text-base text-gray-700">
                          <span className="font-semibold">Timestamp:</span>{' '}
                          {selectedClient.timestamp}
                        </p>
                        <p className="text-xs sm:text-sm md:text-base text-gray-700">
                          <span className="font-semibold">Status:</span>{' '}
                          <span
                            className={`inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-xs font-medium ${
                              selectedClient.status === 'Active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {selectedClient.status}
                          </span>
                        </p>
                      </div>
                    </div>
                  )}
                  <ButtonClose />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Clients;

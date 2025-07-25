// import { useEffect, useState } from 'react';
// import { Dialog, Menu, Transition } from '@headlessui/react';
// import { Fragment } from 'react';
// import ButtonClose from '../components/common/ButtonClose';
// import SearchButton from '../components/common/SearchButton';
// import FilterButton from '../components/common/FilterButton';
// import OptionButton from '../components/common/OptionButton';
// import AddClientButton from '../components/common/AddClientButton';
// import SortButton from '../components/common/SortButton';
// import { ArrowUpDown, PlusIcon, Search } from 'lucide-react';

// const ClientsPage = () => {
//   const [clients, setClients] = useState([
//     {
//       id: 1,
//       name: 'Acme Corp',
//       email: 'contact@acme.com',
//       phone: '123-456-7890',
//       company: 'Acme Holdings',
//       createdBy: 'John Doe',
//       timestamp: '2023/01/01',
//       status: 'Active',
//     },
//     {
//       id: 2,
//       name: 'Global Industries',
//       email: 'info@global.com',
//       phone: '234-567-8901',
//       company: 'Global Ltd',
//       createdBy: 'Jane Smith',
//       timestamp: '2023/02/15',
//       status: 'Active',
//     },
//     {
//       id: 3,
//       name: 'Tech Solutions',
//       email: 'support@techsol.com',
//       phone: '345-678-9012',
//       company: 'Tech Inc',
//       createdBy: 'Mike Johnson',
//       timestamp: '2023/03/20',
//       status: 'Inactive',
//     },
//     {
//       id: 4,
//       name: 'Digital Dynamics',
//       email: 'hello@digital.com',
//       phone: '456-789-0123',
//       company: 'Digital Corp',
//       createdBy: 'Sarah Wilson',
//       timestamp: '2023/04/05',
//       status: 'Active',
//     },
//     {
//       id: 5,
//       name: 'Future Systems',
//       email: 'info@future.com',
//       phone: '567-890-1234',
//       company: 'Future Ltd',
//       createdBy: 'Tom Brown',
//       timestamp: '2023/05/10',
//       status: 'Active',
//     },
//     {
//       id: 6,
//       name: 'Smart Services',
//       email: 'contact@smart.com',
//       phone: '678-901-2345',
//       company: 'Smart Inc',
//       createdBy: 'Lisa Davis',
//       timestamp: '2023/06/15',
//       status: 'Inactive',
//     },
//     {
//       id: 7,
//       name: 'Innovative Solutions',
//       email: 'help@innovative.com',
//       phone: '789-012-3456',
//       company: 'Innovative Corp',
//       createdBy: 'David Miller',
//       timestamp: '2023/07/20',
//       status: 'Active',
//     },
//     {
//       id: 8,
//       name: 'Premier Products',
//       email: 'sales@premier.com',
//       phone: '890-123-4567',
//       company: 'Premier Ltd',
//       createdBy: 'Emma White',
//       timestamp: '2023/08/25',
//       status: 'Active',
//     },
//     {
//       id: 9,
//       name: 'Elite Enterprises',
//       email: 'info@elite.com',
//       phone: '901-234-5678',
//       company: 'Elite Inc',
//       createdBy: 'Chris Taylor',
//       timestamp: '2023/09/30',
//       status: 'Inactive',
//     },
//     {
//       id: 10,
//       name: 'Peak Performance',
//       email: 'contact@peak.com',
//       phone: '012-345-6789',
//       company: 'Peak Corp',
//       createdBy: 'Amanda Black',
//       timestamp: '2023/10/05',
//       status: 'Active',
//     },
//   ]);

//   const [showModal, setShowModal] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [selectedClient, setSelectedClient] = useState(null);
//   const [searchEmail, setSearchEmail] = useState('');
//   const [newClient, setNewClient] = useState({
//     clientName: '',
//     email: '',
//     phone: '',
//     company: '',
//     timestamp: '',
//   });

//   useEffect(() => {
//     const savedClients = JSON.parse(localStorage.getItem('clients'));
//     if (savedClients) {
//       setClients(savedClients);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('clients', JSON.stringify(clients));
//   }, [clients]);

//   const addClient = (newClient) => {
//     setClients([...clients, newClient]);
//   };
//   const handleAddClient = () => {
//     const client = {
//       id: clients.length + 1,
//       name: newClient.clientName,
//       email: newClient.email,
//       phone: newClient.phone,
//       company: newClient.company,
//       createdBy: 'Current User',
//       timestamp: new Date().toISOString().split('T')[0],
//       status: 'Active',
//     };

//     if (
//       !newClient.clientName ||
//       !newClient.email ||
//       !newClient.phone ||
//       !newClient.company
//     ) {
//       alert('Please fill in all fields');
//       return;
//     }

//     setClients([...clients, client]);

//     setNewClient({
//       clientName: '',
//       email: '',
//       phone: '',
//       company: '',
//       timestamp: '',
//     });

//     setShowModal(false);
//   };
//   function closeModal() {
//     setIsOpen(false);
//   }

//   function openModal(client) {
//     setSelectedClient(client);
//     setIsOpen(true);
//   }

//   function toggleSearchModal() {
//     setIsSearchOpen(!isSearchOpen);
//   }

//   function handleSearch() {
//     const searchTerm = searchEmail.toLowerCase();
//     const foundClients = clients.filter((client) =>
//       Object.values(client).some((value) =>
//         value.toString().toLowerCase().includes(searchTerm)
//       )
//     );

//     if (foundClients.length > 0) {
//       setClients(foundClients);
//     } else {
//       alert('No matching clients found!');
//       setClients(clients);
//     }
//   }

//   function handleEdit(client) {
//     // Implement edit logic here
//     console.log('Editing client:', client);
//   }

//   function handleDelete(clientId) {
//     setClients(clients.filter((client) => client.id !== clientId));
//   }

//   return (
//     <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="flex flex-col mb-8">
//         <div className="flex-1 mb-4">
//           <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
//             Clients
//           </h1>
//           <p className="text-xs sm:text-sm md:text-base text-gray-700">
//             A list of all clients including their details.
//           </p>
//         </div>

//         <div className="w-full mb-4">
//           <div className="border-b border-gray-200">
//             <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-4 sm:h-16 space-y-4 sm:space-y-0">
//               <div className="flex items-center w-full sm:w-auto justify-between sm:justify-start">
//                 <h1 className="text-lg font-medium">Clients</h1>
//                 <div className="ml-4 text-sm text-gray-500">
//                   • {clients.length}
//                 </div>
//               </div>
//               <div className="flex flex-wrap items-center gap-2 sm:gap-4 w-full sm:w-auto justify-center sm:justify-end">
//                 {/* SORT BUTTON */}
//                 <SortButton clients={clients} setClients={setClients} />
//                 {/* ADD BUTTON */}
//                 <button
//                   onClick={() => setShowModal(true)}
//                   className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
//                 >
//                   <PlusIcon className="w-4 h-4 mr-2" />
//                   New Client
//                 </button>
//                 {/* SEARCH BUTTON */}
//                 <button
//                   type="button"
//                   onClick={() => {
//                     const searchTerm = prompt('Enter search term:');
//                     if (searchTerm) {
//                       const foundClients = clients.filter((client) =>
//                         Object.values(client).some((value) =>
//                           value
//                             .toString()
//                             .toLowerCase()
//                             .includes(searchTerm.toLowerCase())
//                         )
//                       );
//                       if (foundClients.length > 0) {
//                         setClients(foundClients);
//                       } else {
//                         alert('No matching clients found!');
//                         setClients(clients);
//                       }
//                     }
//                   }}
//                   className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   <Search className="h-5 w-5 mr-2" />
//                   Search
//                 </button>
//               </div>
//               {showModal && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//                   <div className="bg-white rounded-lg max-w-md w-full p-6">
//                     <div className="flex justify-between items-center mb-4">
//                       <h2 className="text-lg font-medium">Add New Client</h2>
//                       <button
//                         onClick={() => setShowModal(false)}
//                         className="text-gray-400 hover:text-gray-500"
//                       >
//                         ×
//                       </button>
//                     </div>

//                     <div className="space-y-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Name
//                         </label>
//                         <input
//                           type="text"
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//                           value={newClient.name}
//                           onChange={(e) =>
//                             setNewClient({
//                               ...newClient,
//                               name: e.target.value,
//                             })
//                           }
//                           placeholder="Enter client name"
//                           required
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Email
//                         </label>
//                         <input
//                           type="email"
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//                           value={newClient.email}
//                           onChange={(e) =>
//                             setNewClient({
//                               ...newClient,
//                               email: e.target.value,
//                             })
//                           }
//                           placeholder="Enter email address"
//                           required
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Phone
//                         </label>
//                         <input
//                           type="tel"
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//                           value={newClient.phone}
//                           onChange={(e) =>
//                             setNewClient({
//                               ...newClient,
//                               phone: e.target.value,
//                             })
//                           }
//                           placeholder="Enter phone number"
//                           required
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                           Company
//                         </label>
//                         <input
//                           type="text"
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//                           value={newClient.company}
//                           onChange={(e) =>
//                             setNewClient({
//                               ...newClient,
//                               company: e.target.value,
//                             })
//                           }
//                           placeholder="Enter company name"
//                           required
//                         />
//                       </div>

//                       <button
//                         onClick={() => {
//                           if (
//                             !newClient.name ||
//                             !newClient.email ||
//                             !newClient.phone ||
//                             !newClient.company
//                           ) {
//                             alert('Please fill in all fields');
//                             return;
//                           }
//                           const client = {
//                             ...newClient,
//                             id: clients.length + 1,
//                             createdBy: 'Current User',
//                             timestamp: new Date().toLocaleDateString(),
//                             status: 'Active',
//                           };
//                           setClients([...clients, client]);
//                           setNewClient({
//                             name: '',
//                             email: '',
//                             phone: '',
//                             company: '',
//                           });
//                           setShowModal(false);
//                         }}
//                         className="w-full px-4 py-2 text-white rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
//                       >
//                         Add Client
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}{' '}
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full table-auto">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
//                     ID
//                   </th>
//                   <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
//                     Name
//                   </th>
//                   <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
//                     Email
//                   </th>
//                   <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
//                     Phone
//                   </th>
//                   <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
//                     Company
//                   </th>
//                   <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
//                     Created By
//                   </th>
//                   <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
//                     Timestamp
//                   </th>
//                   <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-900">
//                     Status
//                   </th>
//                   <th className="relative px-2 sm:px-4 md:px-6 py-2 sm:py-4">
//                     <span className="sr-only">Actions</span>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200 bg-white">
//                 {clients.map((client) => (
//                   <tr
//                     key={client.id}
//                     className="hover:bg-gray-50 transition-colors"
//                   >
//                     <td className="whitespace-nowrap px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-900">
//                       {client.id}
//                     </td>
//                     <td className="whitespace-nowrap px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-900">
//                       {client.name}
//                     </td>
//                     <td className="whitespace-nowrap px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-500">
//                       {client.email}
//                     </td>
//                     <td className="whitespace-nowrap px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-500">
//                       {client.phone}
//                     </td>
//                     <td className="whitespace-nowrap px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-500">
//                       {client.company}
//                     </td>
//                     <td className="whitespace-nowrap px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-500">
//                       {client.createdBy}
//                     </td>
//                     <td className="whitespace-nowrap px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-500">
//                       {client.timestamp}
//                     </td>
//                     <td className="whitespace-nowrap px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-xs sm:text-sm">
//                       <span
//                         className={`inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-xs font-medium ${
//                           client.status === 'Active'
//                             ? 'bg-green-100 text-green-800'
//                             : 'bg-red-100 text-red-800'
//                         }`}
//                       >
//                         {client.status}
//                       </span>
//                     </td>
//                     <td className="whitespace-nowrap px-2 sm:px-4 md:px-6 py-2 sm:py-4 text-right text-xs sm:text-sm">
//                       <div className="flex flex-col sm:flex-row gap-2">
//                         <button
//                           onClick={() => openModal(client)}
//                           className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
//                         >
//                           View
//                         </button>

//                         <button
//                           onClick={() => handleDelete(client.id)}
//                           className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 border border-transparent text-xs sm:text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       <Transition appear show={isOpen} as={Fragment}>
//         <Dialog as="div" className="relative z-50" onClose={closeModal}>
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
//           </Transition.Child>

//           <div className="fixed inset-0 overflow-y-auto">
//             <div className="flex min-h-full items-center justify-center p-4 text-center">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//               >
//                 <Dialog.Panel className="w-full max-w-xs sm:max-w-sm md:max-w-md transform overflow-hidden rounded-2xl bg-white p-4 sm:p-6 text-left align-middle shadow-xl transition-all">
//                   <Dialog.Title
//                     as="h3"
//                     className="text-lg sm:text-xl font-bold leading-6 text-gray-900 mb-4"
//                   >
//                     Client Details
//                   </Dialog.Title>
//                   {selectedClient && (
//                     <div className="space-y-3">
//                       <div className="flex flex-col bg-gray-50 p-3 sm:p-4 rounded-lg">
//                         <p className="text-xs sm:text-sm md:text-base text-gray-700">
//                           <span className="font-semibold">Name:</span>{' '}
//                           {selectedClient.name}
//                         </p>
//                         <p className="text-xs sm:text-sm md:text-base text-gray-700">
//                           <span className="font-semibold">Email:</span>{' '}
//                           {selectedClient.email}
//                         </p>
//                         <p className="text-xs sm:text-sm md:text-base text-gray-700">
//                           <span className="font-semibold">Phone:</span>{' '}
//                           {selectedClient.phone}
//                         </p>
//                         <p className="text-xs sm:text-sm md:text-base text-gray-700">
//                           <span className="font-semibold">Company:</span>{' '}
//                           {selectedClient.company}
//                         </p>
//                         <p className="text-xs sm:text-sm md:text-base text-gray-700">
//                           <span className="font-semibold">Created By:</span>{' '}
//                           {selectedClient.createdBy}
//                         </p>
//                         <p className="text-xs sm:text-sm md:text-base text-gray-700">
//                           <span className="font-semibold">Timestamp:</span>{' '}
//                           {selectedClient.timestamp}
//                         </p>
//                         <p className="text-xs sm:text-sm md:text-base text-gray-700">
//                           <span className="font-semibold">Status:</span>{' '}
//                           <span
//                             className={`inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-xs font-medium ${
//                               selectedClient.status === 'Active'
//                                 ? 'bg-green-100 text-green-800'
//                                 : 'bg-red-100 text-red-800'
//                             }`}
//                           >
//                             {selectedClient.status}
//                           </span>
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                   {/* <ButtonClose /> */}
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>
//     </div>
//   );
// };

// export default ClientsPage;

import React, { useEffect, useState } from 'react';
import {
  Users,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
  ArrowUpDown,
  X,
  Building,
  Mail,
  Phone,
  User,
} from 'lucide-react';

const ClientsPage = () => {
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Acme Corp',
      email: 'contact@acme.com',
      phone: '123-456-7890',
      company: 'Acme Holdings',
      createdBy: 'John Doe',
      timestamp: '2023/01/01',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Global Industries',
      email: 'info@global.com',
      phone: '234-567-8901',
      company: 'Global Ltd',
      createdBy: 'Jane Smith',
      timestamp: '2023/02/15',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Tech Solutions',
      email: 'support@techsol.com',
      phone: '345-678-9012',
      company: 'Tech Inc',
      createdBy: 'Mike Johnson',
      timestamp: '2023/03/20',
      status: 'Inactive',
    },
    {
      id: 4,
      name: 'Digital Dynamics',
      email: 'hello@digital.com',
      phone: '456-789-0123',
      company: 'Digital Corp',
      createdBy: 'Sarah Wilson',
      timestamp: '2023/04/05',
      status: 'Active',
    },
    {
      id: 5,
      name: 'Future Systems',
      email: 'info@future.com',
      phone: '567-890-1234',
      company: 'Future Ltd',
      createdBy: 'Tom Brown',
      timestamp: '2023/05/10',
      status: 'Active',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClients, setFilteredClients] = useState(clients);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });

  // Load clients from localStorage
  useEffect(() => {
    const savedClients = JSON.parse(localStorage.getItem('clients'));
    if (savedClients) {
      setClients(savedClients);
      setFilteredClients(savedClients);
    }
  }, []);

  // Save clients to localStorage
  useEffect(() => {
    localStorage.setItem('clients', JSON.stringify(clients));
    setFilteredClients(clients);
  }, [clients]);

  // Filter clients based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = clients.filter((client) =>
        Object.values(client).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredClients(filtered);
    } else {
      setFilteredClients(clients);
    }
  }, [searchTerm, clients]);

  const handleAddClient = () => {
    if (
      !newClient.name ||
      !newClient.email ||
      !newClient.phone ||
      !newClient.company
    ) {
      alert('Please fill in all fields');
      return;
    }

    const client = {
      id: clients.length + 1,
      ...newClient,
      createdBy: 'Current User',
      timestamp: new Date().toLocaleDateString(),
      status: 'Active',
    };

    setClients([...clients, client]);
    setNewClient({ name: '', email: '', phone: '', company: '' });
    setShowModal(false);
  };

  const handleDeleteClient = (clientId) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      setClients(clients.filter((client) => client.id !== clientId));
    }
  };

  const handleViewClient = (client) => {
    setSelectedClient(client);
    setShowViewModal(true);
  };

  const sortClients = (field) => {
    const sorted = [...filteredClients].sort((a, b) => {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    });
    setFilteredClients(sorted);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600">
            Manage your client relationships and data
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Clients</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {clients.length}
              </p>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Active Clients
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {clients.filter((c) => c.status === 'Active').length}
              </p>
            </div>
            <div className="bg-green-500 p-3 rounded-lg">
              <Building className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Inactive Clients
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {clients.filter((c) => c.status === 'Inactive').length}
              </p>
            </div>
            <div className="bg-red-500 p-3 rounded-lg">
              <User className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Client List</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => sortClients('name')}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <ArrowUpDown className="w-4 h-4 mr-2" />
              Sort
            </button>
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search clients..."
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
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {client.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {client.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{client.email}</div>
                    <div className="text-sm text-gray-500">{client.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {client.company}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        client.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewClient(client)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClient(client.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Client Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Add New Client</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={newClient.name}
                  onChange={(e) =>
                    setNewClient({ ...newClient, name: e.target.value })
                  }
                  placeholder="Enter client name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={newClient.email}
                  onChange={(e) =>
                    setNewClient({ ...newClient, email: e.target.value })
                  }
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={newClient.phone}
                  onChange={(e) =>
                    setNewClient({ ...newClient, phone: e.target.value })
                  }
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={newClient.company}
                  onChange={(e) =>
                    setNewClient({ ...newClient, company: e.target.value })
                  }
                  placeholder="Enter company name"
                />
              </div>

              <button
                onClick={handleAddClient}
                className="w-full px-4 py-2 text-white rounded-md bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Add Client
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Client Modal */}
      {showViewModal && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Client Details</h2>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div>
                  <span className="font-semibold text-gray-700">Name:</span>
                  <span className="ml-2 text-gray-900">
                    {selectedClient.name}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Email:</span>
                  <span className="ml-2 text-gray-900">
                    {selectedClient.email}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Phone:</span>
                  <span className="ml-2 text-gray-900">
                    {selectedClient.phone}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Company:</span>
                  <span className="ml-2 text-gray-900">
                    {selectedClient.company}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">
                    Created By:
                  </span>
                  <span className="ml-2 text-gray-900">
                    {selectedClient.createdBy}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Created:</span>
                  <span className="ml-2 text-gray-900">
                    {selectedClient.timestamp}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Status:</span>
                  <span
                    className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                      selectedClient.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {selectedClient.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientsPage;

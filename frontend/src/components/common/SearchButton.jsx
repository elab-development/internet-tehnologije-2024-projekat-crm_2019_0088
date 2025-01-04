import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Dialog } from '@headlessui/react';

const SearchButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      return;
    }
    try {
      // Basic search functionality
      console.log('Searching for:', searchQuery);
      // Reset search query after search
      setSearchQuery('');
      setIsOpen(false);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-gray-800 text-white rounded-lg px-6 py-3 hover:bg-gray-900 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
      >
        <FaSearch className="group-hover:rotate-12 transition-transform duration-200" />
        <span className="font-medium">Search</span>
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <Dialog.Title className="text-2xl font-bold mb-6 text-gray-800">
              Search
            </Dialog.Title>
            <form onSubmit={handleSearch}>
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Enter your search query"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                  autoFocus
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setIsOpen(false);
                  }}
                  className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={!searchQuery.trim()}
                  className="px-6 py-3 text-white bg-gray-800 rounded-lg hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                >
                  Search
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default SearchButton;

import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Users, BarChart3, Settings, TrendingUp, FileText } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Overview',
      icon: BarChart3,
      path: '/dashboard',
    },
    {
      id: 'clients',
      label: 'Clients',
      icon: Users,
      path: '/clients',
    },
    {
      id: 'invoice',
      label: 'Invoice',
      icon: FileText,
      path: '/invoice',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      path: '/settings',
    },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`
              }
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;

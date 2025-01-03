import React from 'react';

function Sidebar() {
  const menuItems = [
    'Payments',
    'Customers',
    'Subscriptions',
    'Automations',
    'Team',
    'Connections',
    "What's New",
    'Feedback',
  ];
  return (
    <div className="sidebar">
      <div className="logo">SimplePayments.io</div>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;

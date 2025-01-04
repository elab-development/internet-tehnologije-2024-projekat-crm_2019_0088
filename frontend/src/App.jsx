import React from 'react';

import './index.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Dashboard from './pages/Dasboard';
import SettingsPage from './pages/Settings';
import DashboardLayout from './components/layout/DashboardLayout';
import Sidebar from './components/layout/Sidebar';

const App = () => {
  return (
    <Router>
      <div>
        <div>
          <Sidebar />
          <main>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>{' '}
        </div>
      </div>
    </Router>
  );
};

export default App;

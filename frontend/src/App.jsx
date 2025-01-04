import React from 'react';

import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';

import DashboardLayout from './components/layout/DashboardLayout';

const App = () => {
  return (
    <Router>
      <div className="app">
        <DashboardLayout />;
      </div>
    </Router>
  );
};

export default App;

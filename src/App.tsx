import React from 'react';
import './App.css';

import Layout from './Layout/Layout';

import { BrowserRouter as Router } from 'react-router-dom';
const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Layout />
      </Router>
    </div>
  );
};

export default App;

import React from 'react';
import './App.css';
import 'azure-maps-control/dist/atlas.min.css'

import Layout from './Layout/Layout';

import { BrowserRouter } from 'react-router-dom';
const App: React.FC = () => {
  return (
    <React.StrictMode>
      <div>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </div>
    </React.StrictMode>
  );
};

export default App;

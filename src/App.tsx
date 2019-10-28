import React from 'react';
import { AzureMap, IAzureMapOptions } from "react-azure-maps"
import { AuthenticationType} from 'azure-maps-control'

import './App.css';

const App: React.FC = () => {
  const option: IAzureMapOptions = {

    authOptions: {
      authType: AuthenticationType.subscriptionKey,
      subscriptionKey: "INSERT_KEY_HERE",
    },
    center: [-122.33, 47.6],
    zoom: 12,
    view:'auto'
  };
  return (
    <div>
      <div className="App">
        <AzureMap options={option} />
      </div>
    </div>
  );
}

export default App;

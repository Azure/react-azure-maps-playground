import React from 'react';
import { AzureMap, IAzureMapOptions, AzureMapsProvider } from "react-azure-maps"
import { AuthenticationType} from 'azure-maps-control'

import './App.css';

const App: React.FC = () => {
  const option: IAzureMapOptions = {

    authOptions: {
      authType: AuthenticationType.subscriptionKey,
      subscriptionKey: "KEY",
    },
    center: [-122.33, 47.6],
    zoom: 12,
    view:'Auto'
  };
  return (
    <div>
      <div className="App">
        <AzureMapsProvider>
          <AzureMap options={option} />
        </AzureMapsProvider>
        <AzureMapsProvider>
          <AzureMap options={option} />
        </AzureMapsProvider>
      </div>
    </div>
  );
}

export default App;

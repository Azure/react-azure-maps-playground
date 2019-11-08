import React from 'react';
import { AzureMap,AzureMapHtmlMarker, IAzureMapOptions, AzureMapsProvider } from "react-azure-maps"
import { AuthenticationType} from 'azure-maps-control'

import './App.css';

const App: React.FC = () => {
  const option: IAzureMapOptions = {

    authOptions: {
      authType: AuthenticationType.subscriptionKey,
      subscriptionKey: "tTk1JVEaeNvDkxxnxHm9cYaCvqlOq1u-fXTvyXn2XkA",
    },
    center: [-110, 45],
    zoom: 12,
    view:'Auto'
  };

  const azureHtmlMapMarkerOptions = {
    htmlContent: '<div class="pulseIcon"><</div>',
    position: [-110, 45]
  }
  return (
    <div>
      <div className="App">
        <AzureMapsProvider>
          <AzureMap options={option} >
            <AzureMapHtmlMarker options={azureHtmlMapMarkerOptions}></AzureMapHtmlMarker>
            </AzureMap>
        </AzureMapsProvider>
        <AzureMapsProvider>
          <AzureMap options={option} />
        </AzureMapsProvider>
      </div>
    </div>
  );
}

export default App;

import React from "react";
import {
  AzureMap,
  AzureMapHtmlMarker,
  IAzureMapOptions,
  AzureMapsProvider,
  IAzureMapHtmlMarkerEvent,
  AzureMapDataSourceProvider,
  AzureMapLayerProvider,
  AzureMapFeature
} from "react-azure-maps";
import atlas, { AuthenticationType, data } from "azure-maps-control";

import "./App.css";
const xd = new data.Position(-100.01, 45.01);

const App: React.FC = () => {
  const option: IAzureMapOptions = {
    authOptions: {
      authType: AuthenticationType.subscriptionKey,
      subscriptionKey: ""
    },
    center: [-100.01, 45.01],
    zoom: 12,
    view: "Auto"
  };

  const onClick = () => {
    console.log("ASD");
  };

  const azureHtmlMapMarkerOptions = {
    htmlContent: '<div class="pulseIcon"></div>',
    position: [-110, 45]
  };

  const eventToMarker: Array<IAzureMapHtmlMarkerEvent> = [
    { eventName: "click", callback: onClick }
  ];

  return (
    <div>
      <div className="App">
        <AzureMapsProvider>
          <AzureMap options={option}>
            <AzureMapDataSourceProvider>
              <AzureMapLayerProvider></AzureMapLayerProvider>
              <AzureMapFeature
                type="Point"
                coordinate={xd}
                properties={{
                  title: "Microsoft",
                  icon: "pin-round-blue"
                }}
              ></AzureMapFeature>
            </AzureMapDataSourceProvider>
            <AzureMapHtmlMarker
              options={azureHtmlMapMarkerOptions}
              events={eventToMarker}
            />
          </AzureMap>
        </AzureMapsProvider>
      </div>
    </div>
  );
};

export default App;

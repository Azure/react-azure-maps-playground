import React, { useMemo } from "react";
import {
  AzureMapsProvider,
  AzureMap,
  AzureMapDataSourceProvider,
  AzureMapLayerProvider,
  AzureMapFeature,
  AzureMapHtmlMarker,
  IAzureMapOptions,
  IAzureMapHtmlMarkerEvent
} from "react-azure-maps";
import atlas, { AuthenticationType, data } from "azure-maps-control";

const DefaultMap: React.FC = () => {
  const xd = new data.Position(-100.01, 45.01);

  const option: IAzureMapOptions = useMemo(() => {
    return {
      authOptions: {
        authType: AuthenticationType.subscriptionKey,
        subscriptionKey: ""
      },
      center: [-100.01, 45.01],
      zoom: 12,
      view: "Auto"
    };
  }, []);

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
      <AzureMapsProvider>
        <AzureMap options={option}>
          <AzureMapDataSourceProvider>
            <AzureMapLayerProvider options={{}} type={'SymbolLayer'}></AzureMapLayerProvider>
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
  );
};

export default DefaultMap;

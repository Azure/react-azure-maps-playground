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

const AzureLayer: React.FC = () => {
  const point1 = new data.Position(-100.01, 45.01);
  const point2 = new data.Position(-100.2, 45.1);


  const option: IAzureMapOptions = useMemo(() => {
    return {
      authOptions: {
        authType: AuthenticationType.subscriptionKey,
        subscriptionKey: ""
      },
      center: [-100.01, 45.01],
      zoom: 2,
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
      <>
    <div>
      <AzureMapsProvider>
        <AzureMap options={option}>
          <AzureMapDataSourceProvider id={'dataSource'}>
            <AzureMapLayerProvider id={'layer'} options={{url: 'https://i.imgur.com/KBkuZLV.jpg', coordinates:[[-70, 40], [-60, 37], [-63, 30], [-72, 33]]}} type={'ImageLayer'}></AzureMapLayerProvider>
            <AzureMapFeature
                type="Point"
                coordinate={point1}
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
    <div>
    <AzureMapsProvider>
      <AzureMap options={option}>
        <AzureMapDataSourceProvider>
          <AzureMapLayerProvider options={{}} type={'HeatLayer'}></AzureMapLayerProvider>
          <AzureMapFeature
              type="Point"
              coordinate={point1}
              properties={{
                title: "Microsoft",
                icon: "pin-round-blue"
              }}
          ></AzureMapFeature>
          <AzureMapFeature
              type="Point"
              coordinate={point2}
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
  </>
  );
};

export default AzureLayer;

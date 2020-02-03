import React, {useMemo} from "react";
import {
  AzureMap,
  AzureMapDataSourceProvider,
  AzureMapFeature,
  AzureMapHtmlMarker,
  AzureMapLayerProvider,
  AzureMapsProvider,
  IAzureMapHtmlMarkerEvent,
  IAzureMapOptions
} from "react-azure-maps";
import {AuthenticationType, data} from "azure-maps-control";

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
          <AzureMapDataSourceProvider id={'default DataSourceProvider'}>
            <AzureMapLayerProvider id={'default LayerProvider'} options={{}} type={'SymbolLayer'}></AzureMapLayerProvider>
            <AzureMapFeature
                id={'default MapFeature'}
              type="Point"
              coordinate={xd}
              properties={{
                title: "Microsoft",
                icon: "pin-round-blue"
              }}
            ></AzureMapFeature>
          </AzureMapDataSourceProvider>
          <AzureMapHtmlMarker
              id={'default HtmlMarker'}
            options={azureHtmlMapMarkerOptions}
            events={eventToMarker}
          />
        </AzureMap>
      </AzureMapsProvider>
    </div>
  );
};

export default DefaultMap;

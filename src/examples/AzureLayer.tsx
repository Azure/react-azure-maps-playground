import React, { useMemo } from 'react';
import {
  AzureMapsProvider,
  AzureMap,
  AzureMapDataSourceProvider,
  AzureMapLayerProvider,
  AzureMapFeature,
  AzureMapHtmlMarker,
  IAzureMapOptions,
  IAzureMapHtmlMarkerEvent,
} from 'react-azure-maps';
import { AuthenticationType, data } from 'azure-maps-control';
import { key } from '../key';
import { wrapperStyles } from './RouteExample';
import Description from '../Layout/Description';

function getCoordinates(e: any) {
  console.log('Clicked on:', e.position);
}

const onClick = () => {
  console.log('ASD');
};

const azureHtmlMapMarkerOptions = {
  position: [-110, 45],
};

const eventToMarker: Array<IAzureMapHtmlMarkerEvent> = [{ eventName: 'click', callback: onClick }];

const AzureLayer: React.FC = () => {
  const point = new data.Position(-80.01, 35.01);
  const point1 = new data.Position(-100.01, 45.01);
  const option: IAzureMapOptions = useMemo(() => {
    return {
      authOptions: {
        authType: AuthenticationType.subscriptionKey,
        subscriptionKey: key,
      },
      center: [-100.01, 45.01],
      zoom: 2,
      view: 'Auto',
    };
  }, []);
  return (
    <>
      <div style={wrapperStyles.map}>
        <Description>
          This sample shows how to add layers and global map events. Open dev tools console and click on map.
        </Description>
        <AzureMapsProvider>
          <div style={styles.map}>
            <AzureMap options={option} events={{ click: getCoordinates }}>
              <AzureMapDataSourceProvider id={'LayerExample1 DataSource '}>
                <AzureMapLayerProvider
                  id={'LayerExample1 Layer'}
                  options={{
                    // URL to an image to overlay. Images hosted on other domains must have CORs enabled.
                    url: 'https://i.imgur.com/fc4Tw0H.jpg',
                    // * An array of positions for the corners of the image listed in clockwise order: [top left, top right, bottom right, bottom left].
                    coordinates: [
                      [-130, 45],
                      [-115, 45],
                      [-115, 35],
                      [-130, 35],
                    ],
                    opacity: 0.8,
                  }}
                  type={'ImageLayer'}
                />
              </AzureMapDataSourceProvider>
              <AzureMapDataSourceProvider id={'LayerExample1 DataSource2 '}>
                <AzureMapLayerProvider
                  id={'LayerExample1 Layer2'}
                  options={{
                    opacity: 0.8,
                    iconOptions: {
                      image: 'pin-round-red',
                    },
                  }}
                  type={'SymbolLayer'}
                />
                <AzureMapFeature
                  id={'LayerExample1 MapFeature'}
                  type="Point"
                  coordinate={point}
                  properties={{
                    title: 'My Title',
                  }}
                />
              </AzureMapDataSourceProvider>
              <AzureMapHtmlMarker
                markerContent={<div className="pulseIcon"></div>}
                options={azureHtmlMapMarkerOptions}
                events={eventToMarker}
              />
            </AzureMap>
          </div>
        </AzureMapsProvider>
        <AzureMapsProvider>
          <div style={styles.map}>
            <AzureMap options={option}>
              <AzureMapDataSourceProvider id={'LayerExample2 DataSource'}>
                <AzureMapLayerProvider
                  id={'LayerExample2 HeatMap'}
                  options={{}}
                  type={'HeatLayer'}
                />
                <AzureMapFeature
                  id={'LayerExample2 MapFeature2'}
                  key={'dddd'}
                  type="Point"
                  coordinate={point1}
                />
              </AzureMapDataSourceProvider>
            </AzureMap>
          </div>
        </AzureMapsProvider>
      </div>
    </>
  );
};

const styles = {
  map: {
    height: 300,
    marginBottom: 50,
  },
};

export default AzureLayer;

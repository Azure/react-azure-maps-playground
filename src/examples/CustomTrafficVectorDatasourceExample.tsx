import React from 'react'
import { AzureMap, AzureMapLayerProvider, AzureMapsProvider, AzureMapVectorTileSourceProvider, IAzureMapOptions } from 'react-azure-maps'
import { key } from '../key';
import { AuthenticationType } from 'azure-maps-control';
import { wrapperStyles } from './RouteExample';
import Description from '../Layout/Description';

const styles = {
  map: {
    height: 300,
    marginBottom: 50,
  },
};

const option: IAzureMapOptions = {
  center: [-122.33, 47.6],
  zoom: 12,
  authOptions: {
    authType: AuthenticationType.subscriptionKey,
    subscriptionKey: key,
  },
};

const CustomTrafficVectorDatasourceExample: React.FC = () => (
  <div style={wrapperStyles.map}>
    <Description>
      This sample shows how to create a custom vector tile datasource that renders traffic information
    </Description>  
    <AzureMapsProvider>
      <div style={styles.map}>
        <AzureMap options={option}>
          <AzureMapVectorTileSourceProvider 
            id={"Traffic Flow DataSource"} 
            options={{
              maxZoom: 22,
              tiles: ['https://{azMapsDomain}/traffic/flow/tile/pbf?api-version=1.0&style=relative&zoom={z}&x={x}&y={y}'], 
            }}>
            
            <AzureMapLayerProvider
              id={'Flow Layer'}
              type={'LineLayer'}
              options={{
                sourceLayer: 'Traffic flow',
                strokeColor: [
                  'interpolate',
                  ['linear'],
                  ['get', 'traffic_level'],
                  0, 'red',
                  0.33, 'orange',
                  0.66, 'green'
                ],
                strokeWidth: [
                  'interpolate',
                  ['linear'],
                  ['get', 'traffic_level'],
                  0, 6,
                  1, 1
                ]
              }}
            />
          </AzureMapVectorTileSourceProvider>
        </AzureMap>
      </div>
    </AzureMapsProvider>
  </div>
)

export default CustomTrafficVectorDatasourceExample
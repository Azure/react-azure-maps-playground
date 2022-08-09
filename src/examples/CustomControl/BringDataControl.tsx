import React from 'react';
import {
  AzureMap,
  AzureMapDataSourceProvider,
  AzureMapHtmlMarker,
  AzureMapLayerProvider,
  AzureMapsProvider,
  IAzureMapOptions,
  IAzureCustomControls,
} from 'react-azure-maps';
import { AuthenticationType, ControlPosition } from 'azure-maps-control';
import { BringDataIntoViewControl } from './BringDataControlHelper';
import { key } from '../../key';
import Typography from '@mui/material/Typography';
import Description from '../../Layout/Description';
import { wrapperStyles } from '../RouteExample';

const option: IAzureMapOptions = {
  authOptions: {
    authType: AuthenticationType.subscriptionKey,
    subscriptionKey: key,
  },
  view: 'Auto',
};

const controls: [IAzureCustomControls] = [
  {
    control: new BringDataIntoViewControl({
      units: 'imperial',
    }),
    controlOptions: {
      position: ControlPosition.TopLeft,
    },
  },
];

const BringDataControl: React.FC = () => (
  <div style={wrapperStyles.map}>
    <Typography gutterBottom variant="h5">
      Custom Control
    </Typography>
    <Description>
      Bring Data Into View Control This sample shows how to create a simple custom control that centers and zooms the
      map to fit any data that is loaded on the map. This works with data in a HtmlMarkers, DataSource and ImageLayers.
      Does not support TileLayers and VectorTileSources.
    </Description>
    <AzureMapsProvider>
      <div style={{ height: '300px' }}>
        <AzureMap options={option} customControls={controls}>
          <AzureMapDataSourceProvider
            id={'customControl DataSourceProvider'}
            dataFromUrl="https://raw.githubusercontent.com/Azure-Samples/AzureMapsCodeSamples/master/AzureMapsCodeSamples/Common/data/geojson/SamplePoiDataSet.json"
          >
            <AzureMapLayerProvider
              id={'customControl LayerProvider'}
              options={{
                //Tell the data source to cluster point data.
                cluster: true,

                //The radius in pixels to cluster points together.
                clusterRadius: 45,

                //The maximium zoom level in which clustering occurs.
                //If you zoom in more than this, all points are rendered as symbols.
                clusterMaxZoom: 15,
              }}
              type="SymbolLayer"
            />
            <AzureMapHtmlMarker
              key={'myMarker'}
              options={{
                color: 'DodgerBlue',
                text: '10',
                position: [-122.33, 47.6],
              }}
            />
          </AzureMapDataSourceProvider>
        </AzureMap>
      </div>
    </AzureMapsProvider>
  </div>
);

export default BringDataControl;

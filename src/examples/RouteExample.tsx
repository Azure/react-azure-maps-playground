import React from 'react';
import {
  AzureMap,
  AzureMapDataSourceProvider,
  AzureMapFeature,
  AzureMapLayerProvider,
  AzureMapsProvider,
  IAzureMapOptions,
} from 'react-azure-maps';
import { AuthenticationType } from 'azure-maps-control';
import { key } from '../key';
import Typography from '@material-ui/core/Typography';
import Description from '../Layout/Description';

function mouseOverLineString(e: any) {
  console.log('lineString moved', e);
}

const points = [
  [-122.18822, 47.63208],
  [-122.18204, 47.63196],
  [-122.17243, 47.62976],
  [-122.16419, 47.63023],
  [-122.15852, 47.62942],
  [-122.15183, 47.62988],
  [-122.14256, 47.63451],
  [-122.13483, 47.64041],
  [-122.13466, 47.64422],
  [-122.13844, 47.6544],
  [-122.13277, 47.66515],
  [-122.12779, 47.66712],
  [-122.11595, 47.66712],
  [-122.11063, 47.66735],
  [-122.10668, 47.67035],
  [-122.10565, 47.67498],
];

const option: IAzureMapOptions = {
  authOptions: {
    authType: AuthenticationType.subscriptionKey,
    subscriptionKey: key,
  },
  center: [-122.12, 47.63],
  zoom: 10,
  view: 'Auto',
};

const RouteExample: React.FC = () => {
  return (
    <div style={wrapperStyles.map}>
      <Typography gutterBottom variant="h5">
        Gradient Line String Route
      </Typography>
      <Description>
        This sample shows how to apply a stroke gradient to a line on the map. In order to apply this feature to a line,
        the data source must have the lineMetrics option set to true.
      </Description>
      <AzureMapsProvider>
        <div style={wrapperStyles.map}>
          <AzureMap options={option}>
            <AzureMapDataSourceProvider
              events={{
                dataadded: (e: any) => {
                  console.log('Data on source added', e);
                },
              }}
              id={'routeExample AzureMapDataSourceProvider'}
              options={{
                // This sample shows how to apply a stroke gradient to a line on the map.\
                // In order to apply this feature to a line, the data source must have the lineMetrics option set to true.
                lineMetrics: true,
              }}
            >
              <AzureMapLayerProvider
                id={'routeExample AzureMapLayerProvider'}
                options={{
                  strokeWidth: 5,
                  strokeGradient: [
                    'interpolate',
                    ['linear'],
                    ['line-progress'],
                    0,
                    'blue',
                    0.1,
                    'royalblue',
                    0.3,
                    'cyan',
                    0.5,
                    'lime',
                    0.7,
                    'yellow',
                    1,
                    'red',
                  ],
                }}
                events={{
                  mouseenter: mouseOverLineString,
                }}
                lifecycleEvents={{
                  layeradded: (e: any) => {
                    console.log('LAYER ADDED TO MAP', e);
                  },
                }}
                type={'LineLayer'}
              />
              <AzureMapFeature
                key={'Line String Feature'}
                id={'Line Strign ID'}
                type={'LineString'}
                coordinates={points}
              />
            </AzureMapDataSourceProvider>
          </AzureMap>
        </div>
      </AzureMapsProvider>
    </div>
  );
};

export const wrapperStyles = {
  map: {
    height: '350px',
  },
  wrapper: {
    padding: '15px',
    marginTop: '15px',
  },
  buttonContainer: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridGap: '10px',
    gridAutoColumns: 'max-content',
    padding: '10px 0',
  },
  buttons: {
    padding: '15px',
    flex: 1,
  },
  popupStyles: {
    padding: '20px',
    color: 'black',
  },
};

export default RouteExample;

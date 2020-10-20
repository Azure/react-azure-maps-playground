import React from 'react';
import {
  AzureMap,
  AzureMapDataSourceProvider,
  AzureMapLayerProvider,
  AzureMapsProvider,
  IAzureMapControls,
  IAzureMapOptions,
} from 'react-azure-maps';
import { AuthenticationType, ControlOptions } from 'azure-maps-control';
import { key } from '../key';
import Typography from '@material-ui/core/Typography';
import { wrapperStyles } from './RouteExample';
import { calculateLineEndPoints, lineData } from './mapHelper';
import Description from '../Layout/Description';

const option: IAzureMapOptions = {
  authOptions: {
    authType: AuthenticationType.subscriptionKey,
    subscriptionKey: key,
  },
  center: [-100.12, 44.63],
  zoom: 3,
  view: 'Auto',
};

const controls: [IAzureMapControls] = [
  {
    controlName: 'StyleControl',
    controlOptions: { mapStyles: 'all' },
    options: { position: 'top-right' } as ControlOptions,
  },
];

const ControlExample: React.FC = () => {
  return (
    <div style={wrapperStyles.map}>
      <Typography gutterBottom variant="h5">
        Map Control Style
      </Typography>
      <Description>This sample shows how to add the map style picker control to the map.</Description>
      <AzureMapsProvider>
        <div style={wrapperStyles.map}>
          <AzureMap options={option} controls={controls}>
            <AzureMapDataSourceProvider
              events={{
                dataadded: (e: any) => {
                  console.log('Data on source added', e);
                },
              }}
              id={'controlExample AzureMapDataSourceProvider'}
              options={{}}
            >
              <AzureMapLayerProvider
                id={'controlExample AzureMapLayerProvider'}
                options={{}}
                type={'SymbolLayer'}
              ></AzureMapLayerProvider>
              {calculateLineEndPoints(lineData)}
            </AzureMapDataSourceProvider>
          </AzureMap>
        </div>
      </AzureMapsProvider>
    </div>
  );
};

export default ControlExample;

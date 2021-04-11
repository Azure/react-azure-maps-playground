import React from 'react';
import { AzureMap, AzureMapsProvider, IAzureMapControls, IAzureMapOptions } from 'react-azure-maps';
import { AuthenticationType, ControlOptions } from 'azure-maps-control';
import { key } from '../key';
import Typography from '@material-ui/core/Typography';
import { wrapperStyles } from './RouteExample';
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

const controls: IAzureMapControls[] = [
  {
    controlName: 'StyleControl',
    controlOptions: { mapStyles: 'all' },
    options: { position: 'top-right' } as ControlOptions,
  },
  {
    controlName: 'ZoomControl',
    options: { position: 'top-right' } as ControlOptions,
  },
  {
    controlName: 'CompassControl',
    controlOptions: { rotationDegreesDelta: 10, style: 'dark' },
    options: { position: 'bottom-right' } as ControlOptions,
  },
  {
    controlName: 'PitchControl',
    controlOptions: { pitchDegreesDelta: 5, style: 'dark' },
    options: { position: 'bottom-right' } as ControlOptions,
  },
  {
    controlName: 'TrafficControl',
    controlOptions: { incidents: true },
    options: { position: 'top-left' } as ControlOptions,
  },
  {
    controlName: 'TrafficLegendControl',
    controlOptions: {},
    options: { position: 'bottom-left' } as ControlOptions,
  },
];

const ControlExample: React.FC = () => {
  return (
    <div style={wrapperStyles.map}>
      <Typography gutterBottom variant="h5">
        Map Controls
      </Typography>
      <Description>This sample shows how to add the map controls to the map.</Description>
      <AzureMapsProvider>
        <div style={wrapperStyles.map}>
          <AzureMap options={option} controls={controls} />
        </div>
      </AzureMapsProvider>
    </div>
  );
};

export default ControlExample;

import React, { useState } from 'react';
import { AzureMap, AzureMapsProvider, IAzureMapOptions } from 'react-azure-maps';
import { AuthenticationType } from 'azure-maps-control';
import { key } from '../key';
import Description from '../Layout/Description';
import { Button } from '@mui/material';
import { wrapperStyles } from './Options/ChangeOptionsWrapper';

const option: IAzureMapOptions = {
  center: [-0.076083, 51.50812],
  zoom: 16,
  pitch: 60,
  view: 'Auto',
  authOptions: {
    authType: AuthenticationType.subscriptionKey,
    subscriptionKey: key,
  },
};

const Building3d: React.FC = () => {
  const [showBuildingModels, setShowBuildingModels] = useState(true);

  return (
    <div>
      <Description>Display 3D building footprints</Description>
      <div style={wrapperStyles.buttonContainer}>
        <Button
          size="small"
          variant="contained"
          onClick={() => setShowBuildingModels((prev) => !prev)}
          color="secondary"
        >
          Toggle Buildings
        </Button>
      </div>
      <div style={{ height: '400px' }}>
        <AzureMapsProvider>
          <AzureMap options={option} styleOptions={{ showBuildingModels: showBuildingModels }}></AzureMap>
        </AzureMapsProvider>
      </div>
    </div>
  );
};

export default Building3d;

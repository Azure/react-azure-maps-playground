import React from 'react';
import { AzureMap, AzureMapsProvider, IAzureMapOptions } from 'react-azure-maps';
import { AuthenticationType } from 'azure-maps-control';
import { key } from '../key';

const option: IAzureMapOptions = {
  authOptions: {
    authType: AuthenticationType.subscriptionKey,
    subscriptionKey: key,
  },
};

const DefaultMap: React.FC = () => (
  <div style={{ height: '300px' }}>
    <AzureMapsProvider>
      <AzureMap options={option}></AzureMap>
    </AzureMapsProvider>
  </div>
);

export default DefaultMap;

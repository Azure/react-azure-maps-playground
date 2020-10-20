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
  <AzureMapsProvider>
    <div style={{ height: '300px' }}>
      <AzureMap options={option} />
    </div>
  </AzureMapsProvider>
);

export default DefaultMap;

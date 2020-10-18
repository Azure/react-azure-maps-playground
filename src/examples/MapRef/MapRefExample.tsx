import React from 'react';
import { AzureMap, IAzureMapOptions } from 'react-azure-maps';
import { AuthenticationType } from 'azure-maps-control';
import { key } from '../../key';

const option: IAzureMapOptions = {
  authOptions: {
    authType: AuthenticationType.subscriptionKey,
    subscriptionKey: key,
  },
};

const MapRefMap: React.FC = () => {
  return (
    <div style={{ height: '300px' }}>
      <AzureMap options={option} />
    </div>
  );
};

export default MapRefMap;

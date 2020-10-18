import { AzureMapsProvider } from 'react-azure-maps';
import React from 'react';
import MapRefWrapper from './MapRefWrapper';

const MapParentComponent = () => {
  return (
    <AzureMapsProvider>
      <>
        <div>Parent Component</div>
        <MapRefWrapper />
      </>
    </AzureMapsProvider>
  );
};

export default MapParentComponent;

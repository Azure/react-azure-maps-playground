import React from "react";

import { AzureMap, AzureMapsProvider, AzureMapDrawingManagerProvider, AzureMapFeature, AzureMapDrawingLayerProvider, IAzureMapOptions } from 'react-azure-maps';
import { AuthenticationType } from 'azure-maps-control';
import { key } from "../key";
import { wrapperStyles } from "./RouteExample";

const styles = {
  map: {
    height: 600,
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

const drawingOptions = {
  toolbar: {
    position: 'top-right',
    style: 'dark',
  }
};

const DrawingTools: React.FC = () => (
  <div style={wrapperStyles.map}>
    <AzureMapsProvider>
      <div style={styles.map}>
        <AzureMap options={option}>
          <AzureMapDrawingManagerProvider options={drawingOptions}>
            <AzureMapFeature
              id={'DrawingTool MapFeature'}
              type="Polygon"
              coordinates={[
                [-122.33, 47.6],
                [-122.43, 47.6],
                [-122.43, 47.7],
                [-122.33, 47.6],
              ]}
            />

            <AzureMapDrawingLayerProvider type="lineLayer" options={{strokeColor: 'red', strokeWidth: 4}}/>
            <AzureMapDrawingLayerProvider type="pointLayer" options={{iconOptions: { image: 'marker-blue' }}}/>
            <AzureMapDrawingLayerProvider type="polygonLayer" options={{fillColor: 'green'}}/>
            <AzureMapDrawingLayerProvider type="polygonOutlineLayer" options={{strokeColor: 'orange'}}/>
          </AzureMapDrawingManagerProvider>
        </AzureMap>
      </div>
    </AzureMapsProvider>
  </div>
);

export default DrawingTools;
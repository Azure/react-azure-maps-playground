import React, { useState } from 'react';
import {
  AzureMap,
  AzureMapDataSourceProvider,
  AzureMapDrawingManagerProvider,
  AzureMapFeature,
  AzureMapLayerProvider,
  AzureMapsProvider,
  IAzureMapOptions,
} from 'react-azure-maps';
import { AuthenticationType } from 'azure-maps-control';
import { key } from '../../key';
import { control, drawing } from 'azure-maps-drawing-tools';
import Description from '../../Layout/Description';
import { Button } from '@material-ui/core';
import { wrapperStyles } from '../Options/ChangeOptionsWrapper';

const option: IAzureMapOptions = {
  authOptions: {
    authType: AuthenticationType.subscriptionKey,
    subscriptionKey: key,
  },
};

const drawingOptions = {
  toolbar: new control.DrawingToolbar({
    position: 'top-right',
    style: 'dark',
  }),
};

const mode = {
  mode: drawing.DrawingMode.drawPolygon,
};

const DrawingTool: React.FC = () => {
  const [options, setOptions] = useState<any>(drawingOptions);
  return (
    <div>
      <Description>Change options in child</Description>
      <div style={wrapperStyles.buttonContainer}>
        <Button size="small" variant="contained" color="secondary" onClick={() => setOptions(mode)}>
          Change Bounds
        </Button>
      </div>
      <AzureMapsProvider>
        <div style={{ height: '300px' }}>
          <AzureMap options={option}>
            <AzureMapDrawingManagerProvider options={options}>
              <AzureMapDataSourceProvider
                events={{
                  dataadded: (e: any) => {
                    console.log('Data on source added', e);
                  },
                }}
                id={'DrawingTool AzureMapDataSourceProvider'}
                options={{}}
              >
                <AzureMapLayerProvider id={'DrawingTool AzureMapLayerProvider'} options={{}} type={'PolygonLayer'} />
                <AzureMapFeature
                  id={'DrawingTool MapFeature'}
                  type="Polygon"
                  coordinates={[
                    [-50, -20],
                    [0, 40],
                    [50, -20],
                    [-50, -20],
                  ]}
                />
              </AzureMapDataSourceProvider>
            </AzureMapDrawingManagerProvider>
          </AzureMap>
        </div>
      </AzureMapsProvider>
      <AzureMapsProvider>
        <div style={{ height: '300px' }}>
          <AzureMap options={option}>
            <AzureMapDrawingManagerProvider options={options} />
          </AzureMap>
        </div>
      </AzureMapsProvider>
    </div>
  );
};
export default DrawingTool;

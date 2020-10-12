import React, { useState } from 'react';
import {
  AzureMap,
  AzureMapDataSourceProvider,
  AzureMapFeature,
  AzureMapLayerProvider,
  AzureMapsProvider,
  IAzureMapOptions,
} from 'react-azure-maps';
import { AuthenticationType, data } from 'azure-maps-control';
import { key } from '../../key';
import { Button } from '@material-ui/core';
import Description from '../../Layout/Description';

const option: IAzureMapOptions = {
  authOptions: {
    authType: AuthenticationType.subscriptionKey,
    subscriptionKey: key,
  },
  center: [-100.01, 45.01],
  zoom: 2,
  view: 'Auto',
};

const randomColor = (): Object => {
  const colorValue = '#000000'.replace(/0/g, function () {
    return (~~(Math.random() * 16)).toString(16);
  });
  return { color: colorValue };
};

const renderPoint = (): data.Position => {
  const randomLongitude = Math.floor(Math.random() * (-80 - -120) + -120);
  const randomLatitude = Math.floor(Math.random() * (30 - 65) + 65);
  return new data.Position(randomLongitude, randomLatitude);
};

const ShapeExample: React.FC = () => {
  const [coords1, setCoords1] = useState<data.Position>(renderPoint);
  const [featureProperties, setFeatureProperties] = useState(randomColor);

  return (
    <>
      <Description>
        Simple shape example <br />
        Use Shape for easy to update and maintain Feature. <br />
        Wrap feature that you want dynamically update by AzureMapShapeProvider
      </Description>
      <div style={styles.buttonContainer}>
        <Button size="small" variant="contained" color="primary" onClick={() => setCoords1(renderPoint)}>
          {' '}
          Change position
        </Button>
        <Button size="small" variant="contained" color="primary" onClick={() => setFeatureProperties(randomColor)}>
          {' '}
          Change color
        </Button>
      </div>
      <div style={{ height: '300px' }}>
        <AzureMapsProvider>
          <AzureMap options={option}>
            <AzureMapDataSourceProvider id={'DataSource Provider'}>
              <AzureMapLayerProvider
                options={{
                  color: ['get', 'color'],
                }}
                id={'shape AzureMapLayerProvider'}
                type={'BubbleLayer'}
              ></AzureMapLayerProvider>
              <AzureMapFeature
                key={'feature'}
                variant={'shape'}
                id={'feature feee'}
                type="Point"
                coordinate={coords1}
                properties={{
                  title: 'Pin',
                  icon: 'pin-round-blue',
                }}
                setCoords={coords1}
                setProperties={featureProperties}
              />
            </AzureMapDataSourceProvider>
          </AzureMap>
        </AzureMapsProvider>
      </div>
    </>
  );
};

const styles = {
  map: {
    height: 300,
  },
  buttonContainer: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridGap: '10px',
    gridAutoColumns: 'max-content',
    padding: '10px 0',
    alignItems: 'center',
  },
  button: {
    height: 35,
    width: 80,
    backgroundColor: '#68aba3',
    'text-align': 'center',
  },
};
export default ShapeExample;

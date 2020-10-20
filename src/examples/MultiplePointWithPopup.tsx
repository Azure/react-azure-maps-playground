import React, { memo, useMemo, useState } from 'react';
import {
  AzureMap,
  AzureMapDataSourceProvider,
  AzureMapFeature,
  AzureMapLayerProvider,
  AzureMapsProvider,
  IAzureDataSourceChildren,
  IAzureMapOptions,
  AzureMapPopup,
} from 'react-azure-maps';
import { AuthenticationType, data, MapMouseEvent, PopupOptions } from 'azure-maps-control';
import { Button, Chip } from '@material-ui/core';
import { key } from '../key';
import Description from '../Layout/Description';

const points = Array.from({ length: 100 }).map(() => {
  const randomLongitude = Math.floor(Math.random() * (-80 - -120) + -120);
  const randomLatitude = Math.floor(Math.random() * (30 - 65) + 65);
  return new data.Position(randomLongitude, randomLatitude);
});

const renderPoint = (coordinates: data.Position) => {
  const rendId = Math.random();
  return (
    <AzureMapFeature
      key={rendId}
      id={rendId.toString()}
      type="Point"
      coordinate={coordinates}
      properties={{
        id: rendId,
        prop: 'My Feature Prop',
      }}
    />
  );
};

const MarkersExample: React.FC = () => {
  const [markers, setMarkers] = useState([...points]);
  const [popupOptions, setPopupOptions] = useState<PopupOptions>({});
  const [popupProperties, setPopupProperties] = useState({});

  const option: IAzureMapOptions = useMemo(() => {
    return {
      authOptions: {
        authType: AuthenticationType.subscriptionKey,
        subscriptionKey: key,
      },
      center: [-100.01, 45.01],
      zoom: 2,
      view: 'Auto',
    };
  }, []);

  const addRandomMarker = () => {
    const randomLongitude = Math.floor(Math.random() * (-80 - -120) + -120);
    const randomLatitude = Math.floor(Math.random() * (30 - 65) + 65);
    const newPoint = new data.Position(randomLongitude, randomLatitude);
    setMarkers([...markers, newPoint]);
  };

  const removeAllMarkers = () => {
    setMarkers([]);
  };

  const memoizedMarkerRender: IAzureDataSourceChildren = useMemo(
    (): any => markers.map((marker) => renderPoint(marker)),
    [markers],
  );

  console.log('MultiplePoint RENDER');
  return (
    <>
      <Description>
        Simple example with marker's popup <br />
        Popup content are created from markers properties
      </Description>
      <div style={styles.buttonContainer}>
        <Button size="small" variant="contained" color="primary" onClick={addRandomMarker}>
          {' '}
          MARKER POINT
        </Button>
        <Button size="small" variant="contained" color="primary" onClick={removeAllMarkers}>
          {' '}
          REMOVE ALL
        </Button>
        <Chip label={`Markers Point on map: ${markers.length}`} />
      </div>
      <AzureMapsProvider>
        <div style={styles.map}>
          <AzureMap options={option}>
            <AzureMapDataSourceProvider id={'MultiplePoint AzureMapDataSourceProvider'}>
              <AzureMapLayerProvider
                id={'MultiplePoint AzureMapLayerProvider'}
                options={{
                  iconOptions: {
                    image: 'pin-red',
                  },
                }}
                events={{
                  mousemove: (e: MapMouseEvent) => {
                    if (e.shapes && e.shapes.length > 0) {
                      const prop: any = e.shapes[0];
                      // Set popup options
                      setPopupOptions({
                        ...popupOptions,
                        position: new data.Position(
                          prop.data.geometry.coordinates[0],
                          prop.data.geometry.coordinates[1],
                        ),
                        pixelOffset: [0, -18],
                      });
                      if (prop.data.properties)
                        // Set popup properties from Feature Properties that are declared on create Feature
                        setPopupProperties({
                          ...prop.data.properties,
                          dumpProp: 'My Popup',
                        });
                    }
                  },
                }}
                type="SymbolLayer"
              ></AzureMapLayerProvider>
              {memoizedMarkerRender}
            </AzureMapDataSourceProvider>
            <AzureMapPopup
              isVisible={true}
              options={popupOptions}
              popupContent={
                <div style={styles.popupStyles}>{JSON.stringify(popupProperties)}</div> // Inject your JSX
              }
            />
          </AzureMap>
        </div>
      </AzureMapsProvider>
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
  popupStyles: {
    padding: '20px',
    color: 'black',
  },
};

export default memo(MarkersExample);

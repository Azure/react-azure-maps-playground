import React, { useContext, useEffect, useState } from 'react';
import { AzureMapsContext, IAzureMapsContextProps } from 'react-azure-maps';
import MapRefMap from './MapRefExample';
import { Button } from '@material-ui/core';
import Description from '../../Layout/Description';
import { data, layer, source } from 'azure-maps-control';

const dataSourceRef = new source.DataSource();
const layerRef = new layer.SymbolLayer(dataSourceRef);

const MapRefWrapper = () => {
  // Here you use mapRef from context
  const { mapRef, isMapReady } = useContext<IAzureMapsContextProps>(AzureMapsContext);
  const [showTileBoundaries, setShowTileBoundaries] = useState(true);

  useEffect(() => {
    if (isMapReady && mapRef) {
      // Need to add source and layer to map on init and ready
      mapRef.sources.add(dataSourceRef);
      mapRef.layers.add(layerRef);
    }
  }, [isMapReady]);

  useEffect(() => {
    if (mapRef) {
      mapRef.setStyle({ showTileBoundaries: !showTileBoundaries });
    }
  }, [showTileBoundaries]);

  const changeMapCenter = () => {
    if (mapRef) {
      mapRef.setCamera({ center: getRandomPosition() });
    }
  };

  const toggleTitleBoundaries = () => {
    setShowTileBoundaries((prev) => !prev);
  };

  const addRandomMarker = () => {
    const randomLongitude = Math.floor(Math.random() * (180 - -180) + -180);
    const randomLatitude = Math.floor(Math.random() * (-90 - 90) + 90);
    const newPoint = new data.Position(randomLongitude, randomLatitude);

    dataSourceRef.add(new data.Feature(new data.Point(newPoint)));
  };

  return (
    <>
      <div>Wrapper Component</div>
      <Description>
        With map ref you can do all that Azure Map can do <br />
      </Description>
      <div style={styles.buttonContainer}>
        <Button size="small" variant="contained" color="primary" onClick={toggleTitleBoundaries}>
          Toggle Title Boundaries
        </Button>
        <Button size="small" variant="contained" color="primary" onClick={changeMapCenter}>
          Change Map Center
        </Button>
        <Button size="small" variant="contained" color="primary" onClick={addRandomMarker}>
          Add Pin
        </Button>
      </div>
      <MapRefMap />
    </>
  );
};

const getRandomPosition = () => {
  const randomLongitude = Math.floor(Math.random() * (180 - -180) + -180);
  const randomLatitude = Math.floor(Math.random() * (-90 - 90) + 90);
  return [randomLatitude, randomLongitude];
};

const styles = {
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
  },
};

export default MapRefWrapper;

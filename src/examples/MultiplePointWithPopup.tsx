import React, { memo, useMemo, useState } from 'react'
import {
  AzureMap,
  AzureMapDataSourceProvider,
  AzureMapFeature,
  AzureMapLayerProvider,
  AzureMapsProvider,
  IAzureDataSourceChildren,
  IAzureMapOptions,
  AzureMapPopup
} from 'react-azure-maps'
import { AuthenticationType, data, MapMouseEvent, PopupOptions } from 'azure-maps-control'
import { Button, Chip } from '@material-ui/core'
import { key } from '../key'

const points = Array.from({ length: 100 }).map(() => {
  const randomLongitude = Math.floor(Math.random() * (-80 - -120) + -120)
  const randomLatitude = Math.floor(Math.random() * (30 - 65) + 65)
  return (
    new data.Position(randomLongitude, randomLatitude)
  )
})

const renderPoint = (coordinates: data.Position) => {
  const rendId = Math.random()
  return (
    <AzureMapFeature
      key={rendId}
      id={rendId.toString()}
      type="Point"
      coordinate={coordinates}
      properties={{
        title: 'Pin',
        icon: 'pin-round-blue'
      }}
    />
  )
}

const MarkersExample: React.FC = () => {
  const [markers, setMarkers] = useState([...points])
  const [popupOptions, setPopupOptions] = useState<PopupOptions>({})

  const option: IAzureMapOptions = useMemo(() => {
    return {
      authOptions: {
        authType: AuthenticationType.subscriptionKey,
        subscriptionKey: key
      },
      center: [-100.01, 45.01],
      zoom: 2,
      view: 'Auto'
    }
  }, [])

  const addRandomMarker = () => {
    const randomLongitude = Math.floor(Math.random() * (-80 - -120) + -120)
    const randomLatitude = Math.floor(Math.random() * (30 - 65) + 65)
    const newPoint = new data.Position(randomLongitude, randomLatitude)
    setMarkers([...markers, newPoint])
  }

  const removeAllMarkers = () => {
    setMarkers([])
  }

  const memoizedMarkerRender: IAzureDataSourceChildren = useMemo(
    (): any => markers.map(marker => renderPoint(marker)),
    [markers]
  )

  console.log('MarkerExample RENDER')
  return (
    <>
      <div style={styles.buttonContainer}>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={addRandomMarker}
        >
          {' '}
          MARKER POINT
        </Button>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={removeAllMarkers}
        >
          {' '}
          REMOVE ALL
        </Button>
        <Chip label={`Markers Point on map: ${markers.length}`} />
      </div>
      <div style={styles.map}>
        <AzureMapsProvider>
          <AzureMap options={option}>
            <AzureMapDataSourceProvider
              id={'markersExample AzureMapDataSourceProvider'}
            >
              <AzureMapLayerProvider
                id={'markersExample AzureMapLayerProvider'}
                options={{
                  textOptions: {
                    textField: ['get', 'title'], //Specify the property name that contains the text you want to appear with the symbol.
                    offset: [0, 1.2]
                  }
                }}
                events={{
                  mousemove: (e: MapMouseEvent) => {
                    if (e.shapes && e.shapes.length > 0) {
                      const prop: any = e.shapes[0]
                      setPopupOptions({
                        ...popupOptions,
                        position: new data.Position(prop.data.geometry.coordinates[0], prop.data.geometry.coordinates[1])
                      })
                    }
                  }
                }}
                type="SymbolLayer"
              ></AzureMapLayerProvider>
              {memoizedMarkerRender}
            </AzureMapDataSourceProvider>
            <AzureMapPopup
              isVisible={true}
              options={popupOptions}
              popupContent={
                <div style={styles.popupStyles}>{JSON.stringify(popupOptions)}</div>
              }
            />
          </AzureMap>
        </AzureMapsProvider>
      </div>
    </>
  )
}

const styles = {
  map: {
    height: 300
  },
  buttonContainer: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridGap: '10px',
    gridAutoColumns: 'max-content',
    padding: '10px 0',
    alignItems: 'center'
  },
  button: {
    height: 35,
    width: 80,
    backgroundColor: '#68aba3',
    'text-align': 'center'
  },
  popupStyles: {
    padding: '20px',
    color: 'black'
  }
}

export default memo(MarkersExample)

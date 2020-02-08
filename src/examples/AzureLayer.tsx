import React, { useMemo } from 'react'
import {
  AzureMapsProvider,
  AzureMap,
  AzureMapDataSourceProvider,
  AzureMapLayerProvider,
  AzureMapFeature,
  AzureMapHtmlMarker,
  IAzureMapOptions,
  IAzureMapHtmlMarkerEvent
} from 'react-azure-maps'
import { AuthenticationType, data } from 'azure-maps-control'
import { key } from '../key'

const AzureLayer: React.FC = () => {
  const point1 = new data.Position(-100.01, 45.01)
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

  const onClick = () => {
    console.log('ASD')
  }

  const azureHtmlMapMarkerOptions = {
    position: [-110, 45]
  }

  const eventToMarker: Array<IAzureMapHtmlMarkerEvent> = [
    { eventName: 'click', callback: onClick }
  ]

  return (
    <>
      <div style={styles.map}>
        <AzureMapsProvider>
          <AzureMap options={option}>
            <AzureMapDataSourceProvider id={'dataSource'}>
              <AzureMapLayerProvider
                id={'layer'}
                options={{
                  url: 'https://i.imgur.com/KBkuZLV.jpg',
                  coordinates: [
                    [-70, 40],
                    [-60, 37],
                    [-63, 30],
                    [-72, 33]
                  ]
                }}
                type={'ImageLayer'}
              ></AzureMapLayerProvider>
              <AzureMapFeature
                id={'itsmyfeature'}
                key={'asd'}
                type="Point"
                coordinate={point1}
                properties={{
                  title: 'Microsoft',
                  icon: 'pin-round-blue'
                }}
              ></AzureMapFeature>
            </AzureMapDataSourceProvider>
            <AzureMapHtmlMarker
              markerContent={<div className="pulseIcon"></div>}
              options={azureHtmlMapMarkerOptions}
              events={eventToMarker}
            />
            <AzureMapHtmlMarker
              markerContent={<div className="pulseIcon"></div>}
              options={azureHtmlMapMarkerOptions}
              events={eventToMarker}
            />

            <AzureMapHtmlMarker
              markerContent={<div className="pulseIcon"></div>}
              options={azureHtmlMapMarkerOptions}
              events={eventToMarker}
            />
          </AzureMap>
        </AzureMapsProvider>
      </div>
      <div style={styles.map}>
        <AzureMapsProvider>
          <AzureMap options={option}>
            <AzureMapDataSourceProvider id={'data source'}>
              <AzureMapLayerProvider
                id={'heatMap'}
                options={{}}
                type={'HeatLayer'}
              ></AzureMapLayerProvider>
              <AzureMapFeature
                id={'luuuuju'}
                key={'dddd'}
                type="Point"
                coordinate={point1}
                properties={{
                  title: 'Microsoft',
                  icon: 'pin-round-blue'
                }}
              ></AzureMapFeature>
            </AzureMapDataSourceProvider>
          </AzureMap>
        </AzureMapsProvider>
      </div>
    </>
  )
}

const styles = {
  map: {
    height: 300,
    marginBottom: 50
  }
}

export default AzureLayer

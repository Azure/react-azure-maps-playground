import React, { useMemo } from 'react'
import {
  AzureMap,
  AzureMapDataSourceProvider,
  AzureMapFeature,
  AzureMapHtmlMarker,
  AzureMapLayerProvider,
  AzureMapsProvider,
  IAzureMapHtmlMarkerEvent,
  IAzureMapOptions
} from 'react-azure-maps'
import { AuthenticationType, data } from 'azure-maps-control'
import { key } from '../key'

const DefaultMap: React.FC = () => {
  const position = new data.Position(-100.01, 45.01)

  const option: IAzureMapOptions = useMemo(() => {
    return {
      authOptions: {
        authType: AuthenticationType.subscriptionKey,
        subscriptionKey: key
      },
      center: [-100.01, 45.01],
      zoom: 12,
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
    <div style={{
        height: '300px'
    }}>
      <AzureMapsProvider>
        <AzureMap options={option}>
          <AzureMapDataSourceProvider id={'default DataSourceProvider'}>
            <AzureMapLayerProvider
              id={'default LayerProvider'}
              options={{}}
              type={'SymbolLayer'}
            ></AzureMapLayerProvider>
            <AzureMapFeature
              id={'default MapFeature'}
              type="Point"
              coordinate={position}
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
        </AzureMap>
      </AzureMapsProvider>
    </div>
  )
}

export default DefaultMap

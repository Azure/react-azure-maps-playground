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
import {wrapperStyles} from "./RouteExample";
import {Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

function getCoordinates(e: any) {
  console.log('Clicked on:', e)
}
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
      <div style={wrapperStyles.map}>
        <Paper elevation={3} style={wrapperStyles.wrapper}>
          <Typography gutterBottom variant="h4">
            Azure Map Layers Examples
          </Typography>
          <Card style={{padding: 5}}>
            <Typography gutterBottom variant="body1">
              This sample shows how to add layers and global map events. Open dev tools console and click on map.
            </Typography>
          </Card>
      <div style={styles.map}>
        <AzureMapsProvider>
          <AzureMap options={option} events={{click: getCoordinates}}>
            <AzureMapDataSourceProvider id={'dataSource'}>
              <AzureMapLayerProvider
                id={'layer'}
                options={{
                  // URL to an image to overlay. Images hosted on other domains must have CORs enabled.
                  url: 'https://i.imgur.com/fc4Tw0H.jpg',
                  // * An array of positions for the corners of the image listed in clockwise order: [top left, top right, bottom right, bottom left].
                  coordinates: [
                    [-130, 45],
                    [-115 , 45],
                    [-115, 35],
                    [-130, 35]
                  ],
                  opacity: 0.8,
                }}
                type={'ImageLayer'}
                events={{
                  mouseenter: getCoordinates
                }}
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
        </Paper>
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

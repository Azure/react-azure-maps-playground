import React from 'react';
import {
  AzureMap,
  AzureMapDataSourceProvider,
  AzureMapLayerProvider,
  AzureMapsProvider,
  IAzureMapOptions,
} from 'react-azure-maps';
import { AuthenticationType } from 'azure-maps-control';
import Typography from '@mui/material/Typography';
import { key } from '../key';
import { wrapperStyles } from './RouteExample';
import Description from '../Layout/Description';

function mouseOn(e: any) {
  e.map.getCanvas().style.cursor = 'pointer';
}

function mouseLeave(e: any) {
  e.map.getCanvas().style.cursor = '';
}

function clusterClicked(e: any) {
  if (e && e.shapes && e.shapes.length > 0 && e.shapes[0].properties.cluster) {
    //Get the clustered point from the event.
    const cluster = e.shapes[0];

    //Get the cluster expansion zoom level. This is the zoom level at which the cluster starts to break apart.
    e.map.sources
      .getById('BubbleLayer DataSourceProvider')
      .getClusterExpansionZoom(cluster.properties.cluster_id)
      .then(function (zoom: any) {
        //Update the map camera to be centered over the cluster.
        e.map.setCamera({
          center: cluster.geometry.coordinates,
          zoom: zoom,
          type: 'ease',
          duration: 200,
        });
      });
  }
}

const option: IAzureMapOptions = {
  authOptions: {
    authType: AuthenticationType.subscriptionKey,
    subscriptionKey: key,
  },
  center: [-97, 39],
  zoom: 3,
  style: 'night',
  view: 'Auto',
};

const bubbleLayerOptions = {
  //Scale the size of the clustered bubble based on the number of points inthe cluster.
  radius: [
    'step',
    ['get', 'point_count'],
    20, //Default of 20 pixel radius.
    100,
    30, //If point_count >= 100, radius is 30 pixels.
    750,
    40, //If point_count >= 750, radius is 40 pixels.
  ],

  //Change the color of the cluster based on the value on the point_cluster property of the cluster.
  color: [
    'step',
    ['get', 'point_count'],
    'rgba(0,255,0,0.8)', //Default to green.
    100,
    'rgba(255,255,0,0.8)', //If the point_count >= 100, color is yellow.
    750,
    'rgba(255,0,0,0.8)', //If the point_count >= 100, color is red.
  ],
  strokeWidth: 0,
  filter: ['has', 'point_count'], //Only rendered data points which have a point_count property, which clusters do.
};

const BubbleLayer: React.FC = () => (
  <div style={wrapperStyles.map}>
    <Typography gutterBottom variant="h5">
      Bubble Layer
    </Typography>
    <Description>
      Point Clusters in Bubble Layer This sample shows how to enable point based clustering on a data source and render
      them differently from individual points on the map. Clustered points have four properties;
      <br />
      cluster - A boolean value indicating that it is a cluster.
      <br />
      cluster_id - A unique id for the cluster which can be used with the DataSource getClusterExpansionZoom,
      getClusterChildren, and getClusterLeaves functions.
      <br />
      point_count - The number of points the cluster contains.
      <br />
      point_count_abbreviated - A string that abbreviates the point_count value if it is long. (i.e. 4,000 becomes 4K)
    </Description>
    <AzureMapsProvider>
      <div style={{ height: '300px' }}>
        <AzureMap options={option}>
          <AzureMapDataSourceProvider
            id={'BubbleLayer DataSourceProvider'}
            dataFromUrl="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"
            options={{
              //Tell the data source to cluster point data.
              cluster: true,

              //The radius in pixels to cluster points together.
              clusterRadius: 45,

              //The maximium zoom level in which clustering occurs.
              //If you zoom in more than this, all points are rendered as symbols.
              clusterMaxZoom: 15,
            }}
          >
            <AzureMapLayerProvider
              id={'BubbleLayer LayerProvider'}
              options={bubbleLayerOptions}
              type="BubbleLayer"
              events={{
                mouseenter: mouseOn,
                mouseleave: mouseLeave,
                click: clusterClicked,
              }}
            ></AzureMapLayerProvider>
            <AzureMapLayerProvider
              id={'BubbleLayer2 LayerProvider'}
              options={{
                iconOptions: {
                  image: 'none', //Hide the icon image.
                },
                textOptions: {
                  textField: ['get', 'point_count_abbreviated'],
                  offset: [0, 0.4],
                },
              }}
              type="SymbolLayer"
            ></AzureMapLayerProvider>
            <AzureMapLayerProvider
              id={'BubbleLayer3 LayerProvider'}
              options={{
                filter: ['!', ['has', 'point_count']], //Filter out clustered points from this layer.
              }}
              type="SymbolLayer"
            ></AzureMapLayerProvider>
          </AzureMapDataSourceProvider>
        </AzureMap>
      </div>
    </AzureMapsProvider>
  </div>
);

export default BubbleLayer;

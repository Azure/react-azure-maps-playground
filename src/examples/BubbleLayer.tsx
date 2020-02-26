import React from 'react'
import {
    AzureMap,
    AzureMapDataSourceProvider,
    AzureMapLayerProvider,
    AzureMapsProvider,
    IAzureMapOptions
} from 'react-azure-maps'
import {AuthenticationType} from 'azure-maps-control'
import Typography from "@material-ui/core/Typography";
import {key} from "../key";
import {wrapperStyles} from "./RouteExample";
import Description from "../Layout/Description";

const option: IAzureMapOptions = {
    authOptions: {
        authType: AuthenticationType.subscriptionKey,
        subscriptionKey: key
    },
    center: [-97, 39],
    zoom: 3,
    style: 'night',
    view: 'Auto',
}

const bubbleLayerOptions = {
    //Scale the size of the clustered bubble based on the number of points inthe cluster.
    radius: [
        'step',
        ['get', 'point_count'],
        20,         //Default of 20 pixel radius.
        100, 30,    //If point_count >= 100, radius is 30 pixels.
        750, 40     //If point_count >= 750, radius is 40 pixels.
    ],

    //Change the color of the cluster based on the value on the point_cluster property of the cluster.
    color: [
        'step',
        ['get', 'point_count'],
        'rgba(0,255,0,0.8)',            //Default to green.
        100, 'rgba(255,255,0,0.8)',     //If the point_count >= 100, color is yellow.
        750, 'rgba(255,0,0,0.8)'        //If the point_count >= 100, color is red.
    ],
    strokeWidth: 0,
    filter: ['has', 'point_count'] //Only rendered data points which have a point_count property, which clusters do.

}


const BubbleLayer: React.FC = () => (
    <div style={wrapperStyles.map}>
        <Typography gutterBottom variant="h5">
            Bubble Layer
        </Typography>
        <Description>
            Point Clusters in Bubble Layer
            This sample shows how to enable point based clustering on a data source and render them differently from
            individual points on the map. Clustered points have four properties;<br/>
            cluster - A boolean value indicating that it is a cluster.<br/>
            cluster_id - A unique id for the cluster which can be used with the DataSource getClusterExpansionZoom,
            getClusterChildren, and getClusterLeaves functions.<br/>
            point_count - The number of points the cluster contains.<br/>
            point_count_abbreviated - A string that abbreviates the point_count value if it is long. (i.e. 4,000 becomes
            4K)
        </Description>
        <div style={{height: '300px'}}>
            <AzureMapsProvider>
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
                            clusterMaxZoom: 15
                        }}
                    >
                        <AzureMapLayerProvider
                            id={'BubbleLayer LayerProvider'}
                            options={bubbleLayerOptions}
                            type="BubbleLayer"
                        ></AzureMapLayerProvider>
                        <AzureMapLayerProvider
                            id={'BubbleLayer2 LayerProvider'}
                            options={{
                                iconOptions: {
                                    image: 'none' //Hide the icon image.
                                },
                                textOptions: {
                                    textField: ['get', 'point_count_abbreviated'],
                                    offset: [0, 0.4]
                                }
                            }}
                            type="SymbolLayer"
                        ></AzureMapLayerProvider>
                        <AzureMapLayerProvider
                            id={'BubbleLayer3 LayerProvider'}
                            options={{
                                filter: ['!', ['has', 'point_count']] //Filter out clustered points from this layer.
                            }}
                            type="SymbolLayer"
                        ></AzureMapLayerProvider>
                    </AzureMapDataSourceProvider>
                </AzureMap>
            </AzureMapsProvider>
        </div>
    </div>
)

export default BubbleLayer

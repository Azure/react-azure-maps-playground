import React, {useState} from 'react'
import {
    AzureMap, AzureMapCustomClass,
    AzureMapDataSourceProvider,
    AzureMapLayerProvider, AzureMapPopup,
    AzureMapsProvider,
    IAzureMapOptions
} from 'react-azure-maps'
import {AuthenticationType, data, HtmlMarker} from 'azure-maps-control'
import {key} from "../../key";
import {wrapperStyles} from "../PopupExample";
import {SpiderClusterManager} from "./SpiderClusterClass";
import Description from "../../Layout/Description";
import {Button, Chip} from "@material-ui/core";
import {inspect} from "util";


const option: IAzureMapOptions = {
    authOptions: {
        authType: AuthenticationType.subscriptionKey,
        subscriptionKey: key
    },
}

const clusterBubbleLayerOpitons = {
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
    blur: 0.5,
    filter: ['has', 'point_count'] //Only rendered data points which have a point_count property, which clusters do.
}

const SpiderClusterExample: React.FC = () => {
    const [dump, setDump] = useState(false)
    return (
        <>
            <Description>Simple example with marker's popup <br/>
                Popup content are created from markers properties
            </Description>
            <div style={styles.buttonContainer}>
                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => setDump(true)}
                >
                    {' '}
                    REMOVE ALL
                </Button>
                <Chip label={`IS TRUE: ${dump}`}/>
            </div>
            <div style={{height: '300px'}}>
                <AzureMapsProvider>
                    <AzureMap options={option}>
                        <AzureMapDataSourceProvider
                            id={'SpiderCluster DataSrouceProvider'}
                            dataFromUrl="https://raw.githubusercontent.com/Azure-Samples/AzureMapsCodeSamples/master/AzureMapsCodeSamples/Common/data/geojson/SamplePoiDataSet.json"
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
                                id={'SpiderCluster BubbleLayerProvider'}
                                options={clusterBubbleLayerOpitons}
                                type="BubbleLayer"
                            />

                            <AzureMapLayerProvider
                                id={'22222SpiderCluster SymbolLayerProvider-PointCount'}
                                options={{
                                    iconOptions: {
                                        image: 'none' //Hide the icon image.
                                    },
                                    textOptions: {
                                        textField: '{point_count_abbreviated}',
                                        offset: [0, 0.4]
                                    }
                                }}
                                type="SymbolLayer"
                            />
                            <AzureMapLayerProvider
                                id={'SpiderCluster 2222SymbolLayerProvider'}
                                options={{
                                    iconOptions: {
                                        image: 'pin-round-red' //Hide the icon image.
                                    },
                                }}
                                type="SymbolLayer"
                            />
{                            // @ts-ignore
}                            {dump && <AzureMapCustomClass onCreateCustomClass={(mapRef) => {
                                const spiderCluster = new SpiderClusterManager(mapRef, 'SpiderCluster BubbleLayerProvider', 'SpiderCluster SymbolLayerProvider', {
                                    featureSelected: function (shape, cluster) {
                                        // if (cluster) {
                                        //     showPopup(cluster.geometry.coordinates, shape.getProperties(), [0, 0]);
                                        // } else {
                                        //     showPopup(shape.getCoordinates(), shape.getProperties(), [0, -20]);
                                        // }
                                        console.log("FEATURE SEL")

                                    },
                                    featureUnselected: function () {
                                        // hidePopup();
                                        console.log("FEATURE UNSLECTED")
                                    }
                                })
                                return spiderCluster
                            }}/>}
                        </AzureMapDataSourceProvider>
                        <AzureMapPopup
                            isVisible={true}
                            options={{
                                pixelOffset: [0, -20],
                                closeButton: false
                            }}
                            popupContent={
                                <div style={wrapperStyles.popupStyles}></div>
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

export default SpiderClusterExample

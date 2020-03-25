import React from 'react'
import {
    AzureMap,
    AzureMapDataSourceProvider,
    AzureMapLayerProvider,
    AzureMapPopup,
    AzureMapsProvider,
    IAzureMapOptions
} from 'react-azure-maps'
import {key} from '../../key'
import {AuthenticationType, data, HtmlMarker} from "azure-maps-control";
import {wrapperStyles} from "../PopupExample";
import {HtmlMarkerLayer} from "./HTMLMarkerLayer";

function markerHovered(e: any) {
    var content;
    var marker = e.target;
    if (marker.properties.cluster) {
        content = 'Cluster of ' + marker.properties.point_count_abbreviated + ' markers';
    } else {
        content = marker.properties.Name;
    }
    const popup = e.target.map.popups.popups.values().next().value
    // Update the content and position of the popup.
    popup.setOptions({
        content: '<div style="padding:10px;">' + content + '</div>',
        position: marker.getOptions().position
    });
    //Open the popup.
    popup.open(e.target.map);
}

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


const HTMLCustomMarkerLayer: React.FC = () => (
    <div style={{height: '300px'}}>
        <AzureMapsProvider>
            <AzureMap options={option}>
                <AzureMapDataSourceProvider
                    id={'HTMLMarkers DataSrouceProvider'}
                    dataFromUrl="https://raw.githubusercontent.com/Azure-Samples/AzureMapsCodeSamples/master/AzureMapsCodeSamples/Common/data/geojson/SamplePoiDataSet.json"
                    options={{cluster: true}}
                    events={[]}
                >
                    <AzureMapLayerProvider
                        type="custom"
                        onCreateCustomLayer={(dataSourceRef, mapRef) => {
                            const markerLayer = new HtmlMarkerLayer('HTMLMarkers DataSrouceProvider', null,
                                // @ts-ignore
                                {
                                    markerRenderCallback: function (id: string, position: data.Position, properties: any) {
                                        //Business logic to define color of marker.
                                        let color = 'blue';
                                        switch (properties.EntityType) {
                                            case 'Gas Station':
                                                color = '#3366CC';
                                                break;
                                            case 'Grocery Store':
                                                color = '#DC3912';
                                                break;
                                            case 'Restaurant':
                                                color = '#FF9900';
                                                break;
                                            case 'School':
                                                color = '#109618';
                                                break;
                                            default:
                                                break;
                                        }

                                        //Create an HtmlMarker with a random color.
                                        const marker = new HtmlMarker({
                                            position: position,
                                            color: color
                                        });

                                        if (mapRef) {
                                            mapRef.events.add('mouseover', marker, markerHovered);
                                        }

                                        return marker;
                                    },
                                    clusterRenderCallback: function (id: any, position: any, properties: any) {
                                        var cluster = new HtmlMarker({
                                            position: position,
                                            color: 'DarkViolet',
                                            text: properties.point_count_abbreviated
                                        });
                                        if (mapRef) {
                                            mapRef.events.add('mouseover', cluster, markerHovered);
                                        }
                                        return cluster;
                                    }
                                });
                            return markerLayer
                        }}
                    />
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
)

export default HTMLCustomMarkerLayer

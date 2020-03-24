import React from 'react'
import {
    AzureMap,
    AzureMapDataSourceProvider,
    AzureMapLayerProvider,
    AzureMapsProvider,
    IAzureMapOptions
} from 'react-azure-maps'
import { key } from '../../key'
import { HtmlMarkerLayerHelper } from "./HtmlMarkerLayerHelper";
import atlas, { HtmlMarker, AuthenticationType, data, layer } from "azure-maps-control";

// function markerHovered(e) {
//     var content;
//     var marker = e.target;
//     if (marker.properties.cluster) {
//         content = 'Cluster of ' + marker.properties.point_count_abbreviated + ' markers';
//     } else {
//         content = marker.properties.Name;
//     }
//
//     //Update the content and position of the popup.
//     popup.setOptions({
//         content: '<div style="padding:10px;">' + content + '</div>',
//         position: marker.getOptions().position
//     });
//
//     //Open the popup.
//     popup.open(map);
// }
//
// function hidePopup() {
//     popup.close();
// }

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


const HtmlMarkerLayer: React.FC = () => (
    <div style={{ height: '300px' }}>
        <AzureMapsProvider>
            <AzureMap options={option}>
                <AzureMapDataSourceProvider
                    id={'HTMLMarkers DataSrouceProvider'}
                    dataFromUrl="https://raw.githubusercontent.com/Azure-Samples/AzureMapsCodeSamples/master/AzureMapsCodeSamples/Common/data/geojson/SamplePoiDataSet.json"
                    options={{ cluster: true }}
                >
                    <AzureMapLayerProvider
                        type="custom"
                        onCreateCustomLayer={() => {
                            const markerLayer = new HtmlMarkerLayerHelper('HTMLMarkers DataSrouceProvider', 'BubbleLayer3 LayerProvider',
                                // @ts-ignore
                                {
                                    markerRenderCallback: (id: string, position: data.Position, properties: any) => {
                                        //Business logic to define color of marker.
                                        console.log('asd')
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
                                        return marker;
                                    },
                                    clusterRenderCallback: function (id: any, position: any, properties: any) {
                                        var cluster = new HtmlMarker({
                                            position: position,
                                            color: 'DarkViolet',
                                            text: properties.point_count_abbreviated
                                        });
                                        return cluster;
                                    }
                                });
                            return markerLayer
                        }}
                    ></AzureMapLayerProvider>
                </AzureMapDataSourceProvider>
            </AzureMap>
        </AzureMapsProvider>
    </div>
)

export default HtmlMarkerLayer

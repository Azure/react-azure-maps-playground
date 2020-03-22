import React from 'react'
import {
    AzureMap,
    AzureMapDataSourceProvider,
    AzureMapLayerProvider,
    AzureMapsProvider,
    IAzureMapOptions
} from 'react-azure-maps'
import {AuthenticationType} from 'azure-maps-control'
import {key} from '../../key'
import {samplePoiDatSet} from "../../Assets/geoJsons/dataSet";
import {HtmlMarkerLayerHelper} from "./HtmlMarkerLayerHelper";
import {HtmlMarkerLayerJS} from "./HTMLMarkerCustomLayer";
import atlas from "azure-maps-control";

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
    <div style={{height: '300px'}}>
        <AzureMapsProvider>
            <AzureMap options={option}>
                <AzureMapDataSourceProvider
                id={'HTMLMarkers DataSrouceProvider'}
                collection={samplePoiDatSet}
                options={{cluster: true}}
                >
                    <AzureMapLayerProvider
                        id={'BubbleLayer3 LayerProvider'}
                        options={{
                            // markerRenderCallback: (id: any, position: any, properties: any) => {
                            //     debugger
                            //     //Business logic to define color of marker.
                            //     var color = 'blue';
                            //
                            //     switch (properties.EntityType) {
                            //         case 'Gas Station':
                            //             color = '#3366CC';
                            //             break;
                            //         case 'Grocery Store':
                            //             color = '#DC3912';
                            //             break;
                            //         case 'Restaurant':
                            //             color = '#FF9900';
                            //             break;
                            //         case 'School':
                            //             color = '#109618';
                            //             break;
                            //         default:
                            //             break;
                            //     }
                            //
                            //     //Create an HtmlMarker with a random color.
                            //     var marker = new atlas.HtmlMarker({
                            //         position: position,
                            //         color: color
                            //     });
                            //
                            //     return marker;
                            // },
                        }}
                        type="custom"
                        CustomkLayer={HtmlMarkerLayerHelper}
                    ></AzureMapLayerProvider>
                </AzureMapDataSourceProvider>
            </AzureMap>
        </AzureMapsProvider>
    </div>
)

export default HtmlMarkerLayer

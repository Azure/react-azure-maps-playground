import React from 'react'
import {
    AzureMap,
    AzureMapDataSourceProvider, AzureMapFeature,
    AzureMapLayerProvider,
    AzureMapsProvider,
    IAzureMapOptions
} from 'react-azure-maps'
import {AuthenticationType} from 'azure-maps-control'
import {key} from '../key'

const option: IAzureMapOptions = {
    authOptions: {
        authType: AuthenticationType.subscriptionKey,
        subscriptionKey: key
    },
}

const PolygonExample: React.FC = () => (
    <div style={{height: '300px'}}>
        <AzureMapsProvider>
            <AzureMap options={option}>
                <AzureMapDataSourceProvider
                    id={"polygonExample AzureMapDataSourceProvider"}
                    options={{}}
                >
                    <AzureMapLayerProvider
                        id={"polygonExample LayerProvider"}
                        options={{
                            fillOpacity: 0.5,
                            fillColor: '#ff0000'
                        }}
                        type={"PolygonLayer"}
                    />
                    <AzureMapFeature
                        id={"polygonExample MapFeature"}
                        type="Polygon"
                        coordinates={[[-50, -20], [0, 40], [50, -20], [-50, -20]]}
                    ></AzureMapFeature>
                    <AzureMapFeature
                        id={"polygonExample MapFeature2"}
                        type="Polygon"
                        coordinates={[[25, 30], [45, 30], [45, 20], [30, 20]]}
                    ></AzureMapFeature>
                </AzureMapDataSourceProvider>
                <AzureMapDataSourceProvider
                    id={"polygonExample2 AzureMapDataSourceProvider"}
                    options={{}}
                >
                    <AzureMapLayerProvider
                        id={"polygonExample2 LayerProvider"}
                        options={{
                            fillOpacity: 0.7,
                            fillColor: '#3399FF'
                        }}
                        type={"PolygonLayer"}
                    />
                    <AzureMapFeature
                        id={"polygonExample2 MapFeature"}
                        type="Polygon"
                        coordinates={[[65, 65], [135, 15], [180, 15], [125, 65]]}
                    ></AzureMapFeature>
                </AzureMapDataSourceProvider>
            </AzureMap>
        </AzureMapsProvider>
    </div>
)

export default PolygonExample

import React from 'react'
import {
    AzureMap,
    AzureMapDataSourceProvider, AzureMapLayerProvider,
    AzureMapsProvider,
    IAzureMapControls,
    IAzureMapOptions
} from 'react-azure-maps'
import {AuthenticationType, ControlOptions, MapMouseEvent} from 'azure-maps-control'
import {BringDataIntoViewControl} from "./BringDataControlHelper";
import {key} from "../../key";

const option: IAzureMapOptions = {
    authOptions: {
        authType: AuthenticationType.subscriptionKey,
        subscriptionKey: key
    },
}

const controls: any = [{
    control: new BringDataIntoViewControl({
        units: 'imperial',
    }),
    controlOptions: {
        position: 'top-left'
    }
}]



const BringDataControl: React.FC = () => (
    <div style={{height: '300px'}}>
        <AzureMapsProvider>
            <AzureMap options={option} customControls={controls}>
                <AzureMapDataSourceProvider
                    id={'chronoplethMap DataSourceProvider'}
                    dataFromUrl="https://raw.githubusercontent.com/Azure-Samples/AzureMapsCodeSamples/master/AzureMapsCodeSamples/Common/data/geojson/SamplePoiDataSet.json"
                >
                    <AzureMapLayerProvider
                        id={'chronoplethMap LayerProvider'}
                        options={{}}
                        type="SymbolLayer"
                    ></AzureMapLayerProvider>
                </AzureMapDataSourceProvider>
            </AzureMap>
        </AzureMapsProvider>
    </div>
)

export default BringDataControl

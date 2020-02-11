import React from 'react'
import {Paper} from '@material-ui/core'
import {
    AzureMap,
    AzureMapDataSourceProvider,
    AzureMapLayerProvider,
    AzureMapsProvider,
    IAzureMapControls,
    IAzureMapOptions,
} from 'react-azure-maps'
import {AuthenticationType, ControlOptions} from 'azure-maps-control'
import {key} from '../key'
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import {wrapperStyles} from "./RouteExample";
import {calculateLineEndPoints, lineData} from "./mapHelper";


const option: IAzureMapOptions = {
    authOptions: {
        authType: AuthenticationType.subscriptionKey,
        subscriptionKey: key
    },
    center: [-100.12, 44.63],
    zoom: 3,
    view: 'Auto'
}

const controls: [IAzureMapControls] = [{
    controlName: 'StyleControl',
    controlOptions: {mapStyles: 'all'},
    options: {position: "top-right"} as ControlOptions
}]

const ControlExample: React.FC = () => {
    return (
        <div style={wrapperStyles.map}>
            <Paper elevation={3} style={wrapperStyles.wrapper}>
                <Typography gutterBottom variant="h4">
                    Map Control Style
                </Typography>
                <div style={wrapperStyles.map}>
                    <AzureMapsProvider>
                        <AzureMap options={option} controls={controls}>
                            <AzureMapDataSourceProvider
                                events={{
                                    dataadded: (e: any) => {
                                        console.log('Data on source added', e)
                                    }
                                }}
                                id={'controlExample AzureMapDataSourceProvider'}
                                options={{}}
                            >
                                <AzureMapLayerProvider
                                    id={'controlExample AzureMapLayerProvider'}
                                    options={{}}
                                    type={"SymbolLayer"}
                                ></AzureMapLayerProvider>
                                {calculateLineEndPoints(lineData)}
                            </AzureMapDataSourceProvider>
                        </AzureMap>
                    </AzureMapsProvider>
                </div>
                <Card style={{padding: 5}}>
                    <Typography gutterBottom variant="body1">
                        This sample shows how to add the map style picker control to the map.
                    </Typography>
                </Card>
            </Paper>
        </div>
    )
}

export default ControlExample

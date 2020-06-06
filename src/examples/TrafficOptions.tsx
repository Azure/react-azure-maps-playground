import React, {useState} from 'react'
import {AzureMap, AzureMapsProvider, IAzureMapOptions} from 'react-azure-maps'
import {AuthenticationType, TrafficOptions} from 'azure-maps-control'
import {key} from '../key'
import {wrapperStyles} from "./RouteExample";
import Description from "../Layout/Description";
import {Button} from "@material-ui/core";

const option: IAzureMapOptions = {
    authOptions: {
        authType: AuthenticationType.subscriptionKey,
        subscriptionKey: key
    },
    center: [-122.33, 47.6],
    zoom: 10,
}

const TrafficOptionsExample: React.FC = () => {
    const [trafficOptions, setTrafficOptions] = useState<TrafficOptions>({
        incidents: true,
        flow: 'absolute'
    })
    return (
        <div style={wrapperStyles.map}>
            <Description>
                This sample shows how the different Traffic Options change how the traffic overlay is rendered on the map. <br/>
                As initial traffic options are: <br/>
                incidents: true,
                flow: 'absolute'
            </Description>
            <div style={wrapperStyles.buttonContainer}>
                <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        setTrafficOptions(value => ({...value, flow: 'relative'}))
                    }}
                >
                    Flow: Relative Traffic
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        setTrafficOptions(value => ({...value, flow: 'relative-delay'}))
                    }}
                >
                    Flow: Relative-delay
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        setTrafficOptions(value => ({...value, flow: 'absolute'}))
                    }}
                >
                    Flow: Absolute
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        setTrafficOptions(value => ({...value, flow: 'none'}))
                    }}
                >
                    Flow: None
                </Button>
            </div>
            <div style={wrapperStyles.buttonContainer}>
                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        setTrafficOptions(value => ({...value, incidents: true}))
                    }}
                >
                    Incidents: TRUE
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    color="inherit"
                    onClick={() => {
                        setTrafficOptions(value => ({...value, incidents: false}))
                    }}
                >
                    Incidents: FALSE
                </Button>
            </div>
            <div style={{height: '600px'}}>
                <AzureMapsProvider>
                    <AzureMap options={option} trafficOptions={trafficOptions}>
                    </AzureMap>
                </AzureMapsProvider>
            </div>
        </div>
    )
}

export default TrafficOptionsExample

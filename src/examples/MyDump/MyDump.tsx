import React, { memo, useMemo, useState } from "react";
import {
    AzureMap,
    AzureMapDataSourceProvider,
    AzureMapFeature,
    AzureMapHtmlMarker,
    AzureMapLayerProvider,
    AzureMapsProvider, IAzureDataSourceChildren, IAzureMapHtmlMarker,
    IAzureMapHtmlMarkerEvent, IAzureMapLayerType,
    IAzureMapOptions
} from "react-azure-maps";
import { AuthenticationType, data, HtmlMarkerOptions } from "azure-maps-control";
import { Button, Chip } from '@material-ui/core';
import {key} from "../../key";

const point1 = new data.Position(-100.01, 45.01);
const point2 = new data.Position(-120.2, 45.1);
const point3 = new data.Position(-120.2, 50.1);
const point4 = new data.Position(-126.2, 55.1);

function clusterClicked(e: any) {
    console.log('clusterClicked', e)
}

const onClick = () => {
    console.log("ASD");
};

function azureHtmlMapMarkerOptions(coordinates: data.Position): HtmlMarkerOptions {
    return ({
        htmlContent: '<div class="pulseIcon"></div>',
        position: coordinates,
        text: 'Jebac',
        title: 'evvv'

    })
};

const eventToMarker: Array<IAzureMapHtmlMarkerEvent> = [
    { eventName: "click", callback: onClick }
];

const renderPoint = (coordinates: data.Position) => {
    const rendId = Math.random()

    return <AzureMapFeature
        key={rendId}
        id={rendId.toString()}
        type="Point"
        coordinate={coordinates}
        properties={{
            title: "Microsoft",
            icon: "pin-round-blue",
            text: 'Jebac',
        }}
    />
}

function renderHTMLPoint(coordinates: data.Position): any {
    const rendId = Math.random()
    return <AzureMapHtmlMarker
        key={rendId}
        id={rendId.toString()}
        options={azureHtmlMapMarkerOptions(coordinates)}
        events={eventToMarker}
    />
}


const MyDump: React.FC = () => {
    const [dump, setDump] = useState('START');
    const [markers, setMarkers] = useState([point1, point2, point3]);
    const [htmlMarkers, setHtmlMarkers] = useState([point4]);
    const [markersLayer, setMarkersLayer] = useState<IAzureMapLayerType>('SymbolLayer');

    const option: IAzureMapOptions = useMemo(() => {
        return {
            authOptions: {
                authType: AuthenticationType.subscriptionKey,
                subscriptionKey: key
            },
            center: [-100.01, 45.01],
            zoom: 2,
            view: "Auto"
        };
    }, []);


    const addRandomMarker = () => {
        const randomLongitude = Math.floor(Math.random() * (-80 - (-120)) + -120);
        const randomLatitude = Math.floor(Math.random() * (30 - 65) + 65);
        const newPoint = new data.Position(randomLongitude, randomLatitude)
        setMarkers([...markers, newPoint])
    }

    const addRandomHTMLMarker = () => {
        const randomLongitude = Math.floor(Math.random() * (-80 - (-120)) + -120);
        const randomLatitude = Math.floor(Math.random() * (30 - 65) + 65);
        const newPoint = new data.Position(randomLongitude, randomLatitude)
        setHtmlMarkers([...htmlMarkers, newPoint])
    }

    const removeAllMarkers = () => {
        setMarkers([])
        setHtmlMarkers([])
    }

    const memoizedMarkerRender: IAzureDataSourceChildren = useMemo((): any => (
        markers.map(marker =>
            renderPoint(marker)
        )
    ), [markers])

    const memoizedHtmlMarkerRender: IAzureDataSourceChildren = useMemo((): any => (
        htmlMarkers.map(marker =>
            renderHTMLPoint(marker)
        )
    ), [htmlMarkers]
    )


    console.log("MAP")
    return (
        <>
            MAP {dump}
            <div style={styles.buttonContainer}>

                <Button size="small" variant="contained" color="primary" onClick={addRandomMarker}> MARKER POINT</Button>
                <Button size="small" variant="contained" color="primary" onClick={addRandomHTMLMarker}> HTML MARKER</Button>
                <Button size="small" variant="contained" color="primary" onClick={() => setMarkersLayer('SymbolLayer')}> SET POINT</Button>
                <Button size="small" variant="contained" color="primary" onClick={() => setMarkersLayer('HeatLayer')}> SET HEAT</Button>
                <Button size="small" variant="contained" color="primary" onClick={removeAllMarkers}> REMOVE ALL</Button>


                <Chip label={`Markers Point on map: ${markers.length}`} />
                <Chip label={`Markers HTML on map: ${htmlMarkers.length}`} />
            </div>
            <div>
                <AzureMapsProvider>
                    <AzureMap options={option}>
                        <AzureMapDataSourceProvider events={{
                            'dataadded': (e: any) => {
                                console.log('Data on source added', e)
                            }
                        }} id={'myDump AzureMapDataSourceProvider'} options={
                            {cluster: true}
                        }>
                            <AzureMapLayerProvider
                                id={'myDump AzureMapLayerProvider'}
                                options={
                                    {textOptions: {
                                        textField: ['get', 'title'],    //Specify the property name that contains the text you want to appear with the symbol.
                                        offset: [0, 1.2]}
                                    }}
                                events={{
                                    'click': clusterClicked,
                                    'dbclick': clusterClicked
                                }}
                                lifecycleEvents={{
                                    'layeradded': () => {
                                        console.log("LAYER ADDED TO MAP")
                                    },
                                }}
                                type={markersLayer}
                            ></AzureMapLayerProvider>
                            {memoizedMarkerRender}
                            {memoizedHtmlMarkerRender}
                        </AzureMapDataSourceProvider>
                    </AzureMap>
                </AzureMapsProvider>
            </div>
        </>
    );
};

const styles = {
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
        "text-align": "center",
    }
}

export default memo(MyDump);

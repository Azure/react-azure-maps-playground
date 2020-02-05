import React, {memo, useMemo, useState} from "react";
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
import {AuthenticationType, data, HtmlMarkerOptions} from "azure-maps-control";

const point1 = new data.Position(-100.01, 45.01);
const point2 = new data.Position(-120.2, 45.1);
const point3 = new data.Position(-120.2, 50.1);

function clusterClicked(e: any) {
    console.log('clusterClicked', e)
}

const onClick = () => {
    console.log("ASD");
};

function azureHtmlMapMarkerOptions(coordinates: data.Position): HtmlMarkerOptions {
    return ({
        htmlContent: '<div class="pulseIcon"></div>',
        position: coordinates
    })
};

const eventToMarker: Array<IAzureMapHtmlMarkerEvent> = [
    {eventName: "click", callback: onClick}
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
            icon: "pin-round-blue"
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
    const [htmlMarkers, setHtmlMarkers] = useState([point1]);
    const [markersLayer, setMarkersLayer] = useState<IAzureMapLayerType>('SymbolLayer');

    const option: IAzureMapOptions = useMemo(() => {
        return {
            authOptions: {
                authType: AuthenticationType.subscriptionKey,
                subscriptionKey: ""
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
                <div>
                    <div>
                        Markers Point on map: {markers.length}
                    </div>
                    <div>
                        Markers HTML on map: {htmlMarkers.length}
                    </div>
                </div>
                <div style={styles.button} onClick={addRandomMarker}> MARKER POINT</div>
                <div style={styles.button} onClick={addRandomHTMLMarker}> HTML MARKER</div>
                <div style={styles.button} onClick={removeAllMarkers}> REMOVE ALL</div>
                <div style={styles.button} onClick={() => setMarkersLayer('SymbolLayer')}> SET POINT </div>
                <div style={styles.button} onClick={() => setMarkersLayer('HeatLayer')}> SET HEAT </div>
            </div>
            <div>
                <AzureMapsProvider>
                    <AzureMap options={option}>
                        <AzureMapDataSourceProvider id={'myDump AzureMapDataSourceProvider'}>
                            <AzureMapLayerProvider
                                id={'myDump AzureMapLayerProvider'}
                                options={{}}
                                events={{
                                    'click': clusterClicked,
                                    'dbclick': clusterClicked
                                }}
                                lifecycleEvents={{
                                    'layeradded': () => {console.log("LAYER ADDED TO MAP")},
                                }}
                                type={markersLayer}
                            ></AzureMapLayerProvider>
                            {memoizedMarkerRender}
                            {memoizedHtmlMarkerRender}
                        </AzureMapDataSourceProvider>
                        <AzureMapHtmlMarker
                            id={'myDump HtmlMarker'}
                            options={azureHtmlMapMarkerOptions([100.3, 30])}
                            events={eventToMarker}
                        />
                    </AzureMap>
                </AzureMapsProvider>
            </div>
        </>
    );
};

const styles = {
    buttonContainer: {
        height: 40,
        display: 'flex',
        justifyContent: 'space-around',
        padding: 10
    },
    button: {
        height: 35,
        width: 80,
        backgroundColor: '#68aba3',
        "text-align": "center",
    }
}

export default memo(MyDump);

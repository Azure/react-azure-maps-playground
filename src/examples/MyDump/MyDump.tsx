import React, {memo, useMemo, useState} from "react";
import {
    AzureMap,
    AzureMapDataSourceProvider,
    AzureMapFeature,
    AzureMapHtmlMarker,
    AzureMapLayerProvider,
    AzureMapsProvider,
    IAzureMapHtmlMarkerEvent,
    IAzureMapOptions
} from "react-azure-maps";
import {AuthenticationType, data} from "azure-maps-control";

const point1 = new data.Position(-100.01, 45.01);
const point2 = new data.Position(-120.2, 45.1);
const point3 = new data.Position(-120.2, 50.1);



const MyDump: React.FC = () => {
    const [dump, setDump] = useState('START');
    const [markers, setMarkers] = useState([point1, point2, point3]);

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

    const onClick = () => {
        console.log("ASD");
    };

    const azureHtmlMapMarkerOptions = {
        htmlContent: '<div class="pulseIcon"></div>',
        position: [-110, 45]
    };

    const eventToMarker: Array<IAzureMapHtmlMarkerEvent> = [
        {eventName: "click", callback: onClick}
    ];

    const addMarker = () => {
        const randomLongitude = Math.floor(Math.random() * (-80 - (-120)) + -120);
        const randomLatitude = Math.floor(Math.random() * (30 - 65) + 65);
        const newPoint = new data.Position(randomLongitude, randomLatitude)
        setMarkers([newPoint])
    }

    const renderPoint = (marker: data.Position) => {


        const rendId = Math.floor(Math.random() * (80 - (120)) + 120);

        return <AzureMapFeature
            key={rendId}
            id={rendId.toString()}
            type="Point"
            coordinate={marker}
            properties={{
                title: "Microsoft",
                icon: "pin-round-blue"
            }}
        />
    }


    console.log("MAP")
    return (
        <>
            MAP {dump}
            <div style={styles.buttonContainer}>
                <div style={styles.button} onClick={addMarker}> ADD</div>
                <div style={styles.button} onClick={() => setMarkers([[-22, 55]])}> REMOVE LAST</div>
                <div style={styles.button}> TRHRS</div>
            </div>
            <div>
                <AzureMapsProvider>
                    <AzureMap options={option}>
                        <AzureMapDataSourceProvider>
                            <AzureMapLayerProvider options={{}} type={'SymbolLayer'}></AzureMapLayerProvider>
                            {markers.map(marker =>
                                renderPoint(marker)
                            )}
                            {/*{renderPoint([12, 23])}*/}
                        </AzureMapDataSourceProvider>
                        <AzureMapHtmlMarker
                            options={azureHtmlMapMarkerOptions}
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

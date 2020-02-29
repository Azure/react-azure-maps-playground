import React, {RefObject, useContext, useRef, useState} from "react";
import {
    AzureDataPosition,
    AzureMap,
    AzureMapDataSourceProvider, AzureMapFeature,
    AzureMapLayerProvider, AzureMapsContext, AzureMapShapeContext, AzureMapShapeProvider,
    AzureMapsProvider, IAzureMapDataSourceProps,
    IAzureMapOptions, IAzureMapsContextProps, IAzureMapShapeProps
} from "react-azure-maps";
import atlas, {AuthenticationType} from "azure-maps-control";
import Typography from "@material-ui/core/Typography";
import {wrapperStyles} from "../PopupExample";
import Description from "../../Layout/Description";
import {key} from "../../key";
import {Button, Chip} from "@material-ui/core";

// TODO wait until update to 0.23
const imageSprites = {
    id: "arrow-icon",
    templateName: "triangle-arrow-up",
    color: "DarkOrchid",
    secondaryColor: "DarkOrchid"
};

const path = [
    [-122.34758, 47.62155],
    [-122.34764, 47.61859],
    [-122.33787, 47.61295],
    [-122.34217, 47.60964]
];


const option: IAzureMapOptions = {
    authOptions: {
        authType: AuthenticationType.subscriptionKey,
        subscriptionKey: key
    },
    center: [-122.345, 47.615],
    zoom: 14,
    view: "Auto"
};

const SymbolAlongPath: React.FC = () => {
    const mapContext = useContext<IAzureMapsContextProps>(AzureMapsContext)
    const context = useContext<IAzureMapShapeProps>(AzureMapShapeContext)
    const [play, setPlay] = useState(false)
    const [position, setPosition] = useState([-122.34758, 47.62155])
    return (
        <>
            <div style={styles.buttonContainer}>
                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => setPosition([-122.36758, 47.61155])}
                >
                    {' '}
                    Set position
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => setPlay(prevState => !prevState)}

                >
                    {' '}
                    Start
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        console.log("WOOOW", context, mapContext)
                    }}

                >
                    {' '}
                    Start
                </Button>
            </div>
            <div style={wrapperStyles.map}>
                <Typography gutterBottom variant="h5">
                    Symbol along path
                </Typography>
                <Description>
                    TODO
                </Description>
                <div style={wrapperStyles.map}>
                    <AzureMapsProvider>
                        <AzureMap options={option} imageSprites={[imageSprites]}>
                            <AzureMapDataSourceProvider
                                id={"symbol AzureMapDataSourceProvider"}
                                options={{}}
                            >
                                {/* Route*/}
                                <AzureMapLayerProvider
                                    id={"symbolAlong linelayer AzureMapLayerProvider"}
                                    options={{
                                        strokeColor: 'DodgerBlue',
                                        strokeWidth: 3
                                    }}
                                    type={"LineLayer"}
                                ></AzureMapLayerProvider>
                                <AzureMapFeature
                                    key={"Line String Feature"}
                                    id={"Line Strign ID"}
                                    type={"LineString"}
                                    coordinates={path}
                                />
                                {/* AnimatePoint*/}
                                <AzureMapLayerProvider
                                    id={"routeExample AzureMapLayerProvider"}
                                    options={
                                        {
                                            iconOptions: {
                                                //For smoother animation, ignore the placement of the icon. This skips the label collision calculations and allows the icon to overlap map labels.
                                                ignorePlacement: true,

                                                //For smoother animation, allow symbol to overlap all other symbols on the map.
                                                allowOverlap: true,
                                                rotation: ['get', '_heading']
                                            },
                                            //Only render Point or MultiPoints in this layer.
                                            filter: ['any', ['==', ['geometry-type'], 'Point'], ['==', ['geometry-type'], 'MultiPoint']]
                                        }
                                    }
                                    lifecycleEvents={{
                                        layeradded: (e: any) => {
                                            console.log("LAYER ADDED TO MAP 222", e);
                                        }
                                    }}
                                    type={"SymbolLayer"}
                                ></AzureMapLayerProvider>
                                <AzureMapShapeProvider id={'myshape'} properties={{}}>
                                <AzureMapFeature
                                    key={"RotationPoint String Feature"}
                                    id={"Point ID"}
                                    type={"Point"}
                                    coordinate={position}
                                    properties={
                                        {
                                            rotation: 180
                                        }
                                    }
                                />
                                </AzureMapShapeProvider>

                            </AzureMapDataSourceProvider>
                        </AzureMap>
                    </AzureMapsProvider>
                </div>
            </div>
        </>
    );
};

const styles = {
    map: {
        height: 300
    },
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
        'text-align': 'center'
    }
}

export default SymbolAlongPath;

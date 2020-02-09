import atlas, {data} from 'azure-maps-control'
import {AzureMapFeature, generateLinesFromArrayOfPosition, generatePixelHeading} from "react-azure-maps";
import React from "react";
import {IAzureMapFeatureType} from "react-azure-maps/src/types";

export const lineData = [
    generateLinesFromArrayOfPosition( [[-70.13671, 37.23032], [-74.09179, 40.71395]]),
    generateLinesFromArrayOfPosition([[-73.91601, 28.99853], [-80.59570, 24.36711], [-88.33007, 24.44714], [-95.00976, 29.30556]]),
    generateLinesFromArrayOfPosition([[-156.00585, 20.79720], [-142.38281, 20.46818], [-127.00195, 31.65338], [-118.82812, 33.65120]]),
    generateLinesFromArrayOfPosition([[-136.49414, 57.23150], [-143.17382, 53.80065], [-130.78125, 46.31658], [-124.27734, 46.07323]])
];

export const renderMultiLine = (type: IAzureMapFeatureType, coordinates: data.Position[], properties: Object) => {
    const rendId = Math.random()

    return (
        <AzureMapFeature
            key={rendId}
            id={rendId.toString()}
            type={type}
            coordinates={coordinates}
            properties={properties}
        />
    )
}

const renderFeature = (type: IAzureMapFeatureType, coordinates: atlas.data.Position, properties: Object) => {
    const rendId = Math.random()

    return (
        <AzureMapFeature
            key={rendId}
            id={rendId.toString()}
            type={type}
            coordinate={coordinates}
            properties={properties}
        />
    )
}

export function calculateLineEndPoints(lines: any): any {
    const points = [];
    for (let i = 0; i < lines.length; i++) {
        const p = calculateLineEndPoint(lines[i]);
        if (p) {
            points.push(p);
        }
    }

    return points;
}


export function calculateLineEndPoint(line: any): any {
    let l = null;

    if (line && line.getCoordinates) {
        l = line.getCoordinates();
    } else if (line.type === 'Feature') {
        l = line.geometry.coordinates;
    } else if (line.type === 'LineString') {
        l = line.coordinates;
    }

    if (l && l.length >= 2) {
        //Use the last coordinate of the line for the point of the end. Calculate the heading from the second last coordinate to the last coordinate.
        return renderFeature("Point", l[l.length - 1], {
            heading: generatePixelHeading(l[l.length - 2], l[l.length - 1])
        })
    }

    return null;
}

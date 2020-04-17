import React, { useEffect, useMemo, useState } from 'react'
import {
    AzureMap,
    AzureMapsProvider,
    IAzureMapOptions,
    AzureMapPopup,
    AzureMapHtmlMarker,
    useCreatePopup
} from 'react-azure-maps'
import { AuthenticationType, data } from 'azure-maps-control'
import { key } from '../key'

const AsyncPopupContent = ({ lazyData }: { lazyData: Object }) => {
    return (
        <div style={wrapperStyles.popupStyles}> {lazyData ? JSON.stringify(lazyData) : 'Loading'} </div>
    )
}

const PopupExample: React.FC = () => {
    const [lazyData, setLazyData] = useState<any>(null)
    const [isHtmlMarkerPopupVisible] = useState(
        true
    )
    const htmlMarkerOptions = {
        popup: useCreatePopup({
            options: {},
            popupContent: <AsyncPopupContent lazyData={lazyData} />
        })
    }
    useEffect(() => {
        setTimeout(() => {
            setLazyData({ 'text': 'Some Data arrives after 10 seconds' })
        }, 10000)
    }, [])

    const option: IAzureMapOptions = useMemo(() => {
        return {
            authOptions: {
                authType: AuthenticationType.subscriptionKey,
                subscriptionKey: key
            },
            center: [-100.01, 45.01],
            zoom: 1,
            view: 'Auto'
        }
    }, [])

    const memoizedHtmlMarker = useMemo(() => (
        <AzureMapHtmlMarker
            isPopupVisible={isHtmlMarkerPopupVisible}
            markerContent={<div className="pulseIcon"></div>}
            options={htmlMarkerOptions}
        />
    ), [isHtmlMarkerPopupVisible])

    return (
        <div style={wrapperStyles.map}>
            <div style={wrapperStyles.map}>
                <AzureMapsProvider>
                    <AzureMap options={option}>
                        {memoizedHtmlMarker}
                    </AzureMap>
                </AzureMapsProvider>
            </div>
        </div>
    )
}

export const wrapperStyles = {
    map: {
        height: '500px'
    },
    wrapper: {
        padding: '15px',
        marginTop: '15px'
    },
    popupStyles: {
        padding: '20px',
        color: 'black'
    }
}

export default PopupExample

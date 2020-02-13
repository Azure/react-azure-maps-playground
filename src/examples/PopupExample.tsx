import React, {useCallback, useMemo, useState} from 'react'
import { Paper, Button } from '@material-ui/core'
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

const popupOptions = {
  position: new data.Position(-100.01, 45.01)
}

const PopupExample: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isHtmlMarkerPopupVisible, setIsHtmlMarkerPopupVisible] = useState(
    true
  )
  const htmlMarkerOptions = {
    popup: useCreatePopup({
      options: {},
      popupContent: <div style={wrapperStyles.popupStyles}>Hello World Html marker popup</div>
    })
  }
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

  const memoizedMapPopup = useMemo(() => (<AzureMapPopup
      isVisible={isVisible}
      options={popupOptions}
      popupContent={
        <div style={wrapperStyles.popupStyles}>Hello World</div>
      }
  />), [isVisible])

  const memoizedHtmlMarker = useMemo(() => (
      <AzureMapHtmlMarker
          isPopupVisible={isHtmlMarkerPopupVisible}
          markerContent={<div className="pulseIcon"></div>}
          options={htmlMarkerOptions}
      />
  ), [isHtmlMarkerPopupVisible])

  const toggleHtmlMarkerPopup = useCallback(() => {
    setIsHtmlMarkerPopupVisible(prevState => !prevState)
  }, [isHtmlMarkerPopupVisible])



  return (
    <div style={wrapperStyles.map}>
      <Paper elevation={3} style={wrapperStyles.wrapper}>
        <div style={wrapperStyles.buttonContainer}>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={() => {
              toggleHtmlMarkerPopup()
            }}
          >
            Toggle Popup HtmlMarker
          </Button>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={() => {
              setIsVisible(true)
            }}
          >
            Open Popup
          </Button>
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={() => setIsVisible(false)}
          >
            Close Popup
          </Button>
        </div>
        <div style={wrapperStyles.map}>
          <AzureMapsProvider>
            <AzureMap options={option}>
              {memoizedMapPopup}
              {memoizedHtmlMarker}
            </AzureMap>
          </AzureMapsProvider>
        </div>
      </Paper>
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
  buttonContainer: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridGap: '10px',
    gridAutoColumns: 'max-content',
    padding: '10px 0'
  },
  buttons: {
    padding: '15px',
    flex: 1
  },
  popupStyles: {
    padding: '20px',
    color: 'black'
  }
}

export default PopupExample

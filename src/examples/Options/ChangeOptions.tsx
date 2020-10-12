import React, {memo, useMemo} from 'react'
import {AzureMap, AzureMapsProvider, IAzureMapOptions} from 'react-azure-maps'
import {AuthenticationType} from 'azure-maps-control'
import {key} from '../../key'

const ChangeOptionsExample: React.FC<any> = ({bounds}) => {

  const option: IAzureMapOptions = useMemo(() => {
    return {
      authOptions: {
        authType: AuthenticationType.subscriptionKey,
        subscriptionKey: key
      },
      center: [-100.01, 45.01],
      zoom: 2,
      view: 'Auto'
    }
  }, [])

  const cameraOptions = {
    bounds: bounds
  }

  console.log('Change Options RERENDER', bounds)
  return (
    <>
      <div style={styles.map}>
        <AzureMapsProvider>
          <AzureMap options={option} cameraOptions={cameraOptions} />
        </AzureMapsProvider>
      </div>
    </>
  )
}

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

export default memo(ChangeOptionsExample)

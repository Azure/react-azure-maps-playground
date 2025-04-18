import {
  AzureMap,
  AzureMapDataSourceProvider,
  AzureMapFeature,
  AzureMapLayerProvider,
  AzureMapsProvider,
  AzureMapPopup,
} from 'react-azure-maps';
import { data } from 'azure-maps-control';
import { mapOptions } from '../../../../key';

const points = Array.from({ length: 10 }).map(() => {
  const randomLongitude = Math.floor(Math.random() * 60 - 30);
  const randomLatitude = Math.floor(Math.random() * 40 - 20);
  return new data.Position(randomLongitude, randomLatitude);
});

const AccessiblePopups = () => {

  return (
    <AzureMapsProvider>
        <div className='defaultMap sb-unstyled'>
          <AzureMap options={{...mapOptions, zoom: 2}}>
            <AzureMapDataSourceProvider 
                id={'MultiplePoint AzureMapDataSourceProvider'}>
              <AzureMapLayerProvider
                id={'MultiplePoint AzureMapLayerProvider'}
                options={{
                  iconOptions: {
                    image: 'pin-red',
                  },
                }}
                type="SymbolLayer"
              />
              {
                points.map(
                  (coordinates, idx) => 
                    <AzureMapFeature key={idx} type="Point" coordinate={coordinates}/>
                )
              }
            </AzureMapDataSourceProvider>
            <>
              {points.map((point, idx) => 
                <AzureMapPopup
                  key={idx}
                  isVisible={!idx}
                  options={{
                    position: point,
                    pixelOffset: [0, -5],
                  }}
                  popupContent={
                    <div style={{ padding: '15px' }}>{ `Lng: ${point[0]}, Lat: ${point[1]}` }</div>
                  }
                />  
              )}
            </>
          </AzureMap>
      </div>
    </AzureMapsProvider>
  );
}

export default AccessiblePopups;
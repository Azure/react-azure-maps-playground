import React, { useEffect, useState } from 'react';
import {
  AzureMap,
  AzureMapDataSourceProvider,
  AzureMapFeature,
  AzureMapLayerProvider,
  AzureMapsProvider,
  IAzureMapImageSprite,
  IAzureMapOptions,
  AzureDataPosition,
} from 'react-azure-maps';
import { AuthenticationType } from 'azure-maps-control';
import { key } from '../../key';
import Description from '../../Layout/Description';

const option: IAzureMapOptions = {
  authOptions: {
    authType: AuthenticationType.subscriptionKey,
    subscriptionKey: key,
  },
};

const iconUrl = 'http://open-notify.org/Open-Notify-API/map/ISSIcon.png';

const spaceshipImageSprites: IAzureMapImageSprite = {
  id: 'spaceship',
  color: 'DarkOrchid',
  secondaryColor: 'DarkOrchid',
  icon: iconUrl,
};

const getData = (setIssPosition: Function) => {
  // create a new XMLHttpRequest
  const xhr = new XMLHttpRequest();

  // get a callback when the server responds
  xhr.addEventListener('load', () => {
    // update the state of the component with the result here
    console.log(xhr.responseText);
    const response = JSON.parse(xhr.response);
    if (response.iss_position) {
      const { latitude, longitude } = response.iss_position;
      setIssPosition([longitude, latitude]);
    }
    return xhr.responseText;
  });
  // open the request with the verb and the url
  xhr.open('GET', 'http://api.open-notify.org/iss-now.json');
  // send the request
  xhr.send();
};

const IssMapPosition: React.FC = () => {
  const [issPosition, setIssPosition] = useState<AzureDataPosition | null>(null);

  useEffect(() => {
    getData(setIssPosition);
    const foo = setInterval(() => {
      getData(setIssPosition);
    }, 1000);
    return () => {
      clearInterval(foo);
    };
  }, []);

  return (
    <>
      <Description>International Space Station Current Location</Description>
      <AzureMapsProvider>
        <div style={{ height: '300px' }}>
          <AzureMap imageSprites={[spaceshipImageSprites]} options={option}>
            <AzureMapDataSourceProvider id={'data source provider'} options={{}}>
              <AzureMapLayerProvider
                id={'LayerExample1 Layer2'}
                options={{
                  iconOptions: {
                    image: 'spaceship',
                    allowOverlap: true, //For smoother animation, allow symbol to overlap all other symbols on the map.
                    ignorePlacement: true, //For smoother animation, ignore the placement of the icon. This skips the label collision calculations and allows the icon to overlap map labels.
                  },
                }}
                type={'SymbolLayer'}
              />
              {issPosition && (
                <AzureMapFeature
                  id={'LayerExample1 MapFeature'}
                  type="Point"
                  coordinate={issPosition}
                  properties={{
                    title: 'My Title',
                  }}
                  variant={'shape'}
                  setCoords={issPosition}
                />
              )}
            </AzureMapDataSourceProvider>
          </AzureMap>
        </div>
      </AzureMapsProvider>
    </>
  );
};

export default IssMapPosition;

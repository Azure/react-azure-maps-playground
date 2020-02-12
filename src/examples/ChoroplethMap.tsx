import React, { useMemo, useState } from 'react'
import {
  AzureMap,
  AzureMapDataSourceProvider,
  AzureMapLayerProvider,
  AzureMapsProvider,
  IAzureMapOptions,
  AzureMapPopup
} from 'react-azure-maps'
import { AuthenticationType, data, MapMouseEvent } from 'azure-maps-control'
import { key } from '../key'

const defaultColor = '#FFEDA0'
const steppedExp = [
  'step',
  ['get', 'density'],
  defaultColor,
  10,
  '#FED976',
  20,
  '#FEB24C',
  50,
  '#FD8D3C',
  100,
  '#FC4E2A',
  200,
  '#E31A1C',
  500,
  '#BD0026',
  1000,
  '#800026'
] as any

const ChronoplethMap: React.FC = () => {
  const [properties, setProperties] = useState<any>({})
  const option: IAzureMapOptions = useMemo(() => {
    return {
      authOptions: {
        authType: AuthenticationType.subscriptionKey,
        subscriptionKey: key
      },
      center: [-110, 50],
      zoom: 2,
      view: 'Auto'
    }
  }, [])

  return (
    <div
      style={{
        height: '300px'
      }}
    >
      <AzureMapsProvider>
        <AzureMap options={option}>
          <AzureMapDataSourceProvider
            id={'default DataSourceProvider'}
            dataFromurl="https://raw.githubusercontent.com/Azure-Samples/AzureMapsCodeSamples/master/AzureMapsCodeSamples/Common/data/geojson/US_States_Population_Density.json"
          >
            <AzureMapLayerProvider
              options={{
                base: 100,
                fillColor: steppedExp,
                fillOpacity: 0.7,
                height: [
                  'interpolate',
                  ['linear'],
                  ['get', 'density'],
                  0,
                  100,
                  1200,
                  960000
                ]
              }}
              type="PolygonExtrusionLayer"
              events={{
                mousemove: (e: MapMouseEvent) => {
                  if (e.shapes && e.shapes.length > 0) {
                    const prop: any = e.shapes[0]
                    setProperties(prop.data.properties)
                  }
                }
              }}
            ></AzureMapLayerProvider>
          </AzureMapDataSourceProvider>
        </AzureMap>
      </AzureMapsProvider>
      <div> {JSON.stringify(properties)}</div>
    </div>
  )
}

export default ChronoplethMap

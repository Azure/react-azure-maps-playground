import DefaultMap from './DefaultMap'
import AzureLayer from './AzureLayer'
import { MarkersExampleContainer } from './MarkersExample/MarkersExampleContainer'
import PopupExample from './PopupExample';

export type MapExampleItem = {
  name: string
  component: React.FC
  path: string
  exact?: boolean
}

export const examplesList: MapExampleItem[] = [
  {
    name: 'Default map',
    component: DefaultMap,
    path: '/',
    exact: true
  },
  {
    name: 'Layers',
    component: AzureLayer,
    path: '/layers'
  },
  {
    name: 'Markers',
    component: MarkersExampleContainer,
    path: '/markers-example'
  },
  {
    name: 'Popup',
    component: PopupExample,
    path: '/popup-example'
  }
]

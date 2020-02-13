import DefaultMap from './DefaultMap'
import AzureLayer from './AzureLayer'
import PopupExample from './PopupExample'
import RouteExample from './RouteExample'
import ArrowLineExample from './ArrowLinesExample'
import ControlExample from './ControlExample'
import ChronoplethMap from './ChoroplethMap'
import MarkersExampleWrapper from "./MarkersExample/MarkersExampleWrapper";

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
    component: MarkersExampleWrapper,
    path: '/markers-example'
  },
  {
    name: 'Popup',
    component: PopupExample,
    path: '/popup-example'
  },
  {
    name: 'Route Example',
    component: RouteExample,
    path: '/route-example'
  },
  {
    name: 'Arrow Lines & Image Sprite',
    component: ArrowLineExample,
    path: '/arrowLine-example'
  },
  {
    name: 'Style Controls',
    component: ControlExample,
    path: '/controls'
  },
  {
    name: 'Chronopleth map',
    component: ChronoplethMap,
    path: '/chrono'
  }
]

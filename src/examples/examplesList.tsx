import DefaultMap from "./DefaultMap";
import AzureLayer from "./AzureLayer";

export type MapExampleItem = {
  name: string;
  component: React.FC;
  path: string;
  exact?: boolean;
};

export const examplesList: MapExampleItem[] = [
  {
    name: "Default map",
    component: DefaultMap,
    path: "/",
    exact: true
  },
  {
    name: "Layers",
    component: AzureLayer,
    path: "/layers"
  }
];

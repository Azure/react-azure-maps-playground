import DefaultMap from "./DefaultMap";

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
    name: "Default map 2",
    component: DefaultMap,
    path: "/foo"
  }
];

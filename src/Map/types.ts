type coordinate = [number, number];

export type keyedCoordinates = {
  [key: string]: coordinate,
}

export type path = [string, string, number, coordinate[]];

export type route = {
  distance?: number;
  id?: string;
  legs?: [string, string][];
  waypoints?: string[];
};

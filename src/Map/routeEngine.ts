import { path, route } from "./types";

// Data
import { paths } from './routeData';

// Types
type partialRoute = {
  legs?: path[];
  origin?: string;
  routes?: route[];
};

const calculateRoute = (prev: route, [start, end, distance, coords]: path, index: number, routes: path[]): route => {
  const {
    distance: prevDistance = 0,
    legs: prevLegs = [],
    waypoints: prevWaypoints = [],
  } = prev;
  const isLast: boolean = index === routes.length - 1;
  const nextWaypoint: [string] = [start];
  const lastWaypoint: [string, string] = [start, end];

  if (prevWaypoints.includes(start)) {
    return prev;
  }

  const waypoints: string[] = routes.length === 1
    ? [start, end]
    : [...prevWaypoints, ...(isLast ? lastWaypoint : nextWaypoint)];

  return {
    distance: prevDistance + distance,
    id: waypoints.reduce((prev: string, waypoint: string): string =>
      prev.length ? `${prev}.${waypoint}` : waypoint, ''),
    legs: [...prevLegs, [start, end]],
    waypoints
  };
};

const findLegs = (origin: string, prevOrigin?: string): path[] => paths.filter(([start, end]: path): boolean =>
      prevOrigin !== start && prevOrigin !== end && (start === origin || end === origin));

const findRoutes = (origin: string, destination: string, prev: partialRoute = {}): route[] => {
  const {
    legs: prevLegs = [],
    origin: prevOrigin,
    routes: prevRoutes = []
  } = prev;

  if (origin === destination) {
    console.warn('origin and destination cannot be the same');
    return [];
  }

  const legs: path[] = findLegs(origin, prevOrigin);

  return legs.length
    ? legs.reduce((routes: route[], leg: path): route[] => {
      const [start, end, distance, coords]: path = leg;
      const nextLeg: path = end === origin ? [end, start, distance, coords] : leg;
      const [legStart, legEnd]: path = nextLeg;

      // No more legs remaining to search
      if (!findLegs(legStart, prevOrigin).length) {
        return routes;
      }

      const nextLegs: path[] = [...prevLegs, nextLeg];
      const route: route = nextLegs.reduce(calculateRoute, {});

      // Avoid duplicate routes
      if (prevRoutes.some(({ id }): boolean => id === route.id)) {
        return routes;
      }

      return legEnd === destination
        ? [...routes, route]
        : [
          ...routes,
          ...findRoutes(legEnd, destination, {
            legs: nextLegs,
            origin,
            routes: [...prevRoutes, route]
          })
        ];
    }, [])
    : [];
};

const findShortestRoutes = (routes: route[], limit: number = 1): route[] =>
  routes.sort((a: route | any, b: route | any): number =>
    a.distance - b.distance || a.waypoints.length - b.waypoints.length
  ).slice(0, limit);

export default (origin: string, destination: string, limit: number = 3) =>
  findShortestRoutes(findRoutes(origin, destination), limit);

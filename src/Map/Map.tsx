import React, { Fragment } from 'react';

import { keyedCoordinates, path, route } from "../types";

export interface Map {
  cellSize?: number,
  locations: keyedCoordinates;
  paths: path[],
  routes: route[],
}

const Map: React.FC<Map> = ({ cellSize = 10, locations, paths, routes }) => {
  const { _size, ...restLocations } = locations;
  const [gridSizeX, gridSizeY] = _size;
  const width: number = (gridSizeX * 2) * cellSize;
  const height: number = (gridSizeY * 2) * cellSize;
  const cellCountX: number = width / cellSize;
  const cellCountY: number = height / cellSize;
  const offsetX: number = (cellCountX / 4) * cellSize;
  const offsetY: number = (cellCountY / 4) * cellSize;
  const [shortestRoute] = routes;
  const { waypoints } = shortestRoute;

  console.log('shortestRoute', shortestRoute);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="smallGrid" width={cellSize} height={cellSize} patternUnits="userSpaceOnUse">
          <path d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`} fill="none" stroke="gray" strokeWidth="0.5"/>
        </pattern>
        <pattern id="grid" width={width} height={height} patternUnits="userSpaceOnUse">
          <rect width={width} height={height} fill="url(#smallGrid)"/>
          <path d={`M ${width} 0 L 0 0 0 ${height}`} fill="none" stroke="gray" strokeWidth="1"/>
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill="url(#grid)" stroke="gray" strokeWidth="1" />

      <>
        {paths.map(([start, end, , coordinates]) => {
          const isRoutePath = waypoints && waypoints.includes(start) && waypoints.includes(end);
          const key: string = `${start}-${end}`;
          const points: string = [
            locations[start],
            ...coordinates,
            locations[end],
          ].reduce((prev, [x, y]) => {
            const point: string = `${offsetX + (x * cellSize)},${offsetY + (y * cellSize)}`;

            return prev.length ? `${prev} ${point}` : point;
          }, '');

          return points.length
            ? <polyline key={key} points={points} fill="none" stroke={isRoutePath ? '#fff' : '#999'} />
            : null;
        })}
      </>
      <>
        {Object.keys(restLocations).map((key: string) => {
          const isRouteLocation = waypoints && waypoints.includes(key);
          const [x, y] = locations[key];
          const cx: number = offsetX + (x * cellSize);
          const cy: number = offsetY + (y * cellSize);
          const radius: number = 5;
          const textOffset: number = radius / 4;

          return (
            <Fragment key={key}>
              <circle cx={cx} cy={cy} r={radius} fill={isRouteLocation ? '#fff' : '#999'} />
              <text x={cx - textOffset} y={cy + textOffset} style={{ font: `${radius}px sans-serif` }}>{key}</text>
            </Fragment>
          );
        })}
      </>
    </svg>
  );
};

export default Map;

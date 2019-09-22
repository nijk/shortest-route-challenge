import React from 'react';

// Types
import { keyedCoordinates, path, route } from "./types";

// Styled
import { ClickableGroup } from '../components/styled/SVG';
import {
  GridBox,
  GridLine,
  Location,
  LocationName,
  RouteLeg,
  Svg,
} from './Map.styles';

interface Map {
  cellSize?: number,
  locations: keyedCoordinates;
  onClick: (key: string) => void,
  origin?: string,
  paths: path[],
  routes: route[],
}

type waypoint = string[];

const Map: React.FC<Map> = ({
  cellSize = 10,
  locations,
  onClick,
  origin,
  paths,
  routes
}) => {
  const { _size, ...restLocations } = locations;
  const [gridSizeX, gridSizeY] = _size;
  const cellCountX: number = gridSizeX + 1;
  const cellCountY: number = gridSizeY + 1;
  const width: number = cellCountX * cellSize;
  const height: number = cellCountY * cellSize;
  const offsetX: number = cellSize;
  const offsetY: number = cellSize;
  const [shortestRoute]: route[] = routes || [];
  const { legs = [], waypoints = [] }: route = shortestRoute || {};

  return (
    <Svg viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="smallGrid" width={cellSize} height={cellSize} patternUnits="userSpaceOnUse">
          <GridLine d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`} />
        </pattern>
        <pattern id="grid" width={width} height={height} patternUnits="userSpaceOnUse">
          <rect width={width} height={height} fill="url(#smallGrid)"/>
          <GridLine d={`M ${width} 0 L 0 0 0 ${height}`} strokeWidth="1"/>
        </pattern>
      </defs>
      <GridBox width="100%" height="100%" fill="url(#grid)" />
      <>
        {paths.map(([start, end, , coordinates]) => {
          const isRoutePath = legs && legs.find(([legStart, legEnd]) =>
            (legStart === start && legEnd === end) || (legStart === end && legEnd === start));
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
            ? <RouteLeg key={key} points={points} fill="none" isActive={isRoutePath} />
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
            <ClickableGroup key={key} onClick={() => onClick(key)}>
              <Location cx={cx} cy={cy} r={radius} isActive={origin === key || isRouteLocation} />
              <LocationName x={cx - textOffset} y={cy + textOffset} radius={radius} >{key}</LocationName>
            </ClickableGroup>
          );
        })}
      </>
    </Svg>
  );
};

export default Map;

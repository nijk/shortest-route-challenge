import React from 'react';
import styled, { css } from 'styled-components';

const transitionMixin = css`
  transition-property: fill, stroke;
  transition-duration: 250ms;
  transition-timing-function: ease-out;
`;

export const GridBox = styled.rect`
  stroke-width: 1;
  stroke: ${({ theme }) => theme.palette.secondary};
`;

export const GridLine = styled.path`
  fill: none;
  stroke-width: 0.5;
  stroke: ${({ theme }) => theme.palette.secondary};
`;

export const Location = styled(({ isActive, ...rest }) => <circle {...rest} />)`
  ${transitionMixin};
  fill: ${({ isActive, theme }) => theme.palette[isActive ? 'text' : 'secondary']};
`;

export const LocationName = styled(({ radius, ...rest }) => <text {...rest} />)`
  ${transitionMixin};
  fill: ${({ isActive, theme }) => theme.palette[isActive ? 'black' : 'bg']};
  font-size: ${({ radius }) => radius}px;
`;

export const RouteLeg = styled(({ isActive, ...rest }) => <polyline {...rest} />)`
  ${transitionMixin};
  stroke: ${({ isActive, theme }) => theme.palette[isActive ? 'text' : 'secondary']};
`;

export const Svg = styled.svg`
  display: block;
  height: 100%;
  max-width: 100%;
`;

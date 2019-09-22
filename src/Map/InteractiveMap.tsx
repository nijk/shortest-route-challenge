import React, { useState } from 'react';

// Types
import { route } from './types';

// Components
import Map from './Map';

// Styled
import {
  Header,
  HeaderActions,
  HeaderInfo,
  HeaderInfoText,
  HeaderWrapper,
  Main,
  Wrapper,
} from './InteractiveMap.styles';
import { Button } from '../components/styled/Button';

// Utils
import findRoutes from "./routeEngine";
import { locations, paths } from "./routeData";

const InteractiveMap: React.FC = () => {
  const [userLocations, setUserLocations] = useState<string[]>([]);
  const [start, end] = userLocations;

  const onAddLocation = (location: string): void => {
    setUserLocations(start ? [start, location] : [location]);
  };

  const onClearLocations = (): void => {
    setUserLocations([]);
  };

  const routes: route[] = start && end ? findRoutes(paths, start, end, 1) : [];

  return (
    <Wrapper>
      <Header>
        <HeaderWrapper>
          <HeaderActions>
            <Button onClick={onClearLocations}>Clear route</Button>
          </HeaderActions>
          <HeaderInfo>
            {start ? (
              <>
                <HeaderInfoText>Origin: {start}</HeaderInfoText>
                {<HeaderInfoText>Destination: {end ? end : 'Choose your destination'}</HeaderInfoText>}
                {!!routes.length && <HeaderInfoText>Distance: {routes[0].distance}</HeaderInfoText>}
              </>
            ) : (
              <HeaderInfoText>Click/tap on a named marker in the map below to start planning your route</HeaderInfoText>
            )}
          </HeaderInfo>
        </HeaderWrapper>
      </Header>
      <Main>
        <Map
          cellSize={15}
          locations={locations}
          onClick={onAddLocation}
          origin={start}
          paths={paths}
          routes={routes}
        />
      </Main>
    </Wrapper>
  );
};

export default InteractiveMap;

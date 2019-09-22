import React from 'react';
import { ThemeProvider } from 'styled-components';

// Map
import InteractiveMap from './Map/InteractiveMap';

// Styled
import theme from './theme';
import { GlobalStyle, Main } from './App.styles';

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      <Main>
        <InteractiveMap />
      </Main>
    </>
  </ThemeProvider>
);

export default App;

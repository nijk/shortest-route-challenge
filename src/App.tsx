import React from 'react';

// Map
import Map from './Map';

// Styling
import './App.css';

// Utils
import { locations, paths } from './routeData';
import findRoutes from './routeEngine';

const App: React.FC = () => {

  const routes = findRoutes('a', 'd', 3);

  console.log('routes', routes);


  return (
    <div className="App">
      <header className="App-header">
        <Map cellSize={15} locations={locations} paths={paths} routes={routes} />
      </header>
    </div>
  );
};

export default App;

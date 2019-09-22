# shortest-route-challenge
An application that finds the shortest routes between two points


## Notes
After researching pathfinding algorithms I decided that writing a blind-search algorithm was probably all that the brief was requesting. 

I went with a depth first search (DFS) using recursion as it's pretty easy to write. Obviously if the search algorithm needed to be optimised for larger or more complex data sets, then algorithms like Greedy, Dijkstra and A* would be better options by eliminating paths using heuristics/distance from origin/destination to find the optimal path with lower complexities.

Whilst these alternatives are probably the best solutions in commercial projects, I believe most developers in that context would most likely not roll their own algorithms. Therefore I came to the conclusion that the brief was probably asking to see a hand-rolled algorithm and thus I went with my own version of a DFS using Javascript array functions and rest/spread.


#### Unit tests
I have not included basic unit test around the route finding engine, but have excluded Enzyme tests because I'm sitting here after midnight wondering if it will matter.

__If they are important, then please let me know and I'll happily add them.__

## Issues & workarounds
1. Styled Components and Typescript seem to be a bit of an awkward mix at present, I've decided in the interests of time to simply provide the styled components as JS. This could be improved but involves workarounds, see [this Github issue](https://github.com/styled-components/styled-components/issues/630)
2. I've tried to do a complete a job as possible given the time available but having not worked with Typescript/Flow for a while, I'm sure that numerous improvements could be made to the type checking throughout the application.
3. It's hard to know with a brief like this where to stop with the styling work. Hopefully this implementation demonstrates enough flair in that regard, but if it does not then I would be happy to talk through improvements that could be made.
4. There is an issue with the SVG overflowing it's container on Firefox on MacOS. I would recommend using Chrome or Safari for the best experience. I have not tested this on Windows, Linux or Phone/Tablet browsers.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

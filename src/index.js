import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingContainer from './containers/LandingContainer';
import SinglePlayerContainer from './containers/SinglePlayerContainer';
import MultiPlayerContainer from './containers/MultiPlayerContainer';
import GameContainer from './containers/GameContainer';
import LogInContainer from './containers/LogInContainer';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter ([
  {
    path: "/", 
    element: <App/>
  }, 
  {
    path: "logIn", 
    element: <LogInContainer/>
  }, 
  {
    path: "singlePlayer", 
    element: <SinglePlayerContainer/>
  }, 
  {
    path: "multiPlayer", 
    element: <MultiPlayerContainer/>
  }, 
  {
    path: "gamePage", 
    element: <GameContainer/>
  },
])

root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
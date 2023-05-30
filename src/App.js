import { useNavigate, createBrowserRouter, RouterProvider  } from "react-router-dom";
import './App.css';
import SinglePlayerContainer from "./containers/SinglePlayerContainer";
import MultiPlayerContainer from "./containers/MultiPlayerContainer";
import GameContainer from "./containers/GameContainer";
import LandingContainer from "./containers/LandingContainer";
import LoserBoardContainer from "./containers/LoserBoardContainer";
import PlayerComponent from "./components/PlayerComponent";
import LogInContainer from "./containers/LogInContainer";
import { Children, useEffect, useState } from "react";

function App() {

  const [activePlayer, setActivePlayer] = useState([]);

  useEffect(()=>{
    const fetchPlayers = async () => {
      const response = await fetch("http://localhost:8080/players")
      const jsonData = await response.json();
      setActivePlayer(jsonData);
    }

    fetchPlayers()
  },[])
  
  const router = createBrowserRouter ([
    {
      path: "/", 
      element: <LandingContainer activePlayer={activePlayer}/>,
      children:[
        {
          path: "/logIn", 
          element: <LogInContainer/>
        }
      ], 
    },
    {
      path: "singlePlayer", 
      element: <SinglePlayerContainer/>,
      children: [
        {
          path: "gamePage", 
          element: <GameContainer/>
        }
      ]
    },
    {
      path: "multiPlayer", 
      element: <MultiPlayerContainer/>,
      children: [
        {
          path: "gamePage", 
          element: <GameContainer/>
        }
      ]
    }
  ]);

  return (
    <>
    <h1>21 Game</h1>
    <RouterProvider router={router} />
    {/* <LandingContainer 
    // playerRoute={playerRoute} 
    activePlayer={activePlayer}/> */}
    <LoserBoardContainer/>
    
    </>
  );
}

export default App;

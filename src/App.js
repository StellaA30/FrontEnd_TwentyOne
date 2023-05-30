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
  const [leadPlayer, setLeadPlayer] = useState([]);
  const [newPlayer, setNewPlayer] = useState("");

  useEffect(()=>{
    const fetchPlayers = async () => {
      const response = await fetch("http://localhost:8080/players")
      const jsonData = await response.json();
      setActivePlayer(jsonData);
    }

    fetchPlayers()
  },[])

  const logIn = () => {
    for (let i = 0; i < activePlayer.length; i++){
      if(activePlayer[i].name === newPlayer){
        setLeadPlayer(activePlayer[i]);
      }
    }
  }
  
  
  const router = createBrowserRouter ([
    {
      path: "/", 
      element: <LandingContainer/>,
      children:[
        {
          path: "/logIn", 
          element: <LogInContainer 
          newPlayer={newPlayer} 
          setNewPlayer={setNewPlayer}
          logIn={logIn}
          />
        }
      ], 
    },
    {
      path: "singlePlayer", 
      element: <SinglePlayerContainer leadPlayer={leadPlayer}/>,
    },
    {
      path: "multiPlayer", 
      element: <MultiPlayerContainer/>,
    },
    {
      path: "gamePage", 
      element: <GameContainer/>
    }
  ]);

  return (
    <>
    <h1>21 Game</h1>
    <RouterProvider router={router} />
    <LoserBoardContainer/>
    
    </>
  );
}

export default App;

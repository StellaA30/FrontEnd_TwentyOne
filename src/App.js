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
  const [leadPlayer, setLeadPlayer] = useState(null);
  const [newPlayer, setNewPlayer] = useState("");

  useEffect(()=>{
    const fetchPlayers = async () => {
      const response = await fetch("http://localhost:8080/players")
      const jsonData = await response.json();
      setActivePlayer(jsonData);
    }

    fetchPlayers()
  },[])

  const postPlayer = async (newPlayer) => {
    const response = await fetch("http://localhost:8080/players", {
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(newPlayer)
    });
    const savedPlayer = await response.json();
    setLeadPlayer(savedPlayer);
  }
  
  const logIn = () => {
    for (let i = 0; i < activePlayer.length; i++){
      if(activePlayer[i].name === newPlayer){
        setLeadPlayer(activePlayer[i]);
      } 
      // need to resolve promise when adding a new player
    } if (!leadPlayer){
      const registerPlayer = postPlayer(newPlayer);
      setActivePlayer([...activePlayer, registerPlayer]);
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

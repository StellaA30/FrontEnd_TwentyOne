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
  const [game, setGame] = useState(null);



//for single player container 
  const postGame = async(playerId, gameMode) => {
    // const url = await URL (`http://localhost:8080/games?playerId=${playerId}&gameType=${gameMode}`);
    // url.searchParams.append('param', JSON.stringify(playerId, gameMode));

    const response = await fetch(`http://localhost:8080/games?playerId=${playerId}&gameType=${gameMode}`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'}
    });    
    const newGame = await response.json();
    console.log(newGame);
    const newGameId = newGame.message.match("[0-9]+")[0];
    console.log(newGameId);
    startNewGame(newGameId);
}

const  startNewGame = async(gameId) => {
    const response = await fetch(`http://localhost:8080/games/${gameId}`, {
      method: "PATCH",
        headers: {'Content-Type': 'application/json'}

    });
    const gameData = await response.json();
    setGame(gameData);
}



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
      element: <SinglePlayerContainer onFormSubmit={postGame}/>,
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
    {/* <LandingContainer 
    // playerRoute={playerRoute} 
    activePlayer={activePlayer}/> */}
    <LoserBoardContainer/>

    
    </>
  );
}

export default App;

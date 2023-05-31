import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./CSSFiles/App.css";
import SinglePlayerContainer from "./containers/SinglePlayerContainer";
import MultiPlayerContainer from "./containers/MultiPlayerContainer";
import GameContainer from "./containers/GameContainer";
import LandingContainer from "./containers/LandingContainer";
import LoserBoardContainer from "./containers/LoserBoardContainer";
import LogInContainer from "./containers/LogInContainer";
import { useEffect, useState } from "react";

function App() {
  const [activePlayer, setActivePlayer] = useState([]);

  const [game, setGame] = useState(null);
  
  const [leadPlayer, setLeadPlayer] = useState(null);
  
  const [newPlayer, setNewPlayer] = useState("");


  useEffect(() => {
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
      const response = await fetch("http://localhost:8080/players");
      const jsonData = await response.json();
      setActivePlayer(jsonData);
    };

    fetchPlayers();
  }, []);

  const postPlayer = async (newPlayer) => {
    const response = await fetch("http://localhost:8080/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPlayer),
    });
    const savedPlayer = await response.json();
    // adapt line below to a ternary operator if you need to add more players
    setLeadPlayer(savedPlayer);
    setActivePlayer([...activePlayer, savedPlayer]);
  };

  const logIn = () => {
    let potentialPlayer = null;

    for (let i = 0; i < activePlayer.length; i++) {
      if (activePlayer[i].name === newPlayer) {
        potentialPlayer = activePlayer[i];
      } 
    }

    if (!potentialPlayer) {
      postPlayer(newPlayer);
    } else {
      setLeadPlayer(potentialPlayer);
    }
    
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingContainer />,
      children: [
        {
          path: "/logIn",
          element: (
            <LogInContainer
              newPlayer={newPlayer}
              setNewPlayer={setNewPlayer}
              logIn={logIn}
            />
          ),
        },
      ],
    },
    {
      path: "singlePlayer", 
      element: <SinglePlayerContainer leadPlayer={leadPlayer} onFormSubmit={postGame}/>,
    },
    {
      path: "multiPlayer",
      element: <MultiPlayerContainer />,
    },
    {
      path: "gamePage",
      element: <GameContainer leadPlayer={leadPlayer} />,
    },
  ]);

  return (
    <>
      <h1>21 Game</h1>
      <RouterProvider router={router} />
      <LoserBoardContainer />
    </>
  );
}

export default App;

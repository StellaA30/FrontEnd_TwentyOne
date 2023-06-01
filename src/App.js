import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./CSSFiles/App.css";
import SinglePlayerContainer from "./containers/SinglePlayerContainer";
import MultiPlayerContainer from "./containers/MultiPlayerContainer";
import GameContainer from "./containers/GameContainer";
import LandingContainer from "./containers/LandingContainer";
import LogInContainer from "./containers/LogInContainer";
import Navbar from "./containers/Navbar";
import { useEffect, useState } from "react";


function App() {
  const [activePlayer, setActivePlayer] = useState([]);
  const [game, setGame] = useState(null);
  const [leadPlayer, setLeadPlayer] = useState(null);
  const [newPlayer, setNewPlayer] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [additionalPlayers, setAdditionalPlayers] = useState([]);
  const [isNewGame, setIsNewGame] = useState(false)
  const [selectedMode, setSelectedMode] = useState(null);



  const postGame = async(playerId, gameMode) => {
   const response = await fetch(`http://localhost:8080/games?playerId=${playerId}&gameType=${gameMode}`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'}
    });    
    const newGame = await response.json();
    const newGameId = newGame.message.match("[0-9]+")[0];
    startNewGame(newGameId);
  };

const  startNewGame = async(gameId) => {
    const response = await fetch(`http://localhost:8080/games/${gameId}`, {
      method: "PATCH",
      headers: {'Content-Type': 'application/json'}
    });
    const gameData = await response.json();
    gameData.id = gameId;
    setGame(gameData);
}

const setActiveGame = (gameId) => {
  const foundGame = leadPlayer.games.find((game) => parseInt(gameId) === game.id);
  setGame(foundGame);
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

  const addPlayerToGame = async(gameId, playerId) => {
    const response = await fetch (`http://localhost:8080/games/${gameId}`, {
      method: "POST",
      headers: {"Content-Type": "Application/json"},
      body: JSON.stringify(playerId)
    })
    const jsonData = await response.json()
    setAdditionalPlayers([...additionalPlayers, jsonData])
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingContainer selectedMode={selectedMode} setSelectedMode={setSelectedMode}/>,
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
      element: <SinglePlayerContainer leadPlayer={leadPlayer} onFormSubmit={postGame} setActiveGame={setActiveGame}/>,
    },
    {
      path: "multiPlayer",
      element: <MultiPlayerContainer leadPlayer={leadPlayer} activePlayer={activePlayer} selectedTags={selectedTags} setSelectedTags={setSelectedTags} addPlayerToGame={addPlayerToGame} setActiveGame={setActiveGame} setIsNewGame={setIsNewGame} game={game} onFormSubmit={postGame}/>,
    },
    {
      path: "gamePage",
      element: <GameContainer leadPlayer={leadPlayer} game={game} setGame={setGame} />,
    },
  ]);

  return (
    <>
      <h1>21 Game</h1>
      <Navbar/>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

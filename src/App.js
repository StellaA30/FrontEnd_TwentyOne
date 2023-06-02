import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./CSSFiles/App.css";
import SinglePlayerComponent from "./components/SinglePlayerComponent";
import MultiPlayerComponent from "./components/MultiPlayerComponent";
import GameContainer from "./containers/GameContainer";
import LandingContainer from "./containers/LandingContainer";
import LogInContainer from "./containers/LogInContainer";
import { useEffect, useState } from "react";

function App() {
  const [activePlayer, setActivePlayer] = useState([]);
  const [game, setGame] = useState(null);
  const [leadPlayer, setLeadPlayer] = useState(null);
  const [newPlayer, setNewPlayer] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [additionalPlayers, setAdditionalPlayers] = useState([]);
  const [isNewGame, setIsNewGame] = useState(false);
  const [selectedMode, setSelectedMode] = useState(null);
  const [selectDifficulty, setSelectDifficulty] = useState(null);
  const [firstPlayerInMultiplayer, setFirstPlayerInMultiplayer] = useState(null);

  // PostGame and start new game for single player
  const postGame = async (playerId, gameMode) => {
    const response = await fetch(
      `http://localhost:8080/games?playerId=${playerId}&gameType=${gameMode}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    const newGame = await response.json();
    const newGameId = newGame.message.match("[0-9]+")[0];

    if(selectedMode === "singlePlayer"){
      startNewGame(newGameId);
    }
    if(selectedMode === "multiPlayer"){
      setGame(newGameId);
    }
  };

  const startNewGame = async (gameId) => {
    const response = await fetch(`http://localhost:8080/games/${gameId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });
    const jsonData = await response.json()
    const firstPlayerId = jsonData.message.match("[0-9]+")[0] 
    setFirstPlayerInMultiplayer(firstPlayerId);

    // getting game object
    const activeGameResponse = await fetch(
      `http://localhost:8080/games/${gameId}`
    );
    const activeGame = await activeGameResponse.json();
    setGame(activeGame);
  };

  console.log(firstPlayerInMultiplayer);

  // selects the existing game for a single player game
  const setActiveGame = (gameId) => {
    const foundGame = leadPlayer.games.find(
      (game) => parseInt(gameId) === game.id
    );
    setGame({ ...foundGame });
  };

  // fetch all the player data
  useEffect(() => {
    const fetchPlayers = async () => {
      const response = await fetch("http://localhost:8080/players");
      const jsonData = await response.json();
      setActivePlayer(jsonData);
    };
    fetchPlayers();
  }, []);

  // add player to database
  const addNewPlayer = async (newPlayer) => {
    const response = await fetch("http://localhost:8080/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPlayer),
    });
    const savedPlayer = await response.json();
    setLeadPlayer(savedPlayer);
    setActivePlayer([...activePlayer, savedPlayer]);
  };

  // logs player in
  const logIn = () => {
    let potentialPlayer = null;
    for (let i = 0; i < activePlayer.length; i++) {
      if (activePlayer[i].name === newPlayer) {
        potentialPlayer = activePlayer[i];
      }
    }
    if (!potentialPlayer) {
      addNewPlayer(newPlayer);
    } else {
      setLeadPlayer(potentialPlayer);
    }
  };

  // multiplayer method TBC
  const handleGameType = (event) => {
    const selectedDifficulty = event.target.value;
    setSelectDifficulty(selectedDifficulty);
  };

  const addPlayerToGame = async (gameId, playerId) => {
    const response = await fetch(
      `http://localhost:8080/games/${gameId}?playerId=${playerId}`,
      {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify(playerId),
      }
    );
    const jsonData = await response.json();
    setAdditionalPlayers([...additionalPlayers, jsonData]);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <LandingContainer
          selectedMode={selectedMode}
          setSelectedMode={setSelectedMode}
          postGame={postGame}
          leadPlayer={leadPlayer}
          selectDifficulty={selectDifficulty}
          setSelectDifficulty={setSelectDifficulty}
        />
      ),
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
      element: (
        <SinglePlayerComponent
          leadPlayer={leadPlayer}
          onFormSubmit={postGame}
          setActiveGame={setActiveGame}
          isNewGame={isNewGame}
          setIsNewGame={setIsNewGame}
          selectDifficulty={selectDifficulty}
          setSelectDifficulty={setSelectDifficulty}
          handleGameType={handleGameType}
        />
      ),
    },
    {
      path: "multiPlayer",
      element: (
        <MultiPlayerComponent
          leadPlayer={leadPlayer}
          activePlayer={activePlayer}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          addPlayerToGame={addPlayerToGame}
          setActiveGame={setActiveGame}
          setIsNewGame={setIsNewGame}
          game={game}
          startNewGame={startNewGame}
        />
      ),
    },
    {
      path: "gamePage",
      element: (
        <GameContainer
          leadPlayer={leadPlayer}
          game={game}
          additionalPlayers={additionalPlayers}
          selectedMode={selectedMode}
          firstPlayerInMultiplayer={firstPlayerInMultiplayer}
        />
      ),
    },
  ]);

  return (
    <>
      <h1>
        <a href="/">21 Game</a>
      </h1>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

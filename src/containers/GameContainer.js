import { useEffect, useState } from "react";

const GameContainer = ({ leadPlayer, game }) => {
  const [userInput, setUserInput] = useState(0);
  const [counter, setCounter] = useState(0);
  const [message, setMessage] = useState("guess a number");
  const [displayForm, setDisplayForm] = useState(true);

  // checks who starts the game
  useEffect(() => {
    console.log(game);
    if (game && game.currentTotal > 0) {
      setCounter(game.currentTotal);
      setMessage("Computer has guessed " + game.currentTotal)
    }
  }, [game]);

  // for playing existing game
  const handleChange = (event) => {
    setUserInput(event.target.value);
  };



  const handleFormSubmit = (event) => {
    event.preventDefault();
    updateGame(game);
    setMessage("Computer thinking...");
  };

  const updateGame = async (updatedGame) => {
    const response = await fetch(
      `http://localhost:8080/games/${game.id}?playerId=${leadPlayer.id}&guess=${userInput}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
    );
    const jsonData = await response.json();
    console.log(jsonData);

    setTimeout(() => {
      setCounter(jsonData.gameState);
      setMessage(jsonData.message);
    }, 1500);
  };

  return (
    <>
      <h3> Get ready to lose </h3>
      <h4> {leadPlayer.name} </h4>
      <h1>{counter}</h1>
      {message}
      {displayForm ? (
        <form onSubmit={handleFormSubmit}>
          <input
            type="number"
            name="userInput"
            placeholder="Enter your guess"
            value={userInput}
            onChange={handleChange}
            min="1"
            max="3"
          ></input>
          <button type="submit"> submit</button>
        </form>
      ) : null}
    </>
  );
};

export default GameContainer;

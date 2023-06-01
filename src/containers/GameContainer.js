import { useEffect, useState } from "react";
import "../CSSFiles/GameContainer.css"

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
    <section className="Game_page">
      <h3> Get ready to lose </h3>
      <h4> {leadPlayer.name} </h4>
      <h2>{counter}</h2>
      
      <div className="message">
      {message}
      </div>

      {displayForm ? (
        <form className="form" onSubmit={handleFormSubmit}>
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
    </section>
  );
};

export default GameContainer;

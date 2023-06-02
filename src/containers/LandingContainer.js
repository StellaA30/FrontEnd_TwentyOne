import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import "../CSSFiles/LandingContainer.css";
import LoserBoardContainer from "./LoserBoardContainer";

const LandingContainer = ({
  selectedMode,
  setSelectedMode,
  postGame,
  leadPlayer,
  selectDifficulty,
  setSelectDifficulty,
}) => {
  const [displayButton, setDisplayButton] = useState(false);
  const navigate = useNavigate();

  const handleGameMode = (event) => {
    const selectedMode = event.target.value;
    setSelectedMode(selectedMode);
    if (selectedMode === "multiPlayer") {
      setSelectDifficulty("Multiplayer");
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (selectedMode === "singlePlayer") {
      playerRoute(selectedMode);
    }

    if (selectedMode === "multiPlayer") {
      playerRoute(selectedMode);
      postGame(parseInt(leadPlayer.id), selectDifficulty);
    }
  };

  const playerRoute = (selectedMode) => {
    navigate(selectedMode);
  };

  const handleClick = () => {
    navigate("/logIn");
    setDisplayButton(!displayButton);
  };

  return (
    <>
      {!displayButton && <button onClick={handleClick}>Log in/Register</button>}
      <Outlet />
      <form className="form" onSubmit={handleFormSubmit}>
        <select
          onChange={handleGameMode}
          name="game mode"
          defaultValue="game mode"
        >
          <option disabled-value="game mode">Game mode</option>
          <option value="singlePlayer">Single</option>
          <option value="multiPlayer">Multiplayer</option>
        </select>
        <button type="submit"> Submit </button>
      </form>
      <section className="rules">
        <h4>How to play:</h4>
        <ol className="rules">
          <li>
            {" "}
            Progress through the game by counting up until you get to 21.{" "}
          </li>
          <li> When you see your name submit a number between 1 and 3. </li>
          <li>
            {" "}
            The aim of the game is to avoid being the person to reach 21.{" "}
          </li>
          <li>
            {" "}
            If you are the lucky person to get to 21, you claim the throne as
            THE loser.{" "}
          </li>
        </ol>
      </section>
      <LoserBoardContainer />
    </>
  );
};

export default LandingContainer;

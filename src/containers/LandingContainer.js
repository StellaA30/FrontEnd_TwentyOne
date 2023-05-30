import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingContainer = ({activePlayer}) => {

    const [selectedMode, setSelectedMode] = useState(null);
    const navigate = useNavigate();

    const handleGameMode = (event) => {
        const selectedMode = event.target.value;
        setSelectedMode(selectedMode);
};

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (selectedMode === "singlePlayer") {
            playerRoute(selectedMode);
        }

        if (selectedMode === "multiPlayer") {
          playerRoute(selectedMode);
      }
    };

    const playerRoute = (selectedMode) => {
      navigate(selectedMode);
    }

  return (
    <>
      <h3>Hello from Landing Page </h3>
      <h4>How to play:</h4>
      <p>Write rules in here:</p>
      <form onSubmit={handleFormSubmit}>
      <select onChange={handleGameMode}  name="game mode" defaultValue="game mode">
        <option disabled-value="game mode">Game mode</option>
        <option value="singlePlayer">Single</option>
        <option value="multiPlayer">Multiplayer</option>
      </select>
      <button type ="submit">Submit</button>
      </form>
    </>
  );
};

export default LandingContainer;

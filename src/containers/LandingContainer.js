import { useState } from "react";
import { Link } from "react-router-dom";

const LandingContainer = ({singlePlayerRoute}) => {

    const [selectedMode, setSelectedMode] = useState(null)

    const handleGameMode = (event) => {
        const selectedMode = event.target[event.target.selectedIndex].text;
        setSelectedMode(selectedMode);
};
   

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (selectedMode=== "Single") {
            singlePlayerRoute()
        }
};

  return (
    <>
      <h3>Hello from Landing Page </h3>
      <h4>How to play:</h4>
      <p>Write rules in here:</p>
      <form onSubmit={handleFormSubmit}>
      <select onChange={handleGameMode}  name="game mode" defaultValue="game mode">
        <option disabled-value="game mode">Game mode</option>
        <option value="single">Single</option>
        <option value="multiplayer">Multiplayer</option>
      </select>
      <button type ="submit">Submit</button>
      </form>
    </>
  );
};

export default LandingContainer;

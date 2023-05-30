import { useState } from "react";
import PlayerComponent from "../components/PlayerComponent"


const SinglePlayerContainer = ({leadPlayer, onFormSubmit}) => {

    const [selectedMode, setSelectedMode] = useState(null);

    const handleGameMode = (event) => {
        const selectedMode = event.target.value;
        setSelectedMode(selectedMode);
};

const handleFormSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(1, selectedMode);
}

    
    // get active player's id
    // use the player's id and gameMode from dropdown list to postGame
    // use new game Id to startNew game 
   



    return ( 
        <>
        {/* <h2> {activePlayer.name}</h2> */}
        <h2>Single Player</h2>
        <form onSubmit={handleFormSubmit}>
        <select onChange={handleGameMode}  name="game mode" defaultValue="game mode">
            <option disabled-value="game mode">Game mode</option>
            <option value="Easy">Easy</option>
            <option value="Difficult">Difficult</option>
        </select>
        <button type ="submit">Start game!</button>
      </form>

        <PlayerComponent/>
        </>
     );
}
 
export default SinglePlayerContainer;
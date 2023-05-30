import { useState } from "react";
import PlayerComponent from "../components/PlayerComponent"

const SinglePlayerContainer = ({activePlayer}) => {

    const [games, setGames] = useState(null);
    const [selectedMode, setSelectedMode] = useState(null);

    const handleGameMode = (event) => {
        const selectedMode = event.target.value;
        setSelectedMode(selectedMode);
};

const handleFormSubmit = (event) => {
    event.preventDefault();
}

    
    // Input player name
    // Player to select the game mode
    // Create a game for the player based on the selected mode

    const postGame = async(playerId, gameMode) => {
        const url = await URL (`http://localhost:8080/games?playerId=${playerId}&gameType=${gameMode}`);
        url.searchParams.append('param', JSON.stringify(playerId, gameMode));

        const response = await fetch(url, {
            method: "POST",
            headers: {'Content-Type': 'application/json'}
        });    
    }

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
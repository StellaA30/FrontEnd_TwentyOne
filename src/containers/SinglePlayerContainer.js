import { useState } from "react";
import { useNavigate , Outlet } from "react-router-dom";
import PlayerComponent from "../components/PlayerComponent"


const SinglePlayerContainer = ({leadPlayer, onFormSubmit}) => {

    const [selectedMode, setSelectedMode] = useState(null);
    const [gameOption, setGameOption] = useState(null);
    const navigate = useNavigate();

    const handleGameMode = (event) => {
        const selectedMode = event.target.value;
        setSelectedMode(selectedMode);
};

const handleFormSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(leadPlayer.id, selectedMode);
    navigate("/gamePage");
}

const handleGameList = (event) => {
    const gameOption = event.target.value;
    setGameOption(gameOption);
};

const handleGameForm = (event) => {
    event.preventDefault();
    
}


    // console.log(leadPlayer.games);
const existingGames = leadPlayer.games.filter(game => game.complete !== false && game.gameType !== "MULTIPLAYER")
.map((game) => {
    return (
        <option key={game.id} value={game.id}>
          Game: {game.id} ({game.gameType})
        </option>
    )
})

    

    return ( 
        <>
        {/* <h2> {activePlayer.name}</h2> */}
        <h2>Hi {leadPlayer.name}</h2>
        <form onSubmit={handleGameForm}>
            <select onChange={handleGameList} 
            name="Select from games" defaultValue="Select from games">
            <option disabled-value="Select from games">Select existing or create new game</option>
            <option value="new game">New game</option>
            {existingGames}
            </select>

        </form>
        <form onSubmit={handleFormSubmit}>
        <select onChange={handleGameMode}  name="game mode" defaultValue="game mode">
            <option disabled-value="game mode">Game mode</option>
            <option value="Easy">Easy</option>
            <option value="Difficult">Difficult</option>
        </select>
        <button type ="submit">Start game!</button>
      </form>

        {/* <PlayerComponent/> */}
        </>
     );
}
 
export default SinglePlayerContainer;
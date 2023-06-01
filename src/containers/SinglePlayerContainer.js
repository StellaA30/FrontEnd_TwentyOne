import { useState } from "react";
import { useNavigate , Outlet } from "react-router-dom";
import PlayerComponent from "../components/PlayerComponent"


const SinglePlayerContainer = ({leadPlayer, onFormSubmit, setActiveGame}) => {

    // for slecting game difficulty
    const [selectedMode, setSelectedMode] = useState(null);

    // for selecting new / existing game
    const [isNewGame, setIsNewGame] = useState(false);

    const navigate = useNavigate();


    const handleGameType = (event) => {
        const selectedMode = event.target.value;
        setSelectedMode(selectedMode);
};

// for submitting new game in single player container
const handleFormSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(leadPlayer.id, selectedMode);
    navigate("/gamePage");
   
}


// functions for first dropdown list
const handleGameList = (event) => {
    const selectedOption = event.target.value;
    if(selectedOption === "newGame"){
        setIsNewGame(true);    
    }
    else {
        setActiveGame(selectedOption);
        setIsNewGame(false);
        navigate("/gamePage");

    }
};



// filter and map existing games for player 
const existingGames = leadPlayer.games.filter(game => game.complete === false && game.gameType !== "MULTIPLAYER")
.map((game) => {
    return (
        <option key={game.id} value={game.id}>
          game id {game.id} ({game.gameType.toLowerCase()
})
        </option>
    )
})

    
    return ( 
        <>
        {/* <h2> {activePlayer.name}</h2> */}
        <h2>Hi {leadPlayer.name}</h2>

        {/* form for selecting existing or creating new game */}
            <select onChange={handleGameList} 
            name="Select from games" defaultValue="Select from games">
            <option disabled-value="Select from games">Select existing or create new game</option>
            <option value="newGame">New game</option>
            {existingGames}
            </select>

{/* form for creating new game */}
        {isNewGame ? 
        <form onSubmit={handleFormSubmit}>
            <select onChange={handleGameType}  name="game mode" defaultValue="game mode">
                <option disabled-value="game mode">Game mode</option>
                <option value="Easy">Easy</option>
                <option value="Difficult">Difficult</option>
            </select>
            <button type ="submit">Start game!</button>
      </form>
      : null}
        

        {/* <PlayerComponent/> */}
        </>
     );
}
 
export default SinglePlayerContainer;
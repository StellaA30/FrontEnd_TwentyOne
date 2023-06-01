import PlayerComponent from "../components/PlayerComponent"
import Select from "react-select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const MultiPlayerContainer = ({leadPlayer, activePlayer,selectedTags, setSelectedTags, addPlayerToGame, deletePlayerFromGame, setActiveGame, setIsNewGame, game}) => {

    const getAllOtherPlayers = activePlayer.filter(player => player.id !== leadPlayer.id).map(player => player.id)

// Display player name and id
    const onChange = (selectedOptions) => {
      console.log(selectedOptions);
      return setSelectedTags(selectedOptions), addPlayerToGame(game.id, selectedOptions)
    };

    const existingGames = leadPlayer.games.filter(game => game.complete === false && game.gameType === "MULTIPLAYER")
.map((game) => {
    return (
        <option key={game.id} value={game.id}>
          game id {game.id} ({game.gameType.toLowerCase()
})
        </option>
    )
})

const navigate = useNavigate();

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

    return ( 
    <>

        <h3> Hi {leadPlayer.name} </h3>
        <p> all players must have an account </p>
    <form className="multiplayer_form">
        <Select
          options={getAllOtherPlayers.map((player) => ({ value: player, label: player }))}
          value={selectedTags}
          onChange={onChange}
          isMulti
          closeMenuOnSelect={false}
        />
      </form>

      <select onChange={handleGameList} 
            name="Select from games" defaultValue="Select from games">
            <option disabled-value="Select from games">Select existing or create new game</option>
            <option value="newGame">New game</option>
            {existingGames}
            </select>
       
    </> 
    );
}
 
export default MultiPlayerContainer;

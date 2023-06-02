import Select from "react-select";
import { useNavigate } from "react-router-dom";
import "../CSSFiles/MultiPlayer.css";
import mulitPlayerPicture from "../assets/MultiPlayer.png";

// Multiplayer code

const MultiPlayerComponent = ({
  leadPlayer,
  activePlayer,
  selectedTags,
  setSelectedTags,
  addPlayerToGame,
  setActiveGame,
  setIsNewGame,
  game,
  startNewGame,
}) => {
  const navigate = useNavigate();

  // const getAllOtherPlayers = activePlayer
  //   .filter((player) => player.id !== leadPlayer.id)
  //   // Display player name and id
  //   .map((player) => `Player ${player.id}: ${player.name}`);


    const getAllOtherPlayers = activePlayer
    .filter((player) => player.id !== leadPlayer.id)
    // Display player name and id
    .map((player) => player.id);

  const handleChange = (event) => {
    return (
      setSelectedTags(event[0].value), addPlayerToGame(game, event[0].value)
    );
  };


  const existingGames = leadPlayer.games
    .filter(
      (game) => game.complete === false && game.gameType === "MULTIPLAYER"
    )
    .map((game) => {
      return (
        <option key={game.id} value={game.id}>
          game id {game.id} ({game.gameType.toLowerCase()})
        </option>
      );
    });

  const handleGameList = (event) => {
    const selectedOption = event.target.value;
    if (selectedOption === "newGame") {
      setIsNewGame(true);
    } else {
      setActiveGame(selectedOption);
      setIsNewGame(false);
      navigate("/gamePage");
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    startNewGame(game);
    navigate("/gamePage");
  };

  return (
    <section className="multiplayer_component">
      <h2> Hi {leadPlayer.name} </h2>
      <p>
        {" "}
        all players must have an account, please return to the main page to
        create an account{" "}
      </p>
      <form className="multiplayer_form">
        <Select
          options={getAllOtherPlayers.map((player) => ({
            value: player,
            label: player,
          }))}
          value={selectedTags}
          onChange={handleChange}
          isMulti
          closeMenuOnSelect={false}
        />
      </form>
      <form onSubmit={handleFormSubmit}>
        <select
          onChange={handleGameList}
          name="Select from games"
          defaultValue="Select from games"
        >
          <option disabled-value="Select from games">
            Select existing or create new game
          </option>
          <option value="newGame">New game</option>
          {existingGames}
        </select>
        <button type="submit">Start game!</button>
      </form>
      <div className="multiplayer_picture">
        <img src={mulitPlayerPicture} />
      </div>
    </section>
  );
};

export default MultiPlayerComponent;

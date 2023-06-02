import { useNavigate } from "react-router-dom";
import singlePlayerPicture from "../assets/single_player.png";
import "../CSSFiles/SinglePlayer.css";

const SinglePlayerComponent = ({
  leadPlayer,
  onFormSubmit,
  setActiveGame,
  isNewGame,
  setIsNewGame,
  selectDifficulty,
  setSelectDifficulty,
  handleGameType,
}) => {
  const navigate = useNavigate();

  // const handleGameType = (event) => {
  //   const selectedDifficulty = event.target.value;
  //   setSelectDifficulty(selectedDifficulty);
  // };

  // for submitting new game in single player container
  const handleFormSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(leadPlayer.id, selectDifficulty);
    navigate("/gamePage");
  };

  // functions for first dropdown list
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

  // filter and map existing games for player
  const existingGames = leadPlayer.games
    .filter(
      (game) => game.complete === false && game.gameType !== "MULTIPLAYER"
    )
    .map((game) => {
      return (
        <option key={game.id} value={game.id}>
          game id {game.id} ({game.gameType.toLowerCase()})
        </option>
      );
    });

  return (
    <>
      <h2>Hi {leadPlayer.name}</h2>

      {/* form for selecting existing or creating new game */}
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

      {/* form for creating new game */}
      {isNewGame ? (
        <form onSubmit={handleFormSubmit}>
          <select
            onChange={handleGameType}
            name="game mode"
            defaultValue="game mode"
          >
            <option disabled-value="game mode">Game mode</option>
            <option value="Easy">Easy</option>
            <option value="Difficult">Difficult</option>
          </select>
          <button type="submit">Start game!</button>
        </form>
      ) : null}

      <div>
        <img src={singlePlayerPicture} />
      </div>
    </>
  );
};

export default SinglePlayerComponent;

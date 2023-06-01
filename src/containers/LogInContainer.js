import { useState } from "react";
import PlayerComponent from "../components/PlayerComponent";
import "../CSSFiles/LogInContainer.css";

const LogInContainer = ({ newPlayer, setNewPlayer, logIn }) => {
  const [displayButton, setDisplayButton] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    logIn();
    setDisplayButton(!displayButton);
  };

  return (
    <>
      <h3> Log In / Register </h3>
      <p>
        {" "}
        If you do not have an account (shame on you), <br /> worry not, an
        account will automatically be made{" "}
      </p>
      <form onSubmit={handleFormSubmit}>
        <PlayerComponent newPlayer={newPlayer} setNewPlayer={setNewPlayer} />
        {!displayButton && <button type="submit"> Log In </button>}
      </form>
    </>
  );
};

export default LogInContainer;

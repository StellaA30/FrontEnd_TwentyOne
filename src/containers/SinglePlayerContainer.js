import { Outlet } from "react-router-dom";
import PlayerComponent from "../components/PlayerComponent"

const SinglePlayerContainer = ({activePlayer}) => {

    // Input player name
    // Player to select the game mode
    // Create a game for the player based on the selected mode

    return ( 
        <>
        <h2> Single Player</h2>
        <PlayerComponent/>
        <Outlet/>
        </>
     );
}
 
export default SinglePlayerContainer;
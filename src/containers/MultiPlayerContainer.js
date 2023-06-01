import PlayerComponent from "../components/PlayerComponent"

const MultiPlayerContainer = ({leadPlayer, activePlayer}) => {

    // function 
    // for loop and if statement if activeplayer.id and lead.is match 
    // splice out that person 

    const getAllOtherPlayers = activePlayer.filter(player => player.id !== leadPlayer.id).map((player) => {
        return(
            <option key={player.id} value={player.name}>
          {player.name}
        </option>
        )
    })

    return ( 
    <>

        <h3> Hi {leadPlayer.name} </h3>
        <p> all players must have an account </p>
        <form>
        <select>
        {getAllOtherPlayers}
        </select>
        <button type="submit"> + </button>

        </form>
    </> 
    );
}
 
export default MultiPlayerContainer;

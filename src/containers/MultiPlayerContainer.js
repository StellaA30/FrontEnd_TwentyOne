import PlayerComponent from "../components/PlayerComponent"
import Select from "react-select";
import { useState } from "react";


const MultiPlayerContainer = ({leadPlayer, activePlayer}) => {

    // function 
    // for loop and if statement if activeplayer.id and lead.is match 
    // splice out that person 

    // const getAllOtherPlayers = activePlayer.filter(player => player.id !== leadPlayer.id).map((player) => {
    //     return(
    //         <option key={player.id} value={player.name}>
    //       {player.name}
    //     </option>
    //     )
    // })


    const getAllOtherPlayers = activePlayer.filter(player => player.id !== leadPlayer.id).map(player => player.name)

    const [selectedTags, setSelectedTags] = useState([]);

    const onChange = (selectedOptions) => {setSelectedTags(selectedOptions)};

    return ( 
    <>

        <h3> Hi {leadPlayer.name} </h3>
        <p> all players must have an account </p>
    <form className="">
        <label className="">Related technologies</label>
        <Select
          options={getAllOtherPlayers.map((player) => ({ value: player, label: player }))}
          value={selectedTags}
          onChange={onChange}
          isMulti
          closeMenuOnSelect={false}
        />
      </form>
        {/* <form>
        <select>
        {getAllOtherPlayers}
        </select>
        <button type="submit"> + </button>

        </form> */}
    </> 
    );
}
 
export default MultiPlayerContainer;

import { useState } from "react";

const PlayerComponent = () => {

    const [newPlayer, setNewPlayer] = useState("");

    const handleChange = (event) =>{
        setNewPlayer(event.target.value)
    }

    return ( 
        <>
            <input
            type="text"
            placeholder="enter player name"
            name="name"
            value={newPlayer}
            onChange={handleChange}
            />
        
        
        </>
     );
}
 
export default PlayerComponent;
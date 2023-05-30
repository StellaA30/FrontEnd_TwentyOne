import { useState, useEffect} from "react";

const LooserBoardContainer = () => {
    const[loserBoard,setLoserBoard] = useState([]);

    useEffect(() => {
        const fetchLoserBoard = async () => {
            const response = await fetch("http://localhost:8080/loserBoard")
            const jsonData = await response.json();
            setLoserBoard(jsonData);
        }
        fetchLoserBoard()
    }, [])

    loserBoard.sort((a,b) => a.gamesLost - b.gamesLost);

    const loserBoardItems = loserBoard.map((player, index) => { 
        return <li key={index}>{player.name} has lost {player.gamesLost} games. </li>
    })

    return ( 
        <>
         <h3> Hello from loserboard!!</h3>
         <ol>
            {loserBoardItems}
         </ol>
        </>
     );
}
 
export default LooserBoardContainer;
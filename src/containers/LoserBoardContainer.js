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

    const loserBoardItems = loserBoard.map((player) => { 
        return <li>{player} </li>
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
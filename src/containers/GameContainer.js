import { useEffect, useState } from "react";

const GameContainer = ({leadPlayer, game, setGame}) => {

const [userInput, setUserInput] = useState(0);
const [counter, setCounter] = useState(0);
const [message, setMessage] = useState("guess a number");
const [displayForm, setDisplayForm] = useState(true);


// checks who starts the game
useEffect(() => {
    console.log(game);
    if(game && game.currentTotal > 0){
        // setMessage("Computer started, they guessed " + game.currentTotal);
        setCounter(game.currentTotal);
    }
}, [game])

// for playing existing game



const handleChange = (event) => {
    setUserInput(event.target.value)
}

const handleFormSubmit = (event) => {
    event.preventDefault();
    // setCounter(counter + parseInt(userInput))
    updateGame(game);
    setMessage("Computer thinking...");
}

const updateGame = async (updatedGame) => {
    console.log(userInput);
    const response = await fetch(`http://localhost:8080/games/${game.id}?playerId=${leadPlayer.id}&guess=${userInput}`, {
        method:"PUT",
        headers:{"Content-Type" : "application/json"},
    })

    // setTimeout(() => {
        // setMessage("Computer is thinking...")
    // },3000)
    
    const jsonData = await response.json();
    console.log(jsonData);

    // setGame(updatedGame);

    setTimeout(() => {
        setCounter(jsonData.gameState)
        setMessage(jsonData.message)
    }, 1500);   
}

// useEffect seems to trigger when the game starts??? why??? 
// useEffect(()=>{
//         setDisplayForm(!displayForm);
// },[(counter ])

    return ( 
        <>
            <h3> Get ready to lose </h3>
            <h4> {leadPlayer.name}  </h4>
            <h1>{counter}</h1>
            {message}
            {displayForm ? <form onSubmit={handleFormSubmit}>
                <input 
                type="number" 
                name="userInput" placeholder="Enter your guess" 
                value ={userInput}
                onChange={handleChange}
                min="1" 
                max="3">
                </input>
                <button type="submit"> submit</button>
            </form> : null }
        </>
     );
}
 
export default GameContainer;
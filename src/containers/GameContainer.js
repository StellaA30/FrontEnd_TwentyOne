import { useEffect, useState } from "react";

const GameContainer = ({leadPlayer, game, setGame}) => {
// counter for "ball" -> this will increment depending on user input or computer input
// user input field which will have an onClick which will increment the counter
// useEffect will watch for this change this will also send a put request to the API to retrieve the Computer guess
// computers number will be extracted from the message which will increment the counter
// useEffect to have a time out delay

// after fetch request has been sent for update game, setMessage to computer is thinking, use setTimeOut, 3000ms

// set state that triggers the changes on the page, flicks between user and computer guesses
// state to check if game.complete is true -> if ball = 21, set state to true and print game.message

// remove form when number >21, create button that takes back to landing container. if complete = true. 

const [userInput, setUserInput] = useState(0)
const [counter, setCounter] = useState(0)
const [message, setMessage] = useState("guess a number")



const handleChange = (event) => {
    setUserInput(event.target.value)
}

const handleFormSubmit = (event) => {
    event.preventDefault();
    setCounter(counter +parseInt(userInput))
    updateGame(game);
}


const updateGame = async (updatedGame) => {
    const response = await fetch(`http://localhost:8080/games/${game.id}?playerId=${leadPlayer.id}&guess=${userInput}`, {
        method:"PUT",
        headers:{"Content-Type" : "application/json"},

    })

    // setTimeout(() => {
        // setMessage("Computer is thinking...")
    // },3000)
    
    const jsonData = await response.json();
    // updatedGame = jsonData;
    // updatedGame.id = game.id;
    setCounter(jsonData.gameState)
    setMessage(jsonData.message)
    console.log(jsonData)
    setGame(updatedGame);
}

const handleGameCompletion = () => {
// print game.message if counter is > than 21
}

    return ( 
        <>
            <h3> Get ready to lose </h3>
            <h4> {leadPlayer.name}  </h4>
            <h1>{counter}</h1>
            {message}
            <form onSubmit={handleFormSubmit}>
                <input 
                type="number" 
                name="userInput" placeholder="Enter your guess" 
                value ={userInput}
                onChange={handleChange}
                min="1" 
                max="3">
                </input>
                <button type="submit"> submit</button>
            </form>
            <p>{handleGameCompletion}</p>
        
        </>
     );
}
 
export default GameContainer;
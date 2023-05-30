import PlayerComponent from "../components/PlayerComponent";

const LogInContainer = ({newPlayer, setNewPlayer, logIn}) => { 
    
    const handleFormSubmit = (event) => {
        event.preventDefault();
        logIn();
    }

    return ( 
        <>
        <h2> Log In / Register</h2>
        <form onSubmit={handleFormSubmit}>
        <PlayerComponent newPlayer={newPlayer} setNewPlayer={setNewPlayer}/>
        <button type="submit"> Submit </button>
        </form>
        </>
     );
}
 
export default LogInContainer;
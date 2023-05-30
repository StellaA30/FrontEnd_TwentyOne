import { useNavigate } from "react-router-dom";
import './App.css';
import SinglePlayerContainer from "./containers/SinglePlayerContainer";
import MultiPlayerContainer from "./containers/MultiPlayerContainer";
import GameContainer from "./containers/GameContainer";
import LandingContainer from "./containers/LandingContainer";
import LoserBoardContainer from "./containers/LoserBoardContainer";
import PlayerComponent from "./components/PlayerComponent";

function App() {

  const navigate = useNavigate();

  const playerRoute = (selectedMode) => {
    navigate(selectedMode);
  }


  return (
    <>
      <h1>Hello BNTA World</h1>
    <LandingContainer singlePlayerRoute={playerRoute}/>
    <LoserBoardContainer/>
    </>
  );
}

export default App;

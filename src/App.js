import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css';
import SinglePlayerContainer from "./containers/SinglePlayerContainer";
import MultiPlayerContainer from "./containers/MultiPlayerContainer";
import GameContainer from "./containers/GameContainer";
import LandingContainer from "./containers/LandingContainer";
import LoserBoardContainer from "./containers/LoserBoardContainer";
import PlayerComponent from "./components/PlayerComponent";

function App() {

  const singlePlayerRoute = () => {
    return <Route path='/singlePlayer' element={<SinglePlayerContainer/>} />

  }


  return (
    <BrowserRouter>
    <div className="App">
      <h1>Hello BNTA World</h1>
      <Routes>
        {singlePlayerRoute}    
        <Route path='/MultiPlayer' element={<MultiPlayerContainer/>} />
        <Route path='/gamePage' element={<GameContainer/>} />
    </Routes>
    <LandingContainer singlePlayerRoute={singlePlayerRoute}/>
    <LoserBoardContainer/>
    <SinglePlayerContainer/>
   

    </div>
  </BrowserRouter>
       
  );
}

export default App;

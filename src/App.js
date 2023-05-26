import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css';
import SinglePlayerContainer from "./containers/SinglePlayerContainer";
import MultiPlayerContainer from "./containers/MultiPlayerContainer";
import GameContainer from "./containers/GameContainer";
import LandingContainer from "./containers/LandingContainer";
import LoserBoardContainer from "./containers/LoserBoardContainer";

function App() {


  return (
    <BrowserRouter>
    <div className="App">
      <h1>Hello BNTA World</h1>
      <Routes>
        <Route path='/singlePlayer' element={<SinglePlayerContainer/>} />
        <Route path='/MultiPlayer' element={<MultiPlayerContainer/>} />
        <Route path='/gamePage' element={<GameContainer/>} />
    </Routes>
    <LandingContainer/>
    <LoserBoardContainer/>

    </div>
  </BrowserRouter>
       
  );
}

export default App;

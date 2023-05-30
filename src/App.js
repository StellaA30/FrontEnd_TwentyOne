import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import './App.css';
import SinglePlayerContainer from "./containers/SinglePlayerContainer";
import MultiPlayerContainer from "./containers/MultiPlayerContainer";
import GameContainer from "./containers/GameContainer";
import LandingContainer from "./containers/LandingContainer";
import LoserBoardContainer from "./containers/LoserBoardContainer";
import PlayerComponent from "./components/PlayerComponent";

function App({router}) {

  const singlePlayerRoute = () => {
    // return <Route path='/singlePlayer' element={<SinglePlayerContainer/>} />
    // router.SinglePlayerContainer();
    <Link to="/singlePlayer"></Link>
  }


  return (
    // <BrowserRouter>
    <div className="App">
      <h1>Hello BNTA World</h1>
    <LandingContainer singlePlayerRoute={singlePlayerRoute}/>
    <LoserBoardContainer/>
    {/* <SinglePlayerContainer/> */}
    </div>
  // </BrowserRouter>
       
  );
}

export default App;

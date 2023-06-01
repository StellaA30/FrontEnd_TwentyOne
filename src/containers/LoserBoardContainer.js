import { useState, useEffect } from "react";
import "../CSSFiles/LoserBoard.css"

const LoserBoardContainer = () => {
  const [loserBoard, setLoserBoard] = useState([]);

  useEffect(() => {
    const fetchLoserBoard = async () => {
      const response = await fetch("http://localhost:8080/loserBoard");
      const jsonData = await response.json();
      setLoserBoard(jsonData);
    };
    fetchLoserBoard();
  }, []);

  loserBoard.sort((a, b) => a.gamesLost.sort - b.gamesLost.sort);

  const loserBoardItems = loserBoard.map((player, index) => {
    return (
      <li key={index}>
        {player.name} has lost {player.gamesLost} games.{" "}
      </li>
    );
  });

  return (
    <section className="loserBoard">
      <h3> LOSER BOARD </h3>
      <h5> Check to see if you are the *leading* loser. </h5>
      <ol>{loserBoardItems}</ol>
    </section>
  );
};

export default LoserBoardContainer;

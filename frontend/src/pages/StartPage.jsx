import { useNavigate } from "react-router-dom";
import characters from "../assets/1s0pBgT.jpeg";

function StartPage() {
  const navigate = useNavigate();

  const startGame = () => {
    navigate("/game");
  };

  const seeLeaderBoard = () => {
    navigate("/score");
  };

  return (
    <div>
      <h1>Welcome to the Where is Waldo</h1>
      <p>Your job is to look for the following characters in the picture:</p>
      <img src={characters} alt="Find these people" />
      <p>Click start when you are ready</p>
      <div>
        <button onClick={startGame}>Start</button>
        <button onClick={seeLeaderBoard}>Leaderboard</button>
      </div>
    </div>
  );
}

export default StartPage;

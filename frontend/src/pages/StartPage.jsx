import { useNavigate } from "react-router-dom";

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
      <button onClick={startGame}>Start</button>
      <button onClick={seeLeaderBoard}>Leaderboard</button>
    </div>
  );
}

export default StartPage;

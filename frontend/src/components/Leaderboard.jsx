import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Leaderboard = ({ time }) => {
  const [name, setName] = useState("");
  const [leaders, setLeaders] = useState([]);
  const [isTopScore, setIsTopScore] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getLeaderData = async () => {
      const response = await axios.get(
        "http://localhost:3000/leaderboard/leaders"
      );
      setLeaders(response.data.topScores);
    };

    getLeaderData();
  }, []);

  useEffect(() => {
    const getLeaderData = async () => {
      const response = await axios.get(
        "http://localhost:3000/leaderboard/leaders"
      );
      setLeaders(response.data.topScores);
    };

    getLeaderData();
  }, [isTopScore]);

  useEffect(() => {
    const compareScores = () => {
      const check = leaders.some((leader) => leader.score > time);
      setIsTopScore(check);
    };

    compareScores();
  }, [leaders]);
  const onChange = (e) => {
    setName(e.target.value);
  };

  const onSubmitPress = (e) => {
    setIsTopScore(false);
    navigate("/");
  };

  const onClickPress = (e) => {
    navigate("/");
  };

  return (
    <div>
      <h1>Scoreboard</h1>
      <table>
        <tr>
          <th>Name</th>
          <th>Seconds</th>
        </tr>
        {leaders.map((leader, index) => (
          <tr key={index}>
            <td>{leader.username}</td>
            <td>{leader.score}</td>
          </tr>
        ))}
      </table>
      <h1>Your time was: {time}</h1>
      {isTopScore && (
        <form
          action="http://localhost:3000/leaderboard/topscore"
          method="POST"
          onSubmit={onSubmitPress}
        >
          <label htmlFor="user">Name - 3 Characters:</label>
          <input
            type="text"
            value={name}
            onChange={onChange}
            id="user"
            name="user"
          />
          <label htmlFor="score">Time:</label>
          <input type="number" value={time} id="score" name="score" />
          <button type="submit"></button>
        </form>
      )}
      <button onClick={onClickPress}>Start Again</button>
    </div>
  );
};

export default Leaderboard;

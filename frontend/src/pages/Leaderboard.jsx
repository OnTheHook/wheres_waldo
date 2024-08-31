import { useEffect, useState } from "react";
import axios from "axios";

const Leaderboard = ({ time }) => {
  const [name, setName] = useState("");
  const [leaders, setLeaders] = useState([]);
  const [isTopScore, setIsTopScore] = useState(false);

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
    const compareScores = () => {
      const check = leaders.some((leader) => leader.score > time);
      setIsTopScore(check);
    };

    compareScores();
  }, [leaders]);
  const onChange = (e) => {
    setName(e.target.value);
  };

  const onSubmit = (e) => {};

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
      <form>
        <input type="text" value={name} onChange={onChange} />
      </form>
    </div>
  );
};

export default Leaderboard;

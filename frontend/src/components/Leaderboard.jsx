import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Leaderboard = ({ time }) => {
  const [name, setName] = useState("");
  const [leaders, setLeaders] = useState([]);
  const [isTopScore, setIsTopScore] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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
  }, [isTopScore, isSubmitted]);

  useEffect(() => {
    const compareScores = () => {
      const check = leaders.some((leader) => leader.score > time);
      setIsTopScore(check);
    };
    if (!isSubmitted) {
      compareScores();
    }
  }, [leaders, isSubmitted, time]);
  const onChange = (e) => {
    setName(e.target.value);
  };

  const onSubmitPress = (e) => {
    e.preventDefault(); // Prevent the default form submission

    axios
      .post("http://localhost:3000/leaderboard/topscore", {
        user: name,
        score: time,
      })
      .then((response) => {
        console.log("Score submitted:", response.data);
        setIsTopScore(false);
        setIsSubmitted(true);
      })
      .catch((error) => {
        console.error("Error submitting score:", error);
      });
  };

  const onClickPress = (e) => {
    navigate("/");
  };

  return (
    <div>
      <h1>Scoreboard</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Seconds</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((leader, index) => (
            <tr key={index}>
              <td>{leader.username}</td>
              <td>{leader.score / 1000}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1>Your time was: {time / 1000}</h1>
      {!isSubmitted && isTopScore && (
        <form onSubmit={onSubmitPress}>
          <label>
            Name - 5 Characters:
            <input type="text" value={name} onChange={onChange} maxLength={5} />
          </label>
          <label>Time: {time / 1000}</label>
          <button type="submit">Submit Score</button>
        </form>
      )}
      <button onClick={onClickPress}>Start Again</button>
    </div>
  );
};

export default Leaderboard;

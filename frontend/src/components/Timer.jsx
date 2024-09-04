import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

const Timer = ({ completeFlag, onGameEnd }) => {
  const [timerData, setTimerData] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [startTime, setStartTime] = useState(null);

  const startTimer = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/game/start-game",
        {}, // empty object as second argument for consistency
        { withCredentials: true } // explicitly set withCredentials
      );
      setTimerData(response.data);
      setStartTime(Date.now());
    } catch (error) {
      console.error("Error starting timer:", error);
    }
  };

  useEffect(() => {
    if (!timerData) {
      startTimer();
    }

    const interval = setInterval(() => {
      if (timerData && startTime) {
        const elapsedTime = Date.now() - startTime;
        setTimerData((prevTimerData) => ({
          ...prevTimerData,
          elapsedTime: Math.floor(elapsedTime / 1000), // Convert to seconds
        }));
      }
    }, 1000);

    setIntervalId(interval);
    return () => clearInterval(interval);
  }, [timerData, startTime]);

  useEffect(() => {
    const completeGame = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/game/complete-game",
          {}, // empty object as second argument for consistency
          { withCredentials: true } // explicitly set withCredentials
        );
        console.log("Game complete");
        console.log(response.data);
        onGameEnd(response.data.clearTime); // Pass the final time to the parent component
      } catch (error) {
        console.error("Error completing game:", error);
      }
    };
    if (completeFlag) {
      clearInterval(intervalId);
      completeGame();
    }
  }, [completeFlag]); // Added onGameEnd to dependency array

  return (
    <div>
      <h1>Time</h1>
      {timerData && (
        <div>
          <p>
            Timer started at:{" "}
            {new Date(timerData.startTime).toLocaleTimeString()}
          </p>
          <p>Elapsed Time: {timerData.elapsedTime || 0} seconds</p>
        </div>
      )}
    </div>
  );
};

export default Timer;

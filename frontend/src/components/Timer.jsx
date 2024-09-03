import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

const Timer = ({ completeFlag, onGameEnd }) => {
  const [timerData, setTimerData] = useState(null);

  const startTimer = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/game/start-game",
        {}, // empty object as second argument for consistency
        { withCredentials: true } // explicitly set withCredentials
      );
      setTimerData(response.data);
    } catch (error) {
      console.error("Error starting timer:", error);
    }
  };

  useEffect(() => {
    if (!timerData) {
      startTimer();
    }

    const interval = setInterval(async () => {
      if (timerData) {
        try {
          const response = await axios.get(
            "http://localhost:3000/timer/elapsed-time",
            { withCredentials: true }
          );
          setTimerData(response.data);
        } catch (error) {
          console.error("Error getting elapsed time:", error);
        }
      }
    }, 1000); // Poll every second

    return () => clearInterval(interval);
  }, [timerData]);

  useEffect(() => {
    const completeGame = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/game/complete-game",
          {}, // empty object as second argument for consistency
          { withCredentials: true } // explicitly set withCredentials
        );
        onGameEnd(response.data.clearTime); // Pass the final time to the parent component
      } catch (error) {
        console.error("Error completing game:", error);
      }
    };
    if (completeFlag) {
      completeGame();
    }
  }, [completeFlag, onGameEnd]); // Added onGameEnd to dependency array

  return (
    <div>
      <h1>Time</h1>
      {timerData && (
        <div>
          <p>
            Timer started at:{" "}
            {new Date(timerData.startTime).toLocaleTimeString()}
          </p>
          <p>Elapsed Time: {timerData.elapsedTime} seconds</p>
        </div>
      )}
    </div>
  );
};

export default Timer;

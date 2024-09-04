import { useLocation } from "react-router-dom";
import Leaderboard from "../components/Leaderboard";

const ScorePage = () => {
  const location = useLocation();
  const { finalTime } = location.state || { finalTime: 9999999 }; // Default to 0 if finalTime is not passed

  return (
    <>
      <Leaderboard time={finalTime} />
    </>
  );
};

export default ScorePage;

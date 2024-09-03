import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import ScorePage from "./pages/ScorePage";
import TestingCookies from "./pages/TestingCookies";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/score" element={<ScorePage />} />
        <Route path="/test" element={<TestingCookies />} />
      </Routes>
    </Router>
  );
};

export default App;

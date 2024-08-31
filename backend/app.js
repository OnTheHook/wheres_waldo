const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const characterLocationsRoutes = require("./routes/characterLocations");
const gameRoutes = require("./routes/game");
const timerRoutes = require("./routes/timer");
const leaderboardRoutes = require("./routes/leaderboard");
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/get-cookie", (req, res) => {
  console.log(req.cookies); // This should now log the cookies correctly
  res.json({ message: "Check your console for logged cookies!" });
});

app.use("/locations", characterLocationsRoutes);
app.use("/game", gameRoutes);
app.use("/timer", timerRoutes);
app.use("/leaderboard", leaderboardRoutes);

app.listen(3000, () => console.log("Listening on port 3000"));

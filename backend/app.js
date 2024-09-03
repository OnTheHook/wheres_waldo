const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const characterLocationsRoutes = require("./routes/characterLocations");
const gameRoutes = require("./routes/game");
const timerRoutes = require("./routes/timer");
const leaderboardRoutes = require("./routes/leaderboard");
const corsOptions = {
  origin: "http://127.0.0.1:5173",
  credentials: true,
};

const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/endpoint", (req, res) => {
  res.cookie("myCookie", "cookieValue", {
    httpOnly: true,
    secure: true, // Ensure your site is served over HTTPS
    sameSite: "None",
  });
  res.send("Cookie set");
});

app.use("/locations", characterLocationsRoutes);
app.use("/game", gameRoutes);
app.use("/timer", timerRoutes);
app.use("/leaderboard", leaderboardRoutes);

app.listen(3000, () => console.log("Listening on port 3000"));

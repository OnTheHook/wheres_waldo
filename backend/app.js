const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const characterLocationsRoutes = require("./routes/characterLocations");
const gameRoutes = require("./routes/game");
const timerRoutes = require("./routes/timer");

const corsOptions = {
  origin: "http://127.0.0.1:5173",
  credentials: true,
  optionsSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/locations", characterLocationsRoutes);
app.use("/game", gameRoutes);
app.use("/timer", timerRoutes);

app.listen(3000, () => console.log("Listening on port 3000"));

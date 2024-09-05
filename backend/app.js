require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const characterLocationsRoutes = require("./routes/characterLocations");
const gameRoutes = require("./routes/game");
const timerRoutes = require("./routes/timer");
const leaderboardRoutes = require("./routes/leaderboard");
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");

const app = express();

// For launching with fly.io
app.set("trust proxy", 1);

// Add Helmet to secure HTTP headers
app.use(helmet());

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Compress all HTTP responses
app.use(compression());

// Set up a rate limiter to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Add request logging with Morgan
app.use(morgan("combined"));

app.get("/ip", (request, response) => response.send(request.ip));

app.use("/locations", characterLocationsRoutes);
app.use("/game", gameRoutes);
app.use("/timer", timerRoutes);
app.use("/leaderboard", leaderboardRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(3000, () => console.log("Listening on port 3000"));

const express = require("express");
const leaderboardController = require("../controllers/leaderboardController");
const router = express.Router();

router.get("/leaders", leaderboardController.getTopScores);
router.post("/topscore", leaderboardController.insertTopScore);

module.exports = router;

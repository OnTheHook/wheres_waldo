const express = require("express");
const gameController = require("../controllers/gameController");
const router = express.Router();

router.post("/start-game", gameController.startGame);
router.post("/complete-game", gameController.completeGame);

module.exports = router;

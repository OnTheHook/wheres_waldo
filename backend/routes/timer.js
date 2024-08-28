const express = require("express");
const timerController = require("../controllers/timerController");
const router = express.Router();

router.get("/elapsed-time", timerController.elapsedTime);

module.exports = router;

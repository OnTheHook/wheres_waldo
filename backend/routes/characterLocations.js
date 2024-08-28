const express = require("express");
const router = express.Router();
const {
  getCharacterInfo,
} = require("../controllers/characterLocationsConrtoller");

router.get("/", getCharacterInfo);

module.exports = router;

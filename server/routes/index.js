const express = require("express");
const router = express.Router();

const {current} = require("../controllers/CurrentController");
const {history} = require("../controllers/HistoryController");

console.log(current, history);

router.get("/current", current);
router.get("/history", history);

module.exports = router;

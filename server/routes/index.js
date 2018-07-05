const express = require("express");
const router = express.Router();

const { current } = require("../controllers/CurrentController");
const { history } = require("../controllers/HistoryController");
const { usage } = require("../controllers/UsageController");
// import { usageSummary } from "../controllers/UsageSummaryController";

router.get("/current", current);
router.get("/history", history);
router.get("/usage/:period", usage);

module.exports = router;

const express = require("express");
const router = express.Router();

const { current } = require("../controllers/CurrentController");
const { usage } = require("../controllers/UsageController");
import { usageSummary } from "../controllers/UsageSummaryController";

router.get("/current", current);
router.get("/usage/:period", usage);
router.get("/usage-summary/:period", usageSummary);

module.exports = router;

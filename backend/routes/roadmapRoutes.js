const express = require("express");
const router = express.Router();
const { saveRoadmap, getRoadmaps } = require("../controllers/roadmapController");

router.post("/save", saveRoadmap);
router.get("/all", getRoadmaps);

module.exports = router;
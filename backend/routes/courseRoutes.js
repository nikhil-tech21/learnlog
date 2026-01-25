const express = require("express");
const router = express.Router();
const { createCourse, getCourses } = require("../controllers/courseController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, createCourse);
router.get("/all", authMiddleware, getCourses);

module.exports = router;
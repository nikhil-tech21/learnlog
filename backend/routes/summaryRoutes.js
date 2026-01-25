const express = require("express");
const router = express.Router();
const multer = require("multer");
const { summarizePDF } = require("../controllers/summaryController");

const upload = multer({ dest: "uploads/" });

router.post("/pdf", upload.single("file"), summarizePDF);

module.exports = router;
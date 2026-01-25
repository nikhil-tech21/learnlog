const express = require("express");
const router = express.Router();
const { saveChat, getChats } = require("../controllers/chatController");

router.post("/save", saveChat);
router.get("/all", getChats);

module.exports = router;
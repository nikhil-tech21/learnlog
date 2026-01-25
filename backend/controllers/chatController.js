const Chat = require("../models/Chat");

exports.saveChat = async (req, res) => {
  const { sender, message } = req.body;
  const chat = new Chat({ sender, message });
  await chat.save();
  res.json({ msg: "Chat saved" });
};

exports.getChats = async (req, res) => {
  const chats = await Chat.find().sort({ createdAt: 1 });
  res.json(chats);
};
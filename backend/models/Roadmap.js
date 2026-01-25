const mongoose = require("mongoose");

const roadmapSchema = new mongoose.Schema({
  topic: String,
  steps: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Roadmap", roadmapSchema);
const Roadmap = require("../models/Roadmap");

exports.saveRoadmap = async (req, res) => {
  const { topic, steps } = req.body;

  const roadmap = new Roadmap({ topic, steps });
  await roadmap.save();

  res.json({ msg: "Roadmap saved" });
};

exports.getRoadmaps = async (req, res) => {
  const roadmaps = await Roadmap.find().sort({ createdAt: -1 });
  res.json(roadmaps);
};
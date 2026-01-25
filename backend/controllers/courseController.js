const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
  try {
    const { title, notes } = req.body;

    const course = await Course.create({
      title,
      notes,
      createdBy: req.user.id, // 👈 comes from token
    });

    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getCourses = async (req, res) => {
  const courses = await Course.find().populate("createdBy", "name email");
  res.json(courses);
};
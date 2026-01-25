const fs = require("fs");

exports.summarizePDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    // read file as text
    const text = fs.readFileSync(req.file.path, "utf8");

    const summary = text.substring(0, 500) + "...";

    fs.unlinkSync(req.file.path);

    res.json({ summary });

  } catch (error) {
    console.error("PDF ERROR:", error);
    res.status(500).json({
      msg: "PDF processing failed",
      error: error.message,
    });
  }
};
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const summaryRoutes = require("./routes/summaryRoutes");
const aiRoutes = require("./routes/aiRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes"); // ✅ NEW
const chatRoutes = require("./routes/chatRoutes");       // ✅ NEW

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/summary", summaryRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/roadmap", roadmapRoutes); // ✅ SAVE ROADMAP
app.use("/api/chat", chatRoutes);       // ✅ SAVE CHAT

app.get("/", (req, res) => {
  res.send("LearnLog Backend Running");
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
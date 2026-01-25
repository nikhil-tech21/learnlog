import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

export default function Roadmap() {
  const [goal, setGoal] = useState("");
  const [roadmap, setRoadmap] = useState([]);

  // ✅ Load roadmap from DB
  const loadRoadmap = async () => {
    try {
      const res = await API.get("/roadmap/all");
      if (res.data.length > 0) {
        setGoal(res.data[0].goal);
        setRoadmap(res.data[0].steps);
      }
    } catch (err) {
      console.log("Load roadmap error");
    }
  };

  useEffect(() => {
    loadRoadmap();
  }, []);

  // 🧠 Fake AI roadmap logic
  const generateSteps = (text) => {
    const msg = text.toLowerCase();

    if (msg.includes("machine learning")) {
      return [
        "📘 Python & Math Basics",
        "📊 Statistics & Probability",
        "🤖 ML Algorithms (Regression, Trees)",
        "🧠 Neural Networks",
        "🛠️ ML Projects",
        "💼 Interview Preparation"
      ];
    }

    if (msg.includes("data analytics") || msg.includes("data analysis")) {
      return [
        "📘 Excel & SQL",
        "🐍 Python for Data",
        "📊 Data Visualization (Power BI/Tableau)",
        "🧩 Statistics",
        "🛠️ Real-world Projects",
        "💼 Job Preparation"
      ];
    }

    if (msg.includes("full stack")) {
      return [
        "🌐 HTML, CSS, JavaScript",
        "⚛️ React Frontend",
        "🧠 Node.js & Express",
        "🗄️ MongoDB",
        "🛠️ Full Stack Projects",
        "💼 Interview Prep"
      ];
    }

    return [
      "❓ Please enter: Machine Learning, Data Analytics, or Full Stack Development"
    ];
  };

  const generateRoadmap = async () => {
    if (!goal.trim()) return alert("Enter your learning goal");

    const data = generateSteps(goal);
    setRoadmap(data);

    // ✅ Save to DB
    try {
      await API.post("/roadmap/save", {
        goal,
        steps: data
      });
    } catch (err) {
      console.log("Save roadmap error");
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        <div style={styles.box}>
          <h2>🗺️ Learning Roadmap Generator</h2>
          <p>Enter what you want to learn and get a step-by-step roadmap.</p>

          <input
            style={styles.input}
            placeholder="Machine Learning / Data Analytics / Full Stack Development"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />

          <button style={styles.button} onClick={generateRoadmap}>
            Generate Roadmap
          </button>

          {roadmap.length > 0 && (
            <div style={styles.list}>
              {roadmap.map((step, i) => (
                <div key={i} style={styles.card}>
                  Step {i + 1}: {step}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ---------- STYLES ---------- */
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#0b0b12,#1a1a2e)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px",
    color: "white"
  },
  box: {
    width: "100%",
    maxWidth: "700px",
    background: "#161622",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 0 20px rgba(0,0,0,0.5)"
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "15px 0",
    borderRadius: "8px",
    border: "none",
    outline: "none"
  },
  button: {
    padding: "10px 20px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(90deg,#7f5af0,#5f27cd)",
    color: "white",
    cursor: "pointer"
  },
  list: {
    marginTop: "20px",
    display: "grid",
    gap: "10px"
  },
  card: {
    background: "#1c1c2b",
    padding: "12px",
    borderRadius: "8px"
  }
};
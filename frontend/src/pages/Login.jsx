import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import image1 from "../assets/images/images1.jpg";
import image2 from "../assets/images/images2.jpg";
import image3 from "../assets/images/images3.jpg";

export default function Login() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = useMemo(
    () => [
      {
        image: image1,
        title: "AI-Powered Smart Summaries",
        desc: "Convert long PDFs and textbooks into concise notes using AI.",
      },
      {
        image: image2,
        title: "Instant Doubt Resolution",
        desc: "Ask questions directly from study material and get AI answers.",
      },
      {
        image: image3,
        title: "Collaborative Learning",
        desc: "Share notes, discuss concepts, and learn together.",
      },
    ],
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agree) {
      alert("Please accept Terms & Conditions");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/auth/login", credentials);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* LEFT SIDE */}
        <div style={styles.left}>
          <img
            src={slides[currentSlide].image}
            alt="slide"
            style={styles.image}
          />
          <div style={styles.overlay}>
            <h2>{slides[currentSlide].title}</h2>
            <p>{slides[currentSlide].desc}</p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div style={styles.right}>

          {/* TITLE */}
          <h1 style={styles.title}>
            <span style={styles.icon}>📚</span>
            <span style={styles.text}>LearnLog</span>
          </h1>

          <p style={{ color: "#aaa", marginBottom: "20px" }}>
            AI-driven learning platform
          </p>

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={credentials.email}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={handleChange}
              required
              style={styles.input}
            />

            <div style={{ marginBottom: "15px" }}>
              <input
                type="checkbox"
                checked={agree}
                onChange={() => setAgree(!agree)}
              />{" "}
              I agree to Terms & Conditions
            </div>

            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p style={{ marginTop: "15px" }}>
            New to LearnLog?{" "}
            <span
              style={styles.link}
              onClick={() => navigate("/signup")}
            >
              Create Account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0b0b12, #1a1a2e)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "80%",
    maxWidth: "1000px",
    height: "500px",
    display: "flex",
    borderRadius: "20px",
    overflow: "hidden",
    background: "#161622",
    boxShadow: "0 0 30px rgba(0,0,0,0.5)",
  },
  left: {
    width: "50%",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  overlay: {
    position: "absolute",
    bottom: "20px",
    left: "20px",
    color: "white",
    background: "rgba(0,0,0,0.5)",
    padding: "15px",
    borderRadius: "10px",
  },
  right: {
    width: "50%",
    padding: "40px",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  /* TITLE STYLES */
  title: {
    fontSize: "42px",
    fontWeight: "800",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  icon: {
    color: "#7f5af0",
  },
  text: {
    color: "#ffffff",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(90deg,#7f5af0,#5f27cd)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
  link: {
    color: "#9b7bff",
    cursor: "pointer",
  },
};
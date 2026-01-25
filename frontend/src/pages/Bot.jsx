import React, { useState } from "react";
import Navbar from "../components/Navbar";

export default function Bot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋 I'm LearnLog AI. Ask me about Machine Learning, Data Analytics, or Full Stack Development!" }
  ]);
  const [input, setInput] = useState("");

  const getAIReply = (text) => {
    const msg = text.toLowerCase();

    if (msg.includes("machine learning")) {
      return "📘 Machine Learning is about teaching computers using data. Start with Python, statistics, then learn algorithms like Linear Regression, Decision Trees, and Neural Networks.";
    }

    if (msg.includes("data analytics") || msg.includes("data analysis")) {
      return "📊 Data Analytics focuses on extracting insights from data using Excel, SQL, Python, and visualization tools like Power BI or Tableau.";
    }

    if (msg.includes("full stack")) {
      return "💻 Full Stack Development includes frontend (HTML, CSS, JavaScript, React) and backend (Node.js, Express, MongoDB). Build projects to master it.";
    }

    return "❓ Please ask about Machine Learning, Data Analytics, or Full Stack Development.";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const reply = getAIReply(input);

    setTimeout(() => {
      const botMsg = { sender: "bot", text: reply };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);

    setInput("");
  };

  return (
    <>
      <Navbar />
      <div style={styles.page}>
        <div style={styles.chatBox}>
          <h2>🤖 LearnLog AI Bot</h2>

          <div style={styles.messages}>
            {messages.map((m, i) => (
              <div key={i} style={m.sender === "user" ? styles.user : styles.bot}>
                {m.text}
              </div>
            ))}
          </div>

          <div style={styles.inputBox}>
            <input
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={styles.input}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage} style={styles.button}>Send</button>
          </div>
        </div>
      </div>
    </>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg,#0b0b12,#1a1a2e)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  chatBox: {
    width: "800px",
    background: "#161622",
    padding: "20px",
    borderRadius: "15px",
    color: "white",
  },
  messages: {
    minHeight: "300px",
    marginBottom: "15px",
    overflowY: "auto",
  },
  user: {
    textAlign: "right",
    background: "#7f5af0",
    padding: "8px",
    borderRadius: "8px",
    margin: "5px",
  },
  bot: {
    textAlign: "left",
    background: "#2c2c3a",
    padding: "8px",
    borderRadius: "8px",
    margin: "5px",
  },
  inputBox: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "none",
  },
  button: {
    background: "#7f5af0",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "10px 15px",
    cursor: "pointer",
  },
};
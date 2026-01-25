import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

export default function Chat() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Welcome to LearnLog Chat Room!" },
    { sender: "bot", text: "Ask doubts, discuss topics, or collaborate here." }
  ]);

  const [input, setInput] = useState("");

  // ✅ Load chat from DB
  const loadChat = async () => {
    try {
      const res = await API.get("/chat/all");
      if (res.data.length > 0) {
        setMessages(res.data);
      }
    } catch (err) {
      console.log("Load chat error");
    }
  };

  useEffect(() => {
    loadChat();
  }, []);

  // 🧠 Fake AI logic
  const getBotReply = (text) => {
    const msg = text.toLowerCase();

    if (msg.includes("machine learning")) {
      return "Machine Learning is about teaching computers to learn from data. Start with Python, statistics, then learn algorithms like Linear Regression, Decision Trees, and Neural Networks.";
    }

    if (msg.includes("data analytics") || msg.includes("data analysis")) {
      return "Data Analytics focuses on analyzing data to find insights. Learn Excel, SQL, Python, and visualization tools like Power BI or Tableau.";
    }

    if (msg.includes("full stack")) {
      return "Full Stack Development means building both frontend and backend. Learn HTML, CSS, JavaScript, React, Node.js, Express, and MongoDB.";
    }

    return "🤖 I can help only with: Machine Learning, Data Analytics, or Full Stack Development.";
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    const botReply = getBotReply(input);
    const botMsg = { sender: "bot", text: botReply };

    const newMessages = [...messages, userMsg, botMsg];
    setMessages(newMessages);
    setInput("");

    // ✅ Save to DB
    try {
      await API.post("/chat/save", { messages: newMessages });
    } catch (err) {
      console.log("Save chat error");
    }
  };

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        <div style={styles.chatBox}>
          <h2>💬 LearnLog Chat Room</h2>

          <div style={styles.messages}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={m.sender === "user" ? styles.userMessage : styles.botMessage}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div style={styles.inputBox}>
            <input
              style={styles.input}
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button style={styles.button} onClick={sendMessage}>
              Send
            </button>
          </div>
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
  chatBox: {
    width: "100%",
    maxWidth: "800px",
    background: "#161622",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 0 20px rgba(0,0,0,0.5)",
    display: "flex",
    flexDirection: "column",
    height: "600px"
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    marginBottom: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  userMessage: {
    alignSelf: "flex-end",
    background: "linear-gradient(90deg,#7f5af0,#5f27cd)",
    padding: "10px 15px",
    borderRadius: "15px",
    maxWidth: "70%"
  },
  botMessage: {
    alignSelf: "flex-start",
    background: "#1c1c2b",
    padding: "10px 15px",
    borderRadius: "15px",
    maxWidth: "70%"
  },
  inputBox: {
    display: "flex",
    gap: "10px"
  },
  input: {
    flex: 1,
    padding: "12px",
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
  }
};
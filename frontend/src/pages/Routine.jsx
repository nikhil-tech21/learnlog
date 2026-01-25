import React, { useState } from "react";
import Navbar from "../components/Navbar";

export default function Routine() {
  const [tasks, setTasks] = useState(
    Array.from({ length: 20 }, () => ({ text: "", done: false }))
  );

  const updateTask = (index, value) => {
    const updated = [...tasks];
    updated[index].text = value;
    setTasks(updated);
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const clearTask = (index) => {
    const updated = [...tasks];
    updated[index] = { text: "", done: false };
    setTasks(updated);
  };

  return (
    <>
      <Navbar />

      <div style={styles.page}>
        <div style={styles.container}>
          <h2 style={styles.heading}>GOALS</h2>

          <div style={styles.list}>
            {tasks.map((task, i) => (
              <div key={i} style={styles.row}>
                {/* CHECKBOX (hidden if empty) */}
                {task.text && (
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(i)}
                    style={styles.checkbox}
                  />
                )}

                {/* INPUT */}
                <input
                  type="text"
                  value={task.text}
                  onChange={(e) => updateTask(i, e.target.value)}
                  style={{
                    ...styles.input,
                    textDecoration: task.done ? "line-through" : "none",
                    color: task.done ? "#999" : "#fff"
                  }}
                />

                {/* REMOVE ICON (hidden if empty) */}
                {task.text && (
                  <span style={styles.remove} onClick={() => clearTask(i)}>
                    ✖
                  </span>
                )}
              </div>
            ))}
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

  /* 🌟 UPDATED CONTAINER ONLY */
  container: {
    width: "100%",
    maxWidth: "500px",
    padding: "25px",
    borderRadius: "18px",

    background: "linear-gradient(135deg, #1f1f3a, #161622)",
    border: "1px solid rgba(255,255,255,0.1)",

    boxShadow: `
      0 0 25px rgba(127,90,240,0.25),
      inset 0 0 10px rgba(255,255,255,0.05)
    `,
    backdropFilter: "blur(6px)"
  },

  heading: {
    textAlign: "center",
    letterSpacing: "3px",
    marginBottom: "20px"
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    borderBottom: "1px dotted #ff9f68",
    paddingBottom: "5px"
  },
  checkbox: {
    width: "16px",
    height: "16px",
    cursor: "pointer"
  },
  input: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    color: "white",
    fontSize: "14px"
  },
  remove: {
    cursor: "pointer",
    color: "#ff4d4d",
    fontSize: "14px"
  }
};
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.navbar}>
      <h2 style={styles.logo}>📘 LearnLog</h2>

      <div style={styles.links}>
        <Link to="/dashboard" style={styles.link}>Home</Link>
        <Link to="/summarize" style={styles.link}>Summarizer</Link>
        <Link to="/bot" style={styles.link}>Bot</Link>
        <Link to="/roadmap" style={styles.link}>Roadmap</Link>
        <Link to="/chat" style={styles.link}>Chat</Link>
        <Link to="/routine" style={styles.link}>Daily Routine</Link>
      </div>

      <button onClick={logout} style={styles.logout}>Logout</button>
    </div>
  );
}

const styles = {
  navbar: {
    height: "60px",
    background: "#161622",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 30px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
  },
  logo: {
    margin: 0,
  },
  links: {
    display: "flex",
    gap: "20px",
  },
  link: {
    color: "#c9c9ff",
    textDecoration: "none",
    fontWeight: "500",
  },
  logout: {
    background: "#7f5af0",
    border: "none",
    padding: "6px 14px",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
  },
};
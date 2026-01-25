import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Summarizer() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("Please select a PDF");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setError("");
      setSummary("");

      const res = await API.post("/summary/pdf", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSummary(res.data.summary);
    } catch (err) {
      console.error(err);
      setError("Failed to summarize PDF");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div style={page}>
        <div style={card}>
          <h2>📄 PDF Summarizer</h2>
          <p style={{ color: "#aaa" }}>
            Upload your PDF and get instant AI summary.
          </p>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
            style={input}
          />

          <button onClick={handleUpload} style={button}>
            {loading ? "Summarizing..." : "Upload & Summarize"}
          </button>

          {error && <p style={{ color: "red" }}>{error}</p>}

          {summary && (
            <div style={resultBox}>
              <h3>📑 Summary</h3>
              <p style={{ whiteSpace: "pre-line" }}>{summary}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ---------- STYLES ---------- */
const page = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,#0b0b12,#1a1a2e)",
  padding: "40px",
  color: "white",
};

const card = {
  maxWidth: "700px",
  margin: "auto",
  background: "#161622",
  padding: "30px",
  borderRadius: "15px",
  boxShadow: "0 0 20px rgba(0,0,0,0.6)",
};

const input = {
  display: "block",
  margin: "20px 0",
  color: "white",
};

const button = {
  padding: "12px 25px",
  background: "linear-gradient(90deg,#7f5af0,#5f27cd)",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

const resultBox = {
  marginTop: "25px",
  background: "#1c1c2b",
  padding: "20px",
  borderRadius: "10px",
};
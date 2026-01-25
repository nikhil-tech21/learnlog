import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [courses, setCourses] = useState([]);
  const [trash, setTrash] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [editNotes, setEditNotes] = useState("");

  const createCourse = async () => {
    if (!title || !notes) return alert("Fill all fields");
    setLoading(true);
    await API.post("/course/create", { title, notes });
    setTitle("");
    setNotes("");
    loadCourses();
    setLoading(false);
  };

  const loadCourses = async () => {
    const res = await API.get("/course/all");
    setCourses(res.data);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  // ❌ Delete → move to trash
  const deleteCourse = (course) => {
    setTrash(prev => [...prev, course]);
    setCourses(prev => prev.filter(c => c._id !== course._id));
  };

  // ♻️ Restore
  const restoreCourse = (course) => {
    setCourses(prev => [...prev, course]);
    setTrash(prev => prev.filter(c => c._id !== course._id));
  };

  // 🗑️ Permanent delete
  const permanentDelete = (course) => {
    setTrash(prev => prev.filter(c => c._id !== course._id));
  };

  // ✏️ Edit
  const startEdit = (id, text) => {
    setEditId(id);
    setEditNotes(text);
  };

  const saveEdit = () => {
    setCourses(prev =>
      prev.map(c => c._id === editId ? { ...c, notes: editNotes } : c)
    );
    setEditId(null);
  };

  // 🔍 Search
  const filteredCourses = courses.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.notes.toLowerCase().includes(search.toLowerCase())
  );

  // 🧲 Drag & Drop
  const onDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  };

  const onDrop = (e, index) => {
    const fromIndex = e.dataTransfer.getData("index");
    const updated = [...courses];
    const moved = updated.splice(fromIndex, 1)[0];
    updated.splice(index, 0, moved);
    setCourses(updated);
  };

  return (
    <>
      <Navbar />

      <div style={dash.page}>
        <div style={dash.container}>
          <h2 style={dash.heading}>📚 Your Courses</h2>
          <p style={dash.subtext}>Create and manage your learning notes.</p>

          {/* SEARCH */}
          <input
            placeholder="🔍 Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={dash.search}
          />

          {/* CREATE */}
          <div style={dash.form}>
            <input
              placeholder="Course Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={dash.input}
            />
            <textarea
              placeholder="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={dash.textarea}
            />
            <button onClick={createCourse} style={dash.button}>
              {loading ? "Creating..." : "➕ Create Course"}
            </button>
          </div>

          <h3>📖 Notes</h3>

          <div style={dash.list}>
            {filteredCourses.map((c, index) => (
              <div
                key={c._id}
                style={dash.card}
                draggable
                onDragStart={(e) => onDragStart(e, index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => onDrop(e, index)}
              >
                <span style={dash.deleteIcon} onClick={() => deleteCourse(c)}>✖</span>

                <h4 style={dash.cardTitle}>{c.title}</h4>

                {editId === c._id ? (
                  <>
                    <textarea
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                      style={dash.editBox}
                    />
                    <button onClick={saveEdit} style={dash.saveBtn}>Save</button>
                  </>
                ) : (
                  <>
                    <p style={dash.cardText}>{c.notes}</p>
                    <button style={dash.editBtn} onClick={() => startEdit(c._id, c.notes)}>✏️ Edit</button>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* ♻️ RECYCLE BIN */}
          {trash.length > 0 && (
            <>
              <h3 style={{ marginTop: "30px" }}>🗑️ Recycle Bin</h3>
              <div style={dash.list}>
                {trash.map(c => (
                  <div key={c._id} style={{ ...dash.card, opacity: 0.6 }}>
                    <h4>{c.title}</h4>

                    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                      <button style={dash.saveBtn} onClick={() => restoreCourse(c)}>
                        Restore
                      </button>

                      <button
                        style={{ ...dash.saveBtn, background: "#ff4d4d" }}
                        onClick={() => permanentDelete(c)}
                      >
                        Delete Forever
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
}

/* ---------- STYLES ---------- */
const dash = {
  page: { minHeight: "100vh", background: "linear-gradient(135deg,#0b0b12,#1a1a2e)", padding: "30px", color: "white" },
  container: { maxWidth: "1100px", margin: "auto" },
  heading: { fontSize: "30px" },
  subtext: { color: "#aaa" },

  search: { width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "8px", border: "none" },

  form: { background: "#161622", padding: "20px", borderRadius: "12px", marginBottom: "20px" },
  input: { width: "100%", padding: "12px", marginBottom: "10px" },
  textarea: { width: "100%", height: "90px", padding: "12px" },

  button: { background: "linear-gradient(90deg,#7f5af0,#5f27cd)", color: "white", padding: "10px 20px", borderRadius: "8px" },

  list: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: "15px" },

  card: { background: "#1c1c2b", padding: "15px", borderRadius: "10px", position: "relative", cursor: "grab" },

  deleteIcon: { position: "absolute", top: "8px", left: "10px", cursor: "pointer", color: "#ff4d4d" },

  cardTitle: { color: "#9b7bff" },
  cardText: { fontSize: "14px" },

  editBtn: { marginTop: "8px", background: "transparent", color: "#9b7bff", border: "none", cursor: "pointer" },

  editBox: { width: "100%", padding: "8px", borderRadius: "6px" },

  saveBtn: { marginTop: "5px", background: "#7f5af0", border: "none", padding: "6px 12px", color: "white", borderRadius: "6px" },
};
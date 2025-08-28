import React, { useEffect, useState } from "react";
import {
  getFamilyGroups,
  createFamilyGroup,
  deleteFamilyGroup,
} from "../services/familyGroupApi";
import "../styles/familyGroup.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../pages/Sidebar"; // Sidebar import

export default function FamilyGroup() {
  const [groups, setGroups] = useState([]);
  const [formData, setFormData] = useState({ groupName: "", description: "" });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch groups
  const fetchGroups = async () => {
    try {
      const res = await getFamilyGroups(token);
      setGroups(res.data);
    } catch (err) {
      setMessage({
        type: "error",
        text: err?.message || "Failed to load groups",
      });
    }
  };

  useEffect(() => {
    fetchGroups();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await createFamilyGroup(formData, token);
      setMessage({ type: "success", text: res.message });
      setFormData({ groupName: "", description: "" });
      fetchGroups();
    } catch (err) {
      setMessage({ type: "error", text: err?.message || "Action failed" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this group?")) return;
    try {
      const res = await deleteFamilyGroup(id, token);
      setMessage({ type: "success", text: res.message });
      fetchGroups();
    } catch (err) {
      setMessage({ type: "error", text: err?.message || "Remove failed" });
    }
  };

  return (
    <div className="page-wrapper">
      {/* ✅ Sidebar fixed left */}
      <Sidebar />

      {/* ✅ Main Content covers rest of the page */}
      <div className="family-group-container">
        <h1>Family Groups</h1>
        <p>Manage your family's groups easily.</p>

        {message.text && (
          <div className={`alert alert-${message.type}`}>{message.text}</div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="group-form">
          <h2>Create Family Group</h2>
          <div className="form-group">
            <label htmlFor="groupName">Group Name</label>
            <input
              type="text"
              id="groupName"
              name="groupName"
              value={formData.groupName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Saving..." : "Create Group"}
          </button>
        </form>

        {/* Groups List */}
        <div className="groups-list">
          <h2>All Family Groups</h2>
          {groups.length === 0 ? (
            <p>No groups available</p>
          ) : (
            <ul>
              {groups.map((group) => (
                <li key={group._id} className="group-card">
                  <div>
                    <h3 onClick={() => navigate(`/family-group/${group._id}`)}>
                      {group.groupName}
                    </h3>
                    <p>{group.description}</p>
                  </div>
                  <div className="actions">
                    <button
                      onClick={() => handleDelete(group._id)}
                      className="delete-btn"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

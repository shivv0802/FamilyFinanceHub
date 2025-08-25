import React, { useEffect, useState } from "react";
import {
  getFamilyGroups,
  createFamilyGroup,
  updateFamilyGroup,
  deleteFamilyGroup,
} from "../services/familyGroupApi";
import "../styles/familyGroup.css"
import { useNavigate } from "react-router-dom";


export default function FamilyGroup() {
  const [groups, setGroups] = useState([]);
  const [formData, setFormData] = useState({ groupName: "", description: "" });
  const [editingGroup, setEditingGroup] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const token = localStorage.getItem("token");

  // Fetch all groups
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

  // Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res;
      if (editingGroup) {
        res = await updateFamilyGroup(editingGroup._id, formData, token);
       
      } else {
        res = await createFamilyGroup(formData, token);
      }

      setMessage({ type: "success", text: res.message });
      setFormData({ groupName: "", description: "" });
      setEditingGroup(null);
      fetchGroups();
    } catch (err) {
      setMessage({ type: "error", text: err?.message || "Action failed" });
    } finally {
      setLoading(false);
    }
  };

  // Edit
  const handleEdit = (group) => {
    setEditingGroup(group);
    setFormData({
      groupName: group.groupName,
      description: group.description,
    });
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this group?")) return;

    try {
      const res = await deleteFamilyGroup(id, token);
      setMessage({ type: "success", text: res.message });
      fetchGroups();
    } catch (err) {
      setMessage({ type: "error", text: err?.message || "Delete failed" });
    }
  };

  return (
    <div className="family-group-wrapper">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Family Hub</h2>
        <ul>
          <li className="active">Family Groups</li>
          <li>Expenses</li>
          <li>Budgets</li>
          <li>Goals</li>
        </ul>
      </div>

      {/* Main */}
      <div className="family-group-container">
        <h1>Family Expense Groups</h1>
        <p>Manage your family's groups, update or delete them easily.</p>

        {message.text && (
          <div className={`alert alert-${message.type}`}>{message.text}</div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="group-form">
          <h2>
            {editingGroup ? "Update Family Group" : "Create New Family Group"}
          </h2>

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
            {loading
              ? "Saving..."
              : editingGroup
              ? "Update Group"
              : "Create Group"}
          </button>

          {editingGroup && (
            <button
              type="button"
              className="cancel-btn"
              onClick={() => {
                setEditingGroup(null);
                setFormData({ groupName: "", description: "" });
              }}
            >
              Cancel
            </button>
          )}
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
                        <h3
          onClick={() => navigate(`/family-group/${group._id}`)}

        >
          {group.groupName}
        </h3>
                    <p>{group.description}</p>
                  </div>
                  <div className="actions">
                    <button
                      onClick={() => handleEdit(group)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(group._id)}
                      className="delete-btn"
                    >
                      Delete
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

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getUsersByFamilyGroup,
  addUserToFamilyGroup,
  updateFamilyGroupUser,
  removeUserFromFamilyGroup,
} from "../services/familyUserApi";
import "../styles/familyUser.css";
import { useNavigate } from "react-router-dom";

export default function FamilyUser() {
  const { familyGroupId } = useParams();
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ userId: "", isAdmin: false });
  const [editingUser, setEditingUser] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState(""); // admin/user

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const role = localStorage.getItem("role") || "user";
    setCurrentUserRole(role);
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getUsersByFamilyGroup(familyGroupId, token);
      setUsers(res.data);
    } catch (err) {
      setMessage({ type: "error", text: err?.message || "Failed to load users" });
    }
  };
useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await getUsersByFamilyGroup(familyGroupId, token);
      setUsers(res.data);
    } catch (err) {
      setMessage({ type: "error", text: err?.message || "Failed to load users" });
    }
  };
  fetchUsers();
}, [familyGroupId, token]);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res;
      if (editingUser) {
        res = await updateFamilyGroupUser(editingUser._id, formData, token);
      } else {
        res = await addUserToFamilyGroup({ ...formData, familyGroupId }, token);
      }

      setMessage({ type: "success", text: res.message });
      setFormData({ userId: "", isAdmin: false });
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      setMessage({ type: "error", text: err?.message || "Action failed" });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      userId: user.userId._id,
      isAdmin: user.isAdmin,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this user?")) return;

    try {
      const res = await removeUserFromFamilyGroup(id, token);
      setMessage({ type: "success", text: res.message });
      fetchUsers();
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
          <li onClick={() => navigate("/familyGroup")}>Family Groups</li>
          <li>Expenses</li>
          <li>Budgets</li>
          <li>Goals</li>
        </ul>
      </div>

      {/* Main */}
      <div className="family-group-container">
        <h1>Family Members</h1>
        <p>View and manage all members of this family group.</p>

        {message.text && (
          <div className={`alert alert-${message.type}`}>{message.text}</div>
        )}

        {/* Admin Form */}
        {currentUserRole === "admin" && (
          <form onSubmit={handleSubmit} className="group-form">
            <h2>{editingUser ? "Update Member" : "Add New Member"}</h2>

            <div className="form-group">
              <label htmlFor="userId">User ID</label>
              <input
                type="text"
                id="userId"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="isAdmin"
                  checked={formData.isAdmin}
                  onChange={handleChange}
                />
                Is Admin
              </label>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading
                ? "Saving..."
                : editingUser
                ? "Update Member"
                : "Add Member"}
            </button>

            {editingUser && (
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setEditingUser(null);
                  setFormData({ userId: "", isAdmin: false });
                }}
              >
                Cancel
              </button>
            )}
          </form>
        )}

        {/* Users List */}
        <div className="groups-list">
          <h2>Members</h2>
          {users.length === 0 ? (
            <p>No members found</p>
          ) : (
            <ul>
              {users.map((user) => (
                <li key={user._id} className="group-card">
                  <div>
                    <h3>
                      {user.userId.firstName} {user.userId.lastName}
                      {user.isAdmin && " (Admin)"}
                    </h3>
                    <p>Mobile: {user.userId.mobileNumber}</p>
                  </div>

                  {currentUserRole === "admin" && (
                    <div className="actions">
                      <button
                        onClick={() => handleEdit(user)}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="delete-btn"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}

          {/* Admin Actions */}
          {currentUserRole === "admin" && users.length > 0 && (
            <div className="admin-actions">
              <button
                className="submit-btn"
                onClick={() => {
                  setEditingUser(null);
                  setFormData({ userId: "", isAdmin: false });
                }}
              >
                Create User
              </button>
              <button
                className="delete-btn"
                onClick={() => alert("Select a user above to delete")}
              >
                Delete User
              </button>
              <button
                className="edit-btn"
                onClick={() => alert("Select a user above to update")}
              >
                Update User
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

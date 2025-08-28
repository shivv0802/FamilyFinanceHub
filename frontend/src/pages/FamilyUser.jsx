// FamilyUser.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import {
  getUsersByFamilyGroup,
  addUserToFamilyGroup,
  removeUserFromFamilyGroup,
} from "../services/familyUserApi";

import UserDropdown from "../pages/userDropdown";
import "../styles/familyUser.css";

export default function FamilyUser() {
  const { familyGroupId } = useParams();
  const [members, setMembers] = useState([]);
  const [formData, setFormData] = useState({
    userId: "",
    role: "user",
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState("user");
  const [addingUser, setAddingUser] = useState(false);

  const token = localStorage.getItem("token");

  // ✅ Decode JWT token to get role
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUserRole(decoded.role || "user");
      } catch (err) {
        console.error("Token decode failed:", err);
        setCurrentUserRole("user");
      }
    }
  }, [token]);

  // ✅ Fetch family members
  const fetchMembers = async () => {
    try {
      const res = await getUsersByFamilyGroup(familyGroupId, token);
      setMembers(res.data || []);
    } catch (err) {
      setMessage({
        type: "error",
        text: err?.response?.data?.message || "Failed to load members",
      });
    }
  };

  useEffect(() => {
    fetchMembers();
    // eslint-disable-next-line
  }, [familyGroupId]);

  // ✅ Select user from dropdown
  const handleSelectUser = (user) => {
    setFormData((prev) => ({
      ...prev,
      userId: user._id,
    }));
  };

  // ✅ Submit add
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.userId) {
        setMessage({ type: "error", text: "Please select a user" });
        setLoading(false);
        return;
      }

      const res = await addUserToFamilyGroup(
        { userId: formData.userId, familyGroupId, role: "user" },
        token
      );

      setMessage({
        type: "success",
        text: res.message || "Member added successfully",
      });
      setFormData({ userId: "", role: "user" });
      setAddingUser(false);
      fetchMembers();
    } catch (err) {
      setMessage({
        type: "error",
        text: err?.response?.data?.message || "Add failed",
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Remove member
  const handleRemove = async (id) => {
    if (!window.confirm("Are you sure you want to remove this member?")) return;
    try {
      const res = await removeUserFromFamilyGroup(id, token);
      setMessage({
        type: "success",
        text: res.message || "Member removed successfully",
      });
      fetchMembers();
    } catch (err) {
      setMessage({
        type: "error",
        text: err?.response?.data?.message || "Remove failed",
      });
    }
  };

  return (
    <div className="family-group-wrapper">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Family Hub
          </Link>
        </h2>
        <ul>
          <li><Link to="/familyGroup">Family Groups</Link></li>
          <li><Link to="/expenses">Expenses</Link></li>
          <li><Link to="/budgets">Budgets</Link></li>
          <li><Link to="/goals">Goals</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="family-group-container">
        <h1>Family Members</h1>
        <p>View and manage all members of this family group.</p>

        {message.text && (
          <div className={`alert alert-${message.type}`}>{message.text}</div>
        )}

        <div className="groups-list">
          <h2>Members</h2>
          {members.length === 0 && <p>No members found</p>}

          <ul>
            {members.map((member) => (
              <li key={member._id} className="group-card">
                <div>
                  <h3>
                    {member.userId.firstName} {member.userId.lastName}{" "}
                    {member.role === "admin" && " (Admin)"}
                  </h3>
                  <p>Mobile: {member.userId.mobileNumber}</p>
                </div>

                {currentUserRole === "admin" && (
                  <div className="actions">
                    <button
                      onClick={() => handleRemove(member._id)}
                      className="delete-btn"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </li>
            ))}

            {/* ✅ Add Member Form */}
            {addingUser && (
              <li className="group-card">
                <form onSubmit={handleSubmit} className="inline-form">
                  <UserDropdown
                    familyGroupId={familyGroupId}
                    onSelectUser={handleSelectUser}
                  />
                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? "Saving..." : "Add"}
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setAddingUser(false)}
                  >
                    Cancel
                  </button>
                </form>
              </li>
            )}
          </ul>

          {/* ✅ Add button for admins */}
          {currentUserRole === "admin" && !addingUser && (
            <button className="submit-btn" onClick={() => setAddingUser(true)}>
              Add Member
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

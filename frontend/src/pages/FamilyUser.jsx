import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  getUsersByFamilyGroup,
  addUserToFamilyGroup,
  removeUserFromFamilyGroup,
} from "../services/familyUserApi";
import UserDropdown from "../pages/userDropdown";
import Sidebar from "../pages/Sidebar"; // ✅ Use shared Sidebar
import "../styles/familyUser.css";

export default function FamilyUser() {
  const { familyGroupId } = useParams();
  const [members, setMembers] = useState([]);
  const [formData, setFormData] = useState({ userId: "", role: "user" });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState("user");
  const [addingUser, setAddingUser] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUserRole(decoded.role || "user");
      } catch {
        setCurrentUserRole("user");
      }
    }
  }, [token]);

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

  const handleSelectUser = (user) =>
    setFormData((prev) => ({ ...prev, userId: user._id }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.userId) {
      setMessage({ type: "error", text: "Please select a user" });
      setLoading(false);
      return;
    }

    try {
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
    <div className="page-wrapper">
      {/* ✅ Shared Sidebar */}
      <Sidebar />

      {/* ✅ Main Content */}
      <div className="page-content">
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

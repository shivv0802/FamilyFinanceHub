// Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Family Hub</h2>
      <ul>
        <li><Link to="/familyGroup">Family Groups</Link></li>
        <li><Link to="/familyTransactions">Family Transactions</Link></li>
        <li><Link to="/budgets">Budgets</Link></li>
        <li><Link to="/goals">Goals</Link></li>
      </ul>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { getTransactionsByFamilyGroup, createTransaction } from "../services/transactionApi";
import "../styles/familyTransaction.css"

export default function Expenses() {
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    categoryName: "",
    description: "",
    paymentMethod: "",
    date: "",
  });
  const [errors, setErrors] = useState({});

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const familyGroupId = localStorage.getItem("familyGroupId");

  const fetchTransactions = async () => {
    try {
      const res = await getTransactionsByFamilyGroup(familyGroupId);
      setTransactions(res.data);
    } catch (err) {
      console.error("Failed to load transactions", err);
    }
  };

  useEffect(() => {
    if (familyGroupId) {
      fetchTransactions();
    }
  }, [familyGroupId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.amount) newErrors.amount = "Amount is required.";
    if (!formData.categoryName) newErrors.categoryName = "Category is required.";
    if (!formData.paymentMethod) newErrors.paymentMethod = "Payment method is required.";
    if (!formData.date) newErrors.date = "Date is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      await createTransaction({
        ...formData,
        userId,
        familyGroupId,
        transactionType: "expense",
      });
      setShowForm(false);
      setFormData({
        amount: "",
        categoryName: "",
        description: "",
        paymentMethod: "",
        date: "",
      });
      fetchTransactions();
    } catch (err) {
      console.error("Failed to add transaction", err);
    }
  };

  return (
    <div className="family-group-wrapper">
      <div className="sidebar">
        <h2>Family Hub</h2>
        <ul>
          <li>Family Groups</li>
          <li className="active">Expenses</li>
          <li>Budgets</li>
          <li>Goals</li>
        </ul>
      </div>

      <div className="family-group-container">
        <h1>Manage Expenses</h1>
        <p>View and manage all expenses in your family group.</p>

        <div className="groups-list">
          {transactions.length === 0 ? (
            <p>No expenses yet</p>
          ) : (
            transactions.map((t) => (
              <div className="group-card" key={t._id}>
                <div>
                  <h3>
                    {t.categoryName} - {t.amount}
                  </h3>
                  <p>{t.description}</p>
                  <small>
                    {t.paymentMethod} | {new Date(t.date).toLocaleDateString()}
                  </small>
                </div>
              </div>
            ))
          )}
        </div>

        {showForm ? (
          <form className="inline-form" onSubmit={handleSubmit} noValidate>
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
            {errors.amount && <span className="error">{errors.amount}</span>}

            <input
              type="text"
              name="categoryName"
              placeholder="Category"
              value={formData.categoryName}
              onChange={handleChange}
              required
            />
            {errors.categoryName && <span className="error">{errors.categoryName}</span>}

            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />

            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
            >
              <option value="">Select Payment Method</option>
              <option value="Cash">Cash</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
            {errors.paymentMethod && <span className="error">{errors.paymentMethod}</span>}

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            {errors.date && <span className="error">{errors.date}</span>}

            <div className="form-actions">
              <button type="submit" className="submit-btn">Add Expense</button>
              <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        ) : (
          <button className="submit-btn" onClick={() => setShowForm(true)}>
            + Add Expense
          </button>
        )}
      </div>
    </div>
  );
}

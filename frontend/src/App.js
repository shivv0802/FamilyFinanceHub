import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import FamilyGroup from './pages/FamilyGroup';
import FamilyUser from './pages/FamilyUser';
import FamilyTransaction from './pages/FamilyTransaction';

import Budgets from './pages/Budget';
import Goals from './pages/Goal';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/familyGroup" element={<FamilyGroup />} />
          <Route path="/family-group/:familyGroupId" element={<FamilyUser />} />

          <Route path="/familyTransactions" element={<FamilyTransaction />} />

          <Route path="/budgets" element={<Budgets />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

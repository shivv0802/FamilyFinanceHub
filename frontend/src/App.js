import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup'
import Login from './pages/Login'
import FamilyGroup from './pages/FamilyGroup';
import FamilyUser from './pages/FamilyUser';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/familyGroup" element={<FamilyGroup />} />
          <Route path="/family-group/:familyGroupId" element={<FamilyUser />} />
          <Route path="/" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

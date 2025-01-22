import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import Store from '../pages/Store';

const AppRoutes = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/stores/:id" element={<Store />} />
          {/* <Route path="/"/> */}
        </Routes>
      </Router>
    </div>
  );
};

export default AppRoutes;

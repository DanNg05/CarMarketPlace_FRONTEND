import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import Store from '../pages/Store';
import Car from '../pages/Car';
import Header from '../components/Header';

const AppRoutes = () => {
  return (
    <div>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/stores/:id" element={<Store />} />
          <Route path="/cars/:id" element={<Car />} />
          {/* <Route path="/"/> */}
        </Routes>
      </Router>
    </div>
  );
};

export default AppRoutes;

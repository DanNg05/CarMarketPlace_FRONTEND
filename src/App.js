// import logo from './logo.svg';
import './App.css';
// import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <div>
      {/* <h1>Hello</h1> */}
      <AppRoutes />
    </div>
  );
};

export default App;

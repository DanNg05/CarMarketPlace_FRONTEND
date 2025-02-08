import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import carMarket from '../photos/CarMarket.png'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="container">
      <Link to='/'><img src={carMarket} alt="Car Market Logo" style={{ width: '100px', maxWidth: '500px', height: 'auto' }} /></Link>

    </div>
  )
}

export default Header

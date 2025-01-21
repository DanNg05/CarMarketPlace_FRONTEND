import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import carMarket from '../photos/CarMarket.png'

const Header = () => {
  return (
    <div className="container">
      <img src={carMarket} alt="Car Market Logo" style={{ width: '100px', maxWidth: '500px', height: 'auto' }} />
    </div>
  )
}

export default Header

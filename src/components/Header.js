import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import carMarket from '../photos/CarMarket.png'
import { Link } from 'react-router-dom';
import "../styles/Header.css"

const Header = () => {
  return (
    <div className="container d-flex justify-content-between">
      <Link to='/'><img src={carMarket} alt="Car Market Logo" style={{ width: '100px', maxWidth: '500px', height: 'auto' }} /></Link>
      <div className='d-flex justify-content-center align-items-center'>
        <Link to="/login" className='header-login'>Login</Link>
      </div>
    </div>
  )
}

export default Header

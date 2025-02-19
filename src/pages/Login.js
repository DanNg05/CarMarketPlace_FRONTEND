import React, { useState } from 'react';
import '../styles/Login.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({UserName:"", Password:""})
  const [message, setMessage] = useState("");
  // const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Sending request for login
  const sendLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5151/api/account/login", formData);


      if (response.status === 200) {
        setMessage("Login successful!");
        localStorage.setItem("token", response.data.token); // Save token if needed
        navigate("/"); // Redirect to homepage
      } else {
        setMessage("Invalid credentials. Please try again.");
        console.log(message)
      }
    }
    catch (error) {
      setMessage("Failed to login.");
      console.error("Login error:", error.response?.data || error.message);
    }

  }
  return (
    <div className='container'>
      <div className='height100'>
        <form className='login-form' onSubmit={sendLogin}>
          <h2>LOGIN</h2>


          <div className='login-email'>
            <label htmlFor='login-email'>Your Email Address:</label>
            <input
            type='name' name='login-email'
            required
            value={formData.UserName}
            onChange={(e) => setFormData({...formData, UserName: e.target.value})}
            ></input>
          </div>

          <div className='login-password'>
            <label htmlFor='login-password'>Your Password:</label>
            <input
            type='password' name='login-password'
            required
            value={formData.Password}
            onChange={(e) => setFormData({...formData, Password: e.target.value})}
            ></input>
          </div>
          <button type='submit'>Submit</button>
          <div className='signup_link'>
            <Link to='/signup'>You don't have an account? Sign up here</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login

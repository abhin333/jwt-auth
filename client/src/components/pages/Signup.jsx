import React, { useState } from 'react'
import axios from 'axios';
import { baseUrl } from '../api/url.js';
import {Link, useNavigate} from 'react-router-dom';
const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
const navigate=useNavigate();
  const dataSubmit = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseUrl}/api/auth/signup`, formData).then((res) => {
        alert(res.status);
        navigate("/signin");
      })
    } catch (error) {
      alert(error.message)
    }
  };

  const googleAuth =()=>{
     window.open(`${baseUrl}/auth/google`,"_self");
  }
  

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={dataSubmit}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={dataSubmit}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Create Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={dataSubmit}
            required
          />
        </div>

        <button type="submit" className="btn">Signup</button>
        <div className="alternative">
          <p>Already have an account? <Link to={'/signin'}>Login</Link></p>
        </div>
      </form>
        <div className="social-login">
          <button type="button" className="btn-facebook">Signup with Facebook</button>
          <button type="button" className="btn-google" onClick={googleAuth}>Signup with Google</button>
        </div>
    </div>
  );
}

export default Signup;

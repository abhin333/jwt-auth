import React, { useState } from 'react'
import '../../App.css'
import { Link, json } from 'react-router-dom'
import axios from 'axios'
import { baseUrl } from '../api/url'
import { useNavigate } from 'react-router-dom'
import SetCookies from '../Hook/SetCookies'
const Signin = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  })
  const navigate = useNavigate();
  const inputReader = (e) => {
    const { name, value } = e.target
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }
  const loginHandler = async (e) => {
    e.preventDefault()
    const { email, password } = userData;
    try {
      await axios.post(`${baseUrl}/api/auth/signin`, userData).then((res) => {
        if (res.status == 200) {
          SetCookies(res.data.access_token);
          navigate("/about", { state: res.data });
        }
        else {
          alert(res.response.data.message);
        }
      })
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  const googleAuth = () => {
    window.open(`${baseUrl}/auth/google`, "_self");
  }

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={loginHandler}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name='email' value={userData.email} required onChange={inputReader} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name='password' value={userData.password} required onChange={inputReader} />
        </div>
        <div className="form-group">
          <a href="#">Forgot password?</a>
        </div>
        <button type="submit" className="btn" >Login</button>
        <div className="alternative">
          <p>Don't have an account? <Link to={'/signup'}>Signup</Link></p>
        </div>
      </form>
      <div className="social-login">
        <button className="btn-facebook">Login with Facebook</button>
        <button className="btn-google" onClick={googleAuth}>Login with Google</button>
      </div>
    </div>
  )
}

export default Signin

import React from 'react'
import { useNavigate } from 'react-router-dom'


const Home = () => {
const navigate=useNavigate();
  return (
    <div >
    <p onClick={()=>navigate('/signup')}>SIGNUP</p>
    <p onClick={()=>navigate('/signin')}>SIGNIN</p>
    </div>
  )
}

export default Home
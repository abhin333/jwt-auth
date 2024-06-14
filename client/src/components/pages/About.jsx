import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GetCookies from '../Hook/GetCookies';
import axios from 'axios';
import { baseUrl } from '../api/url';
import { useParams } from 'react-router-dom';
const About = ({user}) => {
  const location = useLocation();
  const [state, stateState] = useState((true))
  const navigate = useNavigate();
 

  
  const logoutHandler = async () => {
    await axios.get(`${baseUrl}/api/logout`).then((res) => {
      if(res.status==200){
        Cookies.remove('authtoken');
        Cookies.remove('access_token');

        navigate('/signin');
      }
      else{
        alert(res.data.message)
      }
    })
  }

  return (
    <div>
      hi welcome sir ....{
        <>


          <div>
            <h1>Profile</h1>

            {/* <button onClick={() => logoutHandler('access_token')}>LOGOUT</button> */}
            <button onClick={logoutHandler}>LOGOUT</button>

          </div>
        </>
      }
    </div>
  )
}

export default About

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/pages/Home';
import Signin from './components/pages/Signin';
import Signup from './components/pages/Signup';
import About from './components/pages/About';
import axios from 'axios';
import { baseUrl } from './components/api/url';
import ProtectRoute from './components/ProtectRoutes'
import Cookies from 'js-cookie'


const App = () => {
    const [user, setUser] = useState(null);
    const authToken = Cookies.get('authtoken');

    const apicall = async (authToken) => {

        if (authToken) {
            await axios.get(`${baseUrl}/api/current_user`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            })
                .then(response => {
                    setUser(response.data);
                })
                .catch(() => {
                    setUser(null);
                });
        }
    }



    useEffect(() => {
        apicall(authToken);
    }, [authToken]);

    return (
        <div>
            <Routes>
                <Route path='/signin' element={<Signin />} />
                <Route path='/signup' element={<Signup />} />

                <Route path='/' element={<ProtectRoute element={<Home />} />} />
                <Route path='/about' element={<ProtectRoute element={<About user={user}/>}/>}/>
                {/* <Route path='/about' element={<About user={user} />} /> */}


            </Routes>
        </div>
    );
};

export default App;

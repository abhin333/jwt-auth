import React from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate();
  const token =  Cookies.get('authtoken');

  useEffect(() => {
    isAuthenticated();
  }, []);





  const isAuthenticated = () => {
    const cookieToken = Cookies.get('access_token');
    const authCookies = Cookies.get('authtoken');
    if (cookieToken || authCookies) {
      return true;
    } else {
      navigate('/signin', { replace: true });
      return false;
  
  };
}



  return isAuthenticated() ? element : null;
};

export default ProtectedRoute;

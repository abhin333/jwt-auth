import Cookies from 'js-cookie';

const SetCookies =(access_token)=>{
        Cookies.set('access_token',access_token, {
        expires: 1,
        secure: true,
        sameSite: 'strict',
        path: '/',
      })

}
export default SetCookies;
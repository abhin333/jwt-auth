import Cookies from 'js-cookie';


const GetCookies =(access_token)=>{
    return Cookies.get(access_token);
}
export default GetCookies;
import axios from 'axios';
import { redirect } from 'react-router-dom';

const userIsLoggedIn = (navigate, route) => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    if(user){
        if(route === '/login' || route === '/register'){
            navigate('/')
        }
    }else{
        if(route !== '/login' && route !== '/register'){
            navigate('/')
        }
    }
} 

const logout = (navigate) => {
    window.localStorage.clear();
    navigate('/login')
}

const login = async (userEmail, passsword) => {
    return await axios({
        method:"post",
        url:`http://localhost:3001/auth/login`,
        data:{ userEmail, passsword},
        headers: {'Content-Type':'aplication/json'}
    });
}

const register = async (username,name, email, password) => {
    return await axios({
        method:"post",
        url:`http://localhost:3001/auth/register`,
        data:{ username,name, email, password},
        headers: {'Content-Type':'aplication/json'}
    });
};

const getUser = () => {
    return JSON.parse(window.localStorage.getItem('user'));
}

export{
    login, register, userIsLoggedIn, logout, getUser
}
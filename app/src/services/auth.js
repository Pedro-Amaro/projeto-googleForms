import axios from 'axios';
let headers = {
    'Content-Type': 'aplication/json'
}

const login = async (email, passsword) => {
    return await axios({
        method:"post",
        url:`http://localhost:3001/auth/login`,
        data:{ email, passsword},
        headers: {'Content-Type':'aplication/json'}
    });
}

const register = async (email, passsword) => {
    return await axios({
        method:"post",
        url:`http://localhost:3001/auth/register`,
        data:{ email, passsword},
        headers: {'Content-Type':'aplication/json'}
    });
}

export{
    login, register
}
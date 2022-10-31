import axios from 'axios';

import { API_URL } from '../constants/urlConst';

export const createUser = async (email, password) => {
    const response = await axios.post(API_URL + 'users', {
        email: email,
        password: password,
        name: 'Muhammad Hussain',
        pnone: '+92 3224259845'
    })
    //response should contain token
    console.log('response data', response.data);
  return response.data;
}

export const login = async (email, password) => {
    const response = await axios.post(API_URL + 'login', {
        email: email,
        password: password,
    });
    //response should contain token
    console.log(response.data)
  return response.data;
}

import axios from 'axios'
import { 
    AUTH_USER,
    CLICK_OPEN_MENU,
    LOGIN_USER,
    LOGOUT_USER,
    REGISTER_USER } from "./ActionTypes";

export const clickMenuOpen = value => ({
    type: CLICK_OPEN_MENU,
    newValue: value
});

export function auth(){
    const request = axios.get('/api/users/auth')
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit) {
    const request = axios.post('/api/users/login', dataToSubmit)
        .then(response => response.data)

    return {
        type: LOGIN_USER,
        payload: request

    }

}

export function registerUser(dataToSubmit) {
    const request = axios.post('/api/users/register', dataToSubmit)
        .then(response => response.data)

    return {
        type: REGISTER_USER,
        payload: request

    }

}
export function logoutUser(){
    const request = axios.get('/api/users/logout')
    .then(response => response.data);
    
    return {
        type: LOGOUT_USER,
        payload: request
    }
}
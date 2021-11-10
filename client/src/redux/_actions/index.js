import axios from 'axios'
import { 
    AUTH_USER,
    CLICK_OPEN_MENU,
    LOGIN_USER,
    LOGOUT_USER,
    REGISTER_USER ,
    SELECT_CLASS,
    SELECT_USER} from "./ActionTypes";

/*selectClass - ClassCard에서 사용함.*/
export function selectClass (selectedClass){
   
    return{
        type:SELECT_CLASS,
        payload:selectedClass
    }
}
export function selectUser(selected){
    const request=axios.get(`/api/classes/${selected.classId}/join`,{params:{userId:selected.userId}})
    .then(response=>response.data);
    return {
        type:SELECT_USER,
        payload:request
    }
    /*axios.get의 return값을 넘겨줬는데 무슨일이야*/
}

export const clickMenuOpen = value => ({
    type: CLICK_OPEN_MENU,
    newValue: value
});

export function auth(){
    const request = axios.get('/api/users/auth')
    .then(response =>  response.data);
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
    .then(response => response);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}
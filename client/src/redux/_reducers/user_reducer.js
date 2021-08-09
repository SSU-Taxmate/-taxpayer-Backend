import{
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER
} from '../_actions/ActionTypes'

import storage from 'redux-persist/lib/storage';

export default function user(state={},action){
    //console.log('_reducers/user_reducer/user',state,action)

    switch (action.type) {
        case LOGIN_USER:
            return {...state, loginSuccess:action.payload}
        case REGISTER_USER:
            return {...state, registerSuccess:action.payload}
        case AUTH_USER:
            return {...state, userData:action.payload} /*user의 Data가 모두 들어있음 */
        case LOGOUT_USER:
            storage.removeItem('persist:root')
            //console.log('LOGOUTUSER2',action.payload)
            return action.payload
        default:
            return state;
    }
}

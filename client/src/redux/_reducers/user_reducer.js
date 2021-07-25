import{
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from '../_actions/ActionTypes'

export default function user(state={},action){
    
    switch (action.type) {
        case LOGIN_USER:
            return {...state, loginSuccess:action.payload}
        case REGISTER_USER:
            return {...state, registerSuccess:action.payload}
        case AUTH_USER:
            return {...state, userData:action.payload} /*user의 Data가 모두 들어있음 */
            
        default:
            return state;
    }
}
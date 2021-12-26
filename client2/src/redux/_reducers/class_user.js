import{
    SELECT_USER
} from '../_actions/ActionTypes'

export default function classUser(state={},action){
    switch (action.type) {
        case SELECT_USER:
            return {...state, classUser:action.payload} /*class내 user의 _id */
        default:
            return state;
    }
}
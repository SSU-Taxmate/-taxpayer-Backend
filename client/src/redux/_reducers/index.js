import { MenuOpenReducer } from './MenuOpenReducer';
import { combineReducers } from 'redux';
import user from './user_reducer';
import classInfo from './class_reducer'
export const Reducers = combineReducers({
    user,
    classInfo,/*아직 사용 안함 */
    menuState: MenuOpenReducer
});


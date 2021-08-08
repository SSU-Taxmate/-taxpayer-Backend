import { MenuOpenReducer } from './MenuOpenReducer';
import { combineReducers } from 'redux';
import user from './user_reducer';
import classInfo from './class_reducer'

import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const persistConfig={
    key:'root',
    storage,//localstorage에 저장
    whitelist:['classInfo']//classInfo만 localstorage에 저장
}

export const Reducers = persistReducer(persistConfig,combineReducers({
    user,
    classInfo,/*아직 사용 안함 */
    menuState: MenuOpenReducer
}));


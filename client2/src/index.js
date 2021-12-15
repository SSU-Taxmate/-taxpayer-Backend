import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//Boostrap Libs
//import $ from 'jquery';
//import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

//SBAdmin2 Style
import './styles/scss/sb-admin-2.scss';
//import './assets/css/sb-admin-2.css'

//Redux
import { Provider } from 'react-redux';
import { Store } from './redux/store';


import { PersistGate } from 'redux-persist/integration/react';
import {persistStore}from 'redux-persist';

ReactDOM.render(
    <Provider store={Store}>
        <PersistGate loading={null} persistor={persistStore(Store)}>
        <App />
        </PersistGate>
    </Provider>, document.getElementById('root'));
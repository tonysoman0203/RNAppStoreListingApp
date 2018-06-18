import React from 'react'
import { Component } from 'react'
import { Provider } from "react-redux";
import store from "./store/index";
import App from './components/App'
export default class RNAppStoreListingApp extends Component {
    render(){
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}


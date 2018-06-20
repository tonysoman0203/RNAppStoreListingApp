/* @flow */

import React, { Component } from 'react'
import { Provider } from "react-redux";
import store from "./store/index";
import App from './components/App'
type Props = {}

export default class RNAppStoreListingApp extends Component<Props> {
    render(){
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}

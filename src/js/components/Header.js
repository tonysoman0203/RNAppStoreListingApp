/* @flow */

import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements'
import {
    StyleSheet,
    View
} from 'react-native';

type Props = {
    onSearchBarInputed:Function,
    onClearText:Function
}

class Header extends Component<Props> {
    constructor(props: Props){
        super(props)
    }

    render(){
        return(
            <View>
                <SearchBar
                    round
                    showLoading
                    clearButtonMode={'always'}
                    platform="ios"
                    inputStyle={{backgroundColor: 'white'}}
                    onClearText={()=>{
                        this.props.onClearText()
                    }}
                    onChangeText={(text: String)=>{
                        this.props.onSearchBarInputed(text)
                    }}
                    lightTheme
                    placeholder='Search' />
            </View>
        );
    }
}

export default Header;
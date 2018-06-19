import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements'
import {
    StyleSheet,
    View
} from 'react-native';
  
class Header extends Component<Props> {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View>
                <SearchBar
                    ref={ref=>{this.searchBar = ref}}
                    round
                    showLoading
                    clearButtonMode={'always'}
                    platform="ios"
                    inputStyle={{backgroundColor: 'white'}}
                    onClearText={()=>{
                        this.props.onClearText()
                    }}
                    onChangeText={(text)=>{
                        this.props.onSearchBarInputed(text)
                    }}
                    lightTheme
                    placeholder='Search' />
            </View>
        );
    }
}

export default Header;
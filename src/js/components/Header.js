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
            <View style={styles.container}>
                <SearchBar
                    round
                    showLoading
                    platform="ios"
                    lightTheme
                    cancelButtonTitle="Cancel"
                    placeholder='Search' />
            </View>
        );
    }
}

export default Header;

const styles = StyleSheet.create({
    container: {
        
        alignItems:'stretch',
        marginTop: 20
    }
})
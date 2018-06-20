/* @flow */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList
} from 'react-native';
import { Spinner } from 'native-base';
import { Rating } from 'react-native-elements';

type Props = {}

class AppItem extends Component<Props>{
    
    constructor(props){
        super(props)
    }
    
    render(){
        if(this.props.isRecommendedItem){
            return this.renderAppRecommendItem();
        }else{
            return this.renderNormalAppItem();
        }
    }

    renderAppRecommendItem = () => {
        var isLandscape = this.props.orientation=='landscape' 
        var imageHeight = 0
        if(isLandscape)
            imageHeight = parseInt(this.props.entry.get(`im:image`)[1].attributes.height)
        else
            imageHeight = parseInt(this.props.entry.get(`im:image`)[2].attributes.height)
        
        var imageWidth = imageHeight;

        return(
            <View style={{width:100, height:100, margin:5}}>
                <Image
                    borderRadius={20}
                    style={{
                        width:imageWidth, 
                        height:imageHeight,
                        }
                    }
                    source={{
                        uri: this.props.entry.get(`im:image`)[0].label,
                        cache: 'default'
                    }}
                />
               <Text style={styles.label}>{this.props.entry.get(`im:name`).label}</Text>     
               <Text style={styles.label}>{this.props.entry.get(`category`).attributes.label}</Text>     
            </View>    
        );
    }

    renderNormalAppItem = () => {
        var isLandscape = this.props.orientation=='landscape' 
        var imageHeight = 0
        console.log(`renderNormalAPpItem imageHeight = ${this.props.entry.get(`im:image`)}`);
        if(isLandscape)
            imageHeight = parseInt(this.props.entry.get(`im:image`)[1].attributes.height)
        else
            imageHeight = parseInt(this.props.entry.get(`im:image`)[2].attributes.height)
        
        var imageWidth = imageHeight;

        console.log(`renderNormalitem averageUserRating = ${this.props.entry.get(`averageUserRating`)}`)
        console.log(`renderNormalitem userRatingCount = ${this.props.entry.get(`userRatingCount`)}`)
        
        return (
            <View style={[styles.container,{flexDirection: 'row', alignItems:'center'}]}>
                <View style={{flex:0.15, justifyContent: "center",alignItems: "center"}}>
                    <Text style={[styles.indexlabel, {}]}>{this.props.indexText}</Text>
                </View>
                <Image
                    borderRadius={parseInt(this.props.indexText) % 2 == 0 ? 50 : 20}
                    style={{ width:imageWidth, height:imageHeight}}
                    source={{
                        uri: this.props.entry.get(`im:image`)[0].label,
                        cache: 'default'
                    }}
                />
                <View style={styles.appDetailView}>
                    <Text style={styles.label}>{this.props.entry.get(`im:name`).label}</Text>     
                    <Text style={styles.label}>{this.props.entry.get(`category`).attributes.label}</Text>     
                    
                        {this.renderRating()}  
                    
                </View>    
            </View>    
        )
    }

    renderRating = () => {
        if(this.props.entry.get(`averageUserRating`) && this.props.entry.get(`userRatingCount`)){
            return (
                <View style={styles.appDetailRatingView}>
                    <Rating
                        type="star"
                        startingValue={this.props.entry.get(`averageUserRating`)}
                        readonly
                        imageSize={15}
                        ratingColor={'#f47100'}
                        style={{ paddingVertical: 10 }}
                        />
                    <Text style={{ paddingVertical: 10 }}>({this.props.entry.get(`userRatingCount`)})</Text>
                </View>      
            )
        }else{
            return null
        }
    }
}

export default AppItem;

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginLeft:10,
        marginRight:10,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
    },
    label: {
        marginTop: 5
    },
    indexlabel: {
        fontSize:20,
        textAlign:'center',
        textAlignVertical:'center'
    },
    appDetailView: {
        flex:0.7,
        margin: 20
    },
    appDetailRatingView: {
        flexDirection: 'row',
        flex:1
    }
})
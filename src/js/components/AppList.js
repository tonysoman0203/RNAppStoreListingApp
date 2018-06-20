/* @flow */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  FlatList
} from 'react-native';
import { Spinner } from 'native-base';
import { Divider } from 'react-native-elements'
import AppItem from './AppItem';
import Utils from '../utils/index'
import moment from 'moment'

type Props ={

}

class AppList extends Component<Props> {
  constructor(props){
    super(props)
  }

  render(){
      return (
        <View style={styles.containter}>
          <FlatList 
            horizontal={this.props.horizontal}
            data={this.props.entries}
            removeClippedSubviews={false}
            renderItem={this._renderItem.bind(this)}
            keyExtractor={(item, index) => `item_${index}_${moment().format()}`}
            onEndReached={this.props.onLoadMore == null ? null : this.props.onLoadMore}
            onEndReachedThreshold={.7}
          /> 
        </View>  
      );
    
  }

  _renderItem = ({item, index}) => {
    console.log(`renderItem item = ${JSON.stringify(item)}`);
    if(item){
      const map = Utils.buildMap(item.entry) 
      if(this.props.ratings){
        console.log(`_renderItem = ${JSON.stringify(this.props.ratings[index])}`);
        map.set("averageUserRating",this.props.ratings[index].averageUserRating)
        map.set("userRatingCount",this.props.ratings[index].userRatingCount)
      }
      return (
        <AppItem
          orientation={this.props.orientation}
          indexText={index+1}
          isRecommendedItem={this.props.isRecommendList}
          entry={map}
        />
      )
    }else{
      return null
    }
  } 
}

export default AppList;

const styles = StyleSheet.create({
    containter:{
      flex:1
    }
})
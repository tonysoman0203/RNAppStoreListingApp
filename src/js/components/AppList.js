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

type Props ={
  horizontal: boolean,
  entries: [],
  onLoadMore?: Function,
  ratings?:Object[],
  orientation: string,
  isRecommendList:boolean
}

class AppList extends Component<Props> {
  constructor(props:Props){
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
            keyExtractor={(item, index) => `item_${index}`}
            onEndReached={()=>{this.props.onLoadMore == null ? null : this.props.onLoadMore()}}
            onEndReachedThreshold={.7}
          /> 
        </View>  
      );
    
  }

  _renderItem = ({item, index}: Object) => {
    console.log(`renderItem item = ${JSON.stringify(item)}`);
    var i = parseInt(index);
    
    if(item){
      // const map = Utils.buildMap(item.entry) 
      if(this.props.ratings){
        // console.log(`_renderItem = ${JSON.stringify(this.props.ratings[i])}`);
        item.entry.averageUserRating = this.props.ratings[i].averageUserRating
        item.entry.userRatingCount = this.props.ratings[i].userRatingCount
      }
      return (
        <AppItem
          orientation={this.props.orientation}
          indexText={`${parseInt(i)+1}`}
          isRecommendedItem={this.props.isRecommendList}
          entry={item.entry}
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
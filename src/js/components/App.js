/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Alert,
  SafeAreaView,
  Modal, TouchableHighlight
} from 'react-native';
import { Content } from 'native-base'
import {Button, Icon} from 'react-native-elements'
import Header from '../components/Header'
import AppList from '../components/AppList'
import { Spinner } from 'native-base';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import action,{getAppRecommendation, fetchMore,retry,doAppSearch } from '../actions'
import * as Actions from '../constants/action-types'
import * as Models from '../constants/models'
import moment from 'moment'
import Utils from '../utils/index';

const mapStateToProps = state => {
  return { state };
};

const mapDispatchToProps = (dispatch) => {
  let actions = bindActionCreators({ action });
  return { ...actions, dispatch, 
    callService: ()=>dispatch(getAppRecommendation()),
    fetchMore: (offset, extraData)=>dispatch(fetchMore(offset, extraData)),
    retry: ()=>{dispatch(retry())},
    doAppSearch: (text)=>{dispatch(doAppSearch(text))}
  };
}

type Props = {};

class App extends Component<Props> {
  constructor(){
    super()
    this.state = {
      entries: [],
      topFree100Entries: [],
      extraAppData:[],
      ratings: [],
      searchText: '',
      orientation: Utils.isLandscape() ? 'landscape' : 'portrait',
    }
    Dimensions.addEventListener('change', () => {
      this.setState({
          orientation: Utils.isLandscape() ? 'landscape' : 'portrait'
      });
    });

    this._onLoadMore = this._onLoadMore.bind(this)
    this._renderOverLay = this._renderOverLay.bind(this)
  }

  componentDidMount(){
    this.props.callService()
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header 
          onSearchBarInputed={this.onSearchBarInputed.bind(this)}
          onClearText={this.onClearText.bind(this)}
        />
        {/* <Content> */}
          {this.renderAppList()}
        {/* </Content> */}
      </SafeAreaView>
    );
  }

  renderAppList = () =>{
    if(this.props.state.UIReducers.get(`isLoading`)){
      return (<Spinner />)
    }else if(this.props.state.UIReducers.get(`showError`)){
      return this._renderOverLay()
    }else{
      return(
        <View style={{flex:1}}>
          <Text style={styles.title}>App Recommendation</Text>  
          {this.renderAppRecommendList()}
          {this.renderAppFreeList()}  
        </View>
      )
    }
  }

  onSearchBarInputed = (text) => {
    console.log(`onSearchBarInputed text = ${text}`);
    this.setState({searchText: text})
    this.props.doAppSearch(text)
  }

  onClearText = () => {
    this.setState({searchText: ''})
  }

  componentWillReceiveProps(nextProps){
    this.setState({
        entries: nextProps.state.DataReducers.entries,
        topFree100Entries: nextProps.state.DataReducers.topFree100Entries,
        ratings: nextProps.state.DataReducers.ratings,
        extraAppData: nextProps.state.DataReducers.extraData
    })
  }

  renderAppRecommendList(){
    if(this.state.entries == null || this.state.entries.length == 0){
      return this._renderNoItems()
    }else{

      var orientationFlex = this.state.orientation==='landscape'? 0.6 : 0.3
      return (    
        <View style={{flex: orientationFlex}}>
            <AppList    
              orientation={this.state.orientation}
              isRecommendList={true}  
              horizontal={true}
              entries={this.state.entries}
            />
          </View>
      )
    }
  }

  renderAppFreeList(){
    if(this.state.topFree100Entries == null || this.state.topFree100Entries.length == 0){
      return this._renderNoItems()
    }else{
  
    var orientationFlex = this.state.orientation==='landscape'? 0.4 : 0.7
      return (
         
        <View style={{flex: orientationFlex}}>
          <AppList
            onLoadMore={()=>{this._onLoadMore()}}
            orientation={this.state.orientation}
            isRecommendList={false}
            horizontal={false} 
            entries={this.state.topFree100Entries}
            ratings={this.state.ratings}
          />
        </View>  
      )
    }
  }

  _onLoadMore = () =>{
    console.log(`onLoadMore `);
    this.props.fetchMore(this.state.topFree100Entries, this.state.extraAppData)
  }

  _renderOverLay = () =>{
    var error = this.props.state.DataReducers.error;
    console.log(`_renderOverLay error = ${error}`);
    return (
          <Modal
          transparent={true}
          visible={this.props.state.UIReducers.get(`showError`)}
          animationType={`slide`}

          >
            <SafeAreaView style={styles.modal}>
                  <Text style={styles.errorText}>{error}</Text>
                  <Button
                    buttonStyle={{
                      backgroundColor: "rgba(255,100,100, 1)",
                      width:380,
                      height: 45,
                      borderColor: "transparent",
                      borderWidth: 0,
                      borderRadius: 5,
                      marginTop:20
                    }}
                  containerStyle={{ marginTop: 20 }}
                    title={"retry"}
                    onPress={()=>{
                      this.props.retry()
                    }}
                  />
            </SafeAreaView>
          </Modal>   
    )
  }

  _renderNoItems = () =>{
    var orientationFlex = this.state.orientation==='landscape'? 0.6 : 0.3
      
    return (
      <View style={[styles.noItemsContainer,{flex:orientationFlex}]}>
        <Icon name={'close'} />
        <Text>No Application available</Text>
      </View>

    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    margin: 10,
    color:'black'
  },
  modal: {
    justifyContent: 'center',
    flex:1,
    backgroundColor:'rgba(151, 153, 158, 0.78)',
    marginTop:44
  },
  errorText: {
    textAlign:'center',
    fontSize:18
  },
  noItemsContainer: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
});

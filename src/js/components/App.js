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
  Modal, TouchableHighlight
} from 'react-native';
import { Content } from 'native-base'
import {Button} from 'react-native-elements'
import Header from '../components/Header'
import AppList from '../components/AppList'
import { Spinner } from 'native-base';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import action, { getAppRecommendation, fetchMore,retry } from '../actions'
import * as Actions from '../constants/action-types'
import * as Models from '../constants/models'
import moment from 'moment'

const mapStateToProps = state => {
  return { state };
};

const mapDispatchToProps = (dispatch) => {
  let actions = bindActionCreators({ action });
  return { ...actions, dispatch, 
    callService: ()=>dispatch(getAppRecommendation()),
    fetchMore: (offset, extraData)=>dispatch(fetchMore(offset, extraData)),
    retry: ()=>{dispatch(retry())}
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
      orientation: this.isLandscape() ? 'landscape' : 'portrait',
    }
    Dimensions.addEventListener('change', () => {
      this.setState({
          orientation: this.isLandscape() ? 'landscape' : 'portrait'
      });
    });

    this._onLoadMore = this._onLoadMore.bind(this)
    this._renderOverLay = this._renderOverLay.bind(this)
  }

  isLandscape = () => {
    const dim = Dimensions.get('window');
    return dim.width >= dim.height;
  };

  componentDidMount(){
    this.props.callService()
  }

  render() {
    return (
      <View style={styles.container}>
        {/* {this._renderOverLay()} */}
        <Header />
        {/* <Content> */}
          <Text style={styles.title}>App Recommendation</Text>
          {this.renderAppRecommendList()}
          {this.renderAppFreeList()}
        {/* </Content> */}
      </View>
    );
  }

  componentWillReceiveProps(nextProps){
    console.log(`componentWillReceiveProps = ${JSON.stringify(nextProps.state.DataReducers.ratings)}`);
    this.setState({
        entries: nextProps.state.DataReducers.entries,
        topFree100Entries: nextProps.state.DataReducers.topFree100Entries,
        ratings: nextProps.state.DataReducers.ratings,
        extraAppData: nextProps.state.DataReducers.extraData
    })
  }

  renderAppRecommendList(){
    if(this.props.state.UIReducers.get(`isLoading`)){
      return (<Spinner />)
    }else if(this.props.state.UIReducers.get(`showError`)){
      return this._renderOverLay()
    }else{
      console.log(`this.state.orientation = ${this.state.orientation}`);
      var orientationFlex = this.state.orientation==='landscape'? 0.6 : 0.3
      console.log(`renderAppRecommend orientationFlex = ${orientationFlex}`);
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
    if(this.props.state.UIReducers.get(`isLoading`)){
      return (<Spinner />)
    }else if(this.props.state.UIReducers.get(`showError`)){
      return this._renderOverLay()
    }else{
      // console.log(`this.state.orientation = ${this.state.orientation}`);
      var orientationFlex = this.state.orientation==='landscape'? 0.4 : 0.7
      // console.log(`renderAppFreeList orientationFlex = ${orientationFlex}`);
      // console.log(`renderAppFreeList topFree100Entries.size = ${this.state.topFree100Entries.length}`);
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
    console.log(`_renderOverLay`);
    return (
          <Modal
          transparent={true}
          visible={this.props.state.UIReducers.get(`showError`)}
          animationType={`slide`}

          >
            <View style={styles.modal}>
                  <Text style={styles.errorText}>{error[0].request._response}</Text>
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
            </View>
          </Modal>   
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
    backgroundColor:'rgba(151, 153, 158, 0.78)'
  },
  errorText: {
    textAlign:'center',
    fontSize:18
  }
});

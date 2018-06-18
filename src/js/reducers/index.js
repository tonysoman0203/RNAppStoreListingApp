import { combineReducers } from 'redux'
import UIReducers from '../reducers/UIReducers'
import DataReducers from '../reducers/DataReducers'

const trafficApp = combineReducers({
    UIReducers, 
    DataReducers
  })
  
export default trafficApp
/* @flow */
import { combineReducers } from 'redux'
import UIReducers from '../reducers/UIReducers'
import DataReducers from '../reducers/DataReducers'

const reducers = combineReducers({
	UIReducers,
	DataReducers,
})

export default reducers

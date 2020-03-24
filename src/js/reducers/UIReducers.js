/* @flow */
import { Action } from 'redux'
import Actions from '../constants/Actions'
import { UIState } from '../constants/models'

const UIReducers = (state: UIState = UIState, action: Action): UIState => {
	switch (action.type) {
	case Actions.FETCH_DATA_LOADING: {
		return state.set('isLoading', !state.get('isLoading'))
	}
	case Actions.SHOW_ERROR: {
		return state.set('showError', !state.get('showError'))
	}
	default:
		return state
	}
}

export default UIReducers

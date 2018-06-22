/* @flow */
import { UIState } from '../constants/models'
import Actions from '../constants/Actions'
import { Action } from 'redux';

const UIReducers = (state: UIState = UIState, action: Action): UIState =>{
    switch(action.type){
        case Actions.FETCH_DATA_LOADING:{
            return state.set('isLoading',!state.get(`isLoading`))
        }
        case Actions.SHOW_ERROR: {
            console.log(`SHOW_ERROR !!`);
            return state.set('showError',!state.get(`showError`))
        }
        default: return state;
    }
}


export default UIReducers
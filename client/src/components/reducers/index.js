import { combineReducers } from 'redux';
import { UPDATE_LOGGED_IN, UPDATE_IS_ADMIN } from '../actions';

const initialAuthState = {
  loggedIn: false,
  isAdmin: false 
}

const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case UPDATE_LOGGED_IN:
      return {
        ...state,
        loggedIn: action.payload
      }
    case UPDATE_IS_ADMIN:
      return {
        ...state,
        isAdmin: action.payload
      }
    default: return state;
  }
}

export default combineReducers({
  auth: authReducer
});
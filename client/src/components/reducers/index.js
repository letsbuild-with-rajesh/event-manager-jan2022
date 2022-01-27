import { combineReducers } from 'redux';
import { UPDATE_AUTH_DETAILS, UPDATE_USER_DETAILS } from '../actions';

const initialAuthState = {
  loggedIn: false,
  isAdmin: false
}

const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case UPDATE_AUTH_DETAILS:
      return {
        ...state,
        ...action.payload
      }
    default: return state;
  }
}

const initialUserState = {
  name: "",
  email: "",
  role: ""
}

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case UPDATE_USER_DETAILS:
      return {
        ...state,
        ...action.payload
      }
    default: return state;
  }
}

export default combineReducers({
  auth: authReducer,
  user: userReducer
});
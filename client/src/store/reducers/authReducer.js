import {
  SET_CURRENT_USER,
  USER_LOADING,
  GET_USERS_AND_AVATARS,
  GET_USERS_AND_AVATARS_LOADING
} from '../actions/types';

const isEmpty = require('is-empty');

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  allUsersAndAvatarsLoading: false,
  usersAndAvatars: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_USERS_AND_AVATARS:
      return {
        ...state,
        usersAndAvatars: [...action.payload]
      }
    case GET_USERS_AND_AVATARS_LOADING:
      return {
        ...state,
        allUsersAndAvatarsLoading: action.payload
      }
    default:
      return state;
  }
}
import {
  ADD_POST_SUCCESS,
  GET_ALL_POSTS_LOADING,
  GET_ALL_POSTS_SUCCESS,
  GET_A_USERS_POSTS_LOADING,
  GET_A_USERS_POSTS_SUCCESS
} from '../actions/types';

const initialState = {
  isLoading: false,
  allPosts: [],
  isPostAdded: false,
  allOfAUsersPosts: [],
  allOfAUsersPostsLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POSTS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      }
    case GET_ALL_POSTS_SUCCESS:
      return {
        ...state,
        allPosts: [...action.allPosts]
      }
    case ADD_POST_SUCCESS:
      return {
        ...state,
        isPostAdded: true
      }
    case GET_A_USERS_POSTS_SUCCESS:
      return {
        ...state,
        allOfAUsersPosts: [...action.payload]
      }
    case GET_A_USERS_POSTS_LOADING:
      return {
        ...state,
        allOfAUsersPostsLoading: action.payload
      }
    default:
      return state;
  }
};

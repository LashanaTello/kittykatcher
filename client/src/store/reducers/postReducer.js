import {
  ADD_POST_SUCCESS,
  GET_ALL_POSTS_LOADING,
  GET_ALL_POSTS_SUCCESS
} from '../actions/types';

const initialState = {
  isLoading: false,
  allPosts: [],
  isPostAdded: false
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
    default:
      return state;
  }
};
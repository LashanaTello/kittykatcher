import axios from 'axios';

import {
  GET_ERRORS,
  ADD_POST_SUCCESS,
  GET_ALL_POSTS_LOADING,
  GET_ALL_POSTS_SUCCESS
} from './types';


// Add Post
export const addPost = (postData) => dispatch => {
  axios({
      method: 'post',
      url: "/api/posts/upload",
      data: postData,
      headers: { 
        "Content-Type": `multipart/form-data; boundary=${postData._boundary}`
      }
    })
    .then(res => {
      //handle success
      console.log(res);
      dispatch(addPostSuccess());
      window.location.reload();
    })
    .catch(err => {
      //handle error
      console.log(err.statusText)
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
};

export const addPostSuccess = () => {
  return {
    type: ADD_POST_SUCCESS
  };
};

//  Get All Posts
export const getAllPosts = () => dispatch => {
  dispatch(getAllPostsAreLoading(true));

  axios
    .get("/api/posts/allCats")
    .then(res => {
      dispatch(getAllPostsSuccess(res.data)); 
      dispatch(getAllPostsAreLoading(false));
    }) 
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
};

export const getAllPostsAreLoading = truthValue => {
  return {
    type: GET_ALL_POSTS_LOADING,
    isLoading: truthValue
  };
};

export const getAllPostsSuccess = allPosts => {
  return {
    type: GET_ALL_POSTS_SUCCESS,
    allPosts
  };
};
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  GET_USERS_AND_AVATARS,
  GET_USERS_AND_AVATARS_LOADING,
  SET_USER_BIO,
  SET_USER_BIO_SUCCESS
} from './types';

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage

      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};


// Get All Users With Their Avatars
export const getUsersAndAvatars = () => dispatch => {
  dispatch(getUsersAndAvatarsLoading(true));

  axios
    .get("/api/users/avatars")
    .then(res => {
      dispatch(getUsersAndAvatarsSuccess(res.data));
      dispatch(getUsersAndAvatarsLoading(false));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getUsersAndAvatarsSuccess = usersAndAvs => {
  return {
    type: GET_USERS_AND_AVATARS,
    payload: [...usersAndAvs]
  };
}

export const getUsersAndAvatarsLoading = truthValue => {
  return {
    type: GET_USERS_AND_AVATARS_LOADING,
    payload: truthValue
  };
}

export const editBio = userData => dispatch => {
  axios
    .put("/api/users/bio", userData)
    .then(res => {
      dispatch(setUserBio(res.data.bio));
      dispatch(setUserBioSuccess());
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setUserBio = bio => {
  return {
    type: SET_USER_BIO,
    payload: bio
  };
};

export const setUserBioSuccess = () => {
  return {
    type: SET_USER_BIO_SUCCESS
  };
};

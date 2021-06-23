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
  SET_USER_BIO_SUCCESS,
  GET_MY_BIO,
  GET_MY_BIO_LOADING,
  GET_EMAIL_SUCCESS,
  GET_EMAIL_LOADING,
  CHANGE_EMAIL,
  CHANGE_EMAIL_SUCCESS,
  CHANGE_USERNAME,
  CHANGE_USERNAME_SUCCESS,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  USER_LOGGED_OUT
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
  // Reset state completely which will log out user
  dispatch(logoutReset());
};

export const logoutReset = () => {
  return {
    type: USER_LOGGED_OUT
  };
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

export const getMyBio = (username) => dispatch => {
  dispatch(getMyBioLoading(true));

  axios
    .get(`/api/users/bio/${username}`)
    .then(res => {
      dispatch(getMyBioSuccess(res.data.bio));
      console.log(res.data.bio);
      dispatch(getMyBioLoading(false));
    })
    .catch(err =>
      console.log("could not get bio")
    );
};

export const getMyBioSuccess = bio => {
  return {
    type: GET_MY_BIO,
    payload: bio
  };
}

export const getMyBioLoading = truthValue => {
  return {
    type: GET_MY_BIO_LOADING,
    payload: truthValue
  };
}

export const getEmail = (username) => dispatch => {
  dispatch(getEmailLoading(true));

  axios
    .get(`/api/users/email/${username}`)
    .then(res => {
      dispatch(getEmailSuccess(res.data.email));
      console.log(res.data.email);
      dispatch(getEmailLoading(false));
    })
    .catch(err =>
      console.log("could not get email")
    );
};

export const getEmailSuccess = email => {
  return {
    type: GET_EMAIL_SUCCESS,
    payload: email
  };
}

export const getEmailLoading = truthValue => {
  return {
    type: GET_EMAIL_LOADING,
    payload: truthValue
  };
}

export const changeMyUsername = userData => dispatch => {
  axios
    .put("/api/users/new-username", userData)
    .then(res => {
      dispatch(changeUsernameSuccess(true));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const changeUsernameSuccess = truthValue => {
  return {
    type: CHANGE_USERNAME_SUCCESS,
    payload: truthValue
  };
};

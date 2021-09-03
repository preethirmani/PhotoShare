import axios from 'axios';
import { CLEAR_CURRENT_PROFILE, GET_CURRENT_PROFILE, GET_ERRORS, GET_FOLLOWERS, GET_FOLLOWING, GET_SUGGESTIONS, GET_PROFILE_HANDLE, PROFILE_LOADING, 
  SET_CURRENT_USER} from './types';
import { logoutUser } from './authActions';


//Get CurrentUser Profile
export const getCurrentUserProfile = () => dispatch => {
  
  dispatch(setProfileLoading());
  axios
  .get('/api/profile')
  .then(res => 
    dispatch ({
      type : GET_CURRENT_PROFILE,
      payload : res.data
    }))
  .catch(err =>
      dispatch({
        type : GET_ERRORS,
        payload : err.response.data
      }));
}

//Create Profile
export const createProfile = (profileData, history) => dispatch => {
  dispatch(clearCurrentProfile());
  axios.
  post('/api/profile',profileData)
  .then(res => history.push('/profile'))
  .catch(err => 
    dispatch({
      type : GET_ERRORS,
      payload : err.response.data
    }));
}

//Get Profile By Handle
export const getProfileByHandle = (handle) => dispatch => {
 dispatch(setProfileLoading());
  axios
  .get(`/api/profile/handle/${handle}`)
  .then(res => 
    dispatch ({
      type : GET_PROFILE_HANDLE,
      payload : res.data
    }))
  .catch(err =>
      dispatch({
        type : GET_ERRORS,
        payload : err.response.data
      }));
}

//Follow User
export const followUser = (userId, handle) => dispatch => {
 // console.log('Follow user Clicked and user_id' + userId);
  axios.
  get(`/api/profile/follow/${userId}`)
  .then(res => dispatch(getProfileByHandle(handle)))
  .catch(err => 
    dispatch({
      type : GET_ERRORS,
      payload : err.response.data
    }));
}


//UnFollow User
export const unfollowUser = (userId, handle) => dispatch => {
 
  axios.
  get(`/api/profile/unFollow/${userId}`)
  .then(res => dispatch(getProfileByHandle(handle)))
  .catch(err => 
    dispatch({
      type : GET_ERRORS,
      payload : err.response.data
    }));
}

//Get List of Following
export const getfollowingList = (id) => dispatch => {
  dispatch(clearCurrentProfile());
  axios.
  get(`/api/profile/following/${id}`)
  .then(res => 
    dispatch({
      type: GET_FOLLOWING,
      payload : res.data
    }))
  .catch(err => 
    dispatch({
      type : GET_ERRORS,
      payload : err.response.data
    }));
}

//Get List of Followers
export const getfollowersList = (id) => dispatch => {
 dispatch(clearCurrentProfile());
  axios.
  get(`/api/profile/followers/${id}`)
  .then(res => 
    dispatch({
      type: GET_FOLLOWERS,
      payload : res.data
    }))
  .catch(err => 
    dispatch({
      type : GET_ERRORS,
      payload : err.response.data
    }));

  }

//Get Suggestions
export const getSuggestions = () => dispatch => {
  dispatch(setProfileLoading());
  axios.
  get('/api/profile/suggestions')
  .then(res => 
    dispatch({
      type: GET_SUGGESTIONS,
      payload: res.data
    }))
  .catch(err => 
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
}

// Delete account & profile
export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    axios
      .delete('/api/profile/delete')
      .then(res =>
      {
        window.alert('Account deleted!')
        dispatch(logoutUser());
      }
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

  // Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

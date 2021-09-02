import axios from 'axios';
import { GET_CURRENT_PROFILE, GET_ERRORS, GET_PROFILE_HANDLE } from './types';

//Get CurrentUser Profile
export const getCurrentUserProfile = () => dispatch => {
  console.log('getCurrentUserProfile called');
  axios
  .get('/api/profile')
  .then(res => 
    dispatch ({
      type: GET_CURRENT_PROFILE,
      payload: res.data
    }))
  .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }));
}

//Create Profile
export const createProfile = (profileData, history) => dispatch => {
  
  axios.
  post('/api/profile',profileData)
  .then(res => history.push('/profile'))
  .catch(err => 
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
}

//Get Profile By Handle
export const getProfileByHandle = (handle) => dispatch => {
 
  axios
  .get(`/api/profile/handle/${handle}`)
  .then(res => 
    dispatch ({
      type: GET_PROFILE_HANDLE,
      payload: res.data
    }))
  .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
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
      type: GET_ERRORS,
      payload: err.response.data
    }));
}


//UnFollow User
export const unfollowUser = (userId, handle) => dispatch => {
  console.log('UnFollow user Clicked and user_id' + userId);
  axios.
  get(`/api/profile/unFollow/${userId}`)
  .then(res => dispatch(getProfileByHandle(handle)))
  .catch(err => 
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
}


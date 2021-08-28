import axios from 'axios';
import { GET_CURRENT_PROFILE, GET_ERRORS } from './types';

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


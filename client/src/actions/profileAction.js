import axios from 'axios';
import { GET_ERRORS } from './types';

export const getCurrentUserProfile = () => dispatch => {
  console.log('getCurrentUserProfile called');
  axios.
  get('/api/profile')
  .then(res => console.log(res.data))
  .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }));
}

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

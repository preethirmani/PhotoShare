import axios from 'axios';

export const getCurrentUserProfile = user_id => dispatch => {
  console.log('getCurrentUserProfile called');
  axios.
  get('/api/profile')
  .then(res => console.log(res.data))
  .catch(err => console.log(err.response.data));
}

export const createProfile = (profileData) => dispatch => {
  console.log('createProfile called');
  axios.
  post('/api/profile')
  .then(res => console.log(res.data))
  .catch(err => console.log(err.response.data));
}

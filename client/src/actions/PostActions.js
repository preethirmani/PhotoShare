import axios from 'axios';
import { GET_ERRORS } from './types';

//Create Post
export const createNewpost = (userdata) => dispatch => {
  console.log('UserData::' + userdata)
  axios
  .post('/api/posts', userdata)
  .then(res => console.log(res))
  .catch(err => console.log(err));
  
}
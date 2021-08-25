import axios from 'axios';
import { GET_ALL_POSTS, GET_ERRORS } from './types';

//Create Post
export const createNewpost = (userdata) => dispatch => {
  console.log('UserData::' + userdata)
  axios
  .post('/api/posts', userdata)
  .then(res => console.log(res))
  .catch(err => console.log(err));
}

//Display All posts
export const getAllPosts = () => dispatch => {
  console.log('getAllPOsts called');
  axios
  .get('/api/posts')
  .then(res => {
    console.log(res.data); 
    dispatch ({
      type: GET_ALL_POSTS,
      payload: res.data
    })
  })
  .catch(err => console.log(err));
}

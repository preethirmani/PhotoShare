import axios from 'axios';
import { CLEAR_ERRORS, DELETE_POST, GET_ALL_POSTS, GET_ERRORS, GET_POST, POST_LOADING } from './types';

//Create A POst
export const createNewpost = (userdata, history) => dispatch => {
  dispatch (clearErrors());
  console.log('UserData::' + userdata);
  axios
  .post('/api/posts', userdata)
  .then(res =>  history.push('/home'))
  .catch(err => console.log(err.response.data));
}

//Get All Posts
export const getAllPosts = () => dispatch => {
  dispatch(setPostLoading());
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

//Get Single Post
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
  .get(`/api/posts/${id}`)
  .then(res => 
    dispatch({
      type:GET_POST,
      payload:res.data
    }))
  .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      }));
}

//Get All Posts for a user
export const getUserPosts = () => dispatch => {
  dispatch(setPostLoading());
  console.log('getUserPosts called');
  axios
  .get('api/posts/currentUser')
  .then(res => {
    console.log(res.data); 
    dispatch ({
      type: GET_ALL_POSTS,
      payload: res.data
    })
  })
  .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }));
}

//Delete a Post
export const deletePost = id => dispatch => {
  axios.
  delete(`api/posts/delete/${id}`)
  .then( res => 
        dispatch({
        type: DELETE_POST,
        payload: id
      }))
  .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }));
}


// Like A Post
export const likePost = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => dispatch(getAllPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Unlike A Post
export const unlikePost = id => dispatch => {
  axios
    .post(`/api/posts/unLike/${id}`)
    .then(res => dispatch(getAllPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Comment Post
export const commentPost = (postId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};


// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

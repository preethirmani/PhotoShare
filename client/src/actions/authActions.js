import  axios from 'axios';
import { GET_ERRORS, SET_USER } from './types';


//Register User
export const registerUser = (userData, history) => dispatch =>{
 
     axios
     .post('/api/users/register', userData)
          .then(res => history.push('/'))
          .catch(err => 
            dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          }));
  
};

//Login User

export const loginUser = (userData) => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => console.log(res.data))
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }));

}
import  axios from 'axios';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER, SET_USER } from './types';
import setAuthToken from '../utils/setAuthToken';


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
    .then(res => {

     console.log(res.data);
     const {token} = res.data;
     
     //save token to localstorage
     localStorage.setItem('jwtToken', token);
     //localStorage.setItem('jwtToken', token);
 

     //setAuthToken
     setAuthToken(token);

     //decode the token
     const decoded = jwt_decode(token);

     dispatch({
       type:SET_CURRENT_USER,
       payload:decoded
     })
     
    })
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }));

}


//Logout User
export const logoutUser = () => dispatch => {
// remove token from localstorage
localStorage.removeItem('jwtToken');

//remove token from authorization header
setAuthToken(false);

//clear user data and set isAuthorization to false
dispatch({
  type : SET_CURRENT_USER,
  payload : {}
});

}

//Change Password
export const changePasword = (passwordData) => dispatch =>{
 
     axios
     .post('/api/users/changePassword', passwordData)
          .then(res => window.alert(res.data))
          .catch(err => 
            dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          }));
  
};

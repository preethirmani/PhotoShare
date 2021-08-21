import { SET_USER } from './types';

//Register User
export const registerUser = (userData) => {
  return {
    type: SET_USER,
    payload: userData
  }
};
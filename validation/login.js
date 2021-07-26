const Validator = require('validator');
const isEmpty = require('./is-empty');

let errors = {};

module.exports = function validateLoginInput(data){

  if(!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid!';
  }
   
  if (isEmpty(data.email)){
    errors.email = 'Email is required!';
  }

  if (!Validator.isLength(data.password, {min: 6, max: 30})){
    errors.password = 'Password must be between 6 and 30 characters!';
  }

  if(isEmpty(data.password)) {
    errors.password = 'Password is required!'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
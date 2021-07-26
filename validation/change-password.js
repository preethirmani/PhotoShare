const Validator = require('validator');
const isEmpty = require('./is-empty');



module.exports = validateChangePasswordInput = data => {
  let errors = {};

if(!Validator.isEmail(data.email)) {
    errors.email = 'Invalid email!';
  }

  if(isEmpty(data.email)) {
    errors.email = 'Email is required!'
  }

  if (!Validator.isLength(data.password, {min: 6, max: 30})){
    errors.password = 'Password must be between 6 and 30 characters';
  }

  if (isEmpty(data.password)){
    errors.password = 'Password is required';
  }

  if (isEmpty(data.password2)){
    errors.password2 = 'Confirm Password is required';
  }

  if (!Validator.equals(data.password, data.password2)){
    errors.password2 = 'Passwords must match';   
  }

  if (isEmpty(data.oldPassword)){
    errors.oldPassword = 'Old Password is required';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
}
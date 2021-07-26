const Validator = require('validator');
const isEmpty = require('./is-empty');

let errors = {};

module.exports = validateforgotPasswordInput = data => {
  if(!Validator.isEmail(data.email)) {
    errors.email = 'Invalid email!';
  }

  if(isEmpty(data.email)) {
    errors.email = 'Email is required!'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
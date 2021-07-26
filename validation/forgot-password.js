const Validator = require('validator');
const isEmpty = require('./is-empty');



module.exports = validateforgotPasswordInput = data => {
  let errors = {};
  
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
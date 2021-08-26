const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};
  
 

   if (!isEmpty(data.phone)) {
    if (!Validator.isMobilePhone(data.phone)){
      errors.phone = "Invalid phone number";
    }
  }

  
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

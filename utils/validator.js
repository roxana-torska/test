const validate = function(value, validator) {
  let result = {
    error: false,
    errorMessage: ''
  };
  if (validator.email) {
    let emailError = emailValidate(value, validator);
    if (emailError) {
      result = {
        error: true,
        errorMessage: emailError
      };
    }
  }
  if (validator.password) {
    let passwordError = passwordValidate(value, validator);
    if (passwordError) {
      result = {
        error: true,
        errorMessage: passwordError
      };
    }
  }
  if (validator.confirmPassword) {
    let passwordError = confirmPasswordValidate(value, validator);
    if (passwordError) {
      result = {
        error: true,
        errorMessage: passwordError
      };
    }
  }
  return result;
};

const emailValidate = function(value, validator) {
  let emailError = null;
  if (!value) {
    if (typeof validator.require === 'string') {
      emailError = validator.require;
    } else {
      emailError = 'Email is required';
    }
  } else {
    let matchFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!matchFormat.test(value)) {
      if (typeof validate.email === 'string') {
        emailError = validator.email;
      } else {
        emailError = 'invalid Email';
      }
    } else {
      emailError = null;
    }
  }
  return emailError;
};

const passwordValidate = function(value, validator) {
  let passwordError = null;
  if (!value) {
    if (typeof validator.require === 'string') {
      passwordError = validator.require;
    } else {
      passwordError = 'Password is required';
    }
  } else {
    if (value.length < 8) {
      passwordError = 'Not less then 8 characters';
    } else {
      if (validator.equalTo != '' && value != validator.equalTo) {
        passwordError = 'Password and confirm password must be same';
      } else {
        passwordError = null;
      }
    }
  }
  return passwordError;
};

const confirmPasswordValidate = function(value, validator) {
  let confirmPasswordError = null;
  if (!value) {
    if (typeof validator.require === 'string') {
      confirmPasswordError = validator.require;
    } else {
      confirmPasswordError = 'Confirm Password is required';
    }
  } else {
    if (value.length < 8) {
      confirmPasswordError = 'Not less then 8 characters';
    } else {
      if (validator.equalTo != '' && value != validator.equalTo) {
        confirmPasswordError = 'Password and confirm password must be same';
      } else {
        confirmPasswordError = null;
      }
    }
  }
  return confirmPasswordError;
};
module.exports = validate;

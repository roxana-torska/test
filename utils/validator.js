import * as _ from 'lodash';

const validate = function(value, validator) {
  let ruleResult = {
    error: false,
    errorMessage: ''
  };
  let results = [];
  const keys = Object.keys(validator);
  for (let index = 0; index < keys.length; index++) {
    const rule = keys[index];
    ruleResult = applyRule(rule, value, validator[rule]);
    if (ruleResult.error) {
      if (_.isObject(validator[rule]) && validator[rule].message) {
        ruleResult.errorMessage = validator[rule].message;
      }
    }
    results.push(ruleResult);
  }
  ruleResult = results.find(item => item.error || item.helper) || ruleResult;

  return ruleResult;
};

const applyRule = function(rule, value, options) {
  switch (rule.toLowerCase()) {
    case 'required':
      return requiredValidate(value);
    case 'email':
      return emailValidate(value);
    case 'equalsto':
      return equalsToValidate(value, options.value);
    case 'minlength':
      return minLengthValidate(value, options.length);
    case 'maxlength':
      return maxLengthValidate(value, options.length);
    case 'validlength':
      return validLengthValidate(value, options.length);
    case 'minvalue':
      return minValueValidate(value, options.value);
    case 'maxvalue':
      return maxValueValidate(value, options.value);
    default:
      return { error: false };
  }
};

const requiredValidate = function(value) {
  if (_.trim(value).length === 0) {
    return { error: true, errorMessage: 'Required Field' };
  }
  return { error: false };
};

const emailValidate = function(value) {
  let matchFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (_.trim(value).length && !matchFormat.test(value)) {
    return { error: true, errorMessage: 'Invalid Email' };
  }
  return { error: false };
};

const minLengthValidate = function(value, length) {
  if (value.length < length) {
    return { error: true, errorMessage: `Not less then ${length} characters` };
  }
  return { error: false };
};
const maxLengthValidate = function(value, length) {
  if (value.length > length) {
    return {
      error: true,
      errorMessage: `Not greater then ${length} characters`
    };
  }
  return { error: false };
};

const minValueValidate = function(value, comparedWith) {
  if (value < comparedWith) {
    return { error: true, errorMessage: `Not less then ${comparedWith}` };
  }
  return { error: false };
};
const maxValueValidate = function(value, comparedWith) {
  if (value > comparedWith) {
    return {
      error: true,
      errorMessage: `Not greater then ${comparedWith}`
    };
  }
  return { error: false };
};

const equalsToValidate = function(value, compareValue, errorMessage) {
  if (_.isFunction(compareValue)) {
    compareValue = compareValue();
  }
  if (
    _.trim(value).length &&
    _.trim(compareValue).length &&
    value !== compareValue
  ) {
    return { error: true, errorMessage: `Value not equal to compared value` };
  }
  return { error: false };
};

const validLengthValidate = function(value, length) {
  if (_.trim(value).length < length) {
    return {
      error: false,
      helper: true,
      helperMessage: `${value.length}/${length}`
    };
  }
  return { error: false };
};

export default validate;

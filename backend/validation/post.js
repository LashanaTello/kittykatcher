const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.postTitle = !isEmpty(data.postTitle) ? data.postTitle : "";
  data.age = !isEmpty(data.age) ? data.age : "";
  data.sex = !isEmpty(data.sex) ? data.sex : "";
  data.furColors = !isEmpty(data.furColors) ? data.furColors : "";
  data.furPattern = !isEmpty(data.furPattern) ? data.furPattern : "";
  data.friendly = !isEmpty(data.friendly) ? data.friendly : "";
  data.details = !isEmpty(data.details) ? data.details : "";


  if (Validator.isEmpty(data.postTitle)) {
    errors.postTitle = "Title field is required";
  }

  if (Validator.isEmpty(data.age)) {
    errors.age = "Age field is required";
  }

  if (Validator.isEmpty(data.sex)) {
    errors.sex = "Sex field is required";
  }

  if (Validator.isEmpty(data.furColors)) {
    errors.furColors = "Fur Colors field is required";
  }

  if (Validator.isEmpty(data.furPattern)) {
    errors.furPattern = "Fur Pattern field is required";
  }

  if (Validator.isEmpty(data.friendly)) {
    errors.friendly = "Friendly field is required";
  }

  /*if (!Validator.isLength(data.postTitle, { min: 6, max: 40 })) {
    errors.postTitle = "Password must be at least 6 characters";
  }*/


  return {
    errors,
    isValid: isEmpty(errors)
  };
};
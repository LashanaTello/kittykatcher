const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateBioInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.bio = !isEmpty(data.bio) ? data.bio : "";

  if (Validator.isEmpty(data.bio)) {
    errors.bio = "Bio field can not be empty";
  }

  if (!Validator.isLength(data.bio, { min: 1, max: 450 })) {
    errors.bio = "Bio must be at least 1 character and can not exceed 450 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

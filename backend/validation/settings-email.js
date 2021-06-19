const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateChangeEmailInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.newEmail = !isEmpty(data.newEmail) ? data.newEmail : "";
  data.newEmail2 = !isEmpty(data.newEmail2) ? data.newEmail2 : "";

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.newEmail)) {
    errors.newEmail = "New email field is required";
  } else if (!Validator.isEmail(data.newEmail)) {
    errors.newEmail = "Email is invalid";
  }

  if (Validator.isEmpty(data.newEmail2)) {
    errors.newEmail2 = "Confirm email field is required";
  } else if (!Validator.isEmail(data.newEmail2)) {
    errors.newEmail2 = "Email is invalid";
  }

  if (!Validator.equals(data.newEmail, data.newEmail2)) {
    errors.newEmail2 = "Emails must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

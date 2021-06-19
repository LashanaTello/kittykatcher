const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateChangePasswordInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : "";
  data.newPassword2 = !isEmpty(data.newPassword2) ? data.newPassword2 : "";

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.newPassword)) {
    errors.newPassword = "New password field is required";
  }

  if (Validator.isEmpty(data.newPassword2)) {
    errors.newPassword2 = "Confirm new password field is required";
  }

  if (!Validator.isLength(data.newPassword, { min: 6, max: 30 })) {
    errors.newPassword = "New password must be at least 6 characters";
  }

  if (!Validator.equals(data.newPassword, data.newPassword2)) {
    errors.newPassword2 = "New passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

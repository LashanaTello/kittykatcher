const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateChangeUsernameInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.newUsername = !isEmpty(data.newUsername) ? data.newUsername : "";
  data.newUsername2 = !isEmpty(data.newUsername2) ? data.newUsername2 : "";

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Name checks
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  if (Validator.isEmpty(data.newUsername)) {
    errors.newUsername = "New username field is required";
  }

  if (Validator.isEmpty(data.newUsername2)) {
    errors.newUsername2 = "Confirm username field is required";
  }

  if (!Validator.isLength(data.newUsername, { min: 4, max: 30 })) {
    errors.newUsername = "New username must be at least 4 characters";
  }

  if (!Validator.equals(data.newUsername, data.newUsername2)) {
    errors.newUsername2 = "Usernames must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

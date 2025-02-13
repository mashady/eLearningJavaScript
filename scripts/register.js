import { setCookie, getCookie } from "../cookies/cookies.js";
import {
  isLogin,
  validateEmail,
  validateName,
  generateUsername,
} from "../utils/user.js";

if (isLogin()) window.location.href = "/profile.html";

function showError(elementId, errorMessage) {
  const element = document.getElementById(elementId);
  element.classList.add("invalid");
  element.nextElementSibling.innerHTML = errorMessage;
  element.nextElementSibling.style.display = "block";
}

function clearError(elementId) {
  const element = document.getElementById(elementId);
  element.classList.remove("invalid");
  element.nextElementSibling.innerHTML = "";
  element.nextElementSibling.style.display = "none";
}

function validateField(
  fieldValue,
  fieldId,
  errorId,
  validationFn,
  errorMessage
) {
  if (!fieldValue || (validationFn && !validationFn(fieldValue))) {
    showError(fieldId, errorMessage);
    return false;
  } else {
    clearError(fieldId);
    return true;
  }
}

document.getElementById("firstName").addEventListener("blur", () => {
  validateField(
    document.getElementById("firstName").value.trim(),
    "firstName",
    "fNameErrorMsg",
    validateName,
    "First name is required and must contain only characters"
  );
});

document.getElementById("lastName").addEventListener("blur", () => {
  validateField(
    document.getElementById("lastName").value.trim(),
    "lastName",
    "lNameErrorMsg",
    validateName,
    "Last name is required and must contain only characters"
  );
});

document.getElementById("email").addEventListener("blur", () => {
  validateField(
    document.getElementById("email").value.trim(),
    "email",
    "emailErrorMsg",
    validateEmail,
    "Please enter a valid email"
  );
});

document.getElementById("password").addEventListener("blur", () => {
  validateField(
    document.getElementById("password").value.trim(),
    "password",
    "passErrorMsg",
    (value) => value.length >= 8,
    "Password must be at least 8 characters long"
  );
});

document.getElementById("rePass").addEventListener("blur", () => {
  validateField(
    document.getElementById("rePass").value.trim(),
    "rePass",
    "rePassErrorMsg",
    (value) => value === document.getElementById("password").value.trim(),
    "Passwords do not match"
  );
});

document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const rePassword = document.getElementById("rePass").value.trim();

  const isFirstNameValid = validateField(
    firstName,
    "firstName",
    "fNameErrorMsg",
    validateName,
    "First name is required and must contain only characters"
  );

  const isLastNameValid = validateField(
    lastName,
    "lastName",
    "lNameErrorMsg",
    validateName,
    "Last name is required and must contain only characters"
  );

  const isEmailValid = validateField(
    email,
    "email",
    "emailErrorMsg",
    validateEmail,
    "Please enter a valid email"
  );

  const isPasswordValid = validateField(
    password,
    "password",
    "passErrorMsg",
    (value) => value.length >= 8,
    "Password must be at least 8 characters long"
  );

  const isRePasswordValid = validateField(
    rePassword,
    "rePass",
    "rePassErrorMsg",
    (value) => value === password,
    "Passwords do not match"
  );

  if (
    !isFirstNameValid ||
    !isLastNameValid ||
    !isEmailValid ||
    !isPasswordValid ||
    !isRePasswordValid
  ) {
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    showError("email", "Email already exists");
    return;
  }

  const username = generateUsername(firstName, lastName, users);
  const newUser = {
    firstName,
    lastName,
    username,
    email,
    password,
    isAdmin: false,
    courses: [],
    wishlist: [],
    completedLessons: [],
    progressPercentage: 0,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  setCookie("user", JSON.stringify({ username }), 1);
  isLogin();
  window.location.href = "/profile.html";
});
/**
 * Explanation of Functions:
 * 1. `showError(elementId, errorMessage)`:
 *    - Highlights the input field with a red border and displays an error message below it.
 *    - Used to provide feedback when validation fails.
 *
 * 2. `clearError(elementId)`:
 *    - Removes the red border and hides the error message for a specific input field.
 *    - Used when the input is valid or when the user corrects their input.
 *
 * 3. `validateField(fieldValue, fieldId, errorId, validationFn, errorMessage)`:
 *    - Validates the input field using the provided validation function.
 *    - Displays an error message if validation fails or clears the error if validation passes.
 *    - Returns `true` if the field is valid, otherwise `false`.
 *
 * 4. Real-time validation on blur:
 *    - Attaches `blur` event listeners to each input field to validate the input when the user leaves the field.
 *    - Provides immediate feedback to the user without waiting for form submission.
 *
 * 5. Form submission handler:
 *    - Prevents the default form submission behavior.
 *    - Validates all input fields and stops submission if any field is invalid.
 *    - Checks if the email already exists in the database.
 *    - Creates a new user object, saves it to localStorage, sets a cookie, and redirects to the profile page.
 */

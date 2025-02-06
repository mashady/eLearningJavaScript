import { setCookie, getCookie } from "./cookies/cookies.js";
import {
  isLogin,
  validateEmail,
  validateName,
  generateUsername,
} from "./user.js";
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

// handle the real time validation
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
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  setCookie("user", JSON.stringify({ username }), 1);
  isLogin();
  window.location.href = "/profile.html";
});

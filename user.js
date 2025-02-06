import { setCookie, getCookie, removeCookie } from "./cookies/cookies.js";

function isLogin() {
  const userCookie = getCookie("user");
  if (userCookie) {
    const user = JSON.parse(userCookie);
    console.log(`Logged in as: ${user.username}`);
    return user;
  } else {
    return null;
  }
}

function logOut() {
  removeCookie("user");
  window.location.href = "/";

  console.log("Logged out successfully.");
}
function isAdmin() {
  const userCookie = getCookie("user");
  if (userCookie) {
    const user = JSON.parse(userCookie);

    return getUserDataByUsername(user.username).isAdmin;
  }
  return false;
}
function generateUsername(firstName, lastName, users) {
  const baseUsername = `${firstName.toLowerCase()}_${lastName.toLowerCase()}`;

  let username = baseUsername;
  let counter = 1;

  while (users.some((user) => user.username === username)) {
    username = `${baseUsername}${counter}`;
    counter++;
  }

  return username;
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
function validateName(name) {
  const regex = /^[a-zA-Z]{4,}$/;
  //let regex = new RegExp(/^[a-zA-Z\s]+[^\s]$/);
  if (regex.test(name)) {
    {
      console.log("Name is valid");
      return true;
    }
  }
  // return regex.test(name);
  // console.log(name);
}

function getUserDataByUsername(username) {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find((user) => user.username === username);

  return user || null;
}

function showNotification(message, duration = 3000) {
  const notification = document.getElementById("notification");
  const notificationMessage = document.getElementById("notification-message");
  const overlay = document.getElementById("overlay");

  notificationMessage.textContent = message;

  notification.classList.add("show");
  overlay.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
    overlay.classList.remove("show");
  }, duration);
}

export {
  isLogin,
  validateEmail,
  validateName,
  logOut,
  generateUsername,
  getUserDataByUsername,
  isAdmin,
  showNotification,
};
// handle get user data function -> finish the profile and courses page
// function take username and return user data from local storage
// isAdmin
// progress -> on the course page after enrolled
// handle admin content
// merge full name

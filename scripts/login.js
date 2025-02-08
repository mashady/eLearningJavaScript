import { setCookie, getCookie } from "../cookies/cookies.js";
import { isLogin } from "../utils/user.js";
if (isLogin()) window.location.href = "/profile.html";

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email) {
    document.getElementById("email").classList.add("invalid");

    document.getElementById("emailErr").innerHTML = "Email is required";
    document.getElementById("emailErr").style.display = "block";
  } else {
    document.getElementById("email").classList.remove("invalid");

    document.getElementById("emailErr").innerHTML = "";
    document.getElementById("emailErr").style.display = "none";
  }

  if (!password) {
    document.getElementById("password").classList.add("invalid");

    document.getElementById("passErr").innerHTML = "Password is required";
    document.getElementById("passErr").style.display = "block";
    return;
  } else {
    document.getElementById("email").classList.remove("invalid");

    document.getElementById("passErr").innerHTML = "";
    document.getElementById("passErr").style.display = "none";
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((user) => user.email === email);

  if (user && user.password === password) {
    console.log("Login successful!");
    console.log(user.username);
    let username = user.username;
    setCookie("user", JSON.stringify({ username }), 1);
    isLogin();
    window.location.href = "/profile.html";
  } else {
    console.log("Invalid email or password!");
    document.getElementById("password").classList.add("invalid");

    document.getElementById("passErr").innerHTML = "Invalid email or password!";
    document.getElementById("passErr").style.display = "block";
  }
});

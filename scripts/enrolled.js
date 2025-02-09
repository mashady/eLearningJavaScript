import {
  isLogin,
  logOut,
  updateUI,
  displayUserProfile,
} from "../utils/user.js";

if (!isLogin()) window.location.href = "/login.html";

updateUI();
document.getElementById("logout").addEventListener("click", () => {
  logOut();
  updateUI();
});
displayUserProfile(isLogin().username);

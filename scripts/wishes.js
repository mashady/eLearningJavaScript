import {
  isLogin,
  logOut,
  getUserDataByUsername,
  showNotification,
  updateUI,
} from "../utils/user.js";

if (!isLogin()) window.location.href = "/login.html";

updateUI();
document.getElementById("logout").addEventListener("click", () => {
  logOut();
  updateUI();
});

function displayUserProfile(username) {
  const user = getUserDataByUsername(username);

  if (!user) {
    showNotification("User not found!");
    return;
  }

  const profileInfo = document.getElementById("profileInfo");
  // profileInfo.innerHTML = `
  //         <h1>hello, @${user.username}</h1>
  //       `;

  const wishlistCoursesContainer = document.getElementById("wishlistCourses");
  let slicedWishes = user.wishlist.slice();
  wishlistCoursesContainer.innerHTML = "";

  if (slicedWishes.length == 0)
    document.getElementById("noAvail").style.display = "inline";

  slicedWishes.forEach((course) => {
    if (course) {
      const courseDiv = document.createElement("div");
      courseDiv.className = "course";
      courseDiv.innerHTML = `
              <div class="card">
                <img src="${course.Image}" alt="${course.Title}">
                <div class="card-content">
                <h3>${course.Title}</h3>
                <p><strong>Instructor:</strong> ${course["Instructor Name"]}</p>
                <p>${course.Description}</p>
                <p><strong>Price:</strong> $${course.Price}</p>
                <p><strong>Duration:</strong> ${course.Duration}</p>
                <div class="card-options">
                  <button class="enrollBtn">Enroll</button>
                  <button class="wishBtn"><i class="fa fa-trash" aria-hidden="true"></i></button>
                </div>
                </div>
              </div>
            `;

      const enrollButton = courseDiv.querySelector(".enrollBtn");
      const removeButton = courseDiv.querySelector(".wishBtn");

      enrollButton.addEventListener("click", () => enroll(course.ID));
      removeButton.addEventListener("click", () =>
        removeFromWishlist(course.ID)
      );

      wishlistCoursesContainer.appendChild(courseDiv);
    }
  });
}

function enroll(courseID) {
  const user = getUserDataByUsername(isLogin().username);
  const course = user.wishlist.find((c) => c.ID === courseID);

  if (!course) {
    showNotification("Course not found in wishlist!", 1000);
    return;
  }

  if (user.courses.some((c) => c.ID === courseID)) {
    showNotification("You are already enrolled in this course!", 1000);

    return;
  }

  user.courses.push(course);

  user.wishlist = user.wishlist.filter((c) => c.ID !== courseID);

  const users = JSON.parse(localStorage.getItem("users"));
  const updatedUsers = users.map((u) =>
    u.username === user.username ? user : u
  );
  localStorage.setItem("users", JSON.stringify(updatedUsers));

  displayUserProfile(isLogin().username);
  showNotification("Course enrolled successfully and removed from wishlist!");
}

function removeFromWishlist(courseID) {
  const user = getUserDataByUsername(isLogin().username);

  user.wishlist = user.wishlist.filter((c) => c.ID !== courseID);

  const users = JSON.parse(localStorage.getItem("users"));
  const updatedUsers = users.map((u) =>
    u.username === user.username ? user : u
  );
  localStorage.setItem("users", JSON.stringify(updatedUsers));

  displayUserProfile(isLogin().username);
  showNotification("Course removed from wishlist!", 1000);
}

displayUserProfile(isLogin().username);

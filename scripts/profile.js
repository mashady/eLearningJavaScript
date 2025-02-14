import {
  isLogin,
  logOut,
  updateUI,
  getUserDataByUsername,
} from "../utils/user.js";
if (!isLogin()) window.location.href = "/login.html";

updateUI();
document.getElementById("logout").addEventListener("click", () => {
  logOut();
  updateUI();
});

function displayUserProfile(username) {
  const user = getUserDataByUsername(username);

  const profileInfo = document.getElementById("profileInfo");
  profileInfo.innerHTML = `
        <h1>Hello ${user.username}</h1>
      `;

  const enrolledCoursesContainer = document.getElementById("enrolledCourses");
  console.log(user.courses);
  let slicedCoueses = user.courses.slice(0, 3);
  if (slicedCoueses.length == 0)
    document.getElementById("noAvailCourses").style.display = "block";

  slicedCoueses.forEach((course) => {
    console.log(course);

    if (course) {
      const courseDiv = document.createElement("div");
      courseDiv.className = "course";
      courseDiv.innerHTML = `
            <div class="card">
              <a href="./watching.html?courseID=${course.ID}?lessonID=1" >
              <img src="${course.Image}" alt="${course.Title}">
              <div class="card-content">
              <h3>${course.Title}</h3>
              <p><strong>Instructor:</strong> ${course.Instructor}</p>
              <p><strong>Price:</strong> $${course.Price || 0}</p>
              <p><strong>Duration:</strong> ${course.Duration}</p>
              <p><strong>Your progress:</strong> ${
                course.progressPercentage
              }</p>
              <p><strong>Completed:</strong> ${
                course.progressPercentage == 100
                  ? "Completed"
                  : "Not completed yet"
              }</p>
            </div>
            </div>
          `;
      enrolledCoursesContainer.appendChild(courseDiv);
    }
  });

  const wishlistCoursesContainer = document.getElementById("wishlistCourses");
  let slicedWishes = user.wishlist.slice(0, 3);
  if (slicedWishes.length == 0)
    document.getElementById("noAvail").style.display = "block";
  slicedWishes.forEach((course) => {
    if (course) {
      const courseDiv = document.createElement("div");
      courseDiv.className = "course";
      courseDiv.innerHTML = `
            <div class="card">
              <img src="${course.Image}" alt="${course.Title}">
              <div class="card-content">
              <h3>${course.Title}</h3>
              <p><strong>Instructor:</strong> ${course.Instructor}</p>
              <p>${course.Description}</p>
              <p><strong>Price:</strong> $${course.Price || 0}</p>
              <p><strong>Duration:</strong> ${course.Duration}</p>
            </div>
            </div>
          `;
      wishlistCoursesContainer.appendChild(courseDiv);
    }
  });
}
displayUserProfile(isLogin().username);

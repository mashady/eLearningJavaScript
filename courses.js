import coursesData from "./fakeCourses.js";
import { isLogin, showNotification } from "./user.js";

document
  .getElementById("courseSearch")
  .addEventListener("input", () =>
    searchCourses(document.getElementById("courseSearch").value)
  );

document
  .getElementById("coursesSelection")
  .addEventListener("input", () =>
    filterCoursesByCategory(document.getElementById("coursesSelection").value)
  );

function filterCoursesByCategory(category) {
  let filteredCourses;

  if (category === "all") {
    filteredCourses = coursesData.courses;
  } else {
    filteredCourses = coursesData.courses.filter(
      (course) => course.Category === category
    );
  }
  courses(filteredCourses);
}

function searchCourses(searchQuery) {
  const filteredCourses = coursesData.courses.filter((course) =>
    course.Title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log(filteredCourses);
  courses(filteredCourses);
}

if (isLogin()) {
  var username = isLogin().username;
  console.log(username);

  var users = JSON.parse(localStorage.getItem("users"));
  console.log(users);

  var cureentUserFullData = Object.values(users).find(
    (user) => user.username == username
  );
  console.log(cureentUserFullData);
  var userCourses = cureentUserFullData.courses;
  var userWishes = cureentUserFullData.wishlist;
  console.log(userCourses);
}

function courses(courses) {
  const coursesContainer = document.getElementById("courses");
  coursesContainer.innerHTML = "";

  const filteredCourses = isLogin()
    ? courses.filter(
        (course) =>
          !userCourses.some((userCourse) => userCourse.ID === course.ID)
      )
    : courses;
  if (filteredCourses.length == 0)
    document.getElementById("noAvail").style.display = "inline";

  filteredCourses.forEach((course) => {
    const courseDiv = document.createElement("div");
    courseDiv.className = "course";

    courseDiv.innerHTML = `
      <div class="card">
        <img src="${course.Image}" alt="${course.Title}">
        <h3>${course.Title}</h3>
        <p><strong>Instructor:</strong> ${course["Instructor Name"]}</p>
        <p>${course.Description}</p>
        <p><strong>Price:</strong> $${course.Price}</p>
        <p><strong>Duration:</strong> ${course.Duration}</p>
        <div class="card-options">
          <button class="enrollBtn">Enroll</button>
          <button class="wishBtn">
            <i class="fa-solid fa-heart"></i>
          </button>
        </div>
      </div>
    `;

    const enrollButton = courseDiv.querySelector(".enrollBtn");
    const wishButton = courseDiv.querySelector(".wishBtn");

    enrollButton.addEventListener("click", () => enroll(course.ID));
    wishButton.addEventListener("click", () => addToWish(course.ID));
    console.log(isLogin());
    // remove
    /**
    if (isLogin()) {
      enrollButton.addEventListener("click", () => enroll(course.ID));
      wishButton.addEventListener("click", () => addToWish(course.ID));
    } else {
      enrollButton.disabled = true;
      wishButton.disabled = true;
      enrollButton.textContent = "Enroll";
      wishButton.innerHTML = '<i class="fa-solid fa-heart"></i>';
    }
    */

    coursesContainer.appendChild(courseDiv);
  });
}

courses(coursesData.courses);

function enroll(courseID) {
  console.log(isLogin());
  if (isLogin() == null) {
    showNotification("Please log in to enroll in courses.", 1000);
    return;
  }

  const course = coursesData.courses.find((c) => c.ID == courseID);
  console.log(course);

  if (userCourses.some((c) => c.ID == courseID)) {
    showNotification("You are already enrolled in this course!", 600);

    return;
  }

  if (userWishes.some((c) => c.ID == courseID)) {
    userWishes = userWishes.filter((c) => c.ID !== courseID);
    showNotification(
      "This course has been removed from your wishlist and added to your enrolled courses.",
      600
    );
  }
  showNotification("You have successfully enrolled", 600);
  userCourses.push(course);

  const updatedUsers = users.map((u) =>
    u.username === username
      ? { ...u, courses: userCourses, wishlist: userWishes }
      : u
  );
  console.log(updatedUsers);
  localStorage.setItem("users", JSON.stringify(updatedUsers));

  courses(coursesData.courses);
}

function addToWish(courseID) {
  if (!isLogin()) {
    showNotification("Please log in to add courses to your wishlist.", 600);
    return;
  }

  const course = coursesData.courses.find((c) => c.ID == courseID);
  console.log(course);

  if (userWishes.some((c) => c.ID == courseID)) {
    showNotification("This course is already in your wishlist!", 600);
    return;
  }

  if (userCourses.some((c) => c.ID == courseID)) {
    showNotification(
      "You are already enrolled in this course. It cannot be added to your wishlist.",
      600
    );

    return;
  }
  showNotification("Course added succefully to your wishlist", 1000);
  userWishes.push(course);

  const updatedUsers = users.map((u) =>
    u.username === username ? { ...u, wishlist: userWishes } : u
  );
  console.log(updatedUsers);
  localStorage.setItem("users", JSON.stringify(updatedUsers));

  courses(coursesData.courses);
}

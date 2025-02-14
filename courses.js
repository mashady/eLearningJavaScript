import coursesData from "../utils/fakeCourses.js";

import { isLogin, showNotification, updateUI, logOut } from "../utils/user.js";

var localcourses = JSON.parse(localStorage.getItem("Courses")) || [];
console.log(localcourses);
updateUI();
document.getElementById("logout").addEventListener("click", () => {
  logOut();
  updateUI();
});
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
    filteredCourses = localcourses;
  } else {
    filteredCourses = localcourses.filter(
      (course) => course.Category === category
    );
  }
  courses(filteredCourses, 6, "#pagination");
  // courses(filteredCourses);
}

function searchCourses(searchQuery) {
  const filteredCourses = localcourses.filter((course) =>
    course.Title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log(filteredCourses);
  courses(filteredCourses, 6, "#pagination");
  // courses(filteredCourses);
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

function courses(courses, coursesPerPage, paginationContainer) {
  let currentPage = 1;
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  function showCourses(page) {
    const startIndex = (page - 1) * coursesPerPage;

    const endIndex = startIndex + coursesPerPage;

    const filteredCourses = isLogin()
      ? courses.filter(
          (course) =>
            !userCourses.some((userCourse) => userCourse.ID === course.ID)
        )
      : courses;
    if (filteredCourses.length == 0) {
      document.getElementById("noAvail").style.display = "inline";
    } else {
      document.getElementById("noAvail").style.display = "none";
    }

    const pageCourses = filteredCourses.slice(startIndex, endIndex);

    const coursesContainer = document.getElementById("courses");
    coursesContainer.innerHTML = "";

    pageCourses.forEach((course) => {
      const courseDiv = document.createElement("div");
      courseDiv.className = "course";

      courseDiv.innerHTML = `
      <div class="card">
      <a href="/courseDetails.html?id=${course.ID}">
      <img src="${course.Image}" alt="${course.Title}">
      </a>
        <h3>${course.Title}</h3>
        <p><strong>Instructor:</strong> ${course.Instructor}</p>
        <p>${course.Description}</p>
        <p><strong>Price:</strong> ${
          course.Price === null ? "Free" : `$${course.Price}`
        }</p>
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

      coursesContainer.appendChild(courseDiv);
    });
  }

  function setupPagination() {
    const pagination = document.querySelector(paginationContainer);
    pagination.innerHTML = "";
    console.log(pagination);

    for (let i = 1; i <= totalPages; i++) {
      const link = document.createElement("a");
      link.href = "#";
      link.innerText = i;

      if (i === currentPage) {
        link.classList.add("active");
      }

      link.addEventListener("click", (event) => {
        event.preventDefault();
        currentPage = i;
        showCourses(currentPage);

        const currentActive = pagination.querySelector(".active");
        currentActive.classList.remove("active");
        link.classList.add("active");
      });

      pagination.appendChild(link);
    }
  }

  showCourses(currentPage);
  setupPagination();
}

courses(localcourses, 6, "#pagination");

function enroll(courseID) {
  if (!isLogin()) {
    showNotification("Please log in to enroll in courses.", 2000);
    return;
  }

  const course = localcourses.find((c) => c.ID == courseID);
  console.log(course);

  if (course.Price === null) {
    let pendingCourses =
      JSON.parse(localStorage.getItem("pendingCourses")) || [];

    const isAlreadyPending = pendingCourses.some(
      (entry) => entry.username === username && entry.course.ID === courseID
    );

    if (isAlreadyPending) {
      showNotification(
        "Your enrollment request is already pending approval.",
        2000
      );
      return;
    }

    pendingCourses.push({ username, course });
    localStorage.setItem("pendingCourses", JSON.stringify(pendingCourses));
    showNotification("Your enrollment request is pending approval.", 2000);
    return;
  }

  const overlay = document.getElementById("paypal-popup-overlay");
  overlay.style.display = "flex";

  document.getElementById("paypal-button-container").innerHTML = "";

  paypal
    .Buttons({
      style: {
        layout: "vertical",
        color: "blue",
        shape: "rect",
        label: "checkout",
        height: 50,
      },
      fundingSource: paypal.FUNDING.PAYPAL,
      funding: {
        allowed: [paypal.FUNDING.CARD, paypal.FUNDING.PAYPAL],
      },
      createOrder: function (data, actions) {
        return actions.order.create({
          purchase_units: [
            {
              amount: { value: course.Price.toString() },
              description: course.Title,
            },
          ],
        });
      },
      onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
          console.log("Payment Successful:", details);
          showNotification("Payment successful! You are now enrolled.", 2000);

          userCourses.push(course);
          const updatedUsers = users.map((u) =>
            u.username === username ? { ...u, courses: userCourses } : u
          );
          localStorage.setItem("users", JSON.stringify(updatedUsers));

          document.getElementById("paypal-popup-overlay").style.display =
            "none";
          courses(localcourses, 6, "#pagination");
        });
      },
      onError: function (err) {
        console.log("Payment Failed:", err);
        showNotification("Payment failed. Please try again.", 1000);
      },
    })
    .render("#paypal-button-container");
}

document.getElementById("close-popup").addEventListener("click", function () {
  document.getElementById("paypal-popup-overlay").style.display = "none";
});

function processPayment(course) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const paymentSuccess = Math.random() > 0.2;
      resolve(paymentSuccess);
    }, 2000);
  });
}

function addToWish(courseID) {
  if (!isLogin()) {
    showNotification("Please log in to add courses to your wishlist.", 600);
    return;
  }

  const course = localcourses.find((c) => c.ID == courseID);
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

  courses(localcourses, 6, "#pagination");
}

function renderCategories() {
  const selectElement = document.getElementById("coursesSelection");

  let categories = JSON.parse(localStorage.getItem("categories")) || [];

  selectElement.innerHTML = `
      <option selected disabled>Choose a category</option>
      <option value="all">All</option>
  `;

  categories.forEach((category) => {
    let option = document.createElement("option");
    option.value = category.name;
    option.textContent = category.name;
    selectElement.appendChild(option);
  });
}

document.addEventListener("DOMContentLoaded", renderCategories);

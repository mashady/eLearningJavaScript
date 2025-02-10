import coursesData from "../utils/fakeCourses.js";

import { isLogin, showNotification, updateUI, logOut } from "../utils/user.js";

/*
if (localStorage.getItem("Courses") == "undefined") {
  console.log("courses exist but undifined so we cannot use json parse ");
  console.log(localStorage.getItem("Courses"));
} else {
  console.log(localStorage.getItem("Courses"));
  var localCourses = JSON.parse(localStorage.getItem("Courses")) || [];
  console.log(localCourses);
  console.log("courses not exist");
}*/

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
  courses(filteredCourses);
}

function searchCourses(searchQuery) {
  const filteredCourses = localcourses.filter((course) =>
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

courses(localcourses);

/*function enroll(courseID) {
  console.log(isLogin());
  if (isLogin() == null) {
    showNotification("Please log in to enroll in courses.", 1000);
    return;
  }

  const course = localcourses.find((c) => c.ID == courseID);
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

  courses(localcourses);
}
*/
/*function enroll(courseID) {
  console.log(isLogin());
  if (isLogin() == null) {
    showNotification("Please log in to enroll in courses.", 1000);
    return;
  }

  const course = localcourses.find((c) => c.ID == courseID);
  console.log(course);

  if (userCourses.some((c) => c.ID == courseID)) {
    showNotification("You are already enrolled in this course!", 1000);
    return;
  }

  if (userWishes.some((c) => c.ID == courseID)) {
    userWishes = userWishes.filter((c) => c.ID !== courseID);
    showNotification(
      "This course has been removed from your wishlist and added to your enrolled courses.",
      600
    );
  }

  if (course.Price === null) {
    let pendingCourses =
      JSON.parse(localStorage.getItem("pendingCourses")) || [];
    pendingCourses.push({ username, course });

    localStorage.setItem("pendingCourses", JSON.stringify(pendingCourses));
    showNotification("Your enrollment request is pending approval.", 600);
  } else {
    processPayment(course)
      .then((paymentSuccess) => {
        if (paymentSuccess) {
          showNotification("Payment successful! You are now enrolled.", 1000);
          userCourses.push(course);

          const updatedUsers = users.map((u) =>
            u.username === username
              ? { ...u, courses: userCourses, wishlist: userWishes }
              : u
          );
          localStorage.setItem("users", JSON.stringify(updatedUsers));
        } else {
          console.log("Payment failed");
          showNotification("Payment failed. Please try again.", 1000);
        }
      })
      .catch((error) => {
        console.error("Payment error:", error);
        showNotification("An error occurred during payment.", 1000);
      });
  }

  courses(localcourses);
}*/
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

    // Check if the course is already in the pending list for the same user
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

    // Add course to pending list if not already there
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
          courses(localcourses);
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

  courses(localcourses);
}

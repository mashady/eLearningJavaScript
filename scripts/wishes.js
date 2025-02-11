import {
  isLogin,
  logOut,
  getUserDataByUsername,
  showNotification,
  updateUI,
} from "../utils/user.js";

if (!isLogin()) window.location.href = "/login.html";
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
                <p><strong>Instructor:</strong> ${course.Instructor}</p>
                <p>${course.Description}</p>
                <p><strong>Price:</strong> ${course.Price || "Free"}</p>
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
document.getElementById("close-popup").addEventListener("click", function () {
  document.getElementById("paypal-popup-overlay").style.display = "none";
});
function enroll(courseID) {
  if (!isLogin()) {
    showNotification("Please log in to enroll in courses.", 2000);
    return;
  }

  const user = getUserDataByUsername(isLogin().username);

  const course = user.wishlist.find((c) => c.ID === courseID);
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

          userCourses.push(course);
          console.log(userCourses);
          removeFromWishlist(course.ID);
          console.log(users);
          const updatedUsers = users.map((u) =>
            u.username === username ? { ...u, courses: userCourses } : u
          );
          localStorage.setItem("users", JSON.stringify(updatedUsers));
          console.log(updatedUsers);
          document.getElementById("paypal-popup-overlay").style.display =
            "none";
          courses(coursesData.courses);
        });
      },
      onError: function (err) {
        console.log("Payment Failed:", err);
      },
    })
    .render("#paypal-button-container");
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

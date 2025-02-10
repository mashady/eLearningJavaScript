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

function displayUserProfile(username, coursesPerPage, paginationContainer) {
  const user = getUserDataByUsername(username);

  if (!user) {
    showNotification("User not found!");
    return;
  }

  const profileInfo = document.getElementById("profileInfo");
  profileInfo.innerHTML = `
          <h1>hello, @${user.username}</h1>
        `;

  let wishCourses = user.wishlist;
  let currentPage = 1;
  const totalPages = Math.ceil(wishCourses.length / coursesPerPage);
  function showCourses(page) {
    const startIndex = (page - 1) * coursesPerPage;
    const endIndex = startIndex + coursesPerPage;

    let slicedWishes = wishCourses.slice(startIndex, endIndex);

    const wishlistCoursesContainer = document.getElementById("wishlistCourses");
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

  function setupPagination() {
    const pagination = document.querySelector(paginationContainer);
    pagination.innerHTML = "";
    console.log(pagination)


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
        // showItems(currentPage);
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

  displayUserProfile(isLogin().username, 6, "#pagination");
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

  displayUserProfile(isLogin().username, 6, "#pagination");
  showNotification("Course removed from wishlist!", 1000);
}

displayUserProfile(isLogin().username, 6, "#pagination");

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
  const historyContainer = document.getElementById("history");
  const certCoursesContainer = document.getElementById("cert");
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
              <p><strong>Instructor:</strong> ${course["Instructor Name"]}</p>
              <p>${course.Description}</p>
              <p><strong>Price:</strong> $${course.Price}</p>
              <p><strong>Duration:</strong> ${course.Duration}</p>
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
              <p><strong>Instructor:</strong> ${course["Instructor Name"]}</p>
              <p>${course.Description}</p>
              <p><strong>Price:</strong> $${course.Price}</p>
              <p><strong>Duration:</strong> ${course.Duration}</p>
            </div>
            </div>
          `;
      wishlistCoursesContainer.appendChild(courseDiv);
    }
  });
}
displayUserProfile(isLogin().username);
const coursesGrid = document.querySelector(".courses-grid");

console.log(getUserDataByUsername(isLogin().username));
console.log(getUserDataByUsername(isLogin().username).courses);

getUserDataByUsername(isLogin().username).courses.forEach((course) => {
  console.log(course.Title);
  const courseCard = document.createElement("div");
  courseCard.classList.add("course-card");

  const courseTitle = document.createElement("h3");
  courseTitle.classList.add("course-title");
  courseTitle.textContent = course.Title;

  const progressBadge = document.createElement("div");
  progressBadge.classList.add("progress-badge");
  progressBadge.textContent = `${course.progressPercentage}%`;

  courseCard.appendChild(courseTitle);
  courseCard.appendChild(progressBadge);
  coursesGrid.appendChild(courseCard);
});

if (!getUserDataByUsername(isLogin().username).courses) {
  document.getElementById("noHistoryAvail").innerHTML = "No History Avail";
} else {
  document.getElementById("noHistoryAvail").innerHTML = "";
}

if (
  getUserDataByUsername(isLogin().username).courses.filter(
    (c) => (c.progressPercentage = 100)
  )
) {
  document.getElementById("noCertificateAvail").innerHTML =
    "No Certificate Avail";
} else {
  document.getElementById("noCertificateAvail").innerHTML = "";
}

console.log(
  getUserDataByUsername(isLogin().username).courses.filter(
    (c) => (c.progressPercentage = 100)
  )
);
const certificationsGrid = document.querySelector(".certifications-grid");

const popupOverlay = document.querySelector(".certification-popup-overlay");
const popup = document.querySelector(".certification-popup");
const popupTitle = popup.querySelector("h2");
const popupUser = popup.querySelector("p:nth-of-type(1)");
const popupCourse = popup.querySelector("p:nth-of-type(2)");
const downloadBtn = popup.querySelector(".download-certification-btn");
const closeBtn = popup.querySelector(".close-popup-btn");

getUserDataByUsername(isLogin().username)
  .courses.filter((c) => c.progressPercentage == 100)
  .forEach((certification) => {
    const certificationCard = document.createElement("div");
    certificationCard.classList.add("certification-card");

    const certificationTitle = document.createElement("h3");
    certificationTitle.classList.add("certification-title");
    certificationTitle.textContent = certification.Title;

    const certificationBadge = document.createElement("div");

    const viewCertificationBtn = document.createElement("button");
    viewCertificationBtn.classList.add("view-certification-btn");
    viewCertificationBtn.textContent = "View Certification";
    viewCertificationBtn.addEventListener("click", () => {
      openPopup(certification);
    });

    certificationCard.appendChild(certificationTitle);
    certificationCard.appendChild(certificationBadge);
    certificationCard.appendChild(viewCertificationBtn);
    certificationsGrid.appendChild(certificationCard);
  });

function openPopup(certification) {
  popupUser.innerHTML = `<strong>User:</strong> ${isLogin().username}`;
  popupCourse.innerHTML = `<strong>Course:</strong> ${certification.title}`;
  downloadBtn.onclick = () => window.open(certification.link, "_blank");
  popupOverlay.style.display = "flex";

  var duration = 15 * 1000;
  var animationEnd = Date.now() + duration;
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  var interval = setInterval(function () {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    var particleCount = 50 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 250);
}

closeBtn.addEventListener("click", () => {
  popupOverlay.style.display = "none";
});

popupOverlay.addEventListener("click", (e) => {
  if (e.target === popupOverlay) {
    popupOverlay.style.display = "none";
  }
});

getUserDataByUsername(isLogin().username).courses;

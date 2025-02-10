const dashboardContainer = document.querySelector(".dashboard-container");
const searchBar = document.getElementById("search-bar");

function getUsersFromLocalStorage() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function renderUsers(filteredUsers) {
  dashboardContainer.innerHTML = "";

  filteredUsers.forEach((user) => {
    console.log(user);
    const card = document.createElement("div");
    card.classList.add("student-card");

    const name = document.createElement("h2");
    name.textContent = user.username;
    card.appendChild(name);

    const courseList = document.createElement("ul");
    courseList.classList.add("course-list");

    const userCourses = user.courses;
    console.log(userCourses);

    userCourses.forEach((course) => {
      const courseItem = document.createElement("li");
      courseItem.textContent = course.Title;

      const progressBar = document.createElement("div");
      progressBar.classList.add("progress-bar");

      const progress = document.createElement("div");
      progress.classList.add("progress");
      progress.style.width = `${course.progressPercentage || 0}%`;

      progressBar.appendChild(progress);
      courseItem.appendChild(progressBar);
      courseList.appendChild(courseItem);
    });

    card.appendChild(courseList);
    dashboardContainer.appendChild(card);
  });
}

const users = getUsersFromLocalStorage();
renderUsers(users);

searchBar.addEventListener("input", (event) => {
  const searchTerm = event.target.value.toLowerCase();
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm)
  );
  renderUsers(filteredUsers);
});

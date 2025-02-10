const students = [
  {
    name: "John Doe",
    courses: [
      { name: "Mathematics", progress: 60 },
      { name: "Science", progress: 45 },
      { name: "History", progress: 80 },
    ],
  },
  {
    name: "Jane Smith",
    courses: [
      { name: "Mathematics", progress: 75 },
      { name: "Literature", progress: 90 },
    ],
  },
  {
    name: "Alice Johnson",
    courses: [
      { name: "Physics", progress: 50 },
      { name: "Chemistry", progress: 70 },
    ],
  },
];

const dashboardContainer = document.querySelector(".dashboard-container");
const searchBar = document.getElementById("search-bar");

function renderStudents(filteredStudents) {
  dashboardContainer.innerHTML = "";

  filteredStudents.forEach((student) => {
    const card = document.createElement("div");
    card.classList.add("student-card");

    const name = document.createElement("h2");
    name.textContent = student.name;
    card.appendChild(name);

    const courseList = document.createElement("ul");
    courseList.classList.add("course-list");

    student.courses.forEach((course) => {
      const courseItem = document.createElement("li");
      courseItem.textContent = course.name;

      const progressBar = document.createElement("div");
      progressBar.classList.add("progress-bar");

      const progress = document.createElement("div");
      progress.classList.add("progress");
      progress.style.width = `${course.progress}%`;

      progressBar.appendChild(progress);
      courseItem.appendChild(progressBar);
      courseList.appendChild(courseItem);
    });

    card.appendChild(courseList);
    dashboardContainer.appendChild(card);
  });
}

renderStudents(students);

searchBar.addEventListener("input", (event) => {
  const searchTerm = event.target.value.toLowerCase();
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm)
  );
  renderStudents(filteredStudents);
});

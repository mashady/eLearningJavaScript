let isEditing = false;
let currentCourseId = null;
let lessonCount = 0;
let currentLesson = 1;
const lessons = [];

const openModalButton = document.getElementById("openModal");
const closeModalButton = document.getElementById("closeModal");
const modalOverlay = document.getElementById("modalOverlay");
const multiStepForm = document.getElementById("multiStepForm");

const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const lessonSteps = document.getElementById("lessonSteps");
const finalStep = document.getElementById("finalStep");

const nextStep1Button = document.getElementById("nextStep1");
const prevStep2Button = document.getElementById("prevStep2");
const nextStep2Button = document.getElementById("nextStep2");
const prevLessonStepButton = document.getElementById("prevLessonStep");
const nextLessonStepButton = document.getElementById("nextLessonStep");
const prevFinalStepButton = document.getElementById("prevFinalStep");

const lessonCountInput = document.getElementById("lessonCount");
const currentLessonNumber = document.getElementById("currentLessonNumber");
const lessonTitleInput = document.getElementById("lessonTitle");
const lessonDurationInput = document.getElementById("lessonDuration");
const lessonVideoInput = document.getElementById("lessonVideo");
const lessonPdfInput = document.getElementById("lessonPdf");
document.addEventListener("DOMContentLoaded", fetchCourses);

openModalButton.addEventListener("click", () => {
  modalOverlay.classList.add("active");
  showStep(step1);
});

closeModalButton.addEventListener("click", () => {
  modalOverlay.classList.remove("active");
  resetForm();
});

nextStep1Button.addEventListener("click", () => showStep(step2));
prevStep2Button.addEventListener("click", () => showStep(step1));
nextStep2Button.addEventListener("click", () => {
  lessonCount = parseInt(lessonCountInput.value);
  if (lessonCount > 0) {
    currentLesson = 1;
    updateLessonStep();
    showStep(lessonSteps);
  }
});
prevLessonStepButton.addEventListener("click", () => {
  if (currentLesson > 1) {
    currentLesson--;
    updateLessonStep();
  } else {
    showStep(step2);
  }
});
nextLessonStepButton.addEventListener("click", () => {
  saveCurrentLesson();
  if (currentLesson < lessonCount) {
    currentLesson++;
    updateLessonStep();
  } else {
    showStep(finalStep);
  }
});
prevFinalStepButton.addEventListener("click", () => {
  currentLesson = lessonCount;
  updateLessonStep();
  showStep(lessonSteps);
});

function updateLessonStep() {
  currentLessonNumber.textContent = currentLesson;
  const lesson = lessons[currentLesson - 1] || {};
  lessonTitleInput.value = lesson.lessonTitle || "";
  lessonDurationInput.value = lesson.lessonDuration || "";
  lessonVideoInput.value = lesson.lessonVideo || "";
  lessonPdfInput.value = lesson.lessonPdf || "";
}

function saveCurrentLesson() {
  const lesson = {
    lessonTitle: lessonTitleInput.value,
    lessonDuration: lessonDurationInput.value,
    lessonVideo: lessonVideoInput.value,
    lessonPdf: lessonPdfInput.value,
  };
  lessons[currentLesson - 1] = lesson;
}

multiStepForm.addEventListener("submit", function (event) {
  event.preventDefault();

  //TODO: get instructor name
  const title = document.getElementById("title").value;
  const image = document.getElementById("image").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const price = parseFloat(document.getElementById("price").value) || null;
  const duration = document.getElementById("duration").value;

  const updatedCourse = {
    ID: isEditing ? currentCourseId : Date.now(),
    Title: title,
    Image: image,
    Category: category,
    Description: description,
    Price: price,
    Duration: duration,
    Content: lessons.map((lesson, index) => ({
      lesson_id: index + 1,
      lesson_title: lesson.lessonTitle,
      lesson_duration: lesson.lessonDuration,
      lesson_video: lesson.lessonVideo,
      lesson_pdf: lesson.lessonPdf,
    })),
  };

  let courses = JSON.parse(localStorage.getItem("Courses")) || [];
  if (isEditing) {
    const courseIndex = courses.findIndex(
      (course) => course.ID === Number(currentCourseId)
    );
    if (courseIndex !== -1) {
      courses[courseIndex] = updatedCourse;
    } else {
      alert("Course not found, adding as new");
      courses.push(updatedCourse);
    }
  } else {
    courses.push(updatedCourse);
  }

  localStorage.setItem("Courses", JSON.stringify(courses));
  modalOverlay.classList.remove("active");
  resetForm();
  fetchCourses();
  alert(
    isEditing ? "Course updated successfully!" : "Course added successfully!"
  );
  isEditing = false;
  currentCourseId = null;
});

function resetForm() {
  multiStepForm.reset();
  lessonCount = 0;
  currentLesson = 1;
  lessons.length = 0;
  showStep(step1);
}

function showStep(step) {
  document
    .querySelectorAll(".form-step")
    .forEach((s) => s.classList.remove("active"));
  step.classList.add("active");
}

// function fetchCourses() {
//   let courses = JSON.parse(localStorage.getItem("Courses")) || [];
//   const courseListContainer = document.getElementById("courses-list");
//   console.log(courses);
//   console.log(courseListContainer);

//   if (!courseListContainer) {
//     console.error("courseList element not found!");
//     return;
//   }

//   courseListContainer.innerHTML = ""; // Clear previous courses

//   courses.forEach((course) => {
//     const courseElement = document.createElement("div");
//     courseElement.classList.add("course-card");
//     courseElement.innerHTML = `
//             <img src="${course.Image}" alt="${course.Title}" class="course-image">
//             <h3>${course.Title}</h3>
//             <p>${course.Description}</p>
//             <p><strong>Category:</strong> ${course.Category}</p>
//             <p><strong>Price:</strong> $${course.Price || "Free"}</p>
//             <p><strong>Duration:</strong> ${course.Duration}</p>
//             <button onclick="editCourse(${course.ID})">Edit</button>
//             <button onclick="deleteCourse(${course.ID})">Delete</button>
//         `;
//     courseListContainer.appendChild(courseElement);
//   });
// }

// Function to fetch and display courses with optional search term
function fetchCourses(searchTerm = "", searchBy = "Title") {
  const coursesList = document.getElementById("courses-list");
  coursesList.innerHTML = "";

  let courses = JSON.parse(localStorage.getItem("Courses")) || [];
  console.log(courses);

  // Ensure searchTerm is a string
  searchTerm = String(searchTerm || "");

  if (searchTerm) {
      courses = courses.filter(course => {
          if (searchBy === "Title") {
              return course.Title.toLowerCase().includes(searchTerm.toLowerCase());
          } else if (searchBy === "Category") {
              return course.Category.toLowerCase().includes(searchTerm.toLowerCase());
          }
          return true;
      });
  }

  console.log(courses.length)
  if (courses.length === 0) {
      coursesList.innerHTML = "<p>No courses available</p>";
      return;
  }

  courses.forEach((course) => {
      console.log(course.Title + " " + course.Content);
      // let content =[course.Content];
      // console.log(course.Title + " " + content);
      const courseItem = document.createElement("div");
      courseItem.classList.add("course-card");
      courseItem.innerHTML = `
          <h3>${course.Title}</h3>
          <p><strong>Category:</strong> ${course.Category}</p>
          <p><strong>Instructor:</strong> ${course.Instructor_Name}</p>
          <p><strong>Duration:</strong> ${course.Duration}</p>
          <button onclick="edit('${course.ID}')">Edit</button>
          <button onclick="deleteCourseById('${course.ID}')">Delete</button>
      `;
      coursesList.appendChild(courseItem);
  });
}

function editCourse(courseId) {
  let courses = JSON.parse(localStorage.getItem("Courses")) || [];
  const course = courses.find((course) => course.ID === courseId);

  if (!course) {
    alert("Course not found!");
    return;
  }

  isEditing = true;
  currentCourseId = course.ID;

  document.getElementById("title").value = course.Title;
  document.getElementById("image").value = course.Image;
  document.getElementById("category").value = course.Category;
  document.getElementById("description").value = course.Description;
  document.getElementById("price").value = course.Price;
  document.getElementById("duration").value = course.Duration;
  lessons.length = 0;
  course.Content.forEach((lesson, index) => {
    lessons[index] = {
      lessonTitle: lesson.lesson_title,
      lessonDuration: lesson.lesson_duration,
      lessonVideo: lesson.lesson_video,
      lessonPdf: lesson.lesson_pdf,
    };
  });

  lessonCountInput.value = course.Content.length;
  lessonCount = course.Content.length;
  currentLesson = 1;
  updateLessonStep();

  modalOverlay.classList.add("active");
  showStep(step1);
}

function deleteCourse(courseId) {
  if (confirm("Are you sure you want to delete this course?")) {
    let courses = JSON.parse(localStorage.getItem("Courses")) || [];
    courses = courses.filter((course) => course.ID !== courseId);
    localStorage.setItem("Courses", JSON.stringify(courses));
    fetchCourses();
  }
}

/*import {
  validateURL,
  validateOnlyCharacters,
  validateOnBlur,
} from "../validation.js";*/
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
document.addEventListener("DOMContentLoaded", () => {
  /**
    validateOnBlur(lessonPdfInput, "lessonPdf", {
    required: true,
    validURL: true,
  });
     */
});
document.getElementById("search-input").addEventListener("blur", () => {
  console.log("fethced");
  fetchCourses(document.getElementById("search-input").value.trim());
});
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

  if (localStorage.getItem("Courses") == "undefined") {
    console.log("courses exist but undifined so we cannot use json parse ");
    console.log(localStorage.getItem("Courses"));
  } else {
    console.log(localStorage.getItem("Courses"));
    var courses = JSON.parse(localStorage.getItem("Courses")) || [];

    console.log("courses not exist");
  }
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

function fetchCourses() {
  if (localStorage.getItem("Courses") == "undefined") {
    console.log("courses exist but undifined so we cannot use json parse ");
    console.log(localStorage.getItem("Courses"));
  } else {
    console.log(localStorage.getItem("Courses"));
    var courses = JSON.parse(localStorage.getItem("Courses")) || [];

    console.log("courses not exist");
  }

  const courseListContainer = document.getElementById("courseList");

  if (!courseListContainer) {
    console.error("courseList element not found!");
    return;
  }

  courseListContainer.innerHTML = ""; // Clear previous courses

  courses?.forEach((course) => {
    const courseElement = document.createElement("div");
    courseElement.classList.add("course-card");
    courseElement.innerHTML = `
              <img src="${course.Image}" alt="${
      course.Title
    }" class="course-image">
              <h3>${course.Title}</h3>
              <p>${course.Description}</p>
              <p><strong>Category:</strong> ${course.Category}</p>
              <p><strong>Price:</strong> ${course.Price || "Free"}</p>
              <p><strong>Duration:</strong> ${course.Duration}</p>
              <button onclick="editCourse(${course.ID})">Edit</button>
              <button onclick="deleteCourse(${course.ID})">Delete</button>
          `;
    courseListContainer.appendChild(courseElement);
  });
}

function editCourse(courseId) {
  let courses = JSON.parse(localStorage.getItem("Courses")) || [];
  if (courses && typeof courses === "string") {
    try {
      const parsedcourses = JSON.parse(courses);
      console.log(parsedcourses);
    } catch (error) {
      console.error("Failed to parse JSON:", error);
    }
  } else {
    console.error("Invalid or undefined JSON courses");
  }
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
    if (courses && typeof courses === "string") {
      try {
        const parsedcourses = JSON.parse(courses);
        console.log(parsedcourses);
      } catch (error) {
        console.error("Failed to parse JSON:", error);
      }
    } else {
      console.error("Invalid or undefined JSON courses");
    }
    courses = courses.filter((course) => course.ID !== courseId);
    localStorage.setItem("Courses", JSON.stringify(courses));
    fetchCourses();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const categories = JSON.parse(localStorage.getItem("categories")) || [];

  const categoryDropdown = document.getElementById("category");

  categoryDropdown.innerHTML =
    '<option value="" disabled selected>Select a category</option>';

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.name;
    option.textContent = category.name;
    categoryDropdown.appendChild(option);
  });
});

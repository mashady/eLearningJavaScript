/*import {
  validateURL,
  validateOnlyCharacters,
  validateOnBlur,
} from "../validation.js";*/

import { showNotification } from "../../utils/user.js";
/*
function showNotification(message, duration = 3000) {
  const notification = document.getElementById("notification");
  const notificationMessage = document.getElementById("notification-message");
  const overlay = document.getElementById("overlay");

  notificationMessage.textContent = message;

  notification.classList.add("show");
  overlay.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
    overlay.classList.remove("show");
  }, duration);
}*/
let isEditing = false;
let currentCourseId = null;
let currentCourseScore = 0;
let currentCourseFeedback = [];
let currentCourseCompletedLessons = [];
let lessonCount = 0;
let currentLesson = 1;
const lessons = [];

function validateForm() {
  let title = document.getElementById("title").value.trim();
  let image = document.getElementById("image").value.trim();
  let category = document.getElementById("category").value.trim();
  let instructor = document.getElementById("instructor").value.trim();
  let price = document.getElementById("price").value.trim();
  let duration = document.getElementById("duration").value.trim();
  let description = document.getElementById("description").value.trim();

  let nameRegex = /^[a-zA-Z\s]+$/;
  let urlRegex = /^(https?:\/\/)[^\s$.?#].[^\s]*$/;
  let numberRegex = /^[0-9]+$/;

  /*document
    .querySelectorAll(".error-message")
    .forEach((el) => (el.textContent = ""));*/

  let isValid = true;

  if (title === "") {
    document.getElementById("title-error").style.display = "block";

    document.getElementById("title-error").textContent = "Title is required";
    isValid = false;
  } else {
    document.getElementById("title-error").style.display = "none";
  }

  if (image === "" || !urlRegex.test(image)) {
    document.getElementById("image-error").style.display = "block";

    document.getElementById("image-error").textContent =
      "Valid image URL is required";
    isValid = false;
  } else {
    document.getElementById("image-error").style.display = "none";
  }

  if (category === "") {
    document.getElementById("category-error").style.display = "block";

    document.getElementById("category-error").textContent =
      "Category is required";
    isValid = false;
  } else {
    document.getElementById("category-error").style.display = "none";
  }

  if (instructor === "" || !nameRegex.test(instructor)) {
    document.getElementById("instructor-error").style.display = "block";

    document.getElementById("instructor-error").textContent =
      "Instructor must contain only letters";
    isValid = false;
  } else {
    document.getElementById("instructor-error").style.display = "none";
  }

  if (price !== "" && !numberRegex.test(price)) {
    document.getElementById("price-error").style.display = "block";

    document.getElementById("price-error").textContent =
      "Price must be a number";
    isValid = false;
  } else {
    document.getElementById("price-error").style.display = "none";
  }

  if (duration === "" || !numberRegex.test(duration)) {
    document.getElementById("duration-error").style.display = "block";

    document.getElementById("duration-error").textContent =
      "Duration must be a number";
    showNotification("Duration must be a number", 1000);
    isValid = false;
  } else {
    document.getElementById("duration-error").style.display = "none";
  }

  if (description === "") {
    document.getElementById("description-error").style.display = "block";
    document.getElementById("description-error").textContent =
      "Description is required";
    isValid = false;
  } else {
    document.getElementById("description-error").style.display = "none";
  }

  if (!isValid) {
    showNotification("all field is required or you have invalid values", 1000);
    return false;
  }
  return true;
}

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
/**



*/
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

nextStep1Button.addEventListener("click", () => {
  /**
   * 
if (
    !title.value ||
    !description.value ||
    !duration.value ||
    !category.value ||
    !image.value
  ) {
    showNotification("All fields are required!", 2000);

    return;
  }

  let title = document.getElementById("title");
  let image = document.getElementById("image");
  let description = document.getElementById("description");
  let price = document.getElementById("price");
  let duration = document.getElementById("duration");
  let category = document.getElementById("category");
   */

  /**
  if (!isValidURL(image.value)) {
    alert("Invalid URL!");
    return;
  }
  */

  /*if (
    price.value <= 0 ||
    price.value.includes(".") ||
    price.value.includes(",")
  ) {
    alert("Invalid price!");
    return;
  }*/

  /**
    if (
    duration.value <= 0 ||
    isNaN(duration.value) ||
    duration.value.includes(".")
  ) {
    showNotification("Invalid duration!", 1000);

    return;
  }
    
    */
  let valid = validateForm();

  if (valid) showStep(step2);
  console.log("step 1");
});
prevStep2Button.addEventListener("click", () => showStep(step1));
nextStep2Button.addEventListener("click", () => {
  console.log("next step");
  lessonCount = parseInt(lessonCountInput.value);
  if (lessonCount > 0) {
    currentLesson = 1;
    updateLessonStep();
    showStep(lessonSteps);
  } else {
    showNotification("Please enter a valid number of lessons", 1000);
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
function isValidURL(url) {
  const regex =
    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  return regex.test(url);
}
function checkLink(obj) {
  const regex = /^(https?:\/\/[^\s]+)$/;
  return !regex.test(obj.value);
}
console.log(
  "chk",
  checkLink(
    "https://github.com/Mohamedmaged01/JsProject/blob/master/pages/content.html"
  )
);
console.log(checkNum("11111"));

function checkNum(obj) {
  const regex = /^\d+(\.\d+)?$/;
  return !regex.test(obj.value);
}

nextLessonStepButton.addEventListener("click", () => {
  let lessonTitle = document.getElementById("lessonTitle");
  let lessonDuration = document.getElementById("lessonDuration");
  let lessonVideo = document.getElementById("lessonVideo");
  let lessonPdf = document.getElementById("lessonPdf");

  document.querySelectorAll(".error-message").forEach((el) => {
    el.style.display = "none";
    el.textContent = "";
  });

  if (
    !lessonTitle.value ||
    !lessonDuration.value ||
    !lessonVideo.value ||
    !lessonPdf.value
  ) {
    showNotification("All fields are required!", 2000);
    return;
  }

  let isValid = true;

  let lessonTitleError = document.getElementById("lessonTitle-error");
  if (!lessonTitle.value.trim()) {
    lessonTitleError.style.display = "block";
    lessonTitleError.textContent = "Lesson title is required";
    isValid = false;
  } else {
    lessonTitleError.style.display = "none";
  }

  let lessonDurationError = document.getElementById("lessonDuration-error");
  if (!lessonDuration.value.trim() || isNaN(lessonDuration.value.trim())) {
    lessonDurationError.style.display = "block";
    lessonDurationError.textContent = "Duration must be a number";
    isValid = false;
  } else {
    lessonDurationError.style.display = "none";
  }

  // Validate Video URL
  let lessonVideoError = document.getElementById("lessonVideo-error");
  let urlRegex = /^(https?:\/\/)[^\s$.?#].[^\s]*$/;
  //if (image === "" || !urlRegex.test(image)) {
  //
  if (!lessonVideo.value.trim() || !urlRegex.test(lessonVideo.value.trim())) {
    lessonVideoError.style.display = "block";
    lessonVideoError.textContent = "Valid video URL is required";
    isValid = false;
  } else {
    lessonVideoError.style.display = "none";
  }

  let lessonPdfError = document.getElementById("lessonPdf-error");
  if (!lessonPdf.value.trim() || !urlRegex.test(lessonPdf.value.trim())) {
    lessonPdfError.style.display = "block";
    lessonPdfError.textContent = "Valid PDF URL is required";
    isValid = false;
  } else {
    lessonPdfError.style.display = "none";
  }

  if (!isValid) {
    return;
  }

  console.log("Validated successfully!");
  saveCurrentLesson();
  if (currentLesson < lessonCount) {
    currentLesson++;
    updateLessonStep();
  } else {
    showStep(finalStep);
  }
});

/**
lessonTitle.addEventListener("blur", () => {
  const titleInput = document.getElementById("lessonTitle");
  if (titleInput.value.trim() === "") {
    console.log("Should not be empty");
    document.getElementById("lessonTitle-error").style.display = "block";
    document.getElementById("lessonTitle-error").innerHTML =
      "lesson title must not be empty";
    //title-error

    titleInput.focus();
  } else {
    document.getElementById("lessonTitle-error").style.display = "none";

    document.getElementById("lessonTitle-error").innerHTML = "";
  }
});

*/

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
/**
document.getElementById("title").addEventListener("blur", () => {
  const titleInput = document.getElementById("title"); // Get the input element
  if (titleInput.value.trim() === "") {
    console.log("Should not be empty");
    document.getElementById("title-error").style.display = "block";
    document.getElementById("title-error").innerHTML =
      "title must not be empty";
    //title-error

    titleInput.focus();
  } else {
    document.getElementById("title-error").innerHTML = "";
  }
});

document.getElementById("image").addEventListener("blur", () => {
  const imageInput = document.getElementById("image"); // Get the input element
  if (imageInput.value.trim() === "") {
    console.log("Should not be empty");
    document.getElementById("image-error").innerHTML =
      "image must not be empty";
    //image-error

    imageInput.focus();
  } else {
    document.getElementById("image-error").innerHTML = "";
  }
});

document.getElementById("description").addEventListener("blur", () => {
  const descriptionInput = document.getElementById("description");
  if (descriptionInput.value.trim() === "") {
    console.log("Should not be empty");
    document.getElementById("description-error").innerHTML =
      "description must not be empty";
    //description-error

    descriptionInput.focus();
  } else {
    document.getElementById("description-error").innerHTML = "";
  }
});

*/

/*
document.getElementById("price").addEventListener("blur", () => {
  const priceInput = document.getElementById("price");
  if (priceInput.value.trim() === "") {
    console.log("Should not be empty");
    document.getElementById("price-error").innerHTML =
      "price must not be empty";
    //price-error

    priceInput.focus();
  } else {
    document.getElementById("price-error").innerHTML = "";
  }
});
*/
/**
document.getElementById("instructor").addEventListener("blur", () => {
  const instructorInput = document.getElementById("instructor");
  if (instructorInput.value.trim() === "") {
    console.log("Should not be empty");
    document.getElementById("instructor-error").innerHTML =
      "instructor must not be empty";
    //instructor-error

    instructorInput.focus();
  } else {
    document.getElementById("instructor-error").innerHTML = "";
  }
});

document.getElementById("duration").addEventListener("blur", () => {
  const durationInput = document.getElementById("duration");
  if (durationInput.value.trim() === "") {
    console.log("Should not be empty");
    document.getElementById("duration-error").innerHTML =
      "duration must not be empty";
    //duration-error

    durationInput.focus();
  } else {
    document.getElementById("duration-error").innerHTML = "";
  }
});

*/

/*
document.getElementById("lessonCount").addEventListener("blur", () => {
  const lessonCountInput = document.getElementById("lessonCount");
  if (lessonCountInput.value.trim() === "") {
    console.log("Should not be empty");
    document.getElementById("lessonCount-error").innerHTML =
      "lessonCount must not be empty";
    //lessonCount-error

    lessonCountInput.focus();
  } else {
    document.getElementById("lessonCount-error").innerHTML = "";
  }
});

document.getElementById("lessonTitle").addEventListener("blur", () => {
  const lessonTitleInput = document.getElementById("lessonTitle");
  if (lessonTitleInput.value.trim() === "") {
    console.log("Should not be empty");
    document.getElementById("lessonTitle-error").innerHTML =
      "lessonTitle must not be empty";
    //lessonTitle-error

    lessonTitleInput.focus();
  } else {
    document.getElementById("lessonTitle-error").innerHTML = "";
  }
});

document.getElementById("lessonDuration").addEventListener("blur", () => {
  const lessonDurationInput = document.getElementById("lessonDuration");
  if (lessonDurationInput.value.trim() === "") {
    console.log("Should not be empty");
    document.getElementById("lessonDuration-error").innerHTML =
      "lessonDuration must not be empty";
    //lessonDuration-error

    lessonDurationInput.focus();
  } else {
    document.getElementById("lessonDuration-error").innerHTML = "";
  }
});

document.getElementById("lessonVideo").addEventListener("blur", () => {
  const lessonVideoInput = document.getElementById("lessonVideo");
  if (lessonVideoInput.value.trim() === "") {
    console.log("Should not be empty");
    document.getElementById("lessonVideo-error").innerHTML =
      "lessonVideo must not be empty";
    //lessonVideo-error

    lessonVideoInput.focus();
  } else {
    document.getElementById("lessonVideo-error").innerHTML = "";
  }
});

document.getElementById("lessonPdf").addEventListener("blur", () => {
  const lessonPdfInput = document.getElementById("lessonPdf");
  if (lessonPdfInput.value.trim() === "") {
    console.log("Should not be empty");
    document.getElementById("lessonPdf-error").innerHTML =
      "lessonPdf must not be empty";
    //lessonPdf-error

    lessonPdfInput.focus();
  } else {
    document.getElementById("lessonPdf-error").innerHTML = "";
  }
});
*/
multiStepForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const course = JSON.parse(localStorage.getItem("Courses"));
  let courslen = course?.length || 0;
  console.log(courslen);

  const cat = document.getElementById("category").value;
  if (cat == "") {
    document.getElementById("category-span").value = "";
  }

  const title = document.getElementById("title").value.trim();
  const image = document.getElementById("image").value.trim();
  const category = document.getElementById("category").value.trim();
  const instructor = document.getElementById("instructor").value.trim();
  const description = document.getElementById("description").value.trim();
  const price = parseFloat(document.getElementById("price").value) || null;
  const duration = document.getElementById("duration").value.trim();
  /*let completedLessons = [];
  let progressPercentage = 0;
  let feedback = [];
  let score = 0;*/

  const updatedCourse = {
    ID: isEditing ? currentCourseId : Date.now(), //courslen + 1
    Title: title,
    Image: image,
    Category: category,
    Description: description,
    Instructor: instructor,
    Price: price,
    Duration: duration,
    Content: lessons.map((lesson, index) => ({
      lesson_id: index + 1,
      lesson_title: lesson.lessonTitle,
      lesson_duration: lesson.lessonDuration,
      lesson_video: lesson.lessonVideo,
      lesson_pdf: lesson.lessonPdf,
    })),
    completedLessons: 0,
    progressPercentage: 0,
    feedback: isEditing ? currentCourseFeedback : [],
    score: isEditing ? currentCourseScore : 0,
  };
  console.log(updatedCourse);

  if (localStorage.getItem("Courses") == "undefined") {
    console.log("courses exist but undifined so we cannot use json parse ");
    console.log(localStorage.getItem("Courses"));
  } else {
    console.log(localStorage.getItem("Courses"));
    var courses = JSON.parse(localStorage.getItem("Courses")) || [];

    // console.log("courses not exist");
  }
  if (isEditing) {
    const courseIndex = courses.findIndex(
      (course) => course.ID === Number(currentCourseId)
    );
    if (courseIndex !== -1) {
      courses[courseIndex] = updatedCourse;
    } else {
      //showNotification("Course not found, adding as new");
      showNotification("All fields are required!", 2000);

      courses.push(updatedCourse);
    }
  } else {
    courses.push(updatedCourse);
  }

  localStorage.setItem("Courses", JSON.stringify(courses));
  modalOverlay.classList.remove("active");
  resetForm();
  fetchCourses();
  showNotification(
    isEditing ? "Course updated successfully!" : "Course added successfully!",
    2000
  );

  /*
  showNotification(
    isEditing ? "Course updated successfully!" : "Course added successfully!"
  );*/

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

  courseListContainer.innerHTML = "";

  courses?.forEach((course) => {
    const courseElement = document.createElement("div");
    courseElement.classList.add("course-card");

    courseElement.innerHTML = `
        <img src="${course.Image}" alt="${course.Title}" class="course-image">
        <h3>${course.Title}</h3>
        <p>${course.Description}</p>
        <p><strong>Category:</strong> ${course.Category}</p>
        <p><strong>Instructor:</strong> ${course.Instructor}</p>
        <p><strong>Price:</strong> ${course.Price || "Free"}</p>
        <p><strong>Duration:</strong> ${course.Duration}</p>
    `;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => editCourse(course.ID));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteCourse(course.ID));

    courseElement.appendChild(editButton);
    courseElement.appendChild(deleteButton);

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
    showNotification("Course not found!", 2000);
    return;
  }

  isEditing = true;
  currentCourseId = course.ID;
  currentCourseScore = course.score;
  currentCourseFeedback = course.feedback;

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
  if (!confirm("Are you sure you want to delete this course?")) return;

  let courses = JSON.parse(localStorage.getItem("Courses")) || [];

  let courseToDelete = courses.find((course) => course.ID === courseId);
  if (!courseToDelete) {
    showNotification("Course not found!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let isPaidCourse = false;

  users = users.map((user) => {
    let userHasCourse = user.courses.some((course) => course.ID === courseId);

    if (userHasCourse) {
      let paidCourse = user.courses.find(
        (course) => course.ID === courseId && course.Price != null
      );

      if (paidCourse) {
        isPaidCourse = true;
        return user;
      }

      user.courses = user.courses.filter((course) => course.ID !== courseId);
    }
    return user;
  });

  if (!isPaidCourse) {
    courses = courses.filter((course) => course.ID !== courseId);
    localStorage.setItem("Courses", JSON.stringify(courses));
  } else {
    showNotification(
      "This course has been purchased by a user and cannot be deleted."
    );
  }

  localStorage.setItem("users", JSON.stringify(users));

  fetchCourses();
}

/*
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
}*/

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

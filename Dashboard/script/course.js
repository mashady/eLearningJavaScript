
let isEditing = false;
let currentCourseId = null;

// document.addEventListener("DOMContentLoaded", populateCourseSelect);
let coursesData = JSON.parse(localStorage.getItem("Courses")) || {
    courses: [],
};

// ✅ Ensure coursesData always has the correct structure
if (!Array.isArray(coursesData)) {
    coursesData = { courses: [] };
}

function populateCourseSelect() {
    const courseSelect = document.getElementById("courseSelect");
    courseSelect.innerHTML =
        '<option value="">Select Course to Edit</option>';

    coursesData.courses.forEach((course) => {
        const option = document.createElement("option");
        option.value = course.ID;
        option.textContent = course.Title;
        courseSelect.appendChild(option);
    });
}

function edit(selectedId) {
    // const selectedId = document.getElementById("courseSelect").value;
    // if (!selectedId) return alert("Please select a course to edit");

    
    // console.log("selectedId", selectedId);

    const courseToEdit = coursesData.find(
        (c) => c.ID === Number(selectedId)
    );
    // console.log(courseToEdit);
    if (!courseToEdit) return alert("Course not found");

    isEditing = true;
    currentCourseId = Number(selectedId);
    // console.log("selectedId", selectedId);
    loadCourseData(courseToEdit);
    modalOverlay.classList.add("active");
};

// document.getElementById("editCourse").addEventListener("click", edit);

function loadCourseData(course) {
    console.log("lodecourse begin")
    document.getElementById("title").value = course.Title;
    document.getElementById("image").value = course.Image;
    document.getElementById("category").value = course.Category;
    document.getElementById("description").value = course.Description;
    document.getElementById("price").value = course.Price;
    document.getElementById("duration").value = course.Duration;

    lessonCountInput.value = course.Content.length;
    lessonCount = course.Content.length;

    console.log(course);
    console.log(course.Content);

    lessons.length = 0;
    course.Content.forEach((lesson) => {
        lessons.push({
            lessonTitle: lesson.lesson_title,
            lessonDuration: lesson.lesson_duration,
            lessonVideo: lesson.lesson_video,
            lessonPdf: lesson.lesson_pdf,
        });
    });

    currentLesson = 1;
    console.log("loadcourse end");
    updateLessonStep();
    showStep(lessonSteps);
}

function resetForm() {
    multiStepForm.reset();
    lessonCount = 0;
    currentLesson = 1;
    lessons.length = 0;
    isEditing = false;
    currentCourseId = null;
    showStep(step1);
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
const currentLessonNumber = document.getElementById(
    "currentLessonNumber"
);

const lessonTitleInput = document.getElementById("lessonTitle");
const lessonDurationInput = document.getElementById("lessonDuration");
const lessonVideoInput = document.getElementById("lessonVideo");
const lessonPdfInput = document.getElementById("lessonPdf");

let lessonCount = 0;
let currentLesson = 1;
const lessons = [];

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
    console.log("updatelessonstep begin")
    currentLessonNumber.textContent = currentLesson;
    const lesson = lessons[currentLesson - 1] || {};
    lessonTitleInput.value = lesson.lessonTitle || "";
    lessonDurationInput.value = lesson.lessonDuration || "";
    lessonVideoInput.value = lesson.lessonVideo || "";
    lessonPdfInput.value = lesson.lessonPdf || "";
    console.log("updatelessonstep end");
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
/*
multiStepForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const image = document.getElementById("image").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const price = parseFloat(document.getElementById("price").value);
  const duration = document.getElementById("duration").value;

  const id = (coursesData.courses.length + 1).toString();

  const newCourse = {
    ID: isEditing ? currentCourseId : id,
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

  coursesData.courses.push(newCourse);

  localStorage.setItem("coursesData", JSON.stringify(coursesData));

  console.log("Updated Courses Data:", coursesData);

  modalOverlay.classList.remove("active");
  resetForm();

  alert("Course added successfully!");
  if (isEditing) {
    isEditing = false;
  }
});
*/
// multiStepForm.addEventListener("submit", function (event) {
//     console.log("submit begin");
//     event.preventDefault();

//     const title = document.getElementById("title").value;
//     const image = document.getElementById("image").value;
//     const category = document.getElementById("category").value;
//     const description = document.getElementById("description").value;
//     const price = parseFloat(document.getElementById("price").value);
//     const duration = document.getElementById("duration").value;

//     const newCourse = {
//         ID: isEditing
//             ? currentCourseId
//             : (coursesData.length + 1).toString(),
//         Title: title,
//         Image: image,
//         Category: category,
//         Description: description,
//         Price: price,
//         Duration: duration,
//         Content: lessons.map((lesson, index) => ({
//             lesson_id: index + 1,
//             lesson_title: lesson.lessonTitle,
//             lesson_duration: lesson.lessonDuration,
//             lesson_video: lesson.lessonVideo,
//             lesson_pdf: lesson.lessonPdf,
//         })),
//     };

//     if (isEditing) {
//         const courseIndex = coursesData.courses.findIndex(
//             (course) => course.ID === currentCourseId
//         );

//         if (courseIndex !== -1) {
//             coursesData.courses[courseIndex] = newCourse;
//         } else {
//             alert("Course not found, adding as new");
//             coursesData.push(newCourse);
//         }
//     } else {
//         coursesData.push(newCourse);
//     }

//     localStorage.setItem("Courses", JSON.stringify(coursesData));
//     console.log("Updated Courses Data:", coursesData);

//     modalOverlay.classList.remove("active");
//     resetForm();
//     populateCourseSelect();
//     alert(
//         isEditing
//             ? "Course updated successfully!"
//             : "Course added successfully!"
//     );

//     isEditing = false;
//     currentCourseId = null;

//     console.log("submit end");
// });
// multiStepForm.addEventListener("submit", function (event) {
//     console.log("submit begin");
//     event.preventDefault();

//     // ✅ Remove 'required' from hidden inputs before submitting
//     document.querySelectorAll(".form-step:not(.active) input[required]").forEach(input => {
//         input.removeAttribute("required");
//     });

//     const title = document.getElementById("title").value;
//     const image = document.getElementById("image").value;
//     const category = document.getElementById("category").value;
//     const description = document.getElementById("description").value;
//     const price = parseFloat(document.getElementById("price").value) || 0;
//     const duration = document.getElementById("duration").value;

//     const newCourse = {
//         ID: isEditing ? currentCourseId : (coursesData.courses.length + 1).toString(),
//         Title: title,
//         Image: image,
//         Category: category,
//         Description: description,
//         Price: price,
//         Duration: duration,
//         Content: lessons.map((lesson, index) => ({
//             lesson_id: index + 1,
//             lesson_title: lesson.lessonTitle,
//             lesson_duration: lesson.lessonDuration,
//             lesson_video: lesson.lessonVideo,
//             lesson_pdf: lesson.lessonPdf,
//         })),
//     };

//     if (isEditing) {
//         const courseIndex = coursesData.findIndex(course => course.ID === Number(currentCourseId));
//         if (courseIndex !== -1) {
//             coursesData[courseIndex] = newCourse;
//         } else {
//             alert("Course not found, adding as new");
//             coursesData.courses.push(newCourse);
//         }
//     } else {
//         coursesData.courses.push(newCourse);
//     }

//     localStorage.setItem("Courses", JSON.stringify(coursesData));
//     console.log("Updated Courses Data:", coursesData);

//     modalOverlay.classList.remove("active");
//     resetForm();
//     // populateCourseSelect();
//     fetchCourses();
//     alert(isEditing ? "Course updated successfully!" : "Course added successfully!");

//     isEditing = false;
//     currentCourseId = null;

//     console.log("submit end");
// });
multiStepForm.addEventListener("submit", function (event) {
    console.log("submit begin");
    event.preventDefault();

    // ✅ Step 1: Store required fields that are in hidden steps
    const hiddenRequiredFields = [];
    document.querySelectorAll(".form-step:not(.active) input[required], .form-step:not(.active) textarea[required]").forEach(input => {
        hiddenRequiredFields.push({ element: input, required: input.required });
        input.removeAttribute("required"); // Temporarily remove 'required'
    });

    // ✅ Step 2: Collect form data
    const title = document.getElementById("title").value;
    const image = document.getElementById("image").value;
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;
    const price = parseFloat(document.getElementById("price").value) || 0;
    const duration = document.getElementById("duration").value;

    const newCourse = {
        ID: isEditing ? currentCourseId : (coursesData.courses.length + 1).toString(),
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

    if (isEditing) {
        const courseIndex = coursesData.findIndex(course => course.ID === Number(currentCourseId));
        console.log(courseIndex)
        if (courseIndex !== -1) {
            coursesData[courseIndex] = newCourse;
        } else {
            alert("Course not found, adding as new");
            coursesData.push(newCourse);
        }
    } else {
        coursesData.push(newCourse);
    }

    localStorage.setItem("Courses", JSON.stringify(coursesData));
    console.log("Updated Courses Data:", coursesData);

    modalOverlay.classList.remove("active");
    resetForm();
    fetchCourses();
    alert(isEditing ? "Course updated successfully!" : "Course added successfully!");

    isEditing = false;
    currentCourseId = null;

    console.log("submit end");

    // ✅ Step 3: Restore 'required' attributes after submission
    hiddenRequiredFields.forEach(({ element, required }) => {
        if (required) element.setAttribute("required", "true");
    });
});




function resetForm() {
    multiStepForm.reset();
    lessonCount = 0;
    currentLesson = 1;
    lessons.length = 0;
    showStep(step1);
}

function showStep(step) {
    console.log("showstep begin");
    document
        .querySelectorAll(".form-step")
        .forEach((s) => s.classList.remove("active"));
    step.classList.add("active");
    console.log("showstep end");
}

// Function to fetch and display courses with optional search term
function fetchCourses(searchTerm = "", searchBy = "Title") {
    const coursesList = document.getElementById("courses-list");
    coursesList.innerHTML = "";

    let courses = JSON.parse(localStorage.getItem("Courses")) || [];
    // console.log(courses);

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

    if (courses.length === 0) {
        coursesList.innerHTML = "<p>No courses available</p>";
        return;
    }

    courses.forEach((course) => {
        // console.log(course.Title + " " + course.Content);
        // let content =[course.Content];
        // console.log(course.Title + " " + content);
        const courseItem = document.createElement("div");
        courseItem.classList.add("course-card");
        courseItem.innerHTML = `
            <h3>${course.Title}</h3>
            <p><strong>Category:</strong> ${course.Category}</p>
            <p><strong>Instructor:</strong> ${course.Instructor_Name}</p>
            <p><strong>Duration:</strong> ${course.Duration}</p>
            <p><strong>Lessons:</strong> ${course.LessonNum}</p>
            <button onclick="edit('${course.ID}')">Edit</button>
            <button onclick="deleteCourseById('${course.ID}')">Delete</button>
        `;
        coursesList.appendChild(courseItem);
    });
}

// Function to handle search
function handleSearch() {
    const searchTerm = document.getElementById("search-input").value.trim();
    const searchBy = document.getElementById("search-by").value;
    fetchCourses(searchTerm, searchBy);
}

function getCoursesFromLocalStorage() {
    let storedCourses = localStorage.getItem("Courses");

    // If Courses exist in local storage, parse them; otherwise, return an empty array
    return storedCourses ? JSON.parse(storedCourses) : [];
}

window.deleteCourseById = function(courseId) {
    let courses = getCoursesFromLocalStorage();
    let Filterd_courses = courses.filter((course) => course.ID !== Number(courseId));
    console.log(courseId);
    console.log(Filterd_courses);
    //TODO confirm();
    //TODO update ids
    localStorage.setItem("Courses", JSON.stringify(Filterd_courses));
    alert("Course Deleted Successfully!");
    fetchCourses();
}

document.addEventListener("DOMContentLoaded", function() {
    fetchCourses(); // Fetch courses on page load
});

document.getElementById("search-btn").addEventListener("click", handleSearch);
let courses = JSON.parse(localStorage.getItem("courses")) || [];

function saveCoursesToLocalStorage() {
    localStorage.setItem("courses", JSON.stringify(courses));
}

// function addCourse(event) {
//     event.preventDefault();

//     const courseId = `course${new Date().getTime()}`;
//     const title = document.getElementById("title").value;
//     const category = document.getElementById("category").value;
//     const instructor = document.getElementById("instructor").value;
//     const description = document.getElementById("description").value;
//     const duration = document.getElementById("duration").value;

//     if (!category) {
//         alert("Please select a category.");
//         return;
//     }

//     // Check for duplicate course titles
//     const isDuplicate = courses.some(course => course.title.toLowerCase() === title.toLowerCase());
//     if (isDuplicate) {
//         alert("Course with the same title already exists!");
//         return;
//     }

//     const courseData = {
//         id: courseId,
//         title,
//         category,
//         instructor,
//         description,
//         duration,
//     };

//     courses.push(courseData);
//     saveCoursesToLocalStorage();
//     alert("Course Added Successfully!");
//     resetCourseForm();
//     fetchCourses();
// }

function addCourse(event) {
    event.preventDefault();

    clearValidationMessages();

    const title = document.getElementById("title").value.trim();
    const category = document.getElementById("category").value;
    const instructor = document.getElementById("instructor").value.trim();
    const description = document.getElementById("description").value.trim();
    const duration = document.getElementById("duration").value.trim();
    const lessons = document.getElementById("lessons").value.trim();


    if (!title) {
        document.getElementById("title-error").textContent = "Title is required.";
        return;
    }

    if (!category) {
        document.getElementById("category-error").textContent = "Please select a category.";
        return;
    }

    if (!instructor) {
        document.getElementById("instructor-error").textContent = "Instructor is required.";
        return;
    }

    if (!description) {
        document.getElementById("description-error").textContent = "Description is required.";
        return;
    }

    if (!duration || isNaN(duration) || parseFloat(duration) <= 0) {
        document.getElementById("duration-error").textContent = "Duration should be a valid number greater than zero.";
        return;
    }

    const isDuplicate = courses.some(course => course.title.toLowerCase() === title.toLowerCase());
    if (isDuplicate) {
        document.getElementById("title-error").textContent = "Course with the same title already exists!";
        return;
    }

    const courseId = `course${new Date().getTime()}`;
    const courseData = {
        id: courseId,
        title,
        category,
        instructor,
        description,
        duration,
        lessons,

    };

    courses.push(courseData);
    saveCoursesToLocalStorage();
    alert("Course Added Successfully!");
    resetCourseForm();
    fetchCourses();
}

function clearValidationMessages() {
    document.getElementById("title-error").textContent = "";
    document.getElementById("category-error").textContent = "";
    document.getElementById("instructor-error").textContent = "";
    document.getElementById("description-error").textContent = "";
    document.getElementById("duration-error").textContent = "";
}

function updateCourse(event) {
    event.preventDefault();
    const courseId = document.getElementById("course-id").value;

    if (!courseId) {
        alert("Please enter a valid Course ID!");
        return;
    }

    const updatedCourse = {
        id: courseId,
        title: document.getElementById("title").value,
        category: document.getElementById("category").value,
        instructor: document.getElementById("instructor").value,
        description: document.getElementById("description").value,
        duration: document.getElementById("duration").value,
        lessons: document.getElementById("lessons").value,

    };

    courses = courses.map((course) => (course.id === courseId ? updatedCourse : course));
    saveCoursesToLocalStorage();
    alert("Course Updated Successfully!");
    resetCourseForm();
    fetchCourses();
}

window.deleteCourseById = function (courseId) {
    courses = courses.filter((course) => course.id !== courseId);
    saveCoursesToLocalStorage();
    alert("Course Deleted Successfully!");
    fetchCourses();
}

// Function to fetch and display courses with optional search term
function fetchCourses(searchTerm = "", searchBy = "title") {
    const coursesList = document.getElementById("courses-list");
    coursesList.innerHTML = "";

    let courses = JSON.parse(localStorage.getItem("courses")) || [];

    // Ensure searchTerm is a string
    searchTerm = String(searchTerm || "");

    if (searchTerm) {
        courses = courses.filter(course => {
            if (searchBy === "title") {
                return course.title.toLowerCase().includes(searchTerm.toLowerCase());
            } else if (searchBy === "category") {
                return course.category.toLowerCase().includes(searchTerm.toLowerCase());
            }
            return true;
        });
    }

    if (courses.length === 0) {
        coursesList.innerHTML = "<p>No courses available</p>";
        return;
    }

    courses.forEach((course) => {
        const courseItem = document.createElement("div");
        courseItem.classList.add("course-card");
        courseItem.innerHTML = `
            <h3>${course.title}</h3>
            <p><strong>Category:</strong> ${course.category}</p>
            <p><strong>Instructor:</strong> ${course.instructor}</p>
            <p><strong>Duration:</strong> ${course.duration}</p>
            <p><strong>Lessons:</strong> ${course.lessons}</p>
            <button onclick="fillForm('${course.id}', '${course.title}', '${course.category}', '${course.instructor}', '${course.description}', '${course.duration}','${course.lessons}')">Edit</button>
            <button onclick="deleteCourseById('${course.id}')">Delete</button>
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

// Function to fill the form for editing
window.fillForm = function (id, title, category, instructor, description, duration,lessons,) {
    document.getElementById("course-id").value = id;
    document.getElementById("title").value = title;
    document.getElementById("category").value = category;
    document.getElementById("instructor").value = instructor;
    document.getElementById("description").value = description;
    document.getElementById("duration").value = duration;
    document.getElementById("lessons").value = lessons;
    document.getElementById("update-course").style.display = "inline-block";
    document.querySelector('button[type="submit"]').style.display = "none";
};

// Function to reset the course form
function resetCourseForm() {
    document.getElementById("course-form").reset();
    document.getElementById("update-course").style.display = "none";
    document.querySelector('button[type="submit"]').style.display = "inline-block";
}

// Event listeners
document.addEventListener("DOMContentLoaded", function() {
    fetchCourses(); // Fetch courses on page load
});

document.getElementById("course-form").addEventListener("submit", addCourse);
document.getElementById("update-course").addEventListener("click", updateCourse);
document.getElementById("search-btn").addEventListener("click", handleSearch);

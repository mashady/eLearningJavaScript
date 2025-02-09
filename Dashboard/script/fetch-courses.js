// let Courses = JSON.parse(localStorage.getItem("courses")) || [];

function getCoursesFromLocalStorage() {
    let storedCourses = localStorage.getItem("Courses");

    // If Courses exist in local storage, parse them; otherwise, return an empty array
    return storedCourses ? JSON.parse(storedCourses) : [];
}
// function saveCoursesToLocalStorage() {
//     localStorage.setItem("courses", JSON.stringify(courses));
// }

let course_content = [];
let count = 1;

//TODO: Add lesson
function addLesson() {
    //TODO: if there is data add auto fill it
    let lesson_num = document.getElementById("course-lessons").value;
    let span_title = document.getElementById("lesson");
    document.getElementById("lesson-title-error").textContent = "";
    // validation for unique lesson title
    let lesson_id = count;
    let lesson_title = document.getElementById("lesson-title").value;
    let lesson_duration = document.getElementById("lesson-duration").value;
    let lesson_video = document.getElementById("lesson-video").value;
    let lesson_pdf = document.getElementById("lesson-pdf").value;
    let lesson_quiz = document.getElementById("lesson-quiz").value;

    let title_found = course_content.find(lesson => lesson.lesson_title === lesson_title);
    if(title_found){
        document.getElementById("lesson-title-error").textContent = "Title has to be unique.";
        return;
    }
    span_title.innerHTML = `Lesson ${count + 1}`;
    
    let lesson = {lesson_id , lesson_title , lesson_duration , lesson_video , lesson_pdf , lesson_quiz};
 
    let lessonFound = course_content.find(lesson => lesson.lesson_id === count);

    if(lessonFound){
        //update
        let courseIndex = (lessonFound.lesson_id) - 1;

        course_content[courseIndex].lesson_title = lesson_title || course_content[courseIndex].Title;
        course_content[courseIndex].lesson_duration = lesson_duration || course_content[courseIndex].Duration;
        course_content[courseIndex].lesson_video = lesson_video || course_content[courseIndex].lesson_video;
        course_content[courseIndex].lesson_pdf = lesson_pdf || course_content[courseIndex].lesson_pdf;
        course_content[courseIndex].lesson_quiz = lesson_quiz || course_content[courseIndex].lesson_quiz;

        console.log(course_content);
    }else{
        //add
        course_content.push(lesson);
        console.log(course_content);
    }

    // empty the text areas
    document.getElementById("lesson-title").value = "";
    document.getElementById("lesson-duration").value = "";
    document.getElementById("lesson-video").value = "";
    document.getElementById("lesson-pdf").value = "";
    document.getElementById("lesson-quiz").value = "";

    if(count + 1 == lesson_num){
        console.log("last step");
        //TODO: hide add lesson button
        //TODO: show add course button
        let add_lesson_button = document.getElementById("add-lesson");
        let add_Course_button = document.getElementById("add_course");
    }
    count++;
}

// previous lesson
function prevLesson(){
    count--;
    console.log(count)
    let span_title = document.getElementById("lesson");
    span_title.innerHTML = `Lesson ${count}`
    // empty the text areas
    document.getElementById("lesson-title").value = "";
    document.getElementById("lesson-duration").value = "";
    document.getElementById("lesson-video").value = "";
    document.getElementById("lesson-pdf").value = "";
    document.getElementById("lesson-quiz").value = "";


}

//TODO: previous step
function prevStep(){
    //TODO: make content div hiden
    //TODO: make general info div appear
}

function addCourse() {
    // event.preventDefault();

    clearValidationMessages();

    let Courses = getCoursesFromLocalStorage(); // Get existing Courses from local storage
    let ID = Courses[Courses.length - 1].ID + 1;
    let Title = document.getElementById("course-title").value.trim();
    let Image = document.getElementById("course-image").value.trim();
    let Category = document.getElementById("course-category").value;
    let Instructor_Name = document.getElementById("course-instructor").value.trim();
    let Description = document.getElementById("course-description").value.trim();
    let Price = document.getElementById("course-price").value.trim();
    let Duration = document.getElementById("course-duration").value.trim();
    let Content = course_content;
    let LessonNum = document.getElementById("course-lessons").value;
    let lesson_title = document.getElementById("lesson-title").value.trim();
    let lesson_duration = document.getElementById("lesson-duration").value.trim();
    let lesson_video = document.getElementById("lesson-video").value.trim();
    let lesson_pdf = document.getElementById("lesson-pdf").value.trim();
    let lesson_quiz = document.getElementById("lesson-quiz").value.trim();
    let last_lesson = {
        lesson_title,
        lesson_duration,
        lesson_video,
        lesson_pdf, 
        lesson_quiz
    };
    Content.push(last_lesson);

    if (!Title) {
        document.getElementById("title-error").textContent = "Title is required.";
        return;
    }

    if(!Image){
        document.getElementById("image-error").textContent = "Image is required";
        return;
    }

    if (!Category) {
        document.getElementById("category-error").textContent = "Please select a category.";
        return;
    }

    if (!Instructor_Name) {
        document.getElementById("instructor-error").textContent = "Instructor is required.";
        return;
    }

    if (!Description) {
        document.getElementById("description-error").textContent = "Description is required.";
        return;
    }

    if(!Price){
        document.getElementById("price-error").textContent = "Price is required.";
        return;
    }

    if (!Duration || isNaN(Duration) || parseFloat(Duration) <= 0) {
        document.getElementById("duration-error").textContent = "Duration should be a valid number greater than zero.";
        return;
    }

    const isDuplicate = Courses.some(course => course.Title.toLowerCase() === Title.toLowerCase() && course.Instructor_Name.toLowerCase() === Instructor_Name);
    if (isDuplicate) {
        document.getElementById("title-error").textContent = "Course with the same title already exists!";
        return;
    }

    if (!lesson_duration || isNaN(lesson_duration) || parseFloat(lesson_duration) <= 0) {
        document.getElementById("lesson-duration-error").textContent = "Duration should be a valid number greater than zero.";
        return;
    }

    if (!lesson_title) {
        document.getElementById("lesson-title-error").textContent = "Title is required.";
        return;
    }

    const courseData = {
        ID,
        Title,
        Image,
        Category,
        Instructor_Name,
        Description,
        Price,
        Duration,
        LessonNum,
        Content
    };

    Courses.push(courseData);
    course_content = [];
    // saveCoursesToLocalStorage();
    localStorage.setItem("Courses" , JSON.stringify(Courses));
    alert("Course Added Successfully!");
    resetCourseForm();
    fetchCourses();
}

function clearValidationMessages() {
    document.getElementById("title-error").textContent = "";
    document.getElementById("category-error").textContent = "";
    document.getElementById("instructor-error").textContent = "";
    document.getElementById("image-error").textContent = "";
    document.getElementById("description-error").textContent = "";
    document.getElementById("price-error").textContent = "";
    document.getElementById("duration-error").textContent = "";
    document.getElementById("lesson-title-error").textContent = "";
    document.getElementById("lesson-duration-error").textContent = "";
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

//view all Courses s

// function displayCourses(Courses) {
//     //check if Courses is an array
//     if (!Array.isArray(Courses)) {
//         console.error("Error: Courses is not an array!", Courses);
//         return;
//     }
//     //get the table
//     var dataTable = document.getElementById('courses-Body');

//     // Remove all existing rows
//     dataTable.innerHTML = "";

//     //display Courses
//     for (course of Courses) {
//         // ID
//         var tdID = document.createElement("td");
//         tdID.innerText = course.ID;
//         // Title
//         var tdTitle = document.createElement("td");
//         tdTitle.innerText = course.Title;
//         // Image
//         var tdImage = document.createElement("td");
//         tdImage.innerText = course.Image;
//         // Category
//         var tdCategory = document.createElement("td");
//         tdCategory.innerText = course.Category;
//         // Instructor Name
//         var tdInstructorName = document.createElement("td");
//         tdInstructorName.innerText = course.Instructor_Name;
//         // Description
//         var tdDescription = document.createElement("td");
//         tdDescription.innerText = course.Description;
//         // Price
//         var tdPrice = document.createElement("td");
//         tdPrice.innerText = course.Price;
//         // Duration
//         var tdDuration = document.createElement("td");
//         tdDuration.innerText = course.Duration;
//         // Videos
        
//         var tdVideos = document.createElement("td");
//         tdVideos.innerText = course.content.map(lesson => lesson.lesson_video).join(", ");
//         // PDFs
//         var tdPDFs = document.createElement("td");
//         tdPDFs.innerText = course.content.map(lesson => lesson.lesson_pdf).join(", ");

//         var ctr = document.createElement("tr");
//         ctr.appendChild(tdID);
//         ctr.appendChild(tdTitle);
//         ctr.appendChild(tdImage);
//         ctr.appendChild(tdCategory);
//         ctr.appendChild(tdInstructorName);
//         ctr.appendChild(tdDescription);
//         ctr.appendChild(tdPrice);
//         ctr.appendChild(tdDuration);
//         ctr.appendChild(tdVideos);
//         ctr.appendChild(tdPDFs);

//         dataTable.appendChild(ctr);
//     }
// }

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
            <button onclick="fillForm('${course.ID}', '${course.Title}', '${course.Category}', '${course.Instructor_Name}', '${course.Description}', '${course.Duration}','${course.Content}')">Edit</button>
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

// Function to fill the form for editing
window.fillForm = function (id, title, category, instructor, image, description, price, duration, lessons) {
    document.getElementById("course-id").value = id;
    document.getElementById("course-title").value = title;
    document.getElementById("course-category").value = category;
    document.getElementById("course-instructor").value = instructor;
    document.getElementById("course-image").value = image;
    document.getElementById("course-description").value = description;
    document.getElementById("course-price").value = price;
    document.getElementById("course-duration").value = duration;
    //TODO update lessons
    document.getElementById("course-lessons").value = lessons;
    document.getElementById("update-course").style.display = "inline-block";
    document.getElementById("add-course").style.display = "none";
};

// Function to reset the course form
function resetCourseForm() {
    document.getElementById("course-form").reset();
    document.getElementById("update-course").style.display = "none";
    document.getElementById("add-course").style.display = "inline-block";
}

// Event listeners
document.addEventListener("DOMContentLoaded", function() {
    fetchCourses(); // Fetch courses on page load
});

// document.getElementById("course-form").addEventListener("submit", addCourse);
document.getElementById("update-course").addEventListener("click", updateCourse);
document.getElementById("search-btn").addEventListener("click", handleSearch);

//load event listeners
document.addEventListener("DOMContentLoaded", function () {
    // let addCourseButton = document.getElementById("add-course");
    // if (addCourseButton) {
    //     addCourseButton.addEventListener("click", addCourse);
    // }
    let form = document.getElementById("course-form");
    if(form){
        form.addEventListener("submit" , addCourse);
    }

    let viewCourseButton = document.getElementById("view-course");
    if (viewCourseButton) {
        viewCourseButton.addEventListener("click", viewCourseById);
    }

    let updateCourseButton = document.getElementById("update-course");
    if (updateCourseButton) {
        updateCourseButton.addEventListener("click", updateCourse);
    }

    // let deleteCourseButton = document.getElementById("delete-course");
    // if (deleteCourseButton) {
    //     deleteCourseButton.addEventListener("click", deleteCourseById);
    // }

    // let exportButton = document.getElementById("view-courses");
    // if (exportButton) {
    //     exportButton.addEventListener("click", function () {
    //         displayCourses(getCoursesFromLocalStorage());
    //     });
    // }

    let addLessonButton = document.getElementById("add-lesson");
    if (addLessonButton) {
        addLessonButton.addEventListener("click", addLesson);
    }

    let prevLessonButton = document.getElementById("prev-lesson");
    if(prevLessonButton) {
        prevLessonButton.addEventListener("click", prevLesson)
    }

    let prevStepButton = document.getElementById("prev-step");
    if(prevStepButton) {
        prevStepButton.addEventListener("click", prevStep)
    }

    // Display Courses when page loads
    fetchCourses();
    // displayCourses(getCoursesFromLocalStorage());
});

//prepare the Course database
var dbCourses = [
    {
        ID: 1,
        Title: "HTML5 and CSS3 Fundamentals",
        Image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqSJA6oUEYgsX9jDJknJ4hT8t0IK8WdfsNwA&s", // URL
        Category: "Web Development",
        Instructor_Name: "Sara Salah",
        Description: "HTML5 and CSS3 Fundamentals is a course that introduces you to the basics of web development. You will learn how to create a simple web page using HTML5 and CSS3.",
        Price: 15,
        Duration: "2h 30m",
        content: [
           {
                lesson_id: 1,
                lesson_title: "Introduction to HTML5",
                lesson_duration: "30m",
                lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
                lesson_pdf: "https://www.w3schools.com/html/html_intro.asp",
                lesson_quiz: "https://www.w3schools.com/html/html_quiz.asp"
 
            },
            {
                lesson_id: 2,
                lesson_title: "Introduction to CSS3",
                lesson_duration: "30m",
                lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
                lesson_pdf: "https://www.w3schools.com/css/css_intro.asp",
                lesson_quiz: "https://www.w3schools.com/css/css_quiz.asp"
            }
        ]
    },
    {
        ID: 2,
        Title: "javascript Fundamentals",
        Image: "", // URL
        Category: "web Development",
        Instructor_Name: "Sarah Salah",
        Description: "javascript Fundamentals is a course that introduces you to the basics of web development. You will learn how to create a simple web page using javascript.",
        Price: "30$",
        Duration: "12h",
        content: [
            {
                lesson_id: 1,
                lesson_title: "Introduction to javascript",
                lesson_duration: "30m",
                lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
                lesson_pdf: "https://www.w3schools.com/js/js_intro.asp",
                lesson_quiz: "https://www.w3schools.com/js/js_quiz.asp"
            },
            {
                lesson_id: 2,
                lesson_title: "javascript Variables",
                lesson_duration: "30m",
                lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
                lesson_pdf: "https://www.w3schools.com/js/js_variables.asp",
                lesson_quiz: "https://www.w3schools.com/js/js_quiz.asp"
            },
            {
                lesson_id: 3,
                lesson_title: "javascript Operators",
                lesson_duration: "30m",
                lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
                lesson_pdf: "https://www.w3schools.com/js/js_operators.asp",
                lesson_quiz: "https://www.w3schools.com/js/js_quiz.asp"
            },
            {
                lesson_id: 4,
                lesson_title: "javascript Functions",
                lesson_duration: "30m",
                lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
                lesson_pdf: "https://www.w3schools.com/js/js_functions.asp",
                lesson_quiz: "https://www.w3schools.com/js/js_quiz.asp"
            },
            {
                lesson_id: 5,
                lesson_title: "javascript Objects",
                lesson_duration: "30m",
                lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
                lesson_pdf: "https://www.w3schools.com/js/js_objects.asp",
                lesson_quiz: "https://www.w3schools.com/js/js_quiz.asp"
            },
            {
                lesson_id: 6,
                lesson_title: "javascript Events",
                lesson_duration: "30m",
                lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
                lesson_pdf: "https://www.w3schools.com/js/js_events.asp",
                lesson_quiz: "https://www.w3schools.com/js/js_quiz.asp"
            },
            {
                lesson_id: 7,
                lesson_title: "javascript Strings",
                lesson_duration: "30m",
                lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
                lesson_pdf: "https://www.w3schools.com/js/js_strings.asp",
                lesson_quiz: "https://www.w3schools.com/js/js_quiz.asp"
            },
            {
                lesson_id: 8,
                lesson_title: "javascript Numbers",
                lesson_duration: "30m",
                lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
                lesson_pdf: "https://www.w3schools.com/js/js_numbers.asp",
                lesson_quiz: "https://www.w3schools.com/js/js_quiz.asp"
            },
            {
                lesson_id: 9,
                lesson_title: "javascript Arrays",
                lesson_duration: "30m",
                lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
                lesson_pdf: "https://www.w3schools.com/js/js_arrays.asp",
                lesson_quiz: "https://www.w3schools.com/js/js_quiz.asp"
            },
            {
                lesson_id: 10,
                lesson_title: "javascript Booleans",
                lesson_duration: "30m",
                lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
                lesson_pdf: "https://www.w3schools.com/js/js_booleans.asp",
                lesson_quiz: "https://www.w3schools.com/js/js_quiz.asp"
            },
            {
                lesson_id: 11,
                lesson_title: "javascript Math Object",
                lesson_duration: "30m",
                lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
                lesson_pdf: "https://www.w3schools.com/js/js_math.asp",
                lesson_quiz: "https://www.w3schools.com/js/js_quiz.asp"
            },
            {
                lesson_id: 12,
                lesson_title: "javascript Dates Object",
                lesson_duration: "30m",
                lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
                lesson_pdf: "https://www.w3schools.com/js/js_dates.asp",
                lesson_quiz: "https://www.w3schools.com/js/js_quiz.asp"
            },
            {
                lesson_id: 13,
                lesson_title: "javascript Date Formats",
                lesson_duration: "30m",
                lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
                lesson_pdf: "https://www.w3schools.com/js/js_date_formats.asp",
                lesson_quiz: "https://www.w3schools.com/js/js_quiz.asp"
            },
            {
                lesson_id: 14,
                lesson_title: "javascript Date Get Methods",
                lesson_duration: "30m",
                lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
                lesson_pdf: "https://www.w3schools.com/js/js_date_methods.asp",
                lesson_quiz: "https://www.w3schools.com/js/js_quiz.asp"
            },
            {
                lesson_id: 15,
                lesson_title: "javascript Date Set Methods",
                lesson_duration: "30m",
                lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
                lesson_pdf: "https://www.w3schools.com/js/js_date_methods_set.asp",
                lesson_quiz: "https://www.w3schools.com/js/js_quiz.asp"
            },
            {
                lesson_id: 16,
                lesson_title: "javascript Date Parse Methods",
                lesson_duration: "30m",
                lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
                lesson_pdf: "https://www.w3schools.com/js/js_date_parse.asp",
                lesson_quiz: "https://www.w3schools.com/js/js_quiz.asp"
            },
            {
                lesson_id: 17,
                lesson_title: "javascript Date UTC Methods",
                lesson_duration: "30m",
                lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
                lesson_pdf: "https://www.w3schools.com/js/js_date_utc.asp",
                lesson_quiz: "https://www.w3schools.com/js/js_quiz.asp"
            },
            {
                lesson_id: 18,
                lesson_title: "javascript Date Input Methods",
                lesson_duration: "30m",
                lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
                lesson_pdf: "https://www.w3schools.com/js/js_date_input.asp",
                lesson_quiz: "https://www.w3schools.com/js/js_quiz.asp"
            },
            {
                lesson_id: 19,
                lesson_title: "javascript Date Output Methods",
                lesson_duration: "30m",
                lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
                lesson_pdf: "https://www.w3schools.com/js/js_date_output.asp",
                lesson_quiz: "https://www.w3schools.com/js/js_quiz.asp"
            },
            {
                lesson_id: 20,
                lesson_title: "javascript Date Get Methods",
                lesson_duration: "30m",
                lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
                lesson_pdf: "https://www.w3schools.com/js/js_date_methods.asp",
                lesson_quiz: "https://www.w3schools.com/js/js_quiz.asp"
            },
            {
                lesson_id: 21,
                lesson_title: "javascript Date Set Methods",
                lesson_duration: "30m",
                lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
                lesson_pdf: "https://www.w3schools.com/js/js_date_methods_set.asp",
                lesson_quiz: "https://www.w3schools.com/js/js_quiz.asp"
            },
            {
                lesson_id: 22,
                lesson_title: "javascript Date Parse Methods",
                lesson_duration: "30m",
                lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
                lesson_pdf: "https://www.w3schools.com/js/js_date_parse.asp",
                lesson_quiz: "https://www.w3schools.com/js/js_quiz.asp"
            },
            {
                lesson_id: 23,
                lesson_title: "javascript Date UTC Methods",
                lesson_duration: "30m",
                lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
                lesson_pdf: "https://www.w3schools.com/js/js_date_utc.asp",
                lesson_quiz: "https://www.w3schools.com/js/js_quiz.asp"
            },
            {
                lesson_id: 24,
                lesson_title: "javascript Date Input Methods",
                lesson_duration: "30m",
                lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
                lesson_pdf: "https://www.w3schools.com/js/js_date_input.asp",
                lesson_quiz: "https://www.w3schools.com/js/js_quiz.asp"
            },
            {
                lesson_id: 25,
                lesson_title: "javascript Date Output Methods",
                lesson_duration: "30m",
                lesson_video: "https://www.youtube.com/watch?v=UB1O30fR-EE",
                lesson_pdf: "https://www.w3schools.com/js/js_date_output.asp",
                lesson_quiz: "https://www.w3schools.com/js/js_quiz.asp"
            },
        ]
    }
];
//save Courses to local storage
// localStorage.setItem("Courses", JSON.stringify(dbCourses));

// Function to get Courses from local storage
function getCoursesFromLocalStorage() {
    let storedCourses = localStorage.getItem("Courses");

    // If Courses exist in local storage, parse them; otherwise, return an empty array
    return storedCourses ? JSON.parse(storedCourses) : [];
}

//get Courses from local storage
// let Courses = getCoursesFromLocalStorage();

// Function to display a Course
function showCourse(Course) {
    var dataTable = document.getElementById('courses-Body');
    dataTable.innerHTML = "";
    // ID
    var tdID = document.createElement("td");
    tdID.innerText = Course.ID;
    // Title
    var tdTitle = document.createElement("td");
    tdTitle.innerText = Course.Title;
    // Image
    var tdImage = document.createElement("td");
    tdImage.innerText = Course.Image;
    // Category
    var tdCategory = document.createElement("td");
    tdCategory.innerText = Course.Category;
    // Instructor Name
    var tdInstructorName = document.createElement("td");
    tdInstructorName.innerText = Course.Instructor_Name;
    // Description
    var tdDescription = document.createElement("td");
    tdDescription.innerText = Course.Description;
    // Price
    var tdPrice = document.createElement("td");
    tdPrice.innerText = Course.Price;
    // Duration
    var tdDuration = document.createElement("td");
    tdDuration.innerText = Course.Duration;
    // Videos
    var tdVideos = document.createElement("td");
    tdVideos.innerText = Course.content.map(lesson => lesson.lesson_video).join(", ");
    // PDFs
    var tdPDFs = document.createElement("td");
    tdPDFs.innerText = Course.content.map(lesson => lesson.lesson_pdf).join(", ");
    // Quiz
    var tdQuiz = document.createElement("td");
    tdQuiz.innerText = Course.content.map(lesson => lesson.lesson_quiz).join(", ");

    var tr = document.createElement("tr");
    tr.appendChild(tdID);
    tr.appendChild(tdTitle);
    tr.appendChild(tdImage);
    tr.appendChild(tdCategory);
    tr.appendChild(tdInstructorName);
    tr.appendChild(tdDescription);
    tr.appendChild(tdPrice);
    tr.appendChild(tdDuration);
    tr.appendChild(tdVideos);
    tr.appendChild(tdPDFs);
    tr.appendChild(tdQuiz);

    dataTable.appendChild(tr);
}


let content = [];
// TODO: Add lesson
function addLesson() {
    // let lesson_num = document.getElementById("course-lessons").value;
    // let lessons = document.getElementById("lessons");
    // lessons.innerHTML = "";
    // for (let i = 1; i <= lesson_num; i++) {
    //     let lesson = document.createElement("div");
    //     lesson.innerHTML = `
    //     <h3>Lesson ${i}</h3>
    //     <label for="lesson-title-${i}">Title:</label>
    //     <input type="text" id="lesson-title-${i}" name="lesson-title-${i}" required>
    //     <label for="lesson-duration-${i}">Duration:</label>
    //     <input type="text" id="lesson-duration-${i}" name="lesson-duration-${i}" required>
    //     <label for="lesson-video-${i}">Video:</label>
    //     <input type="text" id="lesson-video-${i}" name="lesson-video-${i}" required>
    //     <label for="lesson-pdf-${i}">PDF:</label>
    //     <input type="text" id="lesson-pdf-${i}" name="lesson-pdf-${i}" required>
    //     <label for="lesson-quiz-${i}">Quiz:</label>
    //     <input type="text" id="lesson-quiz-${i}" name="lesson-quiz-${i}" required>
    //     `;
    //     lessons.appendChild(lesson);
    // }
}
//add Course
function addCourse() {
    //TODO: generate course id
    let ID = parseInt(document.getElementById("course-id").value);
    let Title = document.getElementById("course-name").value;
    let Image = document.getElementById("course-image").value;
    let Category = document.getElementById("course-category").value;
    let Instructor_Name = document.getElementById("course-instructor").value;
    let Description = document.getElementById("course-description").value;
    let Price = document.getElementById("course-price").value;
    let Duration = document.getElementById("course-duration").value;
    let lesson_num = document.getElementById("course-lessons").value;
    let course_content = content;

    // Add validation
    if (!ID || !Title || !Image || !Category || !Instructor_Name || !Description || !Price || !Duration || !course_content) {
        alert("Please fill all fields!");
        return;
    }
    // Add validation for ID
    if (Courses.find(Course => Course.ID === ID)) {
        alert("Course with the same ID already exists!");
        return;
    }

    let newCourse = { ID, Title, Image, Category, Instructor_Name, Description, Price, Duration, course_content};
    let Courses = getCoursesFromLocalStorage(); // Get existing Courses from local storage
    Courses.push(newCourse); // Add the new Course
    localStorage.setItem("Courses", JSON.stringify(Courses)); // Save back to local storage
    displayCourses(Courses);
    alert("Course added successfully!");
}

//view Course by id

function viewCourseById() {
    let searchID = parseInt(document.getElementById("course-id").value);
    let Courses = getCoursesFromLocalStorage();
    let Course = Courses.find(Course => Course.ID === searchID);

    if (Course) {
        showCourse(Course);
    } else {
        alert("Course not found!");
    }
}

//view all Courses

function displayCourses(Courses) {
    //check if Courses is an array
    if (!Array.isArray(Courses)) {
        console.error("Error: Courses is not an array!", Courses);
        return;
    }
    //get the table
    console.log(Courses);
    var dataTable = document.getElementById('courses-Body');

    // Remove all existing rows
    dataTable.innerHTML = "";

    //display Courses
    for (course of Courses) {
        // ID
        var tdID = document.createElement("td");
        tdID.innerText = course.ID;
        // Title
        var tdTitle = document.createElement("td");
        tdTitle.innerText = course.Title;
        // Image
        var tdImage = document.createElement("td");
        tdImage.innerText = course.Image;
        // Category
        var tdCategory = document.createElement("td");
        tdCategory.innerText = course.Category;
        // Instructor Name
        var tdInstructorName = document.createElement("td");
        tdInstructorName.innerText = course.Instructor_Name;
        // Description
        var tdDescription = document.createElement("td");
        tdDescription.innerText = course.Description;
        // Price
        var tdPrice = document.createElement("td");
        tdPrice.innerText = course.Price;
        // Duration
        var tdDuration = document.createElement("td");
        tdDuration.innerText = course.Duration;
        // Videos
        
        var tdVideos = document.createElement("td");
        tdVideos.innerText = course.content.map(lesson => lesson.lesson_video).join(", ");
        // PDFs
        var tdPDFs = document.createElement("td");
        tdPDFs.innerText = course.content.map(lesson => lesson.lesson_pdf).join(", ");

        var ctr = document.createElement("tr");
        ctr.appendChild(tdID);
        ctr.appendChild(tdTitle);
        ctr.appendChild(tdImage);
        ctr.appendChild(tdCategory);
        ctr.appendChild(tdInstructorName);
        ctr.appendChild(tdDescription);
        ctr.appendChild(tdPrice);
        ctr.appendChild(tdDuration);
        ctr.appendChild(tdVideos);
        ctr.appendChild(tdPDFs);

        dataTable.appendChild(ctr);
    }
}


//update course

function updateCourse() {
    let Courses = getCoursesFromLocalStorage();

    let ID = parseInt(document.getElementById("course-id").value);

    let CourseIndex = Courses.findIndex(Course => Course.ID === ID);
    if (CourseIndex === -1) {
        alert("Course not found!");
        return;
    }

    let Title = document.getElementById("course-name").value || Courses[CourseIndex].Title;
    let Image = document.getElementById("course-image").value || Courses[CourseIndex].Image;
    let Category = document.getElementById("course-category").value || Courses[CourseIndex].Category;
    let Instructor_Name = document.getElementById("course-instructor").value || Courses[CourseIndex].Instructor_Name;
    let Description = document.getElementById("course-description").value || Courses[CourseIndex].Description;
    let Price = document.getElementById("course-price").value || Courses[CourseIndex].Price;
    let Duration = document.getElementById("course-duration").value || Courses[CourseIndex].Duration;

    //TODO: Update content

    Courses[CourseIndex].Title = Title;
    Courses[CourseIndex].Image = Image;
    Courses[CourseIndex].Category = Category;
    Courses[CourseIndex].Instructor_Name = Instructor_Name;
    Courses[CourseIndex].Description = Description;
    Courses[CourseIndex].Price = Price;
    Courses[CourseIndex].Duration = Duration;

    localStorage.setItem("Courses", JSON.stringify(Courses));

    alert("Course updated successfully!");
    showCourse(Courses[CourseIndex]);
    // displayCourses(getCoursesFromLocalStorage());
}

//delete Course

function deleteCourse() {
    let ID = parseInt(document.getElementById("course-id").value);
    let Courses = getCoursesFromLocalStorage();
    let filteredCourses = Courses.filter(Course => Course.ID !== ID);

    if (Courses.length === filteredCourses.length) {
        alert("Course not found!");
        return;
    }
    // update the following Courses' IDs
    for (let i = 0; i < filteredCourses.length; i++) {
        filteredCourses[i].ID = i + 1;
    }
    // Add a confirmation dialog before deleting the Course
    if (confirm("Are you sure you want to delete this Course?")) {
        localStorage.setItem("Courses", JSON.stringify(filteredCourses));
        alert("Course deleted successfully!");
        displayCourses(getCoursesFromLocalStorage());
    }
}



//load event listeners
document.addEventListener("DOMContentLoaded", function () {
    let addCourseButton = document.getElementById("add-course");
    if (addCourseButton) {
        addCourseButton.addEventListener("click", addCourse);
    }

    let viewCourseButton = document.getElementById("view-course");
    if (viewCourseButton) {
        viewCourseButton.addEventListener("click", viewCourseById);
    }

    let updateCourseButton = document.getElementById("update-course");
    if (updateCourseButton) {
        updateCourseButton.addEventListener("click", updateCourse);
    }

    let deleteCourseButton = document.getElementById("delete-course");
    if (deleteCourseButton) {
        deleteCourseButton.addEventListener("click", deleteCourse);
    }

    let exportButton = document.getElementById("view-courses");
    if (exportButton) {
        exportButton.addEventListener("click", function () {
            displayCourses(getCoursesFromLocalStorage());
        });
    }

    let addLessonButton = document.getElementById("add-lesson");
    if (addLessonButton) {
        addLessonButton.addEventListener("click", addLesson);
    }

    // Display Courses when page loads
    displayCourses(getCoursesFromLocalStorage());
});
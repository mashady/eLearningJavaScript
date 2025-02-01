//prepare the Course database
var dbCourses = [
    {
        ID:1,
        Title:"HTML5 and CSS3 Fundamentals",
        Image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqSJA6oUEYgsX9jDJknJ4hT8t0IK8WdfsNwA&s", // URL
        Category:"Web Development",
        Instructor_Name:"Sara Salah",
        Description:"HTML5 and CSS3 Fundamentals is a course that introduces you to the basics of web development. You will learn how to create a simple web page using HTML5 and CSS3.",
        Price:"15$", 
        Duration:"2h 30m",
        video:[
            "https://www.youtube.com/watch?v=UB1O30fR-EE",
            "https://www.youtube.com/watch?v=UB1O30fR-EE",  
        ],
        pdfs: [
            "https://www.w3schools.com/html/html_intro.asp",
            "https://www.w3schools.com/css/css_intro.asp"
        ]
    },
    {
        ID:2,
        Title:"javascript Fundamentals",
        Image:"", // URL
        Category:"web Development",
        Instructor_Name:"Sarah Salah",
        Description:"javascript Fundamentals is a course that introduces you to the basics of web development. You will learn how to create a simple web page using javascript.",
        Price:"30$", 
        Duration:"6h 30m",
        video:[
            "https://www.youtube.com/watch?v=UB1O30fR-EE",
            "https://www.youtube.com/watch?v=UB1O30fR-EE",  
        ],
        pdfs: [
            "https://www.w3schools.com/js/js_intro.asp",
            "https://www.w3schools.com/js/js_intro.asp"
        ]
    }
];
//save Courses to local storage
localStorage.setItem("Courses", JSON.stringify(dbCourses));

// Function to get Courses from local storage
function getCoursesFromLocalStorage() {
    let storedCourses = localStorage.getItem("Courses");

    // If Courses exist in local storage, parse them; otherwise, return an empty array
    return storedCourses ? JSON.parse(storedCourses) : [];
}

//get Courses from local storage
let Courses = getCoursesFromLocalStorage();

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
    tdVideos.innerText = Course.video;
    // PDFs
    var tdPDFs = document.createElement("td");
    tdPDFs.innerText = Course.pdfs;

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

    dataTable.appendChild(tr);
}

//add Course
function addCourse() {
    let ID = parseInt(document.getElementById("course-id").value);
    let Title = document.getElementById("course-name").value;
    let Image = document.getElementById("course-image").value;
    let Category = document.getElementById("course-category").value;
    let Instructor_Name = document.getElementById("course-instructor").value;
    let Description = document.getElementById("course-description").value;
    let Price = document.getElementById("course-price").value;
    let Duration = document.getElementById("course-duration").value;
    //TODO: Add video and pdfs
    // let video = document.getElementById("video").value;
    // let pdfs = document.getElementById("pdfs").value;
    
    // Add validation
    if (!ID || !Title || !Image || !Category || !Instructor_Name || !Description || !Price || !Duration) {
        alert("Please fill all fields!");
        return;
    }
    // Add validation for ID
    if (Courses.find(Course => Course.ID === ID)) {
        alert("Course with the same ID already exists!");
        return;
    }
    //TODO: Add validation for video and pdfs
    // if (!video || !pdfs) {   
    //     alert("Please fill all fields!");
    //     return;
    // }

    //TODO: add video and pdfs to the new Course
    let newCourse = { ID, Title, Image, Category, Instructor_Name, Description, Price, Duration };
    let Courses = getCoursesFromLocalStorage(); // Get existing Courses from local storage
    Courses.push(newCourse); // Add the new Course
    localStorage.setItem("Courses", JSON.stringify(Courses)); // Save back to local storage
    displayCourses(Courses);
    alert("Course added successfully!");
}

//view Course by id

function viewCourseById() {
    let searchID = parseInt(document.getElementById("courese-id").value);
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
    var dataTable = document.getElementById('courses-Body');

    // Remove all existing rows
    dataTable.innerHTML = "";

    //display Courses
    for (Course of Courses) {
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
    tdVideos.innerText = Course.video;
    // PDFs
    var tdPDFs = document.createElement("td");
    tdPDFs.innerText = Course.pdfs;

    var ctr = document.createElement("tr");
    ctr.appendChild(tdID);
    ctr.appendChild(tdTitle);
    ctr.appendChild(tdImage);
    ctr.appendChild(tdCategory);
    ctr.appendChild(tdInsctructorName);
    ctr.appendChild(tdDescription);
    ctr.appendChild(tdPrice);
    ctr.appendChild(tdDuration);
    ctr.appendChild(tdVideos);
    ctr.appendChild(tdPDFs);

    dataTable.appendChild(ctr);
    }
}


//update Course

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

    //TODO: Update video and pdfs

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

    let deleteStudentButton = document.getElementById("delete-course");
    if (deleteCourseButton) {
        deleteCourseButton.addEventListener("click", deleteCourse);
    }

    let exportButton = document.getElementById("view-courses");
    if (exportButton) {
        exportButton.addEventListener("click", function () {
            displayCourses(getCoursesFromLocalStorage());
        });
    }

    // Display Courses when page loads
    displayCourses(getCoursesFromLocalStorage());
});
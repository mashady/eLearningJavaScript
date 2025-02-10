import coursesData from "../utils/fakeCourses.js";
import { isLogin, showNotification, updateUI, logOut } from "../utils/user.js";


const coursesPerPage = 3;
const paginationContainer = "#pagination";

// function paginate(items, itemsPerPage, paginationContainer) { //(courses , coursesPerPage , "#pagination")
function paginate(courses, coursesPerPage, paginationContainer , isCourse) {
    let currentPage = 1;
    // const totalPages = Math.ceil(items.length / itemsPerPage); //(courses.length / coursesPerPage)
    const totalPages = Math.ceil(courses.length / coursesPerPage);
    // function showitems(page) {
    function showCourses(page) {
        // const startIndex = (page - 1) * itemsPerPage;
        const startIndex = (page - 1) * coursesPerPage;
        console.log("page" + page);
        console.log("start " + startIndex);
        // const endIndex = startIndex + itemsPerPage;
        const endIndex = startIndex + coursesPerPage;
        console.log("end " + endIndex)
        // const pageItems = items.slice(startIndex, endIndex);

        //TODO filter here
        const filteredCourses = isLogin()
            ? courses.filter(
                (course) =>
                    !userCourses.some((userCourse) => userCourse.ID === course.ID)
            )
            : courses;
        if (filteredCourses.length == 0)
            document.getElementById("noAvail").style.display = "inline";

        const pageCourses = filteredCourses.slice(startIndex, endIndex);
        // console.log("page items " + pageItems);
        console.log("page courses " + pageCourses);


        // const itemsContainer = document.querySelector("#items");
        // itemsContainer.innerHTML = "";
        const coursesContainer = document.getElementById("courses");
        coursesContainer.innerHTML = "";

        // pageItems.forEach((item) => {
        //     const li = document.createElement("li");
        //     li.innerText = item;
        //     itemsContainer.appendChild(li);
        // });

        pageCourses.forEach((course) => {
            const courseDiv = document.createElement("div");
            courseDiv.className = "course";

            if(isCourse){
            courseDiv.innerHTML = `
                    <div class="card">
                        <img src="${course.Image}" alt="${course.Title}">

                        <h3>${course.Title}</h3>
                        <p><strong>Instructor:</strong> ${course["Instructor Name"]}</p>
                        <p>${course.Description}</p>
                        <p><strong>Price:</strong> ${course.Price === null ? "Free" : `$${course.Price}`}</p>
                        <p><strong>Duration:</strong> ${course.Duration}</p>
                        <div class="card-options">
                        <button class="enrollBtn">Enroll</button>
                        <button class="wishBtn">
                            <i class="fa-solid fa-heart"></i>
                        </button>
                        </div>
                    </div>
                    `;
            }else{
                
            }

            const enrollButton = courseDiv.querySelector(".enrollBtn");
            const wishButton = courseDiv.querySelector(".wishBtn");

            enrollButton.addEventListener("click", () => enroll(course.ID));
            wishButton.addEventListener("click", () => addToWish(course.ID));
            // console.log(isLogin());

            coursesContainer.appendChild(courseDiv);
        });
    };


    function setupPagination() {
        const pagination = document.querySelector(paginationContainer);
        pagination.innerHTML = "";
        console.log(pagination)


        for (let i = 1; i <= totalPages; i++) {
            const link = document.createElement("a");
            link.href = "#";
            link.innerText = i;

            if (i === currentPage) {
                link.classList.add("active");
            }

            link.addEventListener("click", (event) => {
                event.preventDefault();
                currentPage = i;
                // showItems(currentPage);
                showCourses(currentPage);

                const currentActive = pagination.querySelector(".active");
                currentActive.classList.remove("active");
                link.classList.add("active");
            });

            pagination.appendChild(link);
        }

    }

    // showitems(currentPage);
    showCourses(currentPage);
    setupPagination();

}


// const items = [ //courses
//     " 1",
//     " 2",
//     " 3",
//     " 4",
//     " 5",
//     " 6",
//     " 7",
//     " 8",
//     " 9",
//     " 10",
//     " 11",
//     " 12",
//     " 13",
//     " 14",
//     " 15",
//     " 16",
//     " 17",
//     " 18",
//     " 19",
//     " 20",
//     " 21",
//     " 22",
//     " 23",
//     " 24",
//     " 25",
//     " 26",
//     " 27",
//     " 28",
//     " 29",
//     " 30",
//     " 31",
//     " 32",
//     " 33",
//     " 34",
//     " 35",
// ];

// const itemsPerPage = 5; //6



// paginate(items, itemsPerPage, paginationContainer);
paginate(coursesData.courses, coursesPerPage, paginationContainer);







function enroll(courseID) {
    if (!isLogin()) {
        showNotification("Please log in to enroll in courses.", 2000);
        return;
    }

    const course = coursesData.courses.find((c) => c.ID == courseID);
    console.log(course);

    if (course.Price === null) {
        let pendingCourses =
            JSON.parse(localStorage.getItem("pendingCourses")) || [];

        // Check if the course is already in the pending list for the same user
        const isAlreadyPending = pendingCourses.some(
            (entry) => entry.username === username && entry.course.ID === courseID
        );

        if (isAlreadyPending) {
            showNotification(
                "Your enrollment request is already pending approval.",
                2000
            );
            return;
        }

        // Add course to pending list if not already there
        pendingCourses.push({ username, course });
        localStorage.setItem("pendingCourses", JSON.stringify(pendingCourses));
        showNotification("Your enrollment request is pending approval.", 2000);
        return;
    }

    const overlay = document.getElementById("paypal-popup-overlay");
    overlay.style.display = "flex";

    document.getElementById("paypal-button-container").innerHTML = "";

    paypal
        .Buttons({
            style: {
                layout: "vertical",
                color: "blue",
                shape: "rect",
                label: "checkout",
                height: 50,
            },
            fundingSource: paypal.FUNDING.PAYPAL,
            funding: {
                allowed: [paypal.FUNDING.CARD, paypal.FUNDING.PAYPAL],
            },
            createOrder: function (data, actions) {
                return actions.order.create({
                    purchase_units: [
                        {
                            amount: { value: course.Price.toString() },
                            description: course.Title,
                        },
                    ],
                });
            },
            onApprove: function (data, actions) {
                return actions.order.capture().then(function (details) {
                    console.log("Payment Successful:", details);
                    showNotification("Payment successful! You are now enrolled.", 2000);

                    userCourses.push(course);
                    const updatedUsers = users.map((u) =>
                        u.username === username ? { ...u, courses: userCourses } : u
                    );
                    localStorage.setItem("users", JSON.stringify(updatedUsers));

                    document.getElementById("paypal-popup-overlay").style.display =
                        "none";
                    courses(coursesData.courses);
                });
            },
            onError: function (err) {
                console.log("Payment Failed:", err);
                showNotification("Payment failed. Please try again.", 1000);
            },
        })
        .render("#paypal-button-container");
}

function addToWish(courseID) {
    if (!isLogin()) {
        showNotification("Please log in to add courses to your wishlist.", 600);
        return;
    }

    const course = coursesData.courses.find((c) => c.ID == courseID);
    console.log(course);

    if (userWishes.some((c) => c.ID == courseID)) {
        showNotification("This course is already in your wishlist!", 600);
        return;
    }

    if (userCourses.some((c) => c.ID == courseID)) {
        showNotification(
            "You are already enrolled in this course. It cannot be added to your wishlist.",
            600
        );

        return;
    }
    showNotification("Course added succefully to your wishlist", 1000);
    userWishes.push(course);

    const updatedUsers = users.map((u) =>
        u.username === username ? { ...u, wishlist: userWishes } : u
    );
    console.log(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    courses(coursesData.courses);
}
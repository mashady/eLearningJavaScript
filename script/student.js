// // //prepare the user database
// // var dbUsers = [
// //     {
// //         ID: 1,
// //         Email: "sara@gmail.com",
// //         Password: "123456"
// //     },
// //     {
// //         ID: 2,
// //         Email: "aliaa@gmail.com",
// //         Password: "123456"
// //     },
// //     {
// //         ID: 3,
// //         Email: "mohamed@gmail.com",
// //         Password: "123456"
// //     },
// //     {
// //         ID: 4,
// //         Email: "mahmoud@gmail.com",
// //         Password: "123456"
// //     }
// // ];
// // //save users to local storage
// // // localStorage.setItem("users", JSON.stringify(dbUsers));

// // // Function to get users from local storage
// // function getUsersFromLocalStorage() {
// //     let storedUsers = localStorage.getItem("users");

// //     // If users exist in local storage, parse them; otherwise, return an empty array
// //     return storedUsers ? JSON.parse(storedUsers) : [];
// // }

// // //get users from local storage
// // let users = getUsersFromLocalStorage();

// // // Function to display a student
// // function showStudent(user) {
// //     var dataTable = document.querySelector("table>tbody");
// //     dataTable.innerHTML = "";
// //     var tdID = document.createElement("td");
// //     tdID.innerText = user.ID;
// //     var tdEmail = document.createElement("td");
// //     tdEmail.innerText = user.Email;
// //     var tdPassword = document.createElement("td");
// //     tdPassword.innerText = user.Password;

// //     var tr = document.createElement("tr");
// //     tr.appendChild(tdID);
// //     tr.appendChild(tdEmail);
// //     tr.appendChild(tdPassword);

// //     dataTable.appendChild(tr);
// // }

// // //add student
// // function addUser() {
// //     // event.preventDefault();
// //     let ID = parseInt(document.getElementById("ID").value);
// //     let Email = document.getElementById("email").value;
// //     let Password = document.getElementById("password").value;
// //     let newUser = { ID, Email, Password };
// //     let users = getUsersFromLocalStorage(); // Get existing users from local storage
// //     users.push(newUser); // Add the new user
// //     localStorage.setItem("users", JSON.stringify(users)); // Save back to local storage
// //     displayUsers(users);
// //     alert("User added successfully!");
// // }

// // //view student by id

// // function viewStudentById() {
// //     let searchID = parseInt(document.getElementById("ID").value);
// //     let users = getUsersFromLocalStorage();
// //     let user = users.find(user => user.ID === searchID);

// //     if (user) {
// //         showStudent(user);
// //     } else {
// //         alert("User not found!");
// //     }
// // }

// // //view all students

// // function displayUsers(users) {
// //     //check if users is an array
// //     if (!Array.isArray(users)) {
// //         console.error("Error: users is not an array!", users);
// //         return;
// //     }
// //     //get the table
// //     var dataTable = document.querySelector("table>tbody");

// //     // Remove all existing rows
// //     dataTable.innerHTML = "";

// //     //display users
// //     for (user of users) {

// //         var tdID = document.createElement("td");
// //         tdID.innerText = user.ID;
// //         var tdEmail = document.createElement("td");
// //         tdEmail.innerText = user.Email;
// //         var tdPassword = document.createElement("td");
// //         tdPassword.innerText = user.Password;

// //         var tr = document.createElement("tr");
// //         tr.appendChild(tdID);
// //         tr.appendChild(tdEmail);
// //         tr.appendChild(tdPassword);

// //         dataTable.appendChild(tr);
// //     }
// // }


// // //update student

// // function updateStudent() {
// //     let ID = parseInt(document.getElementById("ID").value);
// //     let newEmail = document.getElementById("email").value;
// //     let newPassword = document.getElementById("password").value;

// //     let users = getUsersFromLocalStorage();
// //     // console.log(users);
// //     let userIndex = users.findIndex(user => user.ID === ID);
// //     // console.log(userIndex);

// //     if (userIndex === -1) {
// //         alert("User not found!");
// //         return;
// //     }

// //     users[userIndex].Email = newEmail;
// //     users[userIndex].Password = newPassword;
// //     localStorage.setItem("users", JSON.stringify(users));

// //     alert("User updated successfully!");
// //     showStudent(users[userIndex]);
// //     // displayUsers(getUsersFromLocalStorage());
// // }

// // //delete student

// // function deleteStudent() {
// //     let ID = parseInt(document.getElementById("ID").value);
// //     let users = getUsersFromLocalStorage();
// //     let filteredUsers = users.filter(user => user.ID !== ID);

// //     if (users.length === filteredUsers.length) {
// //         alert("User not found!");
// //         return;
// //     }
// //     // update the following users' IDs
// //     for (let i = 0; i < filteredUsers.length; i++) {
// //         filteredUsers[i].ID = i + 1;
// //     }
// //     // Add a confirmation dialog before deleting the user
// //     if (confirm("Are you sure you want to delete this user?")) {
// //         localStorage.setItem("users", JSON.stringify(filteredUsers));
// //         alert("User deleted successfully!");
// //         displayUsers(getUsersFromLocalStorage());
// //     }
// // }



// // //load event listeners
// // document.addEventListener("DOMContentLoaded", function () {
// //     let addStudentButton = document.getElementById("add-student");
// //     if (addStudentButton) {
// //         addStudentButton.addEventListener("click", addUser);
// //     }

// //     let viewStudentButton = document.getElementById("view-student");
// //     if (viewStudentButton) {
// //         viewStudentButton.addEventListener("click", viewStudentById);
// //     }

// //     let updateStudentButton = document.getElementById("update-student");
// //     if (updateStudentButton) {
// //         updateStudentButton.addEventListener("click", updateStudent);
// //     }

// //     let deleteStudentButton = document.getElementById("delete-student");
// //     if (deleteStudentButton) {
// //         deleteStudentButton.addEventListener("click", deleteStudent);
// //     }

// //     let exportButton = document.getElementById("export-students");
// //     if (exportButton) {
// //         exportButton.addEventListener("click", function () {
// //             displayUsers(getUsersFromLocalStorage());
// //         });
// //     }

// //     // Display users when page loads
// //     displayUsers(getUsersFromLocalStorage());
// // });
// // Function to get users from local storage
// function getUsersFromLocalStorage() {
//     let storedUsers = localStorage.getItem("users");
//     return storedUsers ? JSON.parse(storedUsers) : [];
// }

// // Function to display a student
// function showStudent(user) {
//     var dataTable = document.querySelector("table>tbody");
//     dataTable.innerHTML = "";
//     var tdID = document.createElement("td");
//     tdID.innerText = user.ID;
//     var tdEmail = document.createElement("td");
//     tdEmail.innerText = user.Email;
//     var tdPassword = document.createElement("td");
//     tdPassword.innerText = user.Password;

//     var tr = document.createElement("tr");
//     tr.appendChild(tdID);
//     tr.appendChild(tdEmail);
//     tr.appendChild(tdPassword);

//     dataTable.appendChild(tr);
// }

// // Function to add a student
// function addUser() {
//     let ID = parseInt(document.getElementById("ID").value);
//     let Email = document.getElementById("email").value;
//     let Password = document.getElementById("password").value;
//     let newUser = { ID, Email, Password };
//     let users = getUsersFromLocalStorage();
//     users.push(newUser);
//     localStorage.setItem("users", JSON.stringify(users));
//     displayUsers(users);
//     alert("User added successfully!");
// }

// // Function to view a student by ID
// function viewStudentById() {
//     let searchID = parseInt(document.getElementById("ID").value);
//     let users = getUsersFromLocalStorage();
//     let user = users.find(user => user.ID === searchID);

//     if (user) {
//         showStudent(user);
//     } else {
//         alert("User not found!");
//     }
// }

// // Function to display all students
// function displayUsers(users) {
//     if (!Array.isArray(users)) {
//         console.error("Error: users is not an array!", users);
//         return;
//     }

//     var dataTable = document.querySelector("table>tbody");
//     dataTable.innerHTML = "";

//     users.forEach(user => {
//         var tdID = document.createElement("td");
//         tdID.innerText = user.ID;
//         var tdEmail = document.createElement("td");
//         tdEmail.innerText = user.Email;
//         var tdPassword = document.createElement("td");
//         tdPassword.innerText = user.Password;

//         var tr = document.createElement("tr");
//         tr.appendChild(tdID);
//         tr.appendChild(tdEmail);
//         tr.appendChild(tdPassword);

//         dataTable.appendChild(tr);
//     });
// }

// // Function to update a student
// function updateStudent() {
//     let ID = parseInt(document.getElementById("ID").value);
//     let newEmail = document.getElementById("email").value;
//     let newPassword = document.getElementById("password").value;

//     let users = getUsersFromLocalStorage();
//     let userIndex = users.findIndex(user => user.ID === ID);

//     if (userIndex === -1) {
//         alert("User not found!");
//         return;
//     }

//     users[userIndex].Email = newEmail;
//     users[userIndex].Password = newPassword;
//     localStorage.setItem("users", JSON.stringify(users));

//     alert("User updated successfully!");
//     displayUsers(users);
// }

// // Function to delete a student
// function deleteStudent() {
//     let ID = parseInt(document.getElementById("ID").value);
//     let users = getUsersFromLocalStorage();
//     let filteredUsers = users.filter(user => user.ID !== ID);

//     if (users.length === filteredUsers.length) {
//         alert("User not found!");
//         return;
//     }

//     if (confirm("Are you sure you want to delete this user?")) {
//         localStorage.setItem("users", JSON.stringify(filteredUsers));
//         alert("User deleted successfully!");
//         displayUsers(filteredUsers);
//     }
// }

// // Event listeners
// document.addEventListener("DOMContentLoaded", function () {
//     let addStudentButton = document.getElementById("add-student");
//     if (addStudentButton) {
//         addStudentButton.addEventListener("click", addUser);
//     }

//     let viewStudentButton = document.getElementById("view-student");
//     if (viewStudentButton) {
//         viewStudentButton.addEventListener("click", viewStudentById);
//     }

//     let updateStudentButton = document.getElementById("update-student");
//     if (updateStudentButton) {
//         updateStudentButton.addEventListener("click", updateStudent);
//     }

//     let deleteStudentButton = document.getElementById("delete-student");
//     if (deleteStudentButton) {
//         deleteStudentButton.addEventListener("click", deleteStudent);
//     }

//     let exportButton = document.getElementById("export-students");
//     if (exportButton) {
//         exportButton.addEventListener("click", function () {
//             displayUsers(getUsersFromLocalStorage());
//         });
//     }

//     // Display users when page loads
//     displayUsers(getUsersFromLocalStorage());
// });
document.addEventListener("DOMContentLoaded", function() {
    let students = [
        { name: "Ali", course: "JavaScript", progress: 50 },
        { name: "Mona", course: "Python", progress: 75 },
        { name: "Sara", course: "HTML & CSS", progress: 90 }
    ];
    
    let tableBody = document.getElementById("student-course-list");
    students.forEach((student, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.course}</td>
            <td>
                <div class="progress-container">
                    <div class="progress-bar" style="width: ${student.progress}%">${student.progress}%</div>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
});

function updateProgress(index) {
    let newProgress = prompt("Enter new progress percentage:");
    if (newProgress !== null && newProgress.trim() !== "" && !isNaN(newProgress)) {
        newProgress = Math.min(100, Math.max(0, parseInt(newProgress))); // Ensure within 0-100
        let progressBar = document.querySelectorAll(".progress-bar")[index];
        progressBar.style.width = newProgress + "%";
        progressBar.textContent = newProgress + "%";
    }
}
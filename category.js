//prepare the category database
var dbCategories = [
    {
        ID: 1,
        Name: "Web Development"
    },
    {
        ID: 2,
        Name: "Mobile Development"
    },
    {
        ID: 3,
        Name: "Data Science"
    },
    {
        ID: 4,
        Name: "Artificial Intelligence"
    }
];
//save Categories to local storage
// localStorage.setItem("Categories", JSON.stringify(dbCategories));

// Function to get Categories from local storage
function getCategoriesFromLocalStorage() {
    let storedCategories = localStorage.getItem("Categories");

    // If Categories exist in local storage, parse them; otherwise, return an empty array
    return storedCategories ? JSON.parse(storedCategories) : [];
}

//get Categories from local storage
let Categories = getCategoriesFromLocalStorage();

// Function to display a Category
function showCategory(category) {
    var dataTable = document.getElementById('categories-Body');
    dataTable.innerHTML = "";
    var tdID = document.createElement("td");
    tdID.innerText = category.ID;
    var tdName = document.createElement("td");
    tdName.innerText = category.Name;

    var tr = document.createElement("tr");
    tr.appendChild(tdID);
    tr.appendChild(tdName);

    dataTable.appendChild(tr);
}

//add Category
function addCategory() {
    let ID = parseInt(document.getElementById("category-id").value);
    let Name = document.getElementById("category-name").value;
    let newcategory = { ID, Name };
    let Categories = getCategoriesFromLocalStorage(); // Get existing Categories from local storage
    Categories.push(newcategory); // Add the new category
    localStorage.setItem("Categories", JSON.stringify(Categories)); // Save back to local storage

    // Add the new category to the select element
    let couseCategories = document.getElementById("course-category");
    let option = document.createElement("option");
    option.text = Name;
    option.value = Name;
    couseCategories.add(option);


    displayCategories(Categories);
    alert("category added successfully!");
}

//view Category by id

function viewCategoryById() {
    let searchID = parseInt(document.getElementById("ID").value);
    let Categories = getCategoriesFromLocalStorage();
    let category = Categories.find(category => category.ID === searchID);

    if (category) {
        showCategory(category);
    } else {
        alert("category not found!");
    }
}

//view all Categorys

function displayCategories(Categories) {
    //check if Categories is an array
    if (!Array.isArray(Categories)) {
        console.error("Error: Categories is not an array!", Categories);
        return;
    }
    //get the table
    var dataTable = document.getElementById('categories-Body');

    // Remove all existing rows
    dataTable.innerHTML = "";

    //display Categories
    for (category of Categories) {

        var tdID = document.createElement("td");
        tdID.innerText = category.ID;
        var tdName = document.createElement("td");
        tdName.innerText = category.Name;

        var tr = document.createElement("tr");
        tr.appendChild(tdID);
        tr.appendChild(tdName);

        dataTable.appendChild(tr);
    }
}


//update Category

function updateCategory() {
    let ID = parseInt(document.getElementById("category-id").value);
    let newName = document.getElementById("category-name").value;

    let Categories = getCategoriesFromLocalStorage();
    // console.log(Categories);
    let categoryIndex = Categories.findIndex(category => category.ID === ID);
    // console.log(categoryIndex);

    if (categoryIndex === -1) {
        alert("category not found!");
        return;
    }

    Categories[categoryIndex].Name = newName;
    localStorage.setItem("Categories", JSON.stringify(Categories));

    alert("category updated successfully!");
    showCategory(Categories[categoryIndex]);
    // displayCategories(getCategoriesFromLocalStorage());
}

//delete Category

function deleteCategory() {
    let ID = parseInt(document.getElementById("category-id").value);
    let Categories = getCategoriesFromLocalStorage();
    let filteredCategories = Categories.filter(category => category.ID !== ID);

    if (Categories.length === filteredCategories.length) {
        alert("category not found!");
        return;
    }
    // update the following Categories' IDs
    for (let i = 0; i < filteredCategories.length; i++) {
        filteredCategories[i].ID = i + 1;
    }
    // Add a confirmation dialog before deleting the category
    if (confirm("Are you sure you want to delete this category?")) {
        localStorage.setItem("Categories", JSON.stringify(filteredCategories));
        alert("category deleted successfully!");

        // Delete category from the select element
        let couseCategories = document.getElementById("course-category");
        couseCategories.remove(ID - 1);
        
        //TODO
        // Delete all courses with the deleted category
    

        displayCategories(getCategoriesFromLocalStorage());
    }
}



//load event listeners
document.addEventListener("DOMContentLoaded", function () {
    let addCategoryButton = document.getElementById("add-category");
    if (addCategoryButton) {
        addCategoryButton.addEventListener("click", addCategory);
    }

    let viewCategoryButton = document.getElementById("view-category");
    if (viewCategoryButton) {
        viewCategoryButton.addEventListener("click", viewCategoryById);
    }

    let updateCategoryButton = document.getElementById("update-category");
    if (updateCategoryButton) {
        updateCategoryButton.addEventListener("click", updateCategory);
    }

    let deleteCategoryButton = document.getElementById("delete-category");
    if (deleteCategoryButton) {
        deleteCategoryButton.addEventListener("click", deleteCategory);
    }

    let exportButton = document.getElementById("view-categories");
    if (exportButton) {
        exportButton.addEventListener("click", function () {
            displayCategories(getCategoriesFromLocalStorage());
        });
    }

    // Display Categories when page loads
    displayCategories(getCategoriesFromLocalStorage());
});
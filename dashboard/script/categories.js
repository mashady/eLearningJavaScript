// Function to save or update a category in Local Storage
function saveCategory(event) {
  event.preventDefault();

  let categories = JSON.parse(localStorage.getItem("categories")) || [];
  let courses = JSON.parse(localStorage.getItem("Courses")) || [];
  const categoryId = document.getElementById("category-id").value;
  const categoryName = document.getElementById("category-name").value.trim();

  if (!categoryName) {
    alert("Please enter a category name.");
    return;
  }

  // Check for duplicate category names
  const isDuplicate = categories.some(
    (cat) =>
      cat.name.toLowerCase() === categoryName.toLowerCase() &&
      cat.id !== categoryId
  );
  if (isDuplicate) {
    alert("Category already exists!");
    return;
  }

  if (categoryId) {
    // Update existing category
    const existingCategoryIndex = categories.findIndex(
      (cat) => cat.id === categoryId
    );
    if (existingCategoryIndex !== -1) {
      const oldCategoryName = categories[existingCategoryIndex].name;
      categories[existingCategoryIndex].name = categoryName;

      // Update all courses associated with the old category name
      courses = courses.map((course) => {
        if (course.Category === oldCategoryName) {
          return { ...course, Category: categoryName };
        }
        return course;
      });

      // Update Courses in localStorage
      localStorage.setItem("Courses", JSON.stringify(courses));
    }
  } else {
    // Add new category
    const newCategoryId = `cat${new Date().getTime()}`;
    categories.push({ id: newCategoryId, name: categoryName });
  }

  // Update categories in localStorage
  localStorage.setItem("categories", JSON.stringify(categories));

  // Refresh the UI
  fetchCategories();
  alert("Category saved successfully!");
  resetCategoryForm();
}

// Function to reset the category form
function resetCategoryForm() {
  document.getElementById("category-form").reset();
  document.getElementById("category-id").value = ""; // Clear the category ID
  document.getElementById("update-category").style.display = "none";
  document.querySelector('button[type="submit"]').style.display =
    "inline-block";
}

// Function to edit category
window.editCategory = function (id, name) {
  document.getElementById("category-id").value = id;
  document.getElementById("category-name").value = name;
  document.getElementById("update-category").style.display = "inline-block";
  document.querySelector('button[type="submit"]').style.display = "none";
};

// Function to delete category
window.deleteCategory = function (id) {
  if (confirm("Are you sure you want to delete this category?")) {
    let categories = JSON.parse(localStorage.getItem("categories")) || [];
    let courses = JSON.parse(localStorage.getItem("Courses")) || [];

    // Find the category name before deleting it
    const categoryToDelete = categories.find((cat) => cat.id === id);
    const categoryName = categoryToDelete ? categoryToDelete.name : null;

    // Delete the category
    categories = categories.filter((cat) => cat.id !== id);

    // Delete all courses associated with this category
    if (categoryName) {
      courses = courses.filter((course) => course.Category !== categoryName);
    }

    // Update Local Storage
    localStorage.setItem("categories", JSON.stringify(categories));
    localStorage.setItem("Courses", JSON.stringify(courses));

    // Refresh the categories and courses lists
    fetchCategories();
    alert("Category and associated courses deleted successfully!");
  }
};

// Function to fetch and display categories
function fetchCategories(searchTerm = "") {
  const categoriesList = document.getElementById("categories-list");
  categoriesList.innerHTML = "";

  let categories = JSON.parse(localStorage.getItem("categories")) || [];

  searchTerm = String(searchTerm || "")
    .toLowerCase()
    .trim();

  if (categories.length > 0) {
    categories.forEach((category) => {
      if (!searchTerm || category.name.toLowerCase().includes(searchTerm)) {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${category.name}</td>
                    <td>
                        <button class="edit-btn" onclick="editCategory('${category.id}', '${category.name}')">Edit</button>
                        <button class="delete-btn" onclick="deleteCategory('${category.id}')">Delete</button>
                    </td>
                `;
        categoriesList.appendChild(row);
      }
    });

    if (searchTerm && categoriesList.innerHTML === "") {
      categoriesList.innerHTML =
        "<tr><td colspan='2'>No matching categories found</td></tr>";
    }
  } else {
    categoriesList.innerHTML =
      "<tr><td colspan='2'>No categories available</td></tr>";
  }
}

// Function to handle search
function handleSearch() {
  const searchTerm = document.getElementById("search-category").value.trim();
  fetchCategories(searchTerm);
}

// Event listeners
document
  .getElementById("category-form")
  .addEventListener("submit", saveCategory);
document
  .getElementById("update-category")
  .addEventListener("click", saveCategory);
document
  .getElementById("search-category")
  .addEventListener("input", handleSearch);

// Initialize categories on page load
document.addEventListener("DOMContentLoaded", () => fetchCategories());

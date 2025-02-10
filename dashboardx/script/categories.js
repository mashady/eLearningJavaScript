// Function to save or update a category in Local Storage
function saveCategory(event) {
  event.preventDefault();

  // Retrieve existing categories and courses from localStorage
  let categories = JSON.parse(localStorage.getItem("categories")) || [];
  let courses = JSON.parse(localStorage.getItem("courses")) || [];

  // Get the category ID and name from the form
  let categoryId = document.getElementById("category-id").value;
  const categoryName = document.getElementById("category-name").value.trim();

  // Validate the category name
  if (!categoryName) {
    alert("Please enter a category name.");
    return;
  }

  // If no ID exists, generate a new one
  if (!categoryId) {
    categoryId = `cat${new Date().getTime()}`;
  }

  // Check for duplicate category names (case-insensitive)
  const isDuplicate = categories.some(
    (cat) =>
      cat.name.toLowerCase() === categoryName.toLowerCase() &&
      cat.id !== categoryId
  );
  if (isDuplicate) {
    alert("Category already exists!");
    return;
  }

  // Find the index of the existing category
  const existingCategoryIndex = categories.findIndex(
    (cat) => cat.id === categoryId
  );

  if (existingCategoryIndex !== -1) {
    // Update existing category
    const oldCategoryName = categories[existingCategoryIndex].name;
    categories[existingCategoryIndex].name = categoryName;

    // Update all courses associated with the old category name
    courses = courses.map((course) => {
      if (course.category === oldCategoryName) {
        return { ...course, category: categoryName };
      }
      return course;
    });
  } else {
    // Add new category
    categories.push({ id: categoryId, name: categoryName });
  }

  // Save updated categories and courses back to localStorage
  localStorage.setItem("categories", JSON.stringify(categories));
  localStorage.setItem("courses", JSON.stringify(courses));

  // Refresh the categories list and reset the form
  fetchCategories();
  alert("Category saved successfully!");
  resetCategoryForm();
}

// Function to reset the category form
function resetCategoryForm() {
  document.getElementById("category-form").reset();
  document.getElementById("category-id").value = ""; // Ensure ID is cleared for new category
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
    let courses = JSON.parse(localStorage.getItem("courses")) || [];

    // Find the category name before deleting it
    const categoryToDelete = categories.find((cat) => cat.id === id);
    const categoryName = categoryToDelete ? categoryToDelete.name : null;

    // Delete the category
    categories = categories.filter((cat) => cat.id !== id);

    // Delete all courses associated with this category
    if (categoryName) {
      courses = courses.filter((course) => course.category !== categoryName);
    }

    // Update Local Storage
    localStorage.setItem("categories", JSON.stringify(categories));
    localStorage.setItem("courses", JSON.stringify(courses));

    // Refresh the categories and courses lists
    fetchCategories();
    alert("Category and associated courses deleted successfully!");
  }
};

// Function to fetch categories and display them
function fetchCategories(searchTerm = "") {
  const categoriesList = document.getElementById("categories-list");
  categoriesList.innerHTML = "";

  let categories = JSON.parse(localStorage.getItem("categories")) || [];

  searchTerm = searchTerm.toLowerCase().trim();

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

// Function to handle search input
function handleSearch() {
  const searchTerm = document.getElementById("search-category").value.trim();
  fetchCategories(searchTerm);
}

// Attach event listeners
document
  .getElementById("category-form")
  .addEventListener("submit", saveCategory);
document
  .getElementById("update-category")
  .addEventListener("click", saveCategory);
document
  .getElementById("search-category")
  .addEventListener("input", handleSearch);

// Load categories on page load
document.addEventListener("DOMContentLoaded", () => fetchCategories());

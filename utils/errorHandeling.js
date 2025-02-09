function showError(elementId, errorMessage) {
    const element = document.getElementById(elementId);
    element.classList.add("invalid");
    element.nextElementSibling.innerHTML = errorMessage;
    element.nextElementSibling.style.display = "block";
  }
  
  function clearError(elementId) {
    const element = document.getElementById(elementId);
    element.classList.remove("invalid");
    element.nextElementSibling.innerHTML = "";
    element.nextElementSibling.style.display = "none";
  }


export { showError , clearError };
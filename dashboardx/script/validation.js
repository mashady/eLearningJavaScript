function setupValidation(inputElement, validateFn, errorElement) {
  let isValid = false;

  function validate() {
    const value = inputElement.value.trim();
    const error = validateFn(value);
    isValid = !error;

    if (error) {
      inputElement.classList.add("invalid");
      errorElement.textContent = error;
      errorElement.style.display = "block";
    } else {
      inputElement.classList.remove("invalid");
      errorElement.style.display = "none";
    }
  }

  inputElement.addEventListener("blur", function () {
    validate();

    if (!isValid) {
      inputElement.focus();
    }
  });

  inputElement.addEventListener("input", function () {
    if (isValid) return;
    validate();
  });
}

const usernameValidator = (value) => {
  if (!value) return "Username is required";
  if (value.length < 3) return "Username must be at least 3 characters";
  return null;
};

const emailValidator = (value) => {
  if (!value) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email format";
  return null;
};

setupValidation(
  document.getElementById("username"),
  usernameValidator,
  document.getElementById("username-error")
);

setupValidation(
  document.getElementById("email"),
  emailValidator,
  document.getElementById("email-error")
);

export { usernameValidator, emailValidator, setupValidation };

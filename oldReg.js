document.getElementById("registerForm").addEventListener("submit", (e) => {
  console.log("register submitted");
  e.preventDefault();
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const rePassword = document.getElementById("rePass").value.trim();
  /*
    if (!firstName || !lastName || !email || !password || !rePass) {
      return;
    }*/
  if (!firstName) {
    document.getElementById("firstName").classList.add("invalid");

    document.getElementById("fNameErrorMsg").innerHTML =
      "First name is requierd";
    document.getElementById("fNameErrorMsg").style.display = "block";
  } else {
    document.getElementById("firstName").classList.remove("invalid");

    document.getElementById("fNameErrorMsg").innerHTML = "";
    document.getElementById("fNameErrorMsg").style.display = "none";
  }

  if (!lastName) {
    document.getElementById("lastName").classList.add("invalid");

    document.getElementById("lNameErrorMsg").innerHTML =
      "Last name is requierd";
    document.getElementById("lNameErrorMsg").style.display = "block";
    return;
  } else {
    document.getElementById("lastName").classList.remove("invalid");

    document.getElementById("lNameErrorMsg").innerHTML = "";
    document.getElementById("lNameErrorMsg").style.display = "none";
  }

  if (!validateName(firstName)) {
    document.getElementById("firstName").classList.add("invalid");

    document.getElementById("fNameErrorMsg").innerHTML =
      "Valid name must be containt only characters";
    document.getElementById("fNameErrorMsg").style.display = "block";
  } else {
    document.getElementById("firstName").classList.remove("invalid");

    document.getElementById("fNameErrorMsg").innerHTML = "";
    document.getElementById("fNameErrorMsg").style.display = "none";
  }
  if (!validateName(lastName)) {
    document.getElementById("lastName").classList.add("invalid");

    document.getElementById("lNameErrorMsg").innerHTML =
      "Valid name must be containt only characters";
    document.getElementById("lNameErrorMsg").style.display = "block";
  } else {
    document.getElementById("lastName").classList.remove("invalid");

    document.getElementById("lNameErrorMsg").innerHTML = "";
    document.getElementById("lNameErrorMsg").style.display = "none";
  }

  if (!validateEmail(email)) {
    document.getElementById("email").classList.add("invalid");

    document.getElementById("emailErrorMsg").innerHTML =
      "Please enter a valid email";
    document.getElementById("emailErrorMsg").style.display = "block";
    return;
  } else {
    document.getElementById("email").classList.remove("invalid");

    document.getElementById("emailErrorMsg").innerHTML = "";
    document.getElementById("emailErrorMsg").style.display = "none";
  }
  if (!password) {
    document.getElementById("password").classList.add("invalid");

    document.getElementById("passErrorMsg").innerHTML = "Password is required";
    document.getElementById("passErrorMsg").style.display = "block";
    return;
  } else {
    document.getElementById("password").classList.remove("invalid");

    document.getElementById("passErrorMsg").innerHTML = "";
    document.getElementById("passErrorMsg").style.display = "none";
  }
  if (!rePassword) {
    document.getElementById("rePass").classList.add("invalid");

    document.getElementById("rePassErrorMsg").innerHTML =
      "Confirm password is required";
    document.getElementById("rePassErrorMsg").style.display = "block";
    return;
  } else {
    document.getElementById("rePass").classList.remove("invalid");

    document.getElementById("rePassErrorMsg").innerHTML = "";
    document.getElementById("rePassErrorMsg").style.display = "none";
  }
  if (password.length < 8) {
    document.getElementById("password").classList.add("invalid");

    document.getElementById("passErrorMsg").innerHTML =
      "Password must be at least 8 characters long";
    document.getElementById("passErrorMsg").style.display = "block";
  } else {
    document.getElementById("rePass").classList.remove("invalid");

    document.getElementById("rePassErrorMsg").innerHTML = "";
    document.getElementById("rePassErrorMsg").style.display = "none";
  }
  if (password !== rePassword) {
    document.getElementById("rePass").classList.add("invalid");

    document.getElementById("rePassErrorMsg").innerHTML =
      "Passwords do not match";
    document.getElementById("rePassErrorMsg").style.display = "block";
  } else {
    document.getElementById("rePass").classList.remove("invalid");

    document.getElementById("rePassErrorMsg").innerHTML = "";
    document.getElementById("rePassErrorMsg").style.display = "none";
  }
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    console.log("Email already exists!");
    //generalErr
    document.getElementById("generalErr").classList.add("invalid");

    document.getElementById("generalErr").innerHTML = "Email already exists";
    document.getElementById("generalErr").style.display = "block";
  } else {
    let username = generateUsername(firstName, lastName, users);
    const newUser = {
      //  add progress bar
      firstName,
      lastName,
      username,
      email,
      password,
      isAdmin: false,
      courses: [],
      wishlist: [],
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    console.log("Registration successful!");
    setCookie("user", JSON.stringify({ username }), 1);
    isLogin();
    window.location.href = "/";
  }
});

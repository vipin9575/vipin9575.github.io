const myForm = document.getElementById("myForm");
const nameInput = document.getElementById("name");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const contactInput = document.getElementById("contact");
const accNoInput = document.getElementById("account_number");
const ifscInput = document.getElementById("ifsc");
const pwdInput = document.getElementById("pwd");
const confirmPwdInput = document.getElementById("confirmpwd");
const modalPopup = document.getElementById("staticBackdrop");

// Regular expressions for validation
const isValidName = (name) => {
  return /^[a-zA-Z\s]+$/.test(name);
};

const isValidUsername = (username) => {
  return /^[a-zA-Z0-9_]+$/.test(username);
};

const isValidEmail = (email) => {
  return /^[\w.%+-]+@(?:[\w-]+\.)+[a-zA-Z]{2,}$/.test(email);
};

const isValidContact = (contact) => {
  return /^\d{10}$/.test(contact);
};

const isValidAccNo = (account) => {
  return /^[0-9]{11}$/.test(account);
};

const isValidIfsc = (ifsc) => {
  return /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc);
};

// set error and success
const setErrorFor = (input, message) => {
  const inputBox = input.parentElement;
  const small = inputBox.querySelector("small");
  small.innerText = message;
  inputBox.classList.remove("success");
  inputBox.classList.add("error");
};

const setSuccessFor = (input) => {
  const inputBox = input.parentElement;
  inputBox.classList.remove("error");
  inputBox.classList.add("success");
};

const removeSuccess = (input) => {
  const inputBox = input.parentElement;
  inputBox.classList.remove("success");
};

// Validation functions for each input field
const validateName = () => {
  const nameValue = nameInput.value.trim();
  if (nameValue === "") {
    setErrorFor(nameInput, "Name cannot be empty.");
    return false;
  } else if (!isValidName(nameValue)) {
    setErrorFor(nameInput, "Name cannot contain numbers.");
    return false;
  } else {
    setSuccessFor(nameInput);
    return true;
  }
};

const validateUsername = () => {
  const usernameValue = usernameInput.value.trim();
  if (usernameValue === "") {
    setErrorFor(usernameInput, "Username cannot be empty.");
    return false;
  } else if (!isValidUsername(usernameValue)) {
    setErrorFor(
      usernameInput,
      "Username can only contain letters, numbers, and underscores."
    );
    return false;
  } else {
    setSuccessFor(usernameInput);
    return true;
  }
};

const validateEmail = () => {
  const emailValue = emailInput.value.trim();
  if (emailValue === "") {
    setErrorFor(emailInput, "Email cannot be empty.");
    return false;
  } else if (!isValidEmail(emailValue)) {
    setErrorFor(emailInput, "Enter a valid email address.");
    return false;
  } else {
    setSuccessFor(emailInput);
    return true;
  }
};

const validateContact = () => {
  const contactValue = contactInput.value.trim();
  const numericValue = contactValue.replace(/\D/g, ""); //
  const trimmedValue = numericValue.slice(0, 10);
  contactInput.value = trimmedValue;

  if (contactValue === "") {
    setErrorFor(contactInput, "Contact cannot be empty.");
    return false;
  } else if (!isValidContact(trimmedValue)) {
    setErrorFor(contactInput, "Enter a 10-digit valid contact number.");
    return false;
  } else {
    setSuccessFor(contactInput);
    return true;
  }
};

const validateAccountNo = () => {
  const accNoValue = accNoInput.value.trim();
  if (accNoValue === "") {
    setErrorFor(accNoInput, "Account No cannot be empty.");
    return false;
  } else if (!isValidAccNo(accNoValue)) {
    setErrorFor(accNoInput, "Please enter the valid format.");
    return false;
  } else {
    setSuccessFor(accNoInput);
    return true;
  }
};

const validateIfsc = () => {
  const ifscValue = ifscInput.value.trim();
  if (ifscValue === "") {
    setErrorFor(ifscInput, "Ifsc code cannot be empty");
    return false;
  } else if (!isValidIfsc(ifscValue)) {
    setErrorFor(ifscInput, "Please enter the valid format");
    return false;
  } else {
    setSuccessFor(ifscInput);
    return true;
  }
};

const validatePassword = () => {
  const passwordValue = pwdInput.value.trim();
  if (passwordValue === "") {
    setErrorFor(pwdInput, "Password cannot be empty.");
    return false;
  } else if (passwordValue.length < 3 || passwordValue.length > 20) {
    setErrorFor(pwdInput, "Password must be between 3 and 20 characters.");
    return false;
  } else {
    setSuccessFor(pwdInput);
    return true;
  }
};

const validateConfirmPassword = () => {
  const confirmPwdValue = confirmPwdInput.value.trim();
  if (confirmPwdValue === "") {
    setErrorFor(confirmPwdInput, "Confirm Password cannot be empty.");
    return false;
  } else if (confirmPwdValue !== pwdInput.value.trim()) {
    setErrorFor(confirmPwdInput, "Passwords do not match.");
    return false;
  } else {
    setSuccessFor(confirmPwdInput);
    return true;
  }
};

// Main function to validate all input fields
const validateInputs = () => {
  let isValid = true;
  isValid = validateName() && isValid;
  isValid = validateUsername() && isValid;
  isValid = validateEmail() && isValid;
  isValid = validateContact() && isValid;
  isValid = validateIfsc() && isValid;
  isValid = validateAccountNo() && isValid;
  isValid = validatePassword() && isValid;
  isValid = validateConfirmPassword() && isValid;
  return isValid;
};

// Event listeners for input fields
nameInput.addEventListener("input", validateName);
usernameInput.addEventListener("input", validateUsername);
emailInput.addEventListener("input", validateEmail);
contactInput.addEventListener("input", validateContact);
accNoInput.addEventListener("input", validateAccountNo);
ifscInput.addEventListener("input", validateIfsc);
pwdInput.addEventListener("input", validatePassword);
confirmPwdInput.addEventListener("input", validateConfirmPassword);

// Event listener for form submission
myForm.addEventListener("submit", (e) => {
  // preventing default form submit
  e.preventDefault();
  if (validateInputs()) {
    console.log("clicked");
    // Get form data
    const formData = {
      name: nameInput.value.trim(),
      username: usernameInput.value.trim(),
      email: emailInput.value.trim(),
      contact: contactInput.value.trim(),
      account: accNoInput.value.trim(),
      ifsc: ifscInput.value.trim(),
      password: pwdInput.value.trim(),
    };

    let userData = JSON.parse(localStorage.getItem("userData")) || [];

    // Append the new form data to the array
    userData.push(formData);

    // Save the updated array back to local storage
    localStorage.setItem("userData", JSON.stringify(userData));

    // modal access
    const modal = new bootstrap.Modal(modalPopup);
    modal.show();
    clearForm();
    toggleBlur(true);
  }
});

// Function to clear form fields
const clearForm = () => {
  nameInput.value = "";
  usernameInput.value = "";
  emailInput.value = "";
  contactInput.value = "";
  accNoInput.value = "";
  ifscInput.value = "";
  pwdInput.value = "";
  confirmPwdInput.value = "";

  removeSuccess(nameInput);
  removeSuccess(usernameInput);
  removeSuccess(emailInput);
  removeSuccess(contactInput);
  removeSuccess(accNoInput);
  removeSuccess(ifscInput);
  removeSuccess(pwdInput);
  removeSuccess(confirmPwdInput);
};

// Function to toggle background blur
const toggleBlur = (applyBlur) => {
  const container = document.querySelector(".container");
  if (applyBlur) {
    container.classList.add("blur-background");
  } else {
    container.classList.remove("blur-background");
  }
};

modalPopup.addEventListener("hidden.bs.modal", function () {
  toggleBlur(false); // Remove blur when popup is closed
});

const redirectToLogin = () => {
  window.location.href = "../Login/index.html";
};

const loginForm = document.getElementById("loginForm");
const username = document.getElementById("username");
const password = document.getElementById("password");
const invalidCredentials = document.getElementById("invalidCredentialsModal");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  const userData = JSON.parse(localStorage.getItem("userData")) || [];

  const user = userData.find((user) => {
    return user.username === usernameValue && user.password === passwordValue;
  });

  localStorage.setItem("username", usernameValue);

  const invalidCredentialsPopup = new bootstrap.Modal(invalidCredentials);

  if (user) {
    window.location.href = "../DashBoard/index.html";
    username.value = "";
    password.value = "";
  } else {
    invalidCredentialsPopup.show();
  }
});

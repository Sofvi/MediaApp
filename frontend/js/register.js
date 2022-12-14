"use strict";
const url = "http://localhost:3000"; // change url when uploading to server

// select existing html elements
//const loginForm = document.querySelector("#login-form");
const addUserForm = document.querySelector("#add-user-form");
// submit register form
addUserForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const data = serializeJson(addUserForm);
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url + "/auth/register", fetchOptions);
  const json = await response.json();
  alert(json.message);
});

// Move to home
// homeBtn.addEventListener('click', (event) => {
//   // do not submit the form anywhere (no page refresh)
//   event.preventDefault();
//   location.href = '../html/feed.html';
//   console.log('redirect to home');
// });

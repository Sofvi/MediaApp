'use strict';

const url = "http://localhost:3000"; // change url when uploading to server

// select existing html elements
const addUserForm = document.querySelector('#add-user-form');
const loginBtn = document.querySelector('#regBtn');
const homeBtn = document.querySelector('#anoBtn');

// submit register form
addUserForm.addEventListener('submit', async (evt) => {
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
  location.href = 'feed.html';
});

// Move to login
loginBtn.addEventListener('click', (event) => {
  // do not submit the form anywhere (no page refresh)
  event.preventDefault();
  location.href = 'login.html';
  console.log('redirect to login');
});

// Move to home
homeBtn.addEventListener('click', (event) => {
  // do not submit the form anywhere (no page refresh)
  event.preventDefault();
  location.href = 'feed.html';
  console.log('redirect to home');
});
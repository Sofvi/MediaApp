'use strict';

const url = 'http://localhost:3000'; // change url when uploading to server

// select existing html elements
const loginForm = document.querySelector('#login-form');
const registerBtn = document.querySelector('#regBtn');
const homeBtn = document.querySelector('#anoBtn');

// login
loginForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const data = serializeJson(loginForm);
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url + '/auth/login', fetchOptions);
  const json = await response.json();
  console.log('login response', json);
  if (!json.user) {
    alert(json.message);
  } else {
    // save token
    sessionStorage.setItem('token', json.token);
    sessionStorage.setItem('user', JSON.stringify(json.user));
    location.href = 'front.html';
  }
});

// Move to register
registerBtn.addEventListener('click', (event) => {
  // do not submit the form anywhere (no page refresh)
  event.preventDefault();
  location.href = 'register.html';
  console.log('redirect to register');
});

// Move to home
homeBtn.addEventListener('click', (event) => {
  // do not submit the form anywhere (no page refresh)
  event.preventDefault();
  location.href = 'feed.html';
  console.log('redirect to home');
});
'use strict';

const addForm = document.querySelector("#addFormPost");

addForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(addForm);

  if (!sessionStorage.getItem("token") && !sessionStorage.getItem("user")) {
    alert("Please login to post");
    location.href = "../html/login.html";
  }

  const fetchOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
    body: formData,
  };

  const response = await fetch(url + "/post", fetchOptions);
  const json = await response.json();

  console.log("Fetching the json:", json);
  if (!response.ok) {
    alert(json.message);
    return;
  }
  alert("Your post is created");
  location.href = "feed.html";
});
const homeBtn = document.querySelector('.fa-solid.fa-house');
const profileBtn = document.querySelector('.fa-solid.fa-user');

const loadFile = function(event) {
  const output = document.getElementById('output');
  output.src = URL.createObjectURL(event.target.files[0]);
  output.onload = function() {
    URL.revokeObjectURL(output.src); // free memory
  };
};

// Move to home
homeBtn.addEventListener('click', () => {
  location.href = 'feed.html';
  console.log('redirect to home');
});

// Move to profile
profileBtn.addEventListener('click', () => {
  location.href = 'profile.html';
  console.log('redirect to feed');
});

"use strict";
const url = "http://localhost:3000";

const token = sessionStorage.getItem("token");
const user = sessionStorage.getItem("user");
const addForm = document.querySelector("#addFormPost");
const parsedUser = JSON.parse(user);
console.log(parsedUser);

//Creating Form and submitting

const imagePost = document.querySelector("#image_post");
const showImage = document.querySelector("#show_image");

addForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(addForm);

  //TODO Will implement after the login is complete
  if (!token && !user) {
    alert("Please login to post");
    location.href = "../html/login.html";
  }

  const fetchOptions = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: formData,
  };

  const response = await fetch(url + "/post", fetchOptions);
  const json = await response.json();
  console.log(" JSON log:", json);
  if (!response.ok) {
    alert(json.message);
    return;
  }
  alert("Your post is created");
  location.href = "../html/feed.html";
});

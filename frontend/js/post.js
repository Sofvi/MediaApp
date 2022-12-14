"use strict";
const url = "http://localhost:3000";

const addForm = document.querySelector("#addFormPost");

const loadFile = function (event) {
  const output = document.getElementById("output");
  output.src = URL.createObjectURL(event.target.files[0]);
  output.onload = function () {
    URL.revokeObjectURL(output.src); // free memory
  };
};

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
  location.href = "../html/feed.html";
});

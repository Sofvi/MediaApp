"use strict";
const url = "http://localhost:3000";

//const token = sessionStorage.getItem("token");
//const user = sessionStorage.getItem("user");
const addForm = document.querySelector("#addFormPost");
// const parsedUser = JSON.parse(user);
// console.log(parsedUser);

//Creating Form and submitting
/* const homeFeedIcon = document.querySelector("#feedBtn");
homeFeedIcon.addEventListener("click", () => {
  location.href = "../html/feed.html";
}); */

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

  console.log("Fetching the json response for post:", json);
  if (!response.ok) {
    alert(json.message);
    return;
  }
  //sessionStorage.setItem("user", JSON.stringify(json.user));
  alert("Your post is created");
  location.href = "../html/feed.html";
});

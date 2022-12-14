"use strict";
const url = "http://localhost:3000"; // change url when uploading to server
// get query parameter
const getQParam = (param) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
};
const user = JSON.parse(sessionStorage.getItem("user"));

const id = getQParam("id");
console.log(id);

// select existing html elements
const modForm = document.querySelector("#edit-post-form");

const getPost = async (id) => {
  const fetchOptions = {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  const response = await fetch(url + "/post/" + id, fetchOptions);
  const userPost = await response.json();
  const inputs = modForm.querySelectorAll("input");
  inputs[0].value = userPost.location;
  inputs[1].value = userPost.description;
};

// submit modify form
modForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const data = serializeJson(modForm);
  // remove empty properties
  for (const [prop, value] of Object.entries(data)) {
    if (value === "") {
      delete data[prop];
    }
  }
  const fetchOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  };

  console.log(fetchOptions);
  const response = await fetch(url + "/post/" + id, fetchOptions);
  const json = await response.json();
  if (!response.ok) {
    alert(json.error.message);
  } else {
    alert(json.message);
  }
  location.href = "../html/feed.html";
});

getPost(id); // if regular user

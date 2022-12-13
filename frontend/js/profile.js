"use strict";

const url = "http://localhost:3000"; // change url when uploading to server

const homeBtn = document.querySelector(".fa-solid.fa-house");
const postBtn = document.querySelector(".fa-solid.fa-square-plus");
const profilePicBtn = document.querySelector(".profileTopDiv .cardProfileImg");
const popup = document.getElementById("myPopup");
const close = document.getElementsByClassName("closePopup");

const ul = document.querySelector(".allPhotos");

// Get user data
const user = JSON.parse(sessionStorage.getItem("user"));

// create picture cards
const createPictureCards = (pics) => {
  // clear ul
  ul.innerHTML = "";
  pics.forEach((pic) => {
    // create ul with DOM methods
    if (user.id === pic.user_id) {
      const img = document.createElement("img");
      img.src = url + "/thumbnails/" + pic.filename;
      img.classList.add("resp");
      ul.appendChild(img);
    }
  });
};

// AJAX call
const getPic = async () => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const response = await fetch(url + "/post", fetchOptions);
    const cats = await response.json();
    createPictureCards(cats);
  } catch (e) {
    console.log(e.message);
  }
};
getPic();

// Move to home
homeBtn.addEventListener("click", () => {
  location.href = "feed.html";
  console.log("redirect to profile");
});

// Move to post
postBtn.addEventListener("click", () => {
  location.href = "post.html";
  console.log("redirect to post");
});

// Popup window to add a profile picture
profilePicBtn.onclick = function () {
  popup.style.display = "block";
};

// Close the popup window
close.onclick = function () {
  popup.style.display = "none";
  console.log("closing the popup");
};

// Loading the preview picture
const loadFile = function (event) {
  const output = document.getElementById("output");
  output.src = URL.createObjectURL(event.target.files[0]);
  output.onload = function () {
    URL.revokeObjectURL(output.src); // free memory
  };
};

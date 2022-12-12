"use strict";

const url = "http://localhost:3000"; // change url when uploading to server

const homeBtn = document.querySelector(".fa-solid.fa-house");
const postBtn = document.querySelector(".fa-solid.fa-square-plus");
const cardProfileImg = document.querySelector(".cardProfileImg");
const profileName = document.querySelector("#profileName");
const profilePicBtn = document.querySelector(".profileTopDiv .cardProfileImg");
const popup = document.getElementById("myPopup");
const closeBtn = document.getElementsByClassName("closePopup");
const addFormProfilePicForm = document.querySelector('#addProfilePicForm');


const ul = document.querySelector(".allPhotos");

// Get user data
const user = JSON.parse(sessionStorage.getItem("user"));

// Display Profile Pic
const createProfilePic = (profilePics) => {
    if (user.id === profilePics.id && profilePics.profile_pic != null) {
      console.log(profilePics.id);
      // clear img src
      cardProfileImg.src = "";
      cardProfileImg.src = url + "/profilePics/" + profilePics.profile_pic;
    }
};

// Display Profile Name
profileName.innerHTML = "";
profileName.textContent = "@" + user.username;

// create picture cards
const createPictureCards = (pics) => {
  // clear ul
  ul.innerHTML = "";
  pics.forEach((pic) => {
    // create ul with DOM methods
    console.log(pic);
    if (user.username === pic.profilename) {
      console.log("user id right");
      const img = document.createElement("img");
      img.src = url + "/thumbnails/" + pic.filename;
      img.alt = user.username + "'s post";
      img.classList.add("resp");
      ul.appendChild(img);
    }
  });
};

/*
if( ul.length === 0) {
  const h2 = document.createElement("h2");
  ul.appendChild(h2);
  h2.innerText = "No posts yet. Start posting!";
}*/

// AJAX call for posts
const getPic = async () => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const response = await fetch(url + "/post", fetchOptions);
    const pics = await response.json();
    createPictureCards(pics);
  } catch (e) {
    console.log(e.message);
  }
};
getPic();

// AJAX call for profile pic
const getProfilePic = async () => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const response = await fetch(url + "/user/" + user.id, fetchOptions);
    const profilePics = await response.json();
    createProfilePic(profilePics);
  } catch (e) {
    console.log(e.message);
  }
};
getProfilePic();

// submit add profile pic form
addFormProfilePicForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const fd = new FormData(addFormProfilePicForm);
  const fetchOptions = {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
    body: fd,
  };
  const response = await fetch(url + '/user/' + user.id, fetchOptions);
  const json = await response.json();
  alert(json.message);
  location.href = 'profile.html';
});


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
closeBtn.onclick = function () {
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

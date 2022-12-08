'use strict';

const homeBtn = document.querySelector('.fa-solid.fa-house');
const postBtn = document.querySelector('.fa-solid.fa-square-plus');
const profilePicBtn = document.querySelector('.profileTopDiv .cardProfileImg');
const popup = document.getElementById('myPopup');
const close = document.getElementsByClassName('closePopup');

// Move to home
homeBtn.addEventListener('click', () => {
  location.href = 'feed.html';
  console.log('redirect to profile');
});

// Move to post
postBtn.addEventListener('click', () => {
  location.href = 'post.html';
  console.log('redirect to post');
});

// Popup window to add a profile picture
profilePicBtn.onclick = function() {
  popup.style.display = 'block';
}

// Close the popup window
close.onclick = function() {
  popup.style.display = 'none';
  console.log('closing the popup');
}

// Loading the preview picture
const loadFile = function(event) {
  const output = document.getElementById('output');
  output.src = URL.createObjectURL(event.target.files[0]);
  output.onload = function() {
    URL.revokeObjectURL(output.src); // free memory
  };
};
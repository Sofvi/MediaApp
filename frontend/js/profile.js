'use strict';

const homeBtn = document.querySelector('.fa-solid.fa-house');
const postBtn = document.querySelector('.fa-solid.fa-square-plus');

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
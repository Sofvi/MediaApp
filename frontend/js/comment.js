'use strict';

const homeBtn = document.querySelector('.fa-solid.fa-house');
const postBtn = document.querySelector('.fa-solid.fa-square-plus');
const profileBtn = document.querySelector('.fa-solid.fa-user');
const closeBtn = document.querySelector('.closeComment');

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

// Move to profile
profileBtn.addEventListener('click', () => {
  location.href = 'profile.html';
  console.log('redirect to profile');
});

// Close comment page
closeBtn.addEventListener('click', () => {
  location.href = '../html/feed.html'
  console.log('redirect back to feed');
});
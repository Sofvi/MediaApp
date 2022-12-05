'use strict';

const homeBtn = document.querySelector('.fa-solid.fa-house');

// Move to profile
homeBtn.addEventListener('click', () => {
  location.href = 'feed.html';
  console.log('redirect to profile');
});